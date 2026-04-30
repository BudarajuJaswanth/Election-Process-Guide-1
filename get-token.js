// get-token.js
import { readFile } from 'fs/promises';
import { createSign } from 'crypto';

async function getToken() {
  const creds = JSON.parse(await readFile('./credentials.json', 'utf8'));
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
  
  const data = await res.json();
  console.log(data.access_token);
}

getToken();
