# ☁ Week 2 – Azure Compute: Task 1

## 🚀 Task: Deploy Linux and Windows virtual machine and access them using SSH and RDP
## 📌 Objective

In this task, I deployed both a *Red Hat Linux* and a *Windows Server* virtual machine on Microsoft Azure. I accessed the Linux machine using *SSH keys* and the Windows machine using *Remote Desktop (RDP)*. I’ve included step-by-step screenshots and descriptions of everything I’ve done.

---

## Part 1: Deploying Linux VM and SSH Access

### Step 1: Open Azure Portal and Go to Virtual Machines

I logged in to the Azure portal and navigated to *Virtual Machines*.

![Screenshot 2025-06-14 155513](https://github.com/user-attachments/assets/ff29ec98-5e53-4de3-95b2-cf5912d4cfeb)


### Step 2: Create Resource Group

Before creating any resource, We must need to create a resource group. So I created a resource group named csi-devops to logically group my resources.

![Screenshot 2025-06-14 155712](https://github.com/user-attachments/assets/7307b991-a41b-4399-9759-60a2a08dd5f9)


### Step 3: Configure Linux VM Basics

I am going to create linux server 

- Chose OS: *Red Hat Enterprise Linux 9.4*
- VM Size: *Standard_B1ls* (1 core, 1 GiB RAM)
- Username: azureuser
- Authentication: *SSH Key*
- Key pair name: csi-devops-linux_key.pem (downloaded .pem file)

![Screenshot 2025-06-14 160008](https://github.com/user-attachments/assets/2ea6423c-6d69-46af-b115-b829b377f7cd)

![Screenshot 2025-06-14 160131](https://github.com/user-attachments/assets/85bd64f6-4893-47a1-8f27-ab7f6c8af8bd)

### Step 4: Networking Configuration

- Allowed *port 22* for (SSH)
- Attached *Public IP*, NSG, and default Virtual Network

![Screenshot 2025-06-14 160327](https://github.com/user-attachments/assets/82366ea4-a984-41ce-92bb-28746542124e)

### Step 5: Review and Create

After final review, I clicked *"Create"*. The deployment completed successfully.

![Screenshot 2025-06-14 162926](https://github.com/user-attachments/assets/a8fc7449-21af-49b1-8bfc-050b3f508111)

![Screenshot 2025-06-14 163138](https://github.com/user-attachments/assets/fa9b7c58-c57c-4cd2-bfbb-db255aafc7df)

### Step 6: SSH into the Linux VM

- Navigated to Pem File location and Changed permission of .pem file:


      chmod 400 LinuxVM_key_0615.pem


- Finally Logged into Virtual Machine using public IP


      ssh -i LinuxVM_key_0615.pem azureuser@20.193.253.42

![Screenshot 2025-06-15 001707](https://github.com/user-attachments/assets/df5f5bf6-fd20-40db-b45b-eac7e655566a)

---

## Part 2: Deploying Windows VM and RDP Access

### Step 1: Create a Windows Server VM

I went back to the Azure Portal and selected Create a virtual machine. This time, I set it up to run Windows Server 2019 Datacenter.

- OS Image: Windows Server 2022 Datacenter
- VM Size: Standard_B2s_v3 (2 vCPUs, 8 GiB RAM)
- Administrator Username: Kamlesh Rankawat
- Authentication Type: Password
- Password: A strong password stored securely

![Screenshot 2025-06-15 002249](https://github.com/user-attachments/assets/d34a7e71-640c-4b72-8153-08e3a5b1771a)

![Screenshot 2025-06-15 002322](https://github.com/user-attachments/assets/8802436c-735c-4078-a580-656b530baa26)

### Step 2: Configure Networking

- To enable Remote Desktop access, I allowed port 3389 (RDP) through the Network Security Group (NSG). The VM was also assigned a public IP and added to the default virtual network.

![Screenshot 2025-06-15 002525](https://github.com/user-attachments/assets/e6bdcc38-be5f-4cdd-968b-1fa79e4860de)


### Step 3: Review and Deploy

- I reviewed all the configuration settings to make sure everything looked good, then clicked Create. Azure took a few minutes to deploy the VM.

![Screenshot 2025-06-15 002453](https://github.com/user-attachments/assets/a62e79a0-701c-4961-b318-687ed1af2a4c)

### Step 4: Access Windows VM via RDP

Once the deployment was complete, I accessed the VM as follows:

- Open Remote Desktop Connection on your PC:

- Press Win + R, type: mstsc, press Enter

- Enter: <Public_IP>

- Use the username and password you set

![Screenshot 2025-06-15 002756](https://github.com/user-attachments/assets/d602af15-e6f4-4626-9f3a-9b92a9addc63)

- I successfully logged into the Windows Server desktop environment via Remote Desktop.


![Screenshot 2025-06-15 004730](https://github.com/user-attachments/assets/640596f1-931b-4ffc-b8f1-1404102b4354)

---

## Conclusion

I deployed Linux and Windows VMs on Azure, accessed the Linux VM via SSH and the Windows VM via RDP. I configured required ports (22 and 3389) and successfully connected to both, gaining hands-on experience with Azure VM setup and remote access.
