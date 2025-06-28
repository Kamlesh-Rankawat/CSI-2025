# Docker Registry, DockerHub, and Multi-Stage Builds

## 1. Docker Registry

### What is a Docker Registry?
A **Docker Registry** is a **storage and distribution system** for Docker images. It allows developers to:
- **Push** (upload) images they create.
- **Pull** (download) images created by others.

### Types of Docker Registries:

| Type              | Description                                                                     |
|-------------------|---------------------------------------------------------------------------------|
| Public Registry   | Open to everyone. Example: [DockerHub](https://hub.docker.com)                 |
| Private Registry  | Secure/private image storage. Examples: AWS ECR, Azure Container Registry, GitHub Container Registry, self-hosted Harbor |

---

## 2. DockerHub

### What is DockerHub?
DockerHub is the **default public registry** provided by Docker. It hosts millions of public Docker images and allows users to store and share containerized applications.

### Common DockerHub Commands
```bash
# Login to DockerHub (only required for push)
docker login

# Pull an existing image
docker pull nginx

# Tag a local image to prepare for pushing
docker tag my-image username/my-image:latest

# Push your tagged image to DockerHub
docker push username/my-image:latest
```

**Note:** You need a DockerHub account to push images.

---

## 3. Multi-Stage Build

### Why Multi-Stage Builds?
Multi-stage builds help to:
- **Minimize the final image size**
- **Remove build-time dependencies**
- **Keep production images clean and efficient**

### Example: Build and Serve a Node.js App with Nginx

**Dockerfile:**
```Dockerfile
# -------- Stage 1: Build --------
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -------- Stage 2: Serve --------
FROM nginx:alpine

# Copy static files from previous build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Build & Run
```bash
# Build the multi-stage Docker image
docker build -t my-node-nginx-app .

# Run the container
docker run -d -p 8080:80 my-node-nginx-app
```

---

## Summary

| Concept            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Docker Registry    | Stores and shares Docker images                                              |
| DockerHub          | Official public registry hosted by Docker                                   |
| Multi-Stage Build  | Technique to optimize Docker image size and security                        |

---


