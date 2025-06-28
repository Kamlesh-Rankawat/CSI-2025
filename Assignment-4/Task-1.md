# 📦 Introduction to Containerization

## ✅ What is Containerization?
Containerization is a lightweight form of virtualization that packages an application and its dependencies (libraries, configuration files, binaries) into a single unit called a **container**.

> This ensures consistent execution across environments—solving the “It works on my machine” problem.

---

## 🆚 Containers vs Virtual Machines

| Feature         | Virtual Machine (VM)      | Container                   |
|----------------|---------------------------|-----------------------------|
| **Size**        | GBs (large)               | MBs (lightweight)           |
| **Boot Time**   | Minutes                   | Seconds                     |
| **Resource Usage** | High (has full OS)     | Low (shares host OS kernel) |
| **Isolation**   | Complete (hypervisor level) | Process-level (namespaces) |

---

## 🐳 Docker Fundamentals

### 🧱 What is Docker?
Docker is the most popular containerization platform. It allows you to:
- Package an app into a Docker **image**
- Run that image as a **container**
- Manage containers easily (build, run, stop, delete, etc.)

---

### 🧩 Key Concepts in Docker

| Concept     | Description                                                |
|-------------|------------------------------------------------------------|
| **Image**     | A read-only template used to create containers (e.g., Ubuntu, Nginx) |
| **Container** | A running instance of an image                          |
| **Dockerfile**| A script with instructions to build a Docker image      |
| **Docker Hub**| Public registry of Docker images (like GitHub for code) |
| **Volumes**   | Persist and share data between containers               |
| **Ports**     | Map container’s internal ports to host machine’s ports  |

---

## ⚙️ Basic Docker Commands

### 🔧 Docker Setup
```bash
docker --version             # Check installed Docker version
docker info                  # View system-wide information
```
![Screenshot 2025-06-28 111203](https://github.com/user-attachments/assets/e1a59262-1ae6-49c7-a0ca-5a96dbe1bd1d)

---

### 📥 Images
```bash
docker pull ubuntu           # Download image from Docker Hub
docker images                # List downloaded images
docker rmi ubuntu            # Remove an image
```
![Screenshot 2025-06-28 111720](https://github.com/user-attachments/assets/3425370d-e62f-46d7-8bdd-cf1943c99c5b)

---

### 🏃‍♂️ Containers
```bash
docker run ubuntu                    # Run a container from 'ubuntu' image
docker run -it ubuntu bash          # Run interactively and get bash shell
docker ps                           # List running containers
docker ps -a                        # List all containers (including stopped)
docker stop <container_id>          # Stop a running container
docker start <container_id>         # Start a stopped container
docker rm <container_id>            # Remove a container
```
![Screenshot 2025-06-28 114223](https://github.com/user-attachments/assets/8367fc18-6c43-4532-b26f-57c17033d3d2)

---

### 🏗️ Building an Image

**Dockerfile example:**
```dockerfile
FROM ubuntu
RUN apt update && apt install -y nginx
CMD ["nginx", "-g", "daemon off;"]
```


```bash
docker build -t my-nginx .          # Build image from Dockerfile in current directory
```

---

### 📦 Volumes and Ports
```bash
docker run -d -p 8080:80 nginx                  # Map port 80 in container to 8080 on host
docker run -v /host/data:/container/data ubuntu # Mount volume between host and container
```
![Screenshot 2025-06-28 115822](https://github.com/user-attachments/assets/314d95f3-b347-499d-aab5-4798fac97034)

![Screenshot 2025-06-28 120057](https://github.com/user-attachments/assets/71a67eb0-1f3b-4112-8d2d-0e90501e1025)

