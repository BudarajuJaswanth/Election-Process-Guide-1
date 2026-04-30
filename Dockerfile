# Use the official Node.js image.
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the application.
# The VITE_GEMINI_API_KEY from .env will be baked into the build here.
RUN npm run build

# Install a simple web server to serve the static dist folder.
RUN npm install -g serve

# Cloud Run listens on 8080 by default.
EXPOSE 8080

# Run the web server on container startup.
CMD ["serve", "-s", "dist", "-l", "8080"]
