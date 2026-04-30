// final-deploy.js
import { readFile } from 'fs/promises';
import { createSign } from 'crypto';

const PROJECT_ID = 'election-process-494902';
const BUCKET_NAME = `${PROJECT_ID}_build_source`;
const SERVICE_NAME = 'electvoice-portal';
const REGION = 'us-central1';

async function getToken(creds) {
  const header = JSON.stringify({ alg: 'RS256', typ: 'JWT' });
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const claim = JSON.stringify({
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: creds.token_uri,
    exp,
    iat
  });

  const base64Url = (str) => Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const unsignedToken = `${base64Url(header)}.${base64Url(claim)}`;
  const signer = createSign('RSA-SHA256');
  signer.update(unsignedToken);
  const signature = signer.sign(creds.private_key, 'base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const jwt = `${unsignedToken}.${signature}`;
  
  const res = await fetch(creds.token_uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });
  return (await res.json()).access_token;
}

async function run() {
  const creds = JSON.parse(await readFile('./credentials.json', 'utf8'));
  const token = await getToken(creds);
  console.log("Token acquired.");

  // 1. Create Bucket (ignore error if exists)
  console.log("Ensuring bucket exists...");
  await fetch(`https://storage.googleapis.com/storage/v1/b?project=${PROJECT_ID}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: BUCKET_NAME })
  });

  // 2. Upload Zip
  console.log("Uploading source zip...");
  const zipData = await readFile('./source.zip');
  await fetch(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_NAME}/o?uploadType=media&name=source.zip`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/zip' },
    body: zipData
  });

  // 3. Trigger Cloud Build
  console.log("Triggering Cloud Build...");
  const buildRes = await fetch(`https://cloudbuild.googleapis.com/v1/projects/${PROJECT_ID}/builds`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: { storageSource: { bucket: BUCKET_NAME, object: 'source.zip' } },
      steps: [
        { name: 'gcr.io/cloud-builders/docker', args: ['build', '-t', `gcr.io/${PROJECT_ID}/${SERVICE_NAME}`, '.'] },
        { name: 'gcr.io/cloud-builders/docker', args: ['push', `gcr.io/${PROJECT_ID}/${SERVICE_NAME}`] },
        { name: 'gcr.io/google.com/cloudsdktool/cloud-sdk', entrypoint: 'gcloud', args: ['run', 'deploy', SERVICE_NAME, '--image', `gcr.io/${PROJECT_ID}/${SERVICE_NAME}`, '--region', REGION, '--platform', 'managed', '--allow-unauthenticated'] }
      ],
      images: [`gcr.io/${PROJECT_ID}/${SERVICE_NAME}`]
    })
  });
  const buildData = await buildRes.json();
  if (buildData.error) {
    console.error("Build Error:", JSON.stringify(buildData.error, null, 2));
  } else {
    console.log("Build triggered successfully! Operation:", buildData.name);
    console.log("The deployment will take 2-4 minutes. You can check progress in the GCP Console.");
  }
}

run();
