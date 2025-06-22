
# 🛡️ Azure Policy: Create and Assign at Subscription Level using Azure CLI

This shows how to create a custom Azure Policy to restrict resources to a specific location and assign it at the subscription level using Azure CLI.

---

## ✅ Step 1: Set Your Subscription

```bash
az account set --subscription "<your-subscription-id>"
```

---

## 🏗️ Step 2: Create Policy Definition File

Create a file named `allowed-locations-policy.json`:

```json
{
  "properties": {
    "displayName": "Allow only East US location",
    "policyType": "Custom",
    "mode": "All",
    "description": "This policy allows virtual machines to be deployed only in East US.",
    "parameters": {},
    "policyRule": {
      "if": {
        "field": "location",
        "notEquals": "eastus"
      },
      "then": {
        "effect": "deny"
      }
    }
  }
}
```

---

## 📝 Step 3: Create the Policy Definition

```bash
az policy definition create \
  --name "allow-only-eastus" \
  --display-name "Allow only East US location" \
  --description "Restricts resource deployment to East US." \
  --rules allowed-locations-policy.json \
  --mode All
```

---

## 📌 Step 4: Assign the Policy to Subscription

```bash
az policy assignment create \
  --name "enforce-eastus-vm" \
  --policy "allow-only-eastus" \
  --scope "/subscriptions/<your-subscription-id>"
```

---

## ✅ Step 5: Test the Policy

- Try to deploy a VM in **any region other than eastus** → Expected: **Denied**
- Deploy in **eastus** → Expected: **Success**

---
## 📸 Screenshots
![Screenshot 2025-06-22 123512](https://github.com/user-attachments/assets/c1ffbe8f-5e9c-457f-81c6-db52dd4dbed0)
![Screenshot 2025-06-22 190941](https://github.com/user-attachments/assets/f7cc1021-3e5f-4fc3-a261-c768984f8c18)
![Screenshot 2025-06-22 191008](https://github.com/user-attachments/assets/eed2eaef-3f87-4267-a77d-b2390ca62ea2)
![Screenshot 2025-06-22 191030](https://github.com/user-attachments/assets/71d3132c-c334-44ac-b0d4-34c241f49f39)


