# Ubuntu Notes


## 相关说明

下述相关配置，无特别说明，使用的是`bash`终端

某些笔记是在Docker中的ubuntu中实践出来的，某些是双系统或虚拟机中实践出来的

## apt

`apt`是对`apt-get`和`apt-cache`等工具的整合和改进，提供了更简洁和用户友好的接口。`apt`在一些操作上的输出更加简洁明了。

| 常用命令  |      |
| ----------- | ---- |
|apt update|  |
|apt upgrade|升级软件包|
|apt list --upgradeable|列出可更新的软件包及版本信息|
|apt install &lt;package_name&gt;|安装指定的软件命令|
|apt install &lt;package_1&gt; &lt;package_2&gt; &lt;package_3&gt;|安装多个软件包|
|apt update &lt;package_name&gt;|更新指定的软件命令|
|apt show &lt;package_name&gt;|显示软件包具体信息,例如:版本号，安装大小，依赖关系等等|
|apt remove &lt;package_name&gt;|删除软件包命令|
|apt autoremove|清理不再使用的依赖和库文件|
|apt purge &lt;package_name&gt;|移除软件包及配置文件|
|apt search &lt;key_word&gt;|查找软件包命令|
|apt list --installed|列出所有已安装的包|
|apt list --all-versions|列出所有已安装的包的版本信息|


参考：https://www.runoob.com/linux/linux-comm-apt.html

## 基础设置

```shell
apt update
apt install build-essential  # 安装gcc等
apt install net-tools  # 会安装ifconfig
apt install iputils-ping  # 会安装ping
apt install vim gdb lsof
apt install python3 python3-pip
```

##  bash

配置文件：`~/.bashrc`

```sh
# Set bash prompt
export PS1=&#34;\[\e[0m\n\]\[\e[1;38;5;214m\][\u@\H] \[\e[38;5;45m\]\s-\v \[\e[38;5;39m\]\w\[\e[0m\]\n\[\e[1;38;5;10m\]\$\[\e[0m\] &#34;
# Set GCC output color in order to highlight errors and warnings
export GCC_COLORS=&#39;error=01;38;5;196:warning=01;38;5;220:note=01;38;5;81:range1=38;5;47:range2=34:locus=01:\
quote=01:fixit-insert=32:fixit-delete=31:\
diff-filename=01:diff-hunk=32:diff-delete=31:diff-insert=32&#39;
export LS_COLORS=$LS_COLORS&#39;:pi=33:bd=33;01:cd=33;01:or=31;01:su=37:sg=30:tw=30:ow=34:st=37&#39;
```

### LS_COLORS

`LS_COLORS`变量：设置`ls`命令在显示文件和目录时使用的颜色。

`echo $LS_COLORS`查看当前`LS_COLORS`变量，以下ubunt中为`LS_COLORS`变量的默认配置。在`LS_COLORS`中，各项设置用冒号分割，每个设置都由十六进制数字组成，用分号分隔。

```
rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=00:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.avif=01;35:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:*~=00;90:*#=00;90:*.bak=00;90:*.crdownload=00;90:*.dpkg-dist=00;90:*.dpkg-new=00;90:*.dpkg-old=00;90:*.dpkg-tmp=00;90:*.old=00;90:*.orig=00;90:*.part=00;90:*.rej=00;90:*.rpmnew=00;90:*.rpmorig=00;90:*.rpmsave=00;90:*.swp=00;90:*.tmp=00;90:*.ucf-dist=00;90:*.ucf-new=00;90:*.ucf-old=00;90:
```

&gt; 举例说明其含义
&gt;
&gt; `ow=34;42`: ow表示其他可写文件夹，34表示字体颜色是蓝色，42表示字体背景色是绿色
&gt;
&gt; `*.mp4=01;35`: `*.mp4`表示后缀为`.mp4`的文件，01表示粗体，35表示洋红色

`dircolors --print-database`命令查看默认的颜色设置，命令执行结果部分如下

