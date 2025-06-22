
# 🖥️ Create Azure VM using PowerShell

This provides a PowerShell script to create a Windows virtual machine in Azure.

---

## ✅ Prerequisites

- Azure PowerShell installed:
  ```powershell
  Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force
  ```
- Logged into your Azure account:
  ```powershell
  Connect-AzAccount
  ```

---

## 🚀 PowerShell Script to Create a VM

```powershell
# Variables
$resourceGroup = "MyResourceGroup"
$location = "EastUS"
$vmName = "MyVM"
$vnetName = "MyVNet"
$subnetName = "MySubnet"
$ipName = "MyPublicIP"
$nicName = "MyNIC"
$securityGroupName = "MyNSG"
$adminUsername = "azureuser"
$adminPassword = ConvertTo-SecureString "MyP@ssword1234!" -AsPlainText -Force

# Create resource group
New-AzResourceGroup -Name $resourceGroup -Location $location

# Create virtual network and subnet
$vnet = New-AzVirtualNetwork -ResourceGroupName $resourceGroup -Location $location `
    -Name $vnetName -AddressPrefix "10.0.0.0/16"
Add-AzVirtualNetworkSubnetConfig -Name $subnetName -AddressPrefix "10.0.0.0/24" -VirtualNetwork $vnet
$vnet | Set-AzVirtualNetwork

# Create public IP
$publicIp = New-AzPublicIpAddress -Name $ipName -ResourceGroupName $resourceGroup `
    -Location $location -AllocationMethod Dynamic

# Create Network Security Group
$nsg = New-AzNetworkSecurityGroup -ResourceGroupName $resourceGroup -Location $location `
    -Name $securityGroupName

# Create NIC
$subnet = Get-AzVirtualNetworkSubnetConfig -Name $subnetName -VirtualNetwork $vnet
$nic = New-AzNetworkInterface -Name $nicName -ResourceGroupName $resourceGroup -Location $location `
    -Subnet $subnet -PublicIpAddress $publicIp -NetworkSecurityGroup $nsg

# Define VM configuration
$vmConfig = New-AzVMConfig -VMName $vmName -VMSize "Standard_DS1_v2" |
    Set-AzVMOperatingSystem -Windows -ComputerName $vmName -Credential (New-Object PSCredential ($adminUsername, $adminPassword)) -ProvisionVMAgent -EnableAutoUpdate |
    Set-AzVMSourceImage -PublisherName "MicrosoftWindowsServer" -Offer "WindowsServer" -Skus "2019-Datacenter" -Version "latest" |
    Add-AzVMNetworkInterface -Id $nic.Id

# Create the VM
New-AzVM -ResourceGroupName $resourceGroup -Location $location -VM $vmConfig
```

---

