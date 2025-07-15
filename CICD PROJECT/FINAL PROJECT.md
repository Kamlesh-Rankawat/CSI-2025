# 🚀 Final Project Submission

## Azure DevOps CI/CD Pipeline for Spring Boot Application on Azure Container Instances (ACI)

### 👨‍💼 Developed by: **Kamlesh Rankawat**

### 🧪 Domain: DevOps | ☕️ Platform: Azure | ⚙️ Tools: Spring Boot, Docker, ACR, ACI, Azure DevOps

---

## 📘 Project Overview

This project demonstrates a complete **CI/CD pipeline using Azure DevOps** to build, containerize, and deploy a **Java Spring Boot application** on **Azure Container Instances (ACI)** via **Azure Container Registry (ACR)**. It automates the entire workflow from source code push to live deployment, showcasing modern DevOps principles and cloud-native deployment practices.

---

## ⚙️ Tech Stack

| Layer            | Technology Used                 |
| ---------------- | ------------------------------- |
| Programming      | Java with Spring Boot           |
| Build Tool       | Maven                           |
| Containerization | Docker                          |
| Registry         | Azure Container Registry (ACR)  |
| Deployment       | Azure Container Instances (ACI) |
| CI/CD Automation | Azure DevOps Pipelines          |
| CLI Tool         | Azure CLI                       |

---

## 📂 Project Structure

```
springboot-aci-project/
├── src/main/java/com/example/demo/DemoApplication.java
├── Dockerfile
├── pom.xml
├── azure-pipelines.yml
└── target/springboot-aci-0.0.1-SNAPSHOT.jar
```

---

## 🧠 Step-by-Step Workflow with Theoretical Explanation

### 🔹 1. Login to Azure

```bash
az login
```

**Why?**
Establishes a secure CLI session with Azure so you can provision and manage cloud resources.

---

### 🔹 2. Create a Resource Group

```bash
az group create --name my-rg --location centralindia
```

**Why?**
Resource groups in Azure help logically organize and manage related resources like containers, registries, and networking.

---

### 🔹 3. Set up Azure Container Registry (ACR)

```bash
az acr create --resource-group my-rg --name myacrkamlesh --sku Basic --admin-enabled true
```

**Why?**
ACR is a private container registry used to store and serve Docker images securely inside the Azure ecosystem.

---

### 🔹 4. Login to ACR

```bash
az acr login --name myacrkamlesh
```

**Why?**
Authenticates the Docker CLI with ACR to allow pushing and pulling images programmatically or manually.

---

### 🔹 5. Spring Boot Application Code

```java
@GetMapping("/")
public String home() {
    return "✅ Spring Boot App Running on Azure Container Instance!";
}
```

**Why?**
A simple REST endpoint built with Spring Boot that verifies successful container deployment.

---

### 🔹 6. Build the App with Maven

```bash
mvn clean package
```

**Why?**
Packages the Java application into a `.jar` file, which will be the base of the Docker container.

---

### 🔹 7. Dockerize the Application

**Dockerfile:**

```dockerfile
FROM openjdk:17-jdk-alpine
COPY target/springboot-aci-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

**Why?**
Defines how to build the image and run the app inside a lightweight Java container using OpenJDK 17.

---

### 🔹 8. Build Docker Image

```bash
docker build -t myacrkamlesh.azurecr.io/springboot-aci:latest .
```

**Why?**
Converts the application into a Docker image tagged with the ACR URL.

---

### 🔹 9. Push Image to Azure Container Registry

```bash
docker push myacrkamlesh.azurecr.io/springboot-aci:latest
```

**Why?**
Publishes the image to ACR for secure and scalable deployment on Azure infrastructure.

---

### 🔹 10. Deploy to Azure Container Instance

```bash
az container create \
  --resource-group my-rg \
  --name springbootaciapp \
  --image myacrkamlesh.azurecr.io/springboot-aci:latest \
  --registry-login-server myacrkamlesh.azurecr.io \
  --registry-username <USERNAME> \
  --registry-password <PASSWORD> \
  --dns-name-label kamleshaci123 \
  --ports 8080 \
  --cpu 1 \
  --memory 1.5 \
  --location centralindia \
  --os-type Linux
```

**Why?**
Creates a serverless container instance in Azure that runs your app. You only pay for CPU/RAM used — no VM management required.

---

### 🔹 11. Verify the Application

```bash
curl http://kamleshaci123.centralindia.azurecontainer.io:8080/
```

**✅ Output:**

```
✅ Spring Boot App Running on Azure Container Instance!
```

**Why?**
Validates that the app is running and accessible over the public internet.

---

### 🔹 12. Configure Azure DevOps CI/CD

**azure-pipelines.yml (Summary):**

```yaml
trigger:
- main

stages:
- stage: Build
  jobs:
  - job: Build
    steps:
    - task: Maven@3
      inputs:
        goals: 'package'

- stage: DockerBuildPush
  jobs:
  - job: Docker
    steps:
    - task: Docker@2
      inputs:
        containerRegistry: 'myacrkamlesh-connection'
        repository: 'springboot-aci'
        command: 'buildAndPush'

