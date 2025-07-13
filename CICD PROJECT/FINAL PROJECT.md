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



