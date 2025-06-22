
# 📦 Azure VM Backup and Alert Configuration 

This covers how to:
- ✅ Schedule daily VM backups at 3:00 AM using Azure Backup Vault.
- 📧 Create an alert rule for CPU usage > 80% with email notification.
- 🔄 Configure retention policies in Backup Center.

---

## A. Schedule Daily Backup of VM at 3:00 AM using Recovery Services Vault

### Step 1: Create a Recovery Services Vault

```powershell
$vaultName = "MyRecoveryVault"
$resourceGroup = "MyResourceGroup"
$location = "EastUS"

New-AzRecoveryServicesVault -Name $vaultName -ResourceGroupName $resourceGroup -Location $location
```

### Step 2: Set Vault Context

```powershell
$vault = Get-AzRecoveryServicesVault -Name $vaultName
Set-AzRecoveryServicesVaultContext -Vault $vault
```

### Step 3: Create a Backup Policy with 3:00 AM Schedule

```powershell
$policy = Get-AzRecoveryServicesBackupProtectionPolicy -WorkloadType "AzureVM"
$customPolicy = Copy-AzRecoveryServicesBackupProtectionPolicy -Policy $policy -Name "DailyBackupAt3AM"
$customPolicy.SchedulePolicy.ScheduleRunTimes.Clear()
$customPolicy.SchedulePolicy.ScheduleRunTimes.Add((Get-Date "03:00:00"))
$customPolicy.RetentionPolicy.DailySchedule.DurationCountInDays = 30  # Retain daily backups for 30 days
Set-AzRecoveryServicesBackupProtectionPolicy -Policy $customPolicy
```

### Step 4: Enable Backup for VM

```powershell
$vm = Get-AzVM -Name "MyVM" -ResourceGroupName $resourceGroup
Enable-AzRecoveryServicesBackupProtection -Policy $customPolicy -Name $vm.Name -ResourceGroupName $resourceGroup -VaultId $vault.ID
```

---

## 📧 Create Alert Rule for CPU Usage > 80%

### Step 1: Create Metric Alert

```powershell
$actionGroup = New-AzActionGroup -Name "CPUAlertActionGroup" -ShortName "CPUAlert" `
    -ResourceGroupName $resourceGroup -Receiver `
    @(New-AzActionGroupReceiver -Name "adminEmail" -EmailAddress "you@example.com")

Add-AzMetricAlertRuleV2 -Name "HighCPUAlert" -ResourceGroupName $resourceGroup `
    -WindowSize (New-TimeSpan -Minutes 5) -Frequency (New-TimeSpan -Minutes 1) `
    -TargetResourceId $vm.Id -Condition "avg Percentage CPU > 80" `
    -ActionGroupId $actionGroup.Id -Severity 3 -Description "CPU usage exceeded 80%."
```

---

## B. Provision Backups via Backup Center

### Step 1: Open Backup Center in Azure Portal

1. Navigate to **Backup Center** in Azure Portal.
2. Click **+ Backup**.
3. Select **Azure Virtual Machine** as the workload type.
4. Choose your **Recovery Services Vault** (e.g., `MyRecoveryVault`).

### Step 2: Create/Use Backup Policy

- Define a **daily schedule at 3:00 AM**.
- Configure **Retention**:
  - Daily: 30 days
  - Weekly: Retain one backup for 4 weeks
  - Monthly: Retain one backup for 6 months

### Step 3: Apply Policy to VM

- Select the VM(s) to protect.
- Apply the backup policy and start protection.

---

