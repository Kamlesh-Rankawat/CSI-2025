
# 🔐 Azure Key Vault CLI 

This explains how to **create an Azure Key Vault**, **store secrets**, **configure access policies**, and **retrieve secrets** using **Azure CLI**.

---

## ✅ Step 1: Create a Resource Group (if needed)

```bash
az group create --name MyKeyVaultRG --location eastus
```

---

## 🔐 Step 2: Create a Key Vault

```bash
az keyvault create \
  --name MySecureVault123 \
  --resource-group MyKeyVaultRG \
  --location eastus \
  --sku standard
```

> **Note:** Key Vault name must be **globally unique**.

---

## 🗝️ Step 3: Store a Secret in the Vault

```bash
az keyvault secret set \
  --vault-name MySecureVault123 \
  --name "DbPassword" \
  --value "MyP@ssw0rd123"
```

---

## 👤 Step 4: Set Access Policy for a User

```bash
az keyvault set-policy \
  --name MySecureVault123 \
  --upn user@yourdomain.com \
  --secret-permissions get list set delete
```

> 🧑 Replace `user@yourdomain.com` with the actual Azure AD user.

---

## 🤖 Step 5 (Optional): Set Access Policy for a Service Principal

```bash
az keyvault set-policy \
  --name MySecureVault123 \
  --spn <appId-of-service-principal> \
  --secret-permissions get list set delete
```

---

## 🔍 Step 6: Retrieve the Secret

```bash
az keyvault secret show \
  --name "DbPassword" \
  --vault-name MySecureVault123 \
  --query value -o tsv
```

> 🔐 Outputs only the secret's value.

---
