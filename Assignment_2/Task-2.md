# ☁ Week 2 – Azure Compute: Task 2

## 📌 Task: Create an App Service Plan Provision a Web App in the existing App Service Plan and deploy a simple welcome page on it .
## 🎯 Objective

To understand and implement the deployment of a web application using Azure App Service Plan. In this task, I created a Linux-based *App Service Plan* and deployed a *Web App* using GitHub integration.

---

## 🧩 Step-by-Step Implementation

### Step 1: Navigate to App Service Plans

- From the Azure Portal home page, I searched and opened *App Service Plans*.

![Screenshot 2025-06-15 113155](https://github.com/user-attachments/assets/08a2b0b1-360e-4bba-a498-66c08750bf27)


### Step 2: Create a New App Service Plan

- Clicked *Create* to initiate the creation of a new plan.
- *Resource Group:* CSI-DevOps.
- *Name:* Task-2WebApp.
- *OS:* Linux
- *Region:* Canada Central.
- *Pricing Tier:* Basic Plan B1: To integrate Continous deployment

![Screenshot 2025-06-15 113356](https://github.com/user-attachments/assets/6a5e9bba-946b-4e75-ba79-36414982c0b9)



### Step 3: Review and Create

- After filling out the details, I clicked on *Review + Create* and verified all values.

![Screenshot 2025-06-15 113445](https://github.com/user-attachments/assets/bbbab776-8023-4976-bf08-5be9448ed9d6)


- Clicked *Create* and waited for successful deployment.

![Screenshot 2025-06-15 113602](https://github.com/user-attachments/assets/28a3411f-32cd-43ec-a5ce-84e2e488babf)


### Step 4: Navigate to App Services

- After creating the plan, I went to *App Services* in the Azure portal and selected *Create* to provision a new app.


![Screenshot 2025-06-15 113656](https://github.com/user-attachments/assets/754d6709-3a3e-4c72-b688-ac23686c39eb)

### Step 5: Create a Web App Using the Existing App Service Plan

- Navigated to *App Services* and clicked on *Create*.
- Chosen the following configuration:
  - *Subscription:* Selected existing subscription.
  - *Resource Group:* CSI_DevOps.
  - *Name:* Task-2WebApp
  - *Publish:* Code
  - *Runtime stack:* Node.js 20 LTS
  - *Operating System:* Linux
  - *Region:*  Canada Central
  - *App Service Plan:* Selected existing Task-2WebApp

![Screenshot 2025-06-15 115009](https://github.com/user-attachments/assets/14d4762b-9aa6-4c6d-89ec-f5a0a314c936)


### Step 6: Deployment via GitHub Actions

- In the *Deployment* tab during Web App creation, selected:
  - *GitHub* as the deployment source.
  - Authorized and selected the csi-test-repo repository and branch (main).
![Screenshot 2025-06-15 121608](https://github.com/user-attachments/assets/d9ecb746-08cd-4295-8676-89a707ebf732)



### Step 7: Review + Create

- Verified all the configuration details.
- Clicked on *Create* and waited for the deployment to complete.
![Screenshot 2025-06-15 121633](https://github.com/user-attachments/assets/4d4923bf-546f-4fe7-a24d-57c2ce681520)


### ✅ Step 8: App Service Created Successfully

- After clicking *Create*, the Web App Task-2WebApp was successfully provisioned using the selected App Service Plan.
- Navigated to *App Services > task2-simple-webapp* to confirm that the app was created.
- Azure automatically set up GitHub Actions for deployment as part of the selected deployment method.
![Screenshot 2025-06-15 121910](https://github.com/user-attachments/assets/32679bc0-76af-4376-91d8-3f0e6a45f311)


### ✅ Step 9: Azure App Service Started Deploying from GitHub

- Azure initiated deployment using the configured GitHub repository.
- Viewed deployment progress under *Deployment Center*.
- Verified that GitHub Actions workflow ran successfully, deploying the app code.

![Screenshot 2025-06-15 125733](https://github.com/user-attachments/assets/72101327-c4fc-49cb-a8fd-c8181a7e090d)

### ✅ Step 10: Final Web Page Rendered on Azure

- Accessed the Web App’s live URL (task-2webapp-fqb0fuexaagkbfg8.canadacentral-01.azurewebsites.net) by copying default domain.
- Confirmed that the static HTML page was served successfully from Azure App Service.

![Screenshot 2025-06-15 125649](https://github.com/user-attachments/assets/91fc47c2-e833-4db9-ad80-1fc998351785)

---

## Conclusion

This task helped me learn how to create an App Service Plan and deploy a simple Node.js web app using Azure. I was able to set up everything from the portal, connect my GitHub repo, and see my webpage live on Azure.

---
