
# 🖥️ Azure CLI: Create Virtual Machine and Virtual Network

The steps to create a Virtual Network and a Virtual Machine in Azure using Azure CLI.

---

## ✅ Prerequisites

- Azure CLI installed and authenticated (`az login`)
- Set your subscription:
  ```bash
  az account set --subscription "<your-subscription-name-or-id>"
  ```

---

## 1️⃣ Create a Resource Group

```bash
az group create \
  --name MyResourceGroup \
  --location eastus
```

---

## 2️⃣ Create a Virtual Network and Subnet

```bash
az network vnet create \
  --name MyVNet \
  --resource-group MyResourceGroup \
  --subnet-name MySubnet \
  --address-prefix 10.0.0.0/16 \
  --subnet-prefix 10.0.1.0/24 \
  --location eastus
```

---

## 3️⃣ Create a Network Security Group (NSG)

```bash
az network nsg create \
  --resource-group MyResourceGroup \
  --name MyNSG
```

---

## 4️⃣ Create a Public IP Address

```bash
az network public-ip create \
  --resource-group MyResourceGroup \
  --name MyPublicIP
```

---

## 5️⃣ Create a Network Interface (NIC)

```bash
az network nic create \
  --resource-group MyResourceGroup \
  --name MyNIC \
  --vnet-name MyVNet \
  --subnet MySubnet \
  --network-security-group MyNSG \
  --public-ip-address MyPublicIP
```

---

## 6️⃣ Create the Virtual Machine

```bash
az vm create \
  --resource-group MyResourceGroup \
  --name MyVM \
  --nics MyNIC \
  --image UbuntuLTS \
  --admin-username azureuser \
  --admin-password P@ssw0rd1234 \
  --authentication-type password \
  --location eastus
```

---

## 7️⃣ Open SSH Port (22)

```bash
az vm open-port \
  --port 22 \
  --resource-group MyResourceGroup \
  --name MyVM
```

---

## 🔍 Verify

```bash
az vm show --resource-group MyResourceGroup --name MyVM --output table
az network vnet list --resource-group MyResourceGroup --output table
```

---
