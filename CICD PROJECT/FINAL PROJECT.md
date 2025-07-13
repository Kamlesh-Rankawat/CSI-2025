# 🚀 Project: Azure DevOps CI/CD for Spring Boot App on ACI
## 🔹 1. Login to Azure
```bash
az login
```
## 🔹 2. Create Resource Group
```bash
az group create --name my-rg --location centralindia
```
## 🔹 3. Create Azure Container Registry (ACR)
```bash
az acr create --resource-group my-rg --name myacrkamlesh --sku Basic --admin-enabled true
```
## 🔹 4. Login to ACR
```bash
az acr login --name myacrkamlesh
```
## 🔹 5. Spring Boot Application Code
 ' DemoApplication.java '
```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "✅ Spring Boot App Running on Azure Container Instance!";
    }
}
```
## 🔹 6. Build with Maven
```bash
mvn clean package
```
Output: ' target/springboot-aci-0.0.1-SNAPSHOT.jar '

## 🔹 7. Dockerfile
```Dockerfile
FROM openjdk:17-jdk-alpine
COPY target/springboot-aci-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```
## 🔹 8. Build Docker Image
```bash
docker build -t myacrkamlesh.azurecr.io/springboot-aci:latest .
```
## 🔹 9. Push Docker Image to ACR
```bash
docker push myacrkamlesh.azurecr.io/springboot-aci:latest
```
## 🔹 10. Deploy to Azure Container Instance (ACI)
```bash
az container create \
  --resource-group my-rg \
  --name springbootaciapp \
  --image myacrkamlesh.azurecr.io/springboot-aci:latest \
  --registry-login-server myacrkamlesh.azurecr.io \
  --registry-username $(az acr credential show --name myacrkamlesh --query username -o tsv) \
  --registry-password $(az acr credential show --name myacrkamlesh --query passwords[0].value -o tsv) \
  --dns-name-label kamleshaci123 \
  --ports 8080 \
  --cpu 1 \
  --memory 1.5 \
  --location centralindia \
  --os-type Linux
```
##🔹 11. Access the App
```bash
curl http://kamleshaci123.centralindia.azurecontainer.io:8080/
```
✅ Output:
```csharp
✅ Spring Boot App Running on Azure Container Instance!
```
## 🔹 12. Azure DevOps CI/CD Pipeline Setup
➤ 'azure-pipelines.yml'
```yaml
trigger:
- main

variables:
  imageName: 'springboot-aci'

stages:
- stage: Build
  jobs:
  - job: Build
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - task: Maven@3
      inputs:
        mavenPomFile: 'pom.xml'
        goals: 'package'
        javaHomeOption: 'JDKVersion'
        jdkVersionOption: '17'
        publishJUnitResults: false

    - task: CopyFiles@2
      inputs:
        contents: 'target/*.jar'
        targetFolder: '$(Build.ArtifactStagingDirectory)'

    - task: PublishBuildArtifacts@1
      inputs:
        pathtoPublish: '$(Build.ArtifactStagingDirectory)'
        artifactName: 'drop'

- stage: DockerBuildPush
  jobs:
  - job: Docker
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - task: Docker@2
      inputs:
        containerRegistry: 'myacrkamlesh-connection'
        repository: 'springboot-aci'
        command: 'buildAndPush'
        Dockerfile: '**/Dockerfile'
        tags: 'latest'

- stage: DeployToACI
  jobs:
  - job: Deploy
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - task: AzureCLI@2
      inputs:
        azureSubscription: 'myAzureConnection'
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          az container create \
            --resource-group my-rg \
            --name springbootaciapp \
            --image myacrkamlesh.azurecr.io/springboot-aci:latest \
            --dns-name-label kamleshaci123 \
            --ports 8080 \
            --cpu 1 \
            --memory 1.5 \
            --location centralindia \
            --registry-login-server myacrkamlesh.azurecr.io \
            --registry-username $(az acr credential show --name myacrkamlesh --query username -o tsv) \
            --registry-password $(az acr credential show --name myacrkamlesh --query passwords[0].value -o tsv) \
            --os-type Linux
```
##  ✅ Final Result
* Java Spring Boot app containerized ✅

* Docker image pushed to ACR ✅

* Deployed to Azure Container Instances ✅

* CI/CD pipeline using Azure DevOps completed ✅


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
