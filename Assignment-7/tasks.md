
# Azure DevOps Project with Group Policies – CLI-Based Assignment

---

## ✅ Task 1: Create a Project with Different User Groups and Implement Group Policies

**Step 1: Create a New Project**
```bash
az devops project create --name "UserGroupPolicyProject" --visibility private --organization https://dev.azure.com/<your-org>
```

**Step 2: Create User Groups**
```bash
az devops security group create --name "DevTeam" --project "UserGroupPolicyProject" --description "Development team group" --organization https://dev.azure.com/<your-org>
az devops security group create --name "QATeam" --project "UserGroupPolicyProject" --description "Quality Assurance team group" --organization https://dev.azure.com/<your-org>
az devops security group create --name "Admins" --project "UserGroupPolicyProject" --description "Project Administrators" --organization https://dev.azure.com/<your-org>
```

**Step 3: Add Members to Groups**
```bash
az devops security group membership add --group-id "<GroupDescriptor>" --member-id "<UserDescriptor>" --organization https://dev.azure.com/<your-org>
```

> Get descriptors via `az devops security group list` and `az devops user list`.

---

## ✅ Task 2: Apply Branch Policies (Admins Only on Master)

```bash
az repos policy required-reviewer create   --branch master   --enabled true   --blocking true   --repository-id <repo-id>   --required-reviewer-ids <admin-descriptor>   --project "UserGroupPolicyProject"   --organization https://dev.azure.com/<your-org>
```

---

## ✅ Task 3: Apply Branch Security and Locks

**Deny Contributors Push Access to Master**
```bash
az repos permission update   --project "UserGroupPolicyProject"   --repository <repo-name>   --branch master   --subject <contributor-group-descriptor>   --deny GitRepositories/Push
```

**Lock the Branch**
```bash
az repos ref lock --name master --repository <repo-name> --project "UserGroupPolicyProject"
```

---

## ✅ Task 4: Apply Branch and Path Filters

```bash
az repos policy path-length create   --repository-id <repo-id>   --branch master   --path-filter "src/*"   --project "UserGroupPolicyProject"   --organization https://dev.azure.com/<your-org>
```

---

## ✅ Task 5: Apply a Pull Request Policy

```bash
az repos pr create   --repository <repo-name>   --source-branch feature   --target-branch master   --title "Feature PR"   --project "UserGroupPolicyProject"
```

---

## ✅ Task 6: Apply Build and Release Triggers

```bash
az pipelines create --name "BuildTriggerPipeline"   --repository <repo-name>   --branch master   --yaml-path azure-pipelines.yml   --project "UserGroupPolicyProject"
```

> Set triggers in `azure-pipelines.yml`:
```yaml
trigger:
  branches:
    include:
      - master
```

---

## ✅ Task 7: Apply Gates in Release Pipeline

Use GUI or REST API to configure gate policies like:
- Azure Function call
- Invoke REST API
- Query monitoring tools

---

## ✅ Task 8: Secure Master: Contributors Can PR but Cannot Merge

```bash
az repos permission update   --project "UserGroupPolicyProject"   --repository <repo-name>   --branch master   --subject <contributor-group-descriptor>   --deny GitRepositories/ForcePush   --deny GitRepositories/CreateBranch   --allow GitRepositories/PullRequestContribute
```

---

## ✅ Task 9: Use Work Items in Pipelines

Link Work Items via commits:
```bash
git commit -m "Fixed login issue #23"
```

Enable linking via `azure-pipelines.yml`:
```yaml
name: Build with Work Items
trigger:
  branches:
    include:
    - master

jobs:
- job: build
  steps:
  - checkout: self
  - script: echo "Linked Work Item in Commit"
```

---

Prepared by: `Kamlesh Rankawat`
