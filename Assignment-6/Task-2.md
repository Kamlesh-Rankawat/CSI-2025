# 🚀 Kubernetes Services Demo: ClusterIP, NodePort & LoadBalancer

This project demonstrates how to deploy an Nginx pod and expose it using **ClusterIP**, **NodePort**, and **LoadBalancer** services on a Kubernetes cluster (AKS) using PowerShell on Windows.

---

## 📁 Files Included

| File Name                   | Description                             |
|----------------------------|-----------------------------------------|
| `app.yaml`                 | Defines a simple Pod running nginx      |
| `clusterip-service.yaml`   | Exposes Pod with ClusterIP (internal)   |
| `nodeport-service.yaml`    | Exposes Pod with NodePort (external)    |
| `loadbalancer-service.yaml`| Exposes Pod with LoadBalancer (public)  |

---

## ✅ What You'll Learn

- How to deploy a Pod on Kubernetes
- Expose the Pod using all 3 service types
- Access services using:
  - Internal IP (ClusterIP)
  - NodePort via exposed port
  - LoadBalancer with external IP
- Verify response using `curl` and browser

---

## ⚙️ Prerequisites

- A working Kubernetes cluster (AKS, Minikube, etc.)
- `kubectl` configured and working
- PowerShell or any terminal on Windows

---

## 📝 Step-by-Step YAML Files

### 1️⃣ Pod Definition (`app.yaml`)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
    - name: myapp-container
      image: nginx
      ports:
        - containerPort: 80
```

### 2️⃣ ClusterIP Service (clusterip-service.yaml)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-clusterip
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

### 3️⃣ NodePort Service (nodeport-service.yaml)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-nodeport
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
  type: NodePort
```

### 4️⃣ LoadBalancer Service (loadbalancer-service.yaml)

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-loadbalancer
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 80
  type: LoadBalancer
```

### 🚀 Deploy and Apply YAMLs

```yaml
kubectl apply -f app.yaml
kubectl apply -f clusterip-service.yaml
kubectl apply -f nodeport-service.yaml
kubectl apply -f loadbalancer-service.yaml
```

### 🔍 Check Services

```powershell
kubectl get svc
```

Sample output:
```nginx
NAME                 TYPE           CLUSTER-IP     EXTERNAL-IP     PORT(S)        AGE
myapp-clusterip      ClusterIP      10.0.124.15    <none>          80/TCP         30s
myapp-nodeport       NodePort       10.0.99.116    <none>          80:30080/TCP   30s
myapp-loadbalancer   LoadBalancer   10.0.201.148   4.224.149.184   80:32307/TCP   30s
```

### 🌐 Access and Test Services
#### ✅ Test LoadBalancer (Public IP)
Open the public IP in your browser:

📎 http://4.224.149.184

You should see the "Welcome to nginx!" page.

## ✅ Use Curl to Test

```powershell
curl http://4.224.149.184
```

Expected result:
```
StatusCode        : 200
StatusDescription : OK
Content           : <!DOCTYPE html><html>... Welcome to nginx! ...
```

## 🧹 Clean Up All Resources

```powershell

kubectl delete -f app.yaml
kubectl delete -f clusterip-service.yaml
kubectl delete -f nodeport-service.yaml
kubectl delete -f loadbalancer-service.yaml
```

## Screensort

<img width="1920" height="1020" alt="Screenshot 2025-07-13 112335" src="https://github.com/user-attachments/assets/cbb8f63c-f43c-47b2-abbc-41b7bf3ba999" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 112346" src="https://github.com/user-attachments/assets/05bdbcd8-41a2-4b9e-b6e5-6a616dfad6f8" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 112356" src="https://github.com/user-attachments/assets/c4fbebb0-e872-4457-a899-182ad4da6ac8" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 112405" src="https://github.com/user-attachments/assets/6c2f8d5f-75fe-4370-8c7b-ec5565f2df71" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 114224" src="https://github.com/user-attachments/assets/e6c91514-7228-4c27-a7ec-255917e53e6a" />
