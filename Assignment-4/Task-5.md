
# 🚀 Push and Pull Docker Images: Docker Hub & Azure Container Registry (ACR)

This guide walks you through how to push and pull Docker images to:

- 🔹 Docker Hub
- 🔹 Azure Container Registry (ACR)

---

## 📦 Prerequisites

- Docker installed and running
- Docker Hub or Azure account
- A built Docker image (`my-nginx-image` used here)

---

## 🐳 Part 1: Docker Hub

### ✅ Step 1: Login to Docker Hub

```bash
docker login
```

Enter your Docker Hub username and password.

---

### ✅ Step 2: Tag the Image

**Format:**

```bash
docker tag <local-image-name> <dockerhub-username>/<repository-name>:<tag>
```

**Example:**

```bash
docker tag my-nginx-image kamleshrankawat/my-nginx:latest
```

---

### ✅ Step 3: Push the Image

```bash
docker push kamleshrankawat/my-nginx:latest
```

---

### ✅ Step 4: Pull the Image (on any machine)

```bash
docker pull kamleshrankawat/my-nginx:latest
```

---

## 🏢 Part 2: Azure Container Registry (ACR)

### ✅ Step 1: Login to Azure and Set Subscription

```bash
az login
az account set --subscription "<your-subscription-id>"
```

---

### ✅ Step 2: Create ACR (if not already created)

```bash
az acr create --resource-group <your-rg> --name <acr-name> --sku Basic
```

**Example:**

```bash
az acr create --resource-group myRG --name kamleshregistry --sku Basic
```

---

### ✅ Step 3: Login to ACR

```bash
az acr login --name kamleshregistry
```

---

### ✅ Step 4: Tag the Image

**Get the login server:**

```bash
az acr show --name kamleshregistry --query "loginServer" --output tsv
```

**Example:**

```bash
docker tag my-nginx-image kamleshregistry.azurecr.io/my-nginx:latest
```

---

### ✅ Step 5: Push the Image to ACR

```bash
docker push kamleshregistry.azurecr.io/my-nginx:latest
```

---

### ✅ Step 6: Pull from ACR

```bash
docker pull kamleshregistry.azurecr.io/my-nginx:latest
```

---

## 🔍 Verify

Check image on:

- Docker Hub: [https://hub.docker.com/repositories](https://hub.docker.com/repositories)
- Azure Portal → Container Registries → Your Registry → Repositories
