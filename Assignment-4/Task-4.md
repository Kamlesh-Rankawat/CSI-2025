
# 🐳 Creating Docker Images (Multiple Methods)

This guide covers multiple methods for creating Docker images, including:

- Method 1: Using a Dockerfile (Best Practice)
- Method 2: Using a Running Container (`docker commit`)
- Method 3: Multi-stage Builds (Advanced)
- Method 4: Manual install in container + commit (One-liner PowerShell)

---

## 📦 Method 1: Create Docker Image using Dockerfile

This is the recommended and repeatable way to build Docker images.

### Example: Create a custom NGINX image

**Dockerfile**
```Dockerfile
# Base image
FROM ubuntu:22.04

# Install nginx
RUN apt update && apt install -y nginx

# Copy custom HTML page (optional)
COPY index.html /var/www/html/index.html

# Expose port
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
```

**Build Image**
```bash
docker build -t my-nginx-image .
```

**Run Container**
```bash
docker run -d --name nginx-container -p 8080:80 my-nginx-image
```

---

## 🐳 Method 2: Create Image from a Running Container (`docker commit`)

This is useful for quickly capturing changes but not recommended for production.

### Steps
```bash
# Step 1: Start a base container and install software
docker run -dit --name temp-nginx ubuntu:22.04
docker exec temp-nginx apt update
docker exec temp-nginx apt install -y nginx

# Step 2: Commit the container as an image
docker commit temp-nginx my-nginx-committed

# Step 3: Run the new image
docker run -d --name my-nginx -p 9090:80 my-nginx-committed
```

---

## ⚙️ Method 3: Multi-Stage Dockerfile (Best for optimized builds)

Reduces final image size by building in one stage and copying only what’s needed.

**Dockerfile**
```Dockerfile
# Build stage
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
```

**Build and Run**
```bash
docker build -t my-node-nginx .
docker run -d -p 3000:80 my-node-nginx
```

---

## 🛠️ Method 4: One-liner: Container + Commit (PowerShell/CLI)

Useful for quick builds on Windows/PowerShell:
```powershell
docker run -dit --name temp-nginx ubuntu:22.04 powershell -Command "apt update; apt install -y nginx; exit"; Start-Sleep -Seconds 10; docker commit temp-nginx my-nginx-image; docker rm temp-nginx
```

This runs the container, installs nginx, commits the image, and removes the temp container — all in one line.

---

## 🔍 Verify the Created Image

```bash
docker images
docker run -d -p 8080:80 my-nginx-image
```

Open in browser: [http://localhost:8080](http://localhost:8080)
