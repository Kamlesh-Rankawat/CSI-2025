
# 🔐 Azure Entra ID Setup & Role Assignment 

This documents the process to set up Azure Entra ID (formerly Azure AD), create test users/groups, assign built-in and custom RBAC roles.

---

## 1. View Assigned Azure Subscriptions

```bash
az account list -o table
az account show -o json
```

- Shows all subscriptions associated with your Azure account.
- Displays the currently active subscription.

---

## 2. View or Create Azure Entra ID Tenant

### View Current Entra ID (Tenant)
```bash
az account show --query tenantId
az tenant list -o table
```

### Create New Entra ID Tenant
```bash
az tenant create --display-name "MyDevTenant" --country "IN"
```

---

## 3. Create Test Users and Groups

### Create a Test User
```bash
az ad user create \
  --display-name "DevTestUser" \
  --user-principal-name devuser1@yourdomain.onmicrosoft.com \
  --password "TestP@ssword123" \
  --force-change-password-next-login true
```

### Create a Group
```bash
az ad group create \
  --display-name "DevOpsTeam" \
  --mail-nickname "devopsteam"
```

### Add User to Group
```bash
az ad group member add \
  --group "DevOpsTeam" \
  --member-id $(az ad user show --id devuser1@yourdomain.onmicrosoft.com --query id -o tsv)
```

---

## 4. Assign Built-In RBAC Role to a User

### Assign Reader Role at Subscription Scope
```bash
az role assignment create \
  --assignee devuser1@yourdomain.onmicrosoft.com \
  --role "Reader" \
  --scope /subscriptions/<your-subscription-id>
```

### Check Role Assignment
```bash
az role assignment list --assignee devuser1@yourdomain.onmicrosoft.com -o table
```

---

## 5. Create and Assign a Custom RBAC Role

### Define Custom Role (`customRole.json`)
```json
{
  "Name": "CustomVMReader",
  "IsCustom": true,
  "Description": "Read-only access to VMs and resource groups",
  "Actions": [
    "Microsoft.Compute/virtualMachines/read",
    "Microsoft.Resources/subscriptions/resourceGroups/read"
  ],
  "NotActions": [],
  "AssignableScopes": ["/subscriptions/<your-subscription-id>"]
}
```

### Create the Custom Role
```bash
az role definition create --role-definition customRole.json
```

### Assign Custom Role to a User
```bash
az role assignment create \
  --assignee devuser1@yourdomain.onmicrosoft.com \
  --role "CustomVMReader" \
  --scope /subscriptions/<your-subscription-id>
```

---

## ✔️ Final Testing

- Login to the portal as the test user.
- Confirm read access to virtual machines and resource groups.
- Ensure no write/delete permissions are granted.

