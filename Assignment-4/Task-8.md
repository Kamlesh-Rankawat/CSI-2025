# 🧱 Docker Compose & 🔐 Docker Security Best Practices

This covers:

- 🧱 Using Docker Compose for multi-container applications
- 🔐 Security best practices when working with Docker

---

## 🧱 Part 1: Docker Compose for Multi-Container Applications

Docker Compose helps define and run multiple containers using a single YAML file.

### ✅ Step 1: Create Project Structure

```bash
myapp/
├── docker-compose.yml
├── web/
│   ├── Dockerfile
│   └── index.html
├── db/
```

### ✅ Step 2: Sample docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: ./web
    ports:
      - "8080:80"
    volumes:
      - ./web:/usr/share/nginx/html
    depends_on:
      - db

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appdb
```

### ✅ Step 3: Sample Web Dockerfile

```Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
```

### ✅ Step 4: Run Multi-Container App

```bash
docker-compose up --build
```

### ✅ Step 5: Tear Down

```bash
docker-compose down
```

---

## 🔐 Part 2: Docker Security Best Practices

### 🔒 1. Use Official Images

Prefer verified and minimal images like `alpine` or trusted base images.

```Dockerfile
FROM python:3.11-alpine
```

---

### 🔒 2. Run as Non-Root User

Avoid running processes as `root` inside the container.

```Dockerfile
RUN adduser --disabled-password appuser
USER appuser
```

---

### 🔒 3. Use `.dockerignore`

Prevent sensitive files from being copied into the image.

```txt
.git
*.env
Dockerfile
__pycache__/
```

---

### 🔒 4. Limit Container Capabilities

```bash
docker run --cap-drop all --cap-add NET_BIND_SERVICE my-image
```

---

### 🔒 5. Use Secrets Management

Avoid hardcoding credentials in environment variables. Use secret tools like:

- Docker Secrets (Swarm)
- AWS Secrets Manager
- Azure Key Vault

---

### 🔒 6. Regular Image Scanning

Scan images using tools:

```bash
docker scan my-image
```

Or use third-party scanners:

- Snyk
- Trivy
- Clair

---

## 📚 Resources

- 🎥 [Docker Compose YouTube](https://www.youtube.com/watch?v=HG6yIjZapSA)
- 📘 [Docker Curriculum](https://docker-curriculum.com/)
- 📘 [Docker Docs - Compose](https://docs.docker.com/compose/)
- 📘 [Docker Docs - Security](https://docs.docker.com/security/)

---

