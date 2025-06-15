# 🌐 Week 2 – Azure Storage: Task 9

## 📌 Task: Explore Azure Storage Account Capabilities

## 🎯 Objective
Explore and test key Azure Storage features including Blob, File Shares, Azure Storage Explorer, Access Keys, SAS, policies, lifecycle rules, and replication.

---

## ☁️ Step 1: Create Azure Storage Account

```bash
az storage account create   --name mystoragekamlesh   --resource-group MyResourceGroup   --location eastus   --sku Standard_LRS
```

Explore all options like:
- `Performance`: Standard / Premium
- `Replication`: LRS, GRS, RA-GRS
- `Access tier`: Hot / Cool / Archive

---

## 📤 Step 2: Upload & Access Blob

```bash
az storage container create --account-name mystoragekamlesh --name mycontainer --public-access blob

az storage blob upload   --account-name mystoragekamlesh   --container-name mycontainer   --name sample.txt   --file ./sample.txt
```

Verify uploaded blob using Azure Portal or CLI.

---

## 🔐 Step 3: Authentication Technologies

- Access Keys (primary/secondary)
- Shared Access Signature (SAS)
- Stored Access Policy
- Azure AD Authentication

> Explore using **Azure Storage Explorer** or Portal

---

## 🔑 Step 4: Use Access Keys

```bash
az storage account keys list --account-name mystoragekamlesh

# Use keys in Storage Explorer or apps to connect
```

---

## 🔗 Step 5: Create SAS Token

```bash
az storage container generate-sas   --account-name mystoragekamlesh   --name mycontainer   --permissions rwdl   --expiry 2025-12-31T23:59Z   --output tsv
```

Append SAS token to the container URL to access.

---

## 🔐 Step 6: Stored Access Policy

```bash
az storage container policy create   --account-name mystoragekamlesh   --container-name mycontainer   --name mypolicy   --permissions rw   --expiry 2025-12-31T23:59Z
```

Use policy with SAS for scoped access.

---

## 🧊 Step 7: Access Tiers

| Tier     | Use Case                     |
|----------|------------------------------|
| Hot      | Frequently accessed data     |
| Cool     | Infrequently accessed        |
| Archive  | Rarely accessed, cheap store |

```bash
az storage blob set-tier --account-name mystoragekamlesh --container-name mycontainer --name sample.txt --tier Cool
```

---

## 🔄 Step 8: Lifecycle Policy

```json
{
  "rules": [
    {
      "enabled": true,
      "name": "archive-after-30-days",
      "type": "Lifecycle",
      "definition": {
        "filters": {
          "blobTypes": [ "blockBlob" ],
          "prefixMatch": [ "sample" ]
        },
        "actions": {
          "baseBlob": {
            "tierToArchive": { "daysAfterModificationGreaterThan": 30 }
          }
        }
      }
    }
  ]
}
```

Apply this using portal or Azure CLI.

---

## 🌍 Step 9: Test Object Replication

Enable **Object Replication** between two storage accounts for a container.

---

## 📁 Step 10: Create File Share

```bash
az storage share create   --name myfileshare   --account-name mystoragekamlesh
```

Upload files and test using Azure Storage Explorer.

---

## 🔁 Step 11: Azure File Sync (Portal)

1. Create Azure File Sync service.
2. Register on-prem Windows Server.
3. Create sync group and endpoints.
4. Test syncing changes both ways.

---

## 👨‍💻 Submitted by

**Kamlesh Rankawat**  
B.Tech Final Year | DevOps Specialization  
📧 rankawatkamlesh02022006@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/kamlesh-rankawat-73b698361)
