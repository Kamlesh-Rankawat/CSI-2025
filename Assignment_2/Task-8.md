# ☁️ Week 2 – Azure Networking: Task 8

## 📌 Task: Set Up a Domain, Configure a Web Server, and Route Traffic Using an Internal DNS Server

## 🎯 Objective

In this task, I implemented a private DNS infrastructure in Azure using a Linux VM. The goal was to host a custom domain (`internal.local`) and route traffic internally to a web server through DNS resolution. This exercise closely simulates how DNS routing works in private enterprise environments and strengthens my understanding of cloud networking and name resolution in virtual networks.

---

## 🛠️ Step-by-Step Implementation (All Steps Combined)

I started by provisioning a Linux-based VM (Ubuntu) in Azure. This VM would serve as both the web server and the internal DNS server.

After accessing the VM via SSH, I installed the Apache web server:

```bash
sudo apt update
sudo apt install apache2 -y
systemctl status apache2
```

I then created a basic HTML page to serve as a homepage to confirm that Apache was properly serving content on port 80.

Next, I installed the BIND9 DNS server to handle internal domain name resolution:

```bash
sudo apt install bind9 bind9utils -y
```

I created a directory to store the DNS zone files:

```bash
sudo mkdir -p /etc/bind/zones
```

Then I created the forward zone file for the internal domain:

```bash
sudo nano /etc/bind/zones/internal.local.db
```

Inside this file, I added an `A` record to map `csidevopsweb.internal.local` to the private IP address of the VM.

After that, I linked this zone by editing the BIND configuration:

```bash
sudo nano /etc/bind/named.conf.local
```

I added a zone block that pointed to the newly created zone file.

To ensure the zone file was correctly configured, I verified it with:

```bash
sudo named-checkzone internal.local /etc/bind/zones/internal.local.db
```

The output confirmed that the syntax was correct. Then, I restarted and enabled the BIND9 service:

```bash
sudo systemctl restart bind9
sudo systemctl enable bind9
```

To test if everything was working, I used the `nslookup` tool on the DNS VM:

```bash
nslookup csidevopsweb.internal.local
```

It returned the correct private IP, proving the DNS resolution was successful. I also used `curl` to check if the web page could be fetched via the domain name:

```bash
curl http://csidevopsweb.internal.local
```

The output showed the expected response: `Hello This is Vikas From CSI DevOps Configured Custom Domain`.

Finally, I deployed another VM (Windows) in the same virtual network to test DNS resolution from a separate machine. From this second VM, I ran:

```bash
nslookup csidevopsweb.internal.local <DNS_VM_PRIVATE_IP>
```

It successfully resolved the domain and confirmed end-to-end internal DNS routing worked as intended.

---

## 📟 Conclusion

Through this hands-on task, I successfully configured a custom internal DNS using **BIND9** on an Azure VM. I was able to create a DNS zone (`internal.local`), add domain records, and verify internal routing of web traffic using domain-based addressing.
