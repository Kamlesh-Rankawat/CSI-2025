# 🐳 Docker Study Guide: From Basics to Best Practices

This covers the essential concepts and hands-on commands for working with Docker, including installation, container operations, image creation, networking, storage, security, and multi-container orchestration.

---

## 📌 Table of Contents

1. [Introduction to Docker & Basic Commands](#1-introduction-to-docker--basic-commands)
2. [Docker Installation & Build from Dockerfile](#2-docker-installation--build-from-dockerfile)
3. [Docker Registry & Multi-Stage Build](#3-docker-registry--multi-stage-build)
4. [Create Docker Images (Multiple Methods)](#4-create-docker-images-multiple-methods)
5. [Push & Pull Images (Docker Hub & ACR)](#5-push--pull-images-docker-hub--acr)
6. [Custom Docker Bridge Network](#6-custom-docker-bridge-network)
7. [Docker Volumes & Mounting](#7-docker-volumes--mounting)
8. [Docker Compose & Security Best Practices](#8-docker-compose--security-best-practices)

---

## 1. 📦 Introduction to Docker & Basic Commands

- Understand containerization vs virtualization
- Learn `docker ps`, `docker run`, `docker stop`, `docker images`, `docker exec`, etc.

🎥 [YouTube](https://www.youtube.com/watch?v=jPdIRX6q4jA)  
📘 [Docker Curriculum](https://docker-curriculum.com/)

---

## 2. 🔧 Docker Installation & Build from Dockerfile

- Install Docker on your OS
- Create and build Dockerfile

🎥 [YouTube](https://youtu.be/LQjaJINkQXY?si=5nHnY6Bf2O9DRS-H)  
📘 [Docker Curriculum](https://docker-curriculum.com/)

---

## 3. 📤 Docker Registry & Multi-Stage Build

- Push/pull from Docker Hub
- Use multi-stage builds for optimized images

🎥 [YouTube](https://youtu.be/VyO8MPIfHnE?si=jznsWRY8rzEqmGDZ)  
📘 [Docker Curriculum](https://docker-curriculum.com/)

---

## 4. 🛠️ Create Docker Images (Multiple Methods)

- Method 1: Dockerfile  
- Method 2: Running container + `docker commit`  
- Method 3: Multi-stage build  
- Method 4: PowerShell one-liner

🎥 [YouTube](https://www.youtube.com/watch?v=apGV9Kg7ics)  
📘 [Docker Curriculum](https://docker-curriculum.com/)

---

## 5. ☁️ Push & Pull Images (Docker Hub & ACR)

- `docker login`, `docker tag`, `docker push`, `docker pull`
- Azure CLI: `az acr create`, `az acr login`, `az acr show`

🎥 [YouTube](https://www.youtube.com/watch?v=b_euX_M82uI)  
📘 [Docker Curriculum](https://docker-curriculum.com/)

---

## 6. 🌐 Custom Docker Bridge Network

- Create a custom bridge: `docker network create`
- Connect containers using container names
- Inspect: `docker network inspect`

🎥 [YouTube](https://www.youtube.com/watch?v=c6Ord0GAOp8&pp=ygURZG9ja2VyIG5ldHdvcmtpbmc%3D)  
📘 [Docker Curriculum](https://docker-curriculum.com/)

---

## 7. 💾 Docker Volumes & Mounting

- `docker volume create`, `-v mydata:/data`
- Persistent storage across containers

🎥 [YouTube](https://www.youtube.com/watch?v=u_0O4DOo2GI&pp=ygUOZG9ja2VyIHN0b3JhZ2U%3D)  
📘 [Docker Curriculum](https://docker-curriculum.com/)

---

## 8. 🧱 Docker Compose & 🔐 Security Best Practices

### Docker Compose

- Define services in `docker-compose.yml`
- Run apps with `docker-compose up`, `down`, `logs`

🎥 [YouTube](https://www.youtube.com/watch?v=HG6yIjZapSA&pp=ygUNZG9ja2UgY29tcG9zZQ%3D%3D)

### Docker Security

- Use non-root users in containers
- Add `.dockerignore` file
- Drop unneeded Linux capabilities
- Scan images using `docker scan`, Snyk, or Trivy

📘 [Docker Curriculum](https://docker-curriculum.com/)

---

