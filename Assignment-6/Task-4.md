# ☸️ Managing Kubernetes with Azure Kubernetes Service (AKS)

This guide provides step-by-step instructions to create, manage, scale, and upgrade Kubernetes clusters using **Azure Kubernetes Service (AKS)**. It also demonstrates how to configure **Liveness** and **Readiness Probes** in an AKS Pod.

---

## 📌 Table of Contents

- [⚙️ Prerequisites](#♻%ef%b8%8f-prerequisites)
- [🚀 Create an AKS Cluster](#-create-an-aks-cluster)
- [📈 Scale the AKS Cluster](#-scale-the-aks-cluster)
- [🆙 Upgrade the AKS Cluster](#-upgrade-the-aks-cluster)
- [💉 Configure Liveness and Readiness Probes](#-configure-liveness-and-readiness-probes)
- [🧹 Delete the AKS Cluster](#-delete-the-aks-cluster)
- [👨‍💻 Author](#-author)

---

## ⚙️ Prerequisites

- Azure CLI installed: [Install Guide](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
- Azure subscription
- Login to Azure:

```bash
az login
```

- Install AKS CLI extension:

```bash
az extension add --name aks-preview
az extension update --name aks-preview
```

---

## 🚀 Create an AKS Cluster

```bash
# Create a resource group
az group create --name myResourceGroup --location eastus

# Create AKS cluster
az aks create \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --node-count 2 \
  --enable-addons monitoring \
  --generate-ssh-keys
```

---

## 📈 Scale the AKS Cluster

```bash
az aks scale \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --node-count 4
```

---

## 🆙 Upgrade the AKS Cluster

### Check Available Versions:

```bash
az aks get-upgrades \
  --resource-group myResourceGroup \
  --name myAKSCluster
```

### Upgrade Cluster:

```bash
az aks upgrade \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --kubernetes-version <NEW_VERSION> \
  --yes
```

---

## 💉 Configure Liveness and Readiness Probes

### `nginx-pod-with-probes.yaml`

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
    livenessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 10
      periodSeconds: 5
    readinessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 3
```

### Apply It:

```bash
kubectl apply -f nginx-pod-with-probes.yaml
```

### Verify:

```bash
kubectl describe pod nginx-pod
```

---

## 🧹 Delete the AKS Cluster

```bash
az aks delete \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --yes --no-wait
```

---