```
# ===================================================================
# Basic file attributes
# ===================================================================
# Below are the color init strings for the basic file types.
# One can use codes for 256 or more colors supported by modern terminals.
# The default color codes use the capabilities of an 8 color terminal
# with some additional attributes as per the following codes:
# Attribute codes:
# 00=none 01=bold 04=underscore 05=blink 07=reverse 08=concealed
# Text color codes:
# 30=black 31=red 32=green 33=yellow 34=blue 35=magenta 36=cyan 37=white
# Background color codes:
# 40=black 41=red 42=green 43=yellow 44=blue 45=magenta 46=cyan 47=white
```

&gt; 上述结果展示了部分数字对应的含义

`dircolors --print-ls-colors`命令展示已经被完全转义的颜色，命令执行结果部分如下

```
ow	34;42
ex	01;32
*.tar	01;31
*.tgz	01;31
```

部分变量的含义

- `di`：表示目录（directory）的颜色。
- `fi`：表示普通文件（file）的颜色。
- `ex`：表示可执行文件（executable）的颜色。
- `ln`：表示符号链接（symbolic link）的颜色。
- `ow`：表示其他可写（Other Writable）件或目录的颜色。

参考：[linux修改ls文件颜色-CSDN](https://blog.csdn.net/hooting/article/details/7625537)

### 配置示例

```shell
export LS_COLORS=$LS_COLORS&#39;:pi=33:bd=33;01:cd=33;01:or=31;01:su=37:sg=30:tw=30:ow=34:st=37&#39;
# export LS_COLORS=&#39;pi=33:bd=33;01:cd=33;01:or=31;01:su=37:sg=30:tw=30:ow=34:st=37:&#39;$LS_COLORS
```

在命令行`echo $LS_COLORS`可以查看`LS_COLORS`变量的值，以`:`分割，分割后对应各项设置。`$LS_COLORS&#39;:pi=33:bd=33;01:cd=33;01:or=31;01:su=37:sg=30:tw=30:ow=34:st=37&#39;`即为`LS_COLORS`变量和字符串`:pi=33:bd=33;01:cd=33;01:or=31;01:su=37:sg=30:tw=30:ow=34:st=37`拼接后的结果。

配置完后，查看` LS_COLORS`变量`echo $LS_COLORS`，可以发现结果中有两个ow设置，因为默认的`LS_COLORS`变量中有设置ow，上述自定义的配置中又设置了ow。此时系统会采用后一个ow设置，因此想要自定义一个颜色设置，`$LS_COLORS`要写在自定义的字符串的前面。当然`export LS_COLORS=&#39;pi=33:bd=33;01:cd=33;01:or=31;01:su=37:sg=30:tw=30:ow=34:st=37&#39;`也是可以的，但带上`$LS_COLORS`的好处是对于自己未指定的文件类型，会采用`$LS_COLORS`原始的设定。

在`LS_COLORS`变量的默认设置中，`pi,bd,cd,or,su,sg,tw,ow,st`这几个变量的设置如下

```
pi=40;33:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:tw=30;42:ow=34;42:st=37;44
# 截取于echo $LS_COLORS
```

上述配置的作用实际就是去掉这几类文件的背景色，并保持文本颜色和默认一致

## 查看系统相关信息

| 常用命令 |      |
| -------- | ---- |
|uname -a|可以查看系统相关信息|
|cat /proc/version|能显示内核版本等信息|
|hostname|查看主机名|
|lscpu|查看CPU信息|
|free -h|查看内存使用情况|
|df -h|查看磁盘空间使用情况|
|lsblk|查看块设备（磁盘等）信息|
|cat /etc/issue|查看发行版本|

## 中文支持

```shell
# 先安装中文支持包
apt install language-pack-zh-hans
# 再将下述添加到~/.bashrc
LANG=&#34;zh_CN.UTF-8&#34;
# 配置完后，终端里可以显示中文
```

[ubuntu 20.04中文输入法安装-CSDN](https://blog.csdn.net/a805607966/article/details/105874756)

## 调整apt源

Ubuntu 的软件源配置文件是 `/etc/apt/sources.list`，可先将系统自带的该文件做个备份

```shell
cp /etc/apt/sources.list /etc/apt/sources.list.backup
```

将该文件下的内容替换成清华源，然后更新源，

```shell
gedit /etc/apt/sources.list
apt update
```

清华源：[Ubuntu 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

### Ubuntu 24.04 LTS

在`Ubuntu 24.04 LTS`版本中，`/etc/apt/sources.list`文件的内容如下。

```shell
$ cat /etc/apt/sources.list
# Ubuntu sources have moved to the /etc/apt/sources.list.d/ubuntu.sources
# file, which uses the deb822 format. Use deb822-formatted .sources files
# to manage package sources in the /etc/apt/sources.list.d/ directory.
```

## Linux Command

### netstat

用于显示网络状态。https://www.runoob.com/linux/linux-comm-netstat.html

```shell
netstat -tunlp #用于显示tcp,udp的端口和进程等相关情况
```

- -t或--tcp: 显示TCP传输协议的连线状况。
- -u或--udp: 显示UDP传输协议的连线状况。
- -n或--numeric: 直接使用IP地址，而不通过域名服务器。
- -l或--listening: 显示监听中的服务器的Socket。
- -p或--programs: 显示正在使用Socket的程序识别码和程序名称。

## 设置共享文件夹

```
环境
Ubuntu版本：Ubuntu 20.04.1 TLS
虚拟机：VMware Fusion 11/VMware Fusion 12
```

&gt; 可直接看最后一行

在虚拟机软件里设置了共享文件夹，在Ubuntu中并不能直接看到，执行下述命令可查看共享的文件夹：

```shell
vmware-hgfsclient
```

在Ubuntu中访问共享文件夹，需要将共享目录挂到`/mnt/hgfs/`目录下，`/mnt/`目录下的`hgfs`可能需要自己手动创建，执行下述命令：

```shell
sudo vmhgfs-fuse .host:/ /mnt/hgfs/
```

之后在`/mnt/hgfs/`目录下就可以看到共享的文件夹，但需要管理员权限`sudo ls /mnt/hgfs/`，想要普通账户就可以访问该文件夹，对上述命令需要进行修改：

```shell
sudo vmhgfs-fuse .host:/ /mnt/hgfs -o subtype=vmhgfs-fuse,allow_other,nonempty 
```

**简言之**：执行最后一条命令即可，没有`hgfs`文件夹就手动创建；且每次开机都需要执行该命令，见[开机执行命令](#开机执行命令)

参考：[VMware Ubuntu18.10与Win10共享文件夹](https://blog.csdn.net/qq_38196234/article/details/89568826)

### 开机执行命令

```
环境
Ubuntu版本：Ubuntu 20.04.1 TLS
虚拟机：VMware Fusion 11/VMware Fusion 12
```

编辑文件`/etc/rc.local`，这是一个“只读”文件，需要用`sudo`权限来修改，执行命令：

```shell
sudo vim /etc/rc.local
```

在文件底部写入需要执行的命令，例如：

```shell
#!/bin/bash
sudo vmhgfs-fuse .host:/ /mnt/hgfs -o subtype=vmhgfs-fuse,allow_other,nonempty 
```

保存后重启，如果命令没有如期执行，需要设置一下文件`/etc/rc.local`的权限，执行下述命令：

```shell
sudo chmod &#43;x /etc/rc.local
```

参考：[Linux 开机执行命令](https://blog.csdn.net/qq292913477/article/details/81779787)

### 其他问题

[Ubuntu16.04桌面突然卡住怎么办？](https://blog.csdn.net/hautxuhaihu/article/details/78924926)


---

> Author: [Hu Xin](https://star927.github.io/)  
> URL: http://localhost:1313/posts/ubuntu/  

