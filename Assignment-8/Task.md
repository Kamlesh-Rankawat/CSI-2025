

---

## 🎯 Objective

To implement and automate core DevOps practices using Azure DevOps CLI for consistent, secure, and scalable software delivery.

---

## 📚 Key Concepts Explained

### 1. Work Items, Queries & Dashboards

Azure Boards help manage tasks, bugs, and sprints. Queries allow filtering relevant work items (e.g., assigned tasks). Dashboards provide visual insights with widgets like charts, burndown, and task status.

### 2. Pipeline Variables

Variables enable dynamic pipeline behavior (e.g., switching between Dev and Prod environments). They're reusable and reduce hardcoded values.

### 3. Variable & Task Groups

Variable groups centralize environment configurations across multiple pipelines. Task groups encapsulate repeatable build or deployment steps.

### 4. Service Connections

Service connections authorize Azure DevOps to access external systems like Azure subscriptions, Docker registries, or GitHub.

### 5. Self-Hosted Agents

Used to run jobs on private machines with custom tools/configurations, reducing build time and offering more control over execution.

### 6. Deployment Approvals

Pre- and post-deployment gates ensure critical releases are reviewed before proceeding to or from production environments.

### 7. CI/CD Pipelines (ACR → AKS, ACI, App Service, VM)

* **ACR (Azure Container Registry)**: Stores Docker images.
* **AKS (Azure Kubernetes Service)**: Orchestrates container deployment.
* **ACI (Azure Container Instances)**: Quick container hosting.
* **App Service**: PaaS for .NET/web apps.
* **VM**: Full control for traditional deployment setups.

---

## 🧪 CLI Automation Scripts

### 📊 Configure Work Item Query (Assigned to me)

```bash
az boards query --wiql "SELECT [System.Id], [System.Title] FROM WorkItems WHERE [System.AssignedTo] = @Me AND [System.State] <> 'Closed'" \
  --org https://dev.azure.com/<org> \
  --project <project>
```

---

### 🧩 Define Pipeline Variables

```yaml
variables:
  environment: 'Dev'
  buildConfiguration: 'Release'
```

Create pipeline:

```bash
az pipelines create \
  --name "MyPipeline" \
  --repository <repo-name> \
  --branch main \
  --yml-path azure-pipelines.yml \
  --org https://dev.azure.com/<org> \
  --project <project>
```

---

### 📦 Create Variable Group

```bash
az pipelines variable-group create \
  --name "MyVarGroup" \
  --variables env=prod region=eastus \
  --authorize true \
  --project <project> \
  --org https://dev.azure.com/<org>
```

Reference in YAML:

```yaml
variables:
  - group: MyVarGroup
```

---

### 🔗 Create Azure Resource Manager Service Connection

```bash
az devops service-endpoint azurerm create \
  --name "AzureSC" \
  --azure-rm-service-principal-id <appId> \
  --azure-rm-subscription-id <subId> \
  --azure-rm-subscription-name <subName> \
  --azure-rm-tenant-id <tenantId> \
  --project <project> \
  --org https://dev.azure.com/<org>
```

---

### 🖥️ Create Self-Hosted Agent (Linux)

```bash
az pipelines pool create --name "SelfHostedPool" --project <project>

wget https://vstsagentpackage.azureedge.net/agent/3.236.0/vsts-agent-linux-x64-3.236.0.tar.gz
tar zxvf vsts-agent-linux-x64-3.236.0.tar.gz
cd vsts-agent-linux-x64-3.236.0

./config.sh --unattended \
  --url https://dev.azure.com/<org> \
  --auth pat \
  --token <yourPAT> \
  --pool SelfHostedPool \
  --agent "$(hostname)"

sudo ./svc.sh install
sudo ./svc.sh start
```

---

### ✅ Configure Pre/Post-Deployment Approvers (YAML)

```yaml
environments:
- environment: Dev
  checks:
    - approval:
        approvals:
          - reviewers:
              - id: '<user-object-id>'
```

---

### 🐳 CI/CD: Build & Push Docker to ACR, Deploy to AKS

```yaml
trigger:
- main

variables:
  imageName: 'myapp'

stages:
- stage: Build
  jobs:
  - job: DockerBuild
    pool:
      vmImage: 'ubuntu-latest'
    steps:
    - task: Docker@2
      inputs:
        containerRegistry: 'ACR-Service-Connection'
        repository: '$(imageName)'
        command: 'buildAndPush'
        Dockerfile: '**/Dockerfile'
        tags: 'latest'

- stage: Deploy
  jobs:
  - job: DeployToAKS
    steps:
    - task: AzureCLI@2
      inputs:
        azureSubscription: 'AzureSC'
        scriptType: 'bash'
        scriptLocation: 'inlineScript'
        inlineScript: |
          az aks get-credentials --resource-group <rg> --name <aks-cluster>
          kubectl apply -f k8s/deployment.yaml
```

---

### 🐋 CI/CD: Deploy Docker Image to Azure Container Instance

```bash
az acr build --registry <acr-name> --image myimage:v1 .

az container create \
  --resource-group <rg> \
  --name mycontainer \
  --image <acr-name>.azurecr.io/myimage:v1 \
  --registry-login-server <acr-name>.azurecr.io \
  --ip-address Public \
  --dns-name-label myapp-dns
```

---

### 🌐 CI/CD: .NET App Deployment to Azure App Service

```yaml
trigger:
- main

pool:
  vmImage: 'windows-latest'

steps:
- task: UseDotNet@2
  inputs:
    version: '6.x'

- task: DotNetCoreCLI@2
  inputs:
    command: 'publish'
    arguments: '--configuration Release --output $(Build.ArtifactStagingDirectory)'

- task: AzureWebApp@1
  inputs:
    azureSubscription: 'AzureSC'
    appType: 'webApp'
    appName: 'my-dotnet-app'
    package: '$(Build.ArtifactStagingDirectory)/**/*.zip'
```

---

### ⚛️ CI/CD: React App Deployment to Azure VM

```bash
npm install
npm run build

az ssh vm --ip <vm-ip> -- -t "mkdir -p /var/www/html"
scp -r ./build/* azureuser@<vm-ip>:/var/www/html
```

---

## 🧠 Final Notes

### Tools Required

* [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
* Azure DevOps CLI extension:

```bash
az extension add --name azure-devops
az devops login
az devops configure --defaults organization=https://dev.azure.com/<org> project=<project>
```

### Benefits of CLI-based DevOps Automation

* Reproducible and scalable deployment
* Improved security and environment control
* No reliance on UI – everything is scriptable and automatable
* Full CI/CD lifecycle using containers, microservices, and VMs

---

> ✅ This uses Azure CLI to manage the entire lifecycle of DevOps tasks, ensuring consistency, portability, and team collaboration.
