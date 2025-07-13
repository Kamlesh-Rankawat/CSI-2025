# 🚀 Kubernetes Volumes & Services Demo

This guide demonstrates how to use Kubernetes **PersistentVolume (PV)**, **PersistentVolumeClaim (PVC)**, and expose applications using **ClusterIP**, **NodePort**, and **LoadBalancer** service types on an AKS (Azure Kubernetes Service) cluster using PowerShell or terminal.

---

## 📁 Files Included

| File Name                   | Description                                 |
|----------------------------|---------------------------------------------|
| `pv.yaml`                  | Defines a PersistentVolume (PV)             |
| `pvc.yaml`                 | Defines a PersistentVolumeClaim (PVC)       |
| `pod-with-pvc.yaml`        | Pod using PVC for persistent storage        |
| `app.yaml`                 | Pod running nginx (used in Services demo)   |
| `clusterip-service.yaml`   | ClusterIP service (internal access only)    |
| `nodeport-service.yaml`    | NodePort service (external via node port)   |
| `loadbalancer-service.yaml`| LoadBalancer service (external IP)          |

---

## ✅ What You’ll Learn

- How to create and use PV and PVC
- Bind PVC to a Pod to persist data
- Expose Pods using:
  - ClusterIP
  - NodePort
  - LoadBalancer
- Test application via external IP or curl

---

## ⚙️ Prerequisites

- Kubernetes cluster (AKS, Minikube, Docker Desktop)
- `kubectl` installed and configured
- PowerShell or any terminal

---

## 📝 YAML Definitions

### 🔹 1. PersistentVolume (pv.yaml)

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: "/mnt/data"
```

---

### 🔹 2. PersistentVolumeClaim (pvc.yaml)

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

---

### 🔹 3. Pod using PVC (pod-with-pvc.yaml)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-using-pvc
spec:
  containers:
    - name: app
      image: nginx
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: storage
  volumes:
    - name: storage
      persistentVolumeClaim:
        claimName: my-pvc
```

---

### 🔹 4. Nginx Pod (app.yaml)

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

---

### 🔹 5. ClusterIP Service (clusterip-service.yaml)

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

---

### 🔹 6. NodePort Service (nodeport-service.yaml)

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

---

### 🔹 7. LoadBalancer Service (loadbalancer-service.yaml)

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

---

## 🚀 Apply Resources

```bash
kubectl apply -f pv.yaml
kubectl apply -f pvc.yaml
kubectl apply -f pod-with-pvc.yaml

kubectl apply -f app.yaml
kubectl apply -f clusterip-service.yaml
kubectl apply -f nodeport-service.yaml
kubectl apply -f loadbalancer-service.yaml
```

---

## 🔍 Check Status

```bash
kubectl get pv
kubectl get pvc
kubectl get pods
kubectl get svc
```

---

## 🔄 Test Pod Volume (Inside PVC Pod)

```bash
kubectl exec -it pod-using-pvc -- /bin/sh
cd /usr/share/nginx/html
echo "Hello from PVC" > index.html
cat index.html
```

---

## 🌐 Test Services

- **ClusterIP**: Only accessible inside the cluster
- **NodePort**: Accessible at `http://<nodeIP>:30080`
- **LoadBalancer**: Accessible at the assigned external IP

```bash
kubectl get svc myapp-loadbalancer
curl http://<EXTERNAL-IP>
```

---

## 🧹 Cleanup

```bash
kubectl delete -f loadbalancer-service.yaml
kubectl delete -f nodeport-service.yaml
kubectl delete -f clusterip-service.yaml
kubectl delete -f app.yaml

kubectl delete -f pod-with-pvc.yaml
kubectl delete -f pvc.yaml
kubectl delete -f pv.yaml
```

