# 🐳 Week 2 – Azure Compute: Task 4

## 📌 Task: Deploy Docker App using Azure Container Instance & Container Groups

## 🎯 Objective
Deploy a Docker-based web application using **Azure Container Instance (ACI)** and test a multi-container setup using **Container Groups**.

---

## ☁️ Step 1: Create a Resource Group

```bash
az group create --name MyResourceGroup --location eastus
```

This command creates a logical group to manage all related Azure resources.

---

## 🐳 Step 2: Deploy a Simple Docker Application on ACI

```bash
az container create `
  --resource-group MyResourceGroup `
  --name mycontainer `
  --image mcr.microsoft.com/azuredocs/aci-helloworld `
  --cpu 1 `
  --memory 1 `
  --ports 80 `
  --dns-name-label mycontainerdemo123456 `
  --location eastus `
  --os-type Linux
```

> Replace `mycontainerdemo123456` with a unique DNS label.

### ✅ Verify Deployment
```bash
az container show --resource-group MyResourceGroup --name mycontainer --query ipAddress.fqdn --output tsv
```

Copy the output FQDN and open it in a browser to test the app.

---

## 📦 Step 3: Create a Container Group (Multi-Container)

A **container group** allows you to run multiple containers on the same host and network.

### ✍️ Create `containergroup.yaml`

```yaml
apiVersion: 2019-12-01
location: eastus
name: mycontainergroup
properties:
  containers:
  - name: web
    properties:
      image: nginx
      ports:
      - port: 80
      resources:
        requests:
          cpu: 1
          memoryInGb: 1.5
  - name: backend
    properties:
      image: mcr.microsoft.com/azuredocs/aci-helloworld
      ports:
      - port: 5000
      resources:
        requests:
          cpu: 1
          memoryInGb: 1
  osType: Linux
  ipAddress:
    type: Public
    ports:
    - protocol: tcp
      port: 80
    - protocol: tcp
      port: 5000
```

### 🚀 Deploy Container Group

```bash
az container create --resource-group MyResourceGroup --file containergroup.yaml
```

### 🔍 Test the Application

```bash
az container show --resource-group MyResourceGroup --name mycontainergroup --query ipAddress.fqdn --output tsv
```

Test in browser:
- `http://<FQDN>:80` for NGINX
- `http://<FQDN>:5000` for Hello World app

---

## 🧹 Step 4: Clean Up (Optional)

```bash
az group delete --name MyResourceGroup --yes --no-wait
```

---

## 📚 Summary

- ACI helps deploy containers without managing VMs.
- Used `az container create` with a public Docker image.
- Created a YAML config for deploying a multi-container group.
- Verified apps via FQDN on port 80 and 5000.

---

## 🔧 Tools & Technologies Used

- Azure CLI
- Azure Container Instance (ACI)
- Docker
- YAML
- PowerShell/Terminal

---

## 👨‍💻 Submitted by

**Kamlesh Rankawat**  
B.Tech Final Year | DevOps Specialization  
📧 rankawatkamlesh02022006@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/kamlesh-rankawat-73b698361)

---

## 📸 Screenshots of Practical Execution

> Save your screenshots in the `screenshots/` folder and reference them as shown below.

### ✅ Azure CLI – Resource Group Created
![Screenshot 2025-06-15 173418](https://github.com/user-attachments/assets/81adb2cd-7cc9-4c51-91db-6f896ed4b21f)


### ✅ Container Deployed Successfully
![Screenshot 2025-06-15 174936](https://github.com/user-attachments/assets/76090ffb-b952-4638-add1-4ea2fb5a56eb)
![Screenshot 2025-06-15 175004](https://github.com/user-attachments/assets/7285fb45-ce3c-46e3-a340-460f4c1fa968)


### ✅ Container Group Verified in Browser
![Screenshot 2025-06-15 174237](https://github.com/user-attachments/assets/48077c99-b165-4be3-bbee-863d3fc2d0fa)

