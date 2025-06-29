# 🗂️ Docker Volume: Create and Mount to a Container

This shows how to:

- Create a Docker volume
- Mount it into a container
- Verify persistence
- Use it for real-world scenarios like sharing data between containers

---

## ✅ Step 1: Create a Docker Volume

```bash
docker volume create mydata
```

List volumes:

```bash
docker volume ls
```

Inspect the volume:

```bash
docker volume inspect mydata
```

---

## ✅ Step 2: Run a Container with Volume Mounted

```bash
docker run -dit \
  --name volume-test \
  -v mydata:/data \
  ubuntu:22.04
```

This mounts the volume `mydata` to the `/data` path in the container.

---

## ✅ Step 3: Add Data to Volume

```bash
docker exec -it volume-test bash
echo "Hello from Docker Volume!" > /data/hello.txt
cat /data/hello.txt
exit
```

---

## ✅ Step 4: Remove Container but Keep Volume

```bash
docker rm -f volume-test
```

Run a new container and reattach the volume:

```bash
docker run -it --rm -v mydata:/data ubuntu:22.04 cat /data/hello.txt
```

✅ Output should still be:
```
Hello from Docker Volume!
```

---

## 🔄 Bonus: Mount a Local Host Directory (Bind Mount)

```bash
docker run -dit \
  --name bind-test \
  -v $(pwd)/host-folder:/app \
  ubuntu:22.04
```

This shares a local folder (`./host-folder`) with the container under `/app`.

---

## 📚 Resources

- 📘 [docker-curriculum.com](https://docker-curriculum.com/)
- 🎥 [YouTube: Docker Volume Storage](https://www.youtube.com/watch?v=u_0O4DOo2GI)

---

