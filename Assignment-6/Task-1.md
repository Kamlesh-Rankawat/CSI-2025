# 🚀 Kubernetes: ReplicationController, ReplicaSet, and Deployment

This repository demonstrates how to use **ReplicationController**, **ReplicaSet**, and **Deployment** in Kubernetes using PowerShell on Windows.

---

## 📘 Theory: What Are ReplicationController, ReplicaSet, and Deployment?

### 🔁 ReplicationController (RC)
- **Purpose**: Ensures that a specified number of pod replicas are always running.
- **Legacy Object**: Was the first mechanism in Kubernetes to handle replication.
- **Drawbacks**:
  - No support for **rolling updates**
  - No declarative updates
- ✅ Still works, but not recommended for modern use.

### 🔁 ReplicaSet (RS)
- **Purpose**: Replaces ReplicationController with **better selector support** and tighter integration with Deployments.
- **Key Features**:
  - Ensures that a specific number of pod replicas are running.
  - Supports **set-based selectors**
- 🔹 Typically managed **automatically** by Deployments.

### 📦 Deployment
- **Purpose**: The **recommended way** to manage stateless applications in Kubernetes.
- **Key Features**:
  - Supports **rolling updates**
  - Supports **rollbacks**
  - Automatically creates and manages **ReplicaSets**
  - Easy to **scale** up or down

---

## 📁 Files

| File Name                   | Description                                |
|----------------------------|--------------------------------------------|
| `replicationcontroller.yaml` | Defines a basic ReplicationController (legacy) |
| `replicaset.yaml`             | Defines a modern ReplicaSet                   |
| `deployment.yaml`             | Defines a Deployment with rolling updates     |

---

## ✅ What We’ll Learn

- How to create and manage:
  - ReplicationController  
  - ReplicaSet  
  - Deployment  
- How to scale a Deployment  
- How to perform rolling updates using `kubectl`  

---

## ⚙️ Prerequisites

- A Kubernetes cluster (Minikube, Docker Desktop, AKS, or GKE)
- `kubectl` installed and configured
- PowerShell (Windows Terminal or VS Code terminal)

---

## 📜 Create YAML Files using PowerShell

### 1️⃣ ReplicationController

```powershell
@"
apiVersion: v1
kind: ReplicationController
metadata:
  name: my-rc
spec:
  replicas: 2
  selector:
    app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: mycontainer
        image: nginx
        ports:
        - containerPort: 80
"@ | Out-File -Encoding utf8 replicationcontroller.yaml

```


## 2️⃣ ReplicaSet
```powershell
@"
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: my-rs
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: mycontainer
        image: nginx
        ports:
        - containerPort: 80
"@ | Out-File -Encoding utf8 replicaset.yaml

```


## 3️⃣ Deployment

```powershell
@"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: mycontainer
        image: nginx
        ports:
        - containerPort: 80
"@ | Out-File -Encoding utf8 deployment.yaml
```
## 🚀 Apply the Resources

```powershell
kubectl apply -f replicationcontroller.yaml
kubectl apply -f replicaset.yaml
kubectl apply -f deployment.yaml
```

## 🔍 Check Resource Status

```powershell
kubectl get all
kubectl describe rc my-rc
kubectl describe rs my-rs
kubectl describe deployment my-deployment
```

## 📈 Scale Deployment

```powershell
kubectl scale deployment my-deployment --replicas=3
```

## 🔄 Perform a Rolling Update

```powershell
kubectl set image deployment my-deployment mycontainer=nginx:1.25
kubectl rollout status deployment my-deployment
```

## 🧹 Clean Up Resources

```powershell
kubectl delete -f replicationcontroller.yaml
kubectl delete -f replicaset.yaml
kubectl delete -f deployment.yaml
```

## 📊 Feature Comparison Table

| Feature            | ReplicationController | ReplicaSet         | Deployment |
| ------------------ | --------------------- | ------------------ | ---------- |
| Supported          | ❌ Legacy              | ✅ Yes              | ✅ Yes      |
| Rolling Updates    | ❌ No                  | ❌ No               | ✅ Yes      |
| Declarative Update | ❌ No                  | ❌ No               | ✅ Yes      |
| Selector Support   | Basic                 | Advanced           | Advanced   |
| Recommended?       | ❌ No                  | ⚠️ Internally used | ✅ Yes      |


## Screenshot
<img width="1920" height="1020" alt="Screenshot 2025-07-13 110138" src="https://github.com/user-attachments/assets/036b85ff-b9b8-4b20-93a7-041f339c5fa8" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 110204" src="https://github.com/user-attachments/assets/fe1ab8a7-1701-48fa-abd0-7ce89cf40496" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 110215" src="https://github.com/user-attachments/assets/1ff4f54f-34f0-4ec3-87b6-ed40b9ef6f62" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 110224" src="https://github.com/user-attachments/assets/f4c597a2-44c3-492d-a333-29719069a30d" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 110232" src="https://github.com/user-attachments/assets/97ca6ebc-d1eb-4db0-8c4e-38bd05a2e3a7" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 110240" src="https://github.com/user-attachments/assets/8b62f889-90f9-4928-8b27-9e11e99fa2e4" />


