
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