- stage: DeployToACI
  jobs:
  - job: Deploy
    steps:
    - task: AzureCLI@2
      inputs:
        inlineScript: |
          az container create ...
```

**Why?**
The pipeline automates:

* ✅ Build (Maven)
* ✅ Docker Image Creation & Push to ACR
* ✅ Deployment to ACI using Azure CLI

---

## ✅ Project Summary

| Objective                               | Status |
| --------------------------------------- | ------ |
| Spring Boot App Created                 | ✅      |
| Docker Image Built and Pushed to ACR    | ✅      |
| Deployed to Azure Container Instance    | ✅      |
| Azure DevOps CI/CD Pipeline Implemented | ✅      |
| Application Accessible via Public URL   | ✅      |

---

## 🌐 Live Demo

```
http://kamleshaci123.centralindia.azurecontainer.io:8080/
```

---

## 🏁 Conclusion

This project successfully demonstrates end-to-end DevOps automation using Microsoft Azure and Azure DevOps for Java-based microservices. It follows real-world cloud-native deployment patterns and shows hands-on expertise in CI/CD, Docker, and Infrastructure-as-Code.

##  ✅ Final Checklist Before Screenshot
| Step                 | Verification                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 🧩 **App Running**   | Visit `http://kamleshaci123.centralindia.azurecontainer.io:8080/` in browser — check for ✅ message                        |
| 🐳 **Image in ACR**  | Run `az acr repository list --name myacrkamlesh` and confirm `springboot-aci` is listed                                   |
| 📦 **ACI Status**    | Run `az container show --name springbootaciapp --resource-group my-rg --query instanceView.state` → should be `"Running"` |
| 🔁 **CI/CD Success** | Azure DevOps Pipeline should show green check marks for all 3 stages: `Build`, `DockerBuildPush`, `DeployToACI`           |
| 🧪 **App Test**      | `curl http://kamleshaci123.centralindia.azurecontainer.io:8080/` → Should return the ✅ success string                     |


## Screensort


<img width="1483" height="762" alt="Screenshot 2025-07-13 233641" src="https://github.com/user-attachments/assets/462ab457-d984-4cb3-916a-c0c67ea1a3eb" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233946" src="https://github.com/user-attachments/assets/c8981ed0-2ad9-4d59-b9d4-524b7775099c" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 234116" src="https://github.com/user-attachments/assets/4226b526-65a9-4b21-8dce-207206fef225" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 234201" src="https://github.com/user-attachments/assets/200f782a-caba-41ad-9521-a7705168990a" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233102" src="https://github.com/user-attachments/assets/10d5ab6e-a4d7-4bb8-adb1-d4bd8086106b" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233116" src="https://github.com/user-attachments/assets/5608f008-7018-42b1-b094-e9befec5f53e" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233131" src="https://github.com/user-attachments/assets/e6470188-91a2-49fb-8a1a-0e7730007e9c" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233144" src="https://github.com/user-attachments/assets/5241e92b-7a62-4417-b53a-94a7d4061408" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233157" src="https://github.com/user-attachments/assets/1fd63993-fe3b-4ee6-9658-3bae59d95997" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233208" src="https://github.com/user-attachments/assets/69d10a9b-3142-4057-9a4b-5b4e98ff9070" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233220" src="https://github.com/user-attachments/assets/d7c1c7bd-5a21-4f64-8d22-0c9e32a22095" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233232" src="https://github.com/user-attachments/assets/e416114f-db7f-4699-8e7d-d44c5f9b535a" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233255" src="https://github.com/user-attachments/assets/fba8d95a-fb5f-4a22-ba57-67f0766c7f8a" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233307" src="https://github.com/user-attachments/assets/6b9dabf2-76d9-4c62-81d5-8f7cdb6f1614" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233318" src="https://github.com/user-attachments/assets/0c97271b-d966-476a-9289-f1f4a7661c40" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233328" src="https://github.com/user-attachments/assets/cade88c6-b418-4e73-b047-d850907753da" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233337" src="https://github.com/user-attachments/assets/5edf88a7-089d-4acb-85de-3cd138a42c20" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233346" src="https://github.com/user-attachments/assets/9e687d39-cb5d-4db1-89b4-ecf3332aeac0" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233358" src="https://github.com/user-attachments/assets/586cda70-e5fb-4c5f-bbdb-c141fa332ab9" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233411" src="https://github.com/user-attachments/assets/b8f5e32d-861e-4aa2-b3c3-483a6f79bf5e" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233424" src="https://github.com/user-attachments/assets/69b9159e-391e-4f53-affb-048b94fe7380" />

<img width="1483" height="762" alt="Screenshot 2025-07-13 233435" src="https://github.com/user-attachments/assets/190eeb10-c171-475b-b6fd-af61b374ebff" />

<img width="1920" height="1020" alt="Screenshot 2025-07-13 232842" src="https://github.com/user-attachments/assets/1eee0384-ae96-4a63-af14-9378563c00de" />
