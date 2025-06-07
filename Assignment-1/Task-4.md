## Task 4: User and Group Management

### ➕ 1. Create User and Group

| Command                               | Description |
|---------------------------------------|-------------|
| `sudo groupadd devteam`               | Create group |
| `sudo useradd -m -g devteam user1`    | Create user with home and assign group |
| `sudo passwd user1`                   | Set user password |

### 🔄 2. Modify Users

| Command                                                   | Description |
|------------------------------------------------------------|-------------|
| `sudo usermod -l newname oldname`                          | Change username |
| `sudo usermod -d /home/newhome user1`                      | Change home directory |
| `sudo usermod -aG sudo user1`                              | Add to additional group |

### 🗑️ 3. Delete Users and Groups

| Command                         | Description |
|----------------------------------|-------------|
| `sudo userdel user1`             | Delete user |
| `sudo userdel -r user1`          | Delete user and home |
| `sudo groupdel devteam`          | Delete group |

### 🔐 4. Set Ownership and Permissions

| Command                                  | Description |
|------------------------------------------|-------------|
| `sudo chown user1:devteam file.txt`      | Change file owner/group |
| `chmod 755 file.txt`                     | Set permissions (rwx for owner, rx for others) |

### 📊 5. User Info & Groups

| Command                     | Description |
|-----------------------------|-------------|
| `id user1`                  | Show UID, GID, and groups |
| `groups user1`              | Show groups of user |
| `getent passwd user1`       | Get user info from passwd file |
| `getent group devteam`      | Get group info |

---

## 📘 Key System Files

| File Path         | Description |
|-------------------|-------------|
| `/etc/passwd`     | Stores user accounts |
| `/etc/group`      | Stores groups |
| `/etc/shadow`     | Stores encrypted passwords |
| `/etc/sudoers`    | Sudo permissions config |

---

## 📸 Screenshots

All commands were run and captured in a Linux environment. Refer to the `/screenshots` folder or the GitHub issue links for images used during tasks.

---

## 📚 Resources

- [Red Hat User Management Guide](https://www.redhat.com/sysadmin/linux-user-group-management)
- [Linux File Commands](https://www.redhat.com/sysadmin/create-delete-files-directories-linux)

---

> ✅ This guide is part of my **Celebal Technologies DevOps Internship 2025**.

