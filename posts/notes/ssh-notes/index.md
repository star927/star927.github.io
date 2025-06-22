# SSH Notes


SSH服务，全称为Secure Shell，是一种网络协议，为用户提供安全的远程访问和文件传输服务。

<!--more-->

## ssh命令

```shell
ssh [-p port] username@address  # 连接远程服务器
ssh -T git@github.com  # 测试 SSH 连接
```

## ssh-keygen命令

`ssh-keygen`命令允许用户创建用于SSH公钥身份验证的密钥对，包括私钥和公钥。私钥应该被安全地保存在本地机器上，而公钥则可以复制到远程服务器上，以便进行无密码的SSH登录。

```shell
ssh-keygen
```

- `-t`：指定生成密钥所用的算法（如rsa、ed25519等），不指定则使用默认算法`ed25519`
- `-C`：为密钥对添加注释
- `-b`：指定密钥的位数（长度）
- `-f`：指定私钥文件的路径，不指定路径默认在`~/.ssh`文件夹下，公钥文件名比私钥文件名多了`.pub`

```shell
ssh-keygen -R 123.45.67.89  # 从 ~/.ssh/known_hosts 删除指定远程主机
ssh-keygen -l -f ~/.ssh/id_rsa  # 查看指定公钥的指纹(fingerprint)
ssh-keygen -l -f ~/.ssh/id_rsa.pub  # 查看指定公钥的指纹(fingerprint)
```

### passphrase

生成公私钥对可选择是否生成passphrase。如果生成SSH公私钥对时，设置了passphrase，那么使用SSH连接服务器时需要输入passphrase。

## ssh-copy-id命令

`ssh-copy-id` 是一个用于将本地机器的 SSH 公钥复制到远程服务器的 `~/.ssh/authorized_keys` 文件的实用工具。这样做之后，你就可以通过SSH免密码登录到远程服务器了，前提是远程服务器的SSH配置允许使用公钥进行身份验证。

```shell
ssh-copy-id [-i [identity_file]] [user@]hostname
```

- `-i [identity_file]`：指定公钥文件的路径。当只有一对公私钥可以不指定，当有多对公私钥时需要手动指定想要上传的公钥文件路径。
- `[user@]hostname`：指定远程服务器的用户名和主机名或IP地址。如果不指定用户名，将使用当前用户的用户名。

## scp命令

```shell
# 拷贝文件
scp [-P port] [localFilePath] username@address:[severPath]  # 本地文件拷贝到远程服务器
scp [-P port] username@address:[severFilePath] [localPath]  # 远程服务器文件拷贝到本地
```

- `-r`：递归复制整个目录
- `-v`：详细方式显示输出

## SSH相关文件

### ~/.ssh/id_ed25519

当生成一对SSH公私钥时，如果不指定文件路径，则公私钥文件会放在`~/.ssh`文件夹下，比如使用`ed25519`算法生成一对公私钥，那么默认的私钥文件名和公钥文件名分别是`id_ed25519`和`id_ed25519.pub`

公钥文件的内容示例

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINj This is a comment.
```

公钥文件内容分为三部分，以空格为分隔符。如上，第一部分`ssh-ed25519`表示该公钥是通过`ed25519`算法生成的，第二部分是公钥的主体部分，用于在 SSH 连接时验证用户的身份，第三部分是注释。

### ~/.ssh/config

`~/.ssh/config`是SSH配置文件的路径

格式

```
Host: hostName的别名
HostName: 是目标主机的ip地址
Port: 指定的端口号
User: 指定的登陆用户名
IdentityFile: 指定的私钥文件地址
```

示例

```
Host ubuntu
HostName 123.45.67.89
User star

Host myserver
HostName server.example.com
User myuser
Port 2222
IdentityFile ~/.ssh/id_rsa_myserver
```

配置完成后，后续可以使用`ssh ubuntu`代替`ssh star@123.45.67.89`

### ~/.ssh/known_hosts

`~/.ssh/known_hosts` 是一个SSH客户端用来存储已知的远程主机公钥的文件。当首次通过SSH连接到一个新的远程主机时，SSH客户端会提示你接受该主机的公钥并将其添加到 `~/.ssh/known_hosts` 文件中。

可使用`ssh-keygen -R server.example.com`删除`~/.ssh/known_hosts`文件中远程主机。

### ~/.ssh/authorized_keys

`~/.ssh/authorized_keys` 文件是一个用于存储公钥的文件，允许SSH用户通过公钥认证方式登录到服务器，每一行代表一个公钥。比如使用`ssh-copy-id`将本机上的公钥拷贝到了远程主机，远程主机的该文件就会储存该公钥。

## Github配置SSH

详见：[Github上配置SSH](../github-ssh)

## Ubuntu上使用SSH服务

```shell
apt install openssh-server  # 安装 SSH 服务
# service 命令是较旧的方式，仍然可用以兼容老旧系统。
service ssh status  # 查看 SSH 状态
service ssh start  # 启动 SSH 服务
service ssh restart  # 重启 SSH 服务
service ssh stop  # 停止 SSH 服务
# systemctl 是更现代的命令，适用于使用 systemd 的系统，提供更丰富的功能和信息。
systemctl status ssh  # 查看 SSH 状态
systemctl start ssh  # 启动 SSH 服务
systemctl restart ssh  # 重启 SSH 服务
systemctl stop ssh  # 停止 SSH 服务
systemctl enable ssh  # 启用开机自启
systemctl disable ssh  # 禁用开机自启
```

## 参考资料

- [OpenSSH核心操作 | GitHub SSH连接 - 哔哩哔哩](https://www.bilibili.com/video/BV1Sx4y1y7B2)
- [通过 SSH 连接到 GitHub - GitHub](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh)


---

> 作者: [Huxley](https://huxinme.top)  
> URL: https://huxinme.top/posts/notes/ssh-notes/  

