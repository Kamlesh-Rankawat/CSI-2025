# 🌉 Create a Custom Docker Bridge Network

Docker allows the creation of custom bridge networks to enable communication between containers using container names.

---

## ✅ Step 1: Create a Custom Bridge Network

```bash
docker network create \
  --driver bridge \
  my-custom-network
```

You can verify the network creation:

```bash
docker network ls
```

---

## ✅ Step 2: Run Containers Using the Custom Network

```bash
docker run -dit --name container1 --network my-custom-network ubuntu:22.04
docker run -dit --name container2 --network my-custom-network ubuntu:22.04
```

You now have two containers connected to the same custom network.

---

## ✅ Step 3: Test Inter-Container Communication

```bash
docker exec -it container1 bash
apt update && apt install -y iputils-ping
ping container2
```

This should resolve and ping `container2` by name using Docker's internal DNS.

---

## ✅ Step 4: Inspect the Network

```bash
docker network inspect my-custom-network
```

This shows details including connected containers and their IP addresses.

---

