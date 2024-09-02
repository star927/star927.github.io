# Mac Notes


## Tips

###  Homebrew

brew是mac系统中程序包的管理程序，通过brew安装的程序默认都是`/opt/homebrew/Cellar`下，然后在`/opt/homebrew/bin`下创建对应的软链接来使用的。用官网的命令安装失败，可参见清华源官网安装方法。

Homebrew/Linuxbrew 镜像使用帮助：&lt;https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/&gt;

Homebrew-bottles 镜像使用帮助：&lt;https://mirrors.tuna.tsinghua.edu.cn/help/homebrew-bottles/&gt;

临时使用: `export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles`

| 常用命令                               |                                        |
| -------------------------------------- | -------------------------------------- |
| brew update                            |                                        |
| brew install packageName1 packageName2 |                                        |
| brew uninstall packageName             |                                        |
| brew remove packageName                |                                        |
| brew list                              |                                        |
| brew info packageName                  |                                        |
| brew search packageName                |                                        |
| brew outdated                          | 查看可升级的包                         |
| brew upgrade packageName               | 升级某一个包，后面不接包名则升级所有包 |
| brew cleanup -n                        | 查看可清除的软件和可升级的软件         |
| brew cleanup                           | 清除所有老版本的软件及一些无用软链接等 |
| brew link packageName                  | 给对应软件创建软链接                   |
| brew leaves                            | 列出所有没有依赖其他包的已安装软件包   |
| brew deps packageName                  | 查看该包所依赖的包，可选参数--tree     |
| brew uses --installed packageName      | 查看该包被哪些已安装的包所依赖         |

Homebrew相关命令：[Mac软件包管理神器Homebrew](https://www.jianshu.com/p/3016f1897e31)

brew-cask：
https://github.com/Homebrew/homebrew-cask
https://github.com/buo/homebrew-cask-upgrade

###  软件数据缓存路径

```
~/Library/Containers
~/Library/Application Support
/Library/Application Support
~/Library/LaunchAgents
/Library/LaunchAgents
/Library/StartupItems
~/Library/Caches
```

微信文件缓存路径：`/Users/star/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/2.0b4.0.9/8734c5845659e8690499560d9ae8b641/Message/MessageTemp`

###  启动台

####  已安装应用启动台不显示

```sh
defaults write com.apple.dock ResetLaunchPad -bool true; killall Dock
```

这将回到MacOS应用图标默认布局，比如原来归类好的图标整理，执行后，会全部打乱，但是之前不出现的APP应用，现在可以显示了。

####  启动台有残留图标

```sh
defaults write com.apple.dock ResetLasunchPad -bool true; killall Dock
```

应用程序卸载后，启动台中仍有残留图标，无法移动到废纸篓，可使用该命令。

####  重置启动台

```shell
defaults delete com.apple.dock; killall Dock
```

此命令也会重置触发角

### 环境变量

#### shell类型

- 交互式Shell：用户通过终端与Shell直接交互，输入命令并立即获得反馈。
- 非交互式Shell：Shell在没有用户直接交互的情况下运行，通常用于脚本执行。比如通过`sh`命令执行脚本
- 登录Shell，当用户通过终端或远程连接（如 SSH）登录系统时启动的Shell。终端新建标签页也是一个新的登录shell
- 非登录式Shell：在用户已经登录系统后，通过终端或图形界面启动的Shell。比如在当前终端窗口通过`zsh`等命令打开的终端

#### 终端配置文件

- `/etc/zprofile`：系统范围的登录shell设置，仅在登录shell会话中加载。
- `/etc/zshrc`：系统范围的交互式shell设置，对所有用户的交互式shell会话都有效。
- `~/.zprofile`：用户级登录shell设置，当前用户每次启动一个新的登录shell时加载。
- `~/.zshrc`：用户级交互式shell设置，当前用户每次启动一个新的交互式shell时加载。

通常只对`~/.zprofile`和`~/.zshrc`做些修改，当打开一个登录交互式shell（比如新的终端窗口或标签页），先加载`~/.zprofile`后加载`~/.zshrc`。同一环境变量，被多次设置，以最后一次设置的值为准。

&gt; [!IMPORTANT]
&gt;
&gt; 比如`~/.zprofile`文件中其中一行命令是`export PATH=&#34;/opt/homebrew/opt/llvm/bin:$PATH&#34;`，现在将这一行注释掉，不新建终端窗口而是运行`source ~/.zprofile`，效果是当前终端窗口把`~/.zprofile`中的命令在当前环境下再运行一遍，所以`PATH`变量中依旧在路径`/opt/homebrew/opt/llvm/bin`。所以此时应该新建窗口而不是运行`source`命令。

#### 常见环境变量

- `PATH`：该变量指定了可执行文件的搜索路径。比如运行命令`make`，系统会依次从`PATH`变量指定的路径中搜索可执行文件`make`，直到找到第一个名为`make`的可执行文件。现安装了新版本的`make`，路径是`/opt/homebrew/opt/make/libexec/gnubin`，可在终端配置文件（如zsh的`~/.zprofile`）添加`export PATH=&#34;/opt/homebrew/opt/make/libexec/gnubin:$PATH&#34;`，也就是将该路径放到原`PATH`变量的前面，这样之后运行`make`命令是自己安装的新版本的`make`。

  通常运行完`brew install`命令或者运行`brew info`命令，在输出结果中有时可以看到有提示需要某些路径添加到`PATH`变量中。也有些软件会自动在`PATH`中的某个路径中创建相关可执行文件的软链接，不需要再修改`PATH`变量了。

###  创建Unix可执行文件

如创建一个无后缀文件`~/my-test`，在终端执行完命令`sudo chmod u&#43;x ~/my-test`后，`my-test`文件就变成了Unix可执行文件类型（可用文本编辑器进行编辑）。

若在命令行运行`my-test`命令，需带上`my-test`命令的文件路径；即使`my-test`在当前文件夹下，直接执行命令my-test也没有用。

&gt; test是shell内置命令，测试自己创建的Unix文件时，最好不要用test来命名

为了可以直接在终端执行命令`my-test`，可以将`my-test`放到`/usr/local/bin`等文件夹下；当然，可以创建一个文件夹专门来存放自定义的Unix可执行文件，如`~/diy_bin`，那么只需在文件`~/.zprofile`里添加一行`export PATH=~/diy_bin:$PATH`，所有自定义的命令就可以直接在命令行使用了

#### 实例：自定义以实现快捷激活Python虚拟环境

Python使用虚拟环境见[使用虚拟环境](#1.1.2-使用虚拟环境)

方便起见，可以将所有创建的Python虚拟环境放在文件夹`~/.venv`下，那么激活名称为`venv-name`的虚拟环境的命令就是`source ~/.venv/venv-name/bin/activate`，该命令稍显复杂，下面用更简洁的命令实现激活虚拟环境

创建一个无后缀文件，并不需要，如起名为`activate-venv`，写入以下内容：

```shell
source ~/.venv/${1}/bin/activate
```

此后，需要激活名称为`venv-name`的虚拟环境执行命令`source activate-venv venv-name`就可以。（当然，如果`activate-venv`文件不在当前文件夹目录下，将命令中的`activate-venv`改成其文件路径即可，例`source ~/activate-venv venv-name`）

**附加说明：**

一个最直接的想法是执行命令`sudo chmod u&#43;x ~/activate-venv`，将其变成Unix可执行文件类型，那么在命令行执行命令`activate-venv venv-name`就可以激活对应的虚拟环境。

但是实际发现操作发现这样并不能达到预期的效果，原因大致可描述为：执行命令`activate-venv venv-name`后，系统相当于是后台创建了一个新的命令行窗口，在该命令行窗口执行完`activate-venv venv-name`所有内容后，将该窗口关闭，所以当前我们所在的窗口看不到命令执行的效果。

可以创建一个Unix可执行文件my-test，写入以下内容：

```shell
cd ~/Python
open .
echo `pwd`
```

在终端执行命令`my-test`，会发现`~/Python`文件夹在访达中被打开，终端输出了`/Users/star/Python`，但是终端的文件路径并没有切换到`~/Python`；所以其实相当于是系统在后台新建的一个窗口里执行了命令`my-test`，只是把一些打印信息和一些实际性的操作（如open）呈现给用户。

所以执行命令`activate-venv venv-name`相当于系统在后台一个窗口激活了`venv-name`虚拟环境，命令执行完后关闭了，用户所在的命令行里也就看不到`venv-name`被激活。

因此，可以采用`source self-defined-command parameters`的方式来实现预期的效果

参考：[Bash技巧：一个在不同目录之间直接来回快速 cd 的Shell脚本](https://segmentfault.com/a/1190000025190817)

###  url文件

创建一个后缀为`.url`的文本文件，写入以下内容：

```
[InternetShortcut]
URL=https://en.wikipedia.org/wiki/URL
```

&gt; [!CAUTION]
&gt;
&gt; 在命令行`open -e file.url`命令可以用文本编辑器打开`url`文件，但是比如`url`文件中的内容如下
&gt;
&gt; ```
&gt; [InternetShortcut]
&gt; URL=
&gt; ```
&gt;
&gt; 此时用`open`命令打开`url`文件会报错

###  librsvg

```shell
brew install librsvg
rsvg-convert in.svg --page-height 512 --page-width 512 -h 512 --left 45 -b white -o out.png
rsvg-convert in.svg -f pdf -o out.pdf
```

###  icns

在访达中选择一个应用，右键`显示包内容`，进入`Contents/Resources/`文件夹，即可看到该软件相关的`icns`文件。用`预览`打开`icns`文件，可导出成`png`等格式。下面是制作`icns`文件的过程

```shell

sips -z 16 16     icns.png --out temp.iconset/icon_16x16.png
sips -z 32 32     icns.png --out temp.iconset/icon_32x32.png
sips -z 128 128   icns.png --out temp.iconset/icon_128x128.png
sips -z 256 256   icns.png --out temp.iconset/icon_256x256.png
sips -z 512 512   icns.png --out temp.iconset/icon_512x512.png

sips -z 32 32     icns.png --out temp.iconset/icon_16x16@2x.png
sips -z 64 64     icns.png --out temp.iconset/icon_32x32@2x.png
sips -z 256 256   icns.png --out temp.iconset/icon_128x128@2x.png
sips -z 512 512   icns.png --out temp.iconset/icon_256x256@2x.png
sips -z 1024 1024   icns.png --out temp.iconset/icon_512x512@2x.png

iconutil -c icns temp.iconset -o icns.icns
```

- 文件夹必须带`.iconset`后缀，文件夹下的文件名也必须是`icon`，文件夹必须在执行命令前创建好
- 关闭该应用，将应用从原文件夹中移出再打开，然后移回原文件夹后在打开，最后重启“访达”即可

https://www.macappbox.com/a/400.html

https://stackoverflow.com/questions/31632304/iconseterror-failed-to-generate-icns

### 推出U盘

&gt; 磁盘“SanDisk”没有被推出，因为一个或多个程序可能正在使用它。

[官方方法](https://support.apple.com/zh-cn/guide/mac-help/mchlp1285/mac)：退出登录、关机。时间成本更高，可先尝试下述方法。

解决步骤：先确定使用该磁盘的进程，退出该进程再尝试推出U盘

方法一：使用命令`lsof`，如下，可看到使用U盘的进程的PID

```shell
star@MacBookAir: ~/Downloads/Movies/temp $ lsof /Volumes/SanDisk 
COMMAND   PID USER   FD   TYPE DEVICE  SIZE/OFF   NODE NAME
QuickLook 632 star    3r   REG   1,21 904373191 280781 /Volumes/SanDisk/Movies/test.mp4
```

方法二：先使用`df -lh`查看U盘的盘符，再使用`diskutil umount`推出U盘即可看到正在使用该U盘的进程的PID

```shell
star@MacBookAir: ~/Downloads/Movies/temp $ df -lh
Filesystem        Size    Used   Avail Capacity iused ifree %iused  Mounted on
...
/dev/disk4s1     117Gi   113Gi   3.6Gi    97%       1     0  100%   /Volumes/SanDisk
```

```shell
star@MacBookAir: ~/Downloads/Movies/temp $ diskutil umount /dev/disk4s1 
Volume SanDisk on disk4s1 failed to unmount: dissented by PID 632 (/System/Library/Frameworks/QuickLookUI.framework/Versions/A/XPCServices/QuickLookUIService.xpc/Contents/MacOS/QuickLookUIService)
Dissenter parent PPID 1 (/sbin/launchd)
```

可能用上述两个方法并没有发现有进程使用U盘，那就重启电脑后再推出U盘。

### 查看文件是否正在被使用

&gt; [!NOTE]
&gt;
&gt; 该小节所说的文件是不仅仅指的是普通文件，也包括目录、套接字文件、字符设备、块设备等特殊文件，是一个更广泛的概念

#### lsof和fuser

`lsof`和`fuser`都可以查看文件是否正在使用，但有一定的局限性。比如文件`/tmp/my_unix_socket`的真实路径是`/private/tmp/my_unix_socket`，用`lsof`和`fuser`可以看出`/tmp/my_unix_socket`正在使用，但不能看出`/private/tmp/my_unix_socket`正在使用中，如下：

```shell
star@MacBook-Air: ~ $ lsof /tmp/my_unix_socket
COMMAND     PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
socket_un 10413 star    3u  unix 0x8c48f298d8f4ebca      0t0      /tmp/my_unix_socket
star@MacBook-Air: ~ $ lsof /private/tmp/my_unix_socket
star@MacBook-Air: ~ $ fuser /tmp/my_unix_socket
/tmp/my_unix_socket: 10413
star@MacBook-Air: ~ $ fuser /private/tmp/my_unix_socket
/private/tmp/my_unix_socket: 
```

#### psutil

```python
def is_path_in_use(path):
    for proc in psutil.process_iter(attrs=[&#34;pid&#34;, &#34;name&#34;]):
        try:
            for file in proc.open_files():
                if file.path == path:
                    return True
        except ...
```

以`Google Chrome`进程为例，可以使用`lsof &#34;/Applications/Google Chrome.app/Contents/MacOS/Google Chrome&#34;`命令或者活动监视器APP来查看`PID`。运行`lsof -p PID`命令可看到结果有几百项，用`psutil`的`open_file()`函数可以获得一个包含文件的`FD`和`NAME`的列表，将`lsof`和`open_file()`的结果中`FD`和`NAME`一样的条目视为同一项，（`lsof`的`FD`可能会尾随一个字母，写程序对比结果时需注意）可以发现：

- `ope_file()`函数获得的文件列表是`lsof`结果的真子集
- `lsof`命令的结果包含的列有`COMMAND,PID,USER,FD,TYPE,DEVICE,SIZE/OFF,NODE,NAME`，其中`TYPE`即为文件的类型。`open_file()`函数得到所有文件，参照`lsof`的结果，这些文件的类型都是`REG`，即普通文件，但并不包含`lsof`结果中的所有`REG`类型的文件。[open_file()](https://psutil.readthedocs.io/en/latest/#psutil.Process.open_files)函数的官方文档的描述是`Return regular files opened by process as a list...`，这里提到的是`regular files`，而`lsof`也恰好显示`open_file()`所列文件的类型都是`REG`。

#### fcntl

```python
def is_path_in_use(path):
    try:
        with open(path, &#34;r&#34;) as file:  # open 函数不支持打开 socket 等特殊类型的文件
            fcntl.flock(file, fcntl.LOCK_EX | fcntl.LOCK_NB)  # 尝试获取独占锁
            fcntl.flock(file, fcntl.LOCK_UN)  # 如果成功，释放锁
            return False  # 文件未被使用
    except ...
```

#### 不同方法对比

下面是几种正在使用中的文件，不同方法判断出来的结果

| 正在使用中文件                                               | lsof | psutil | fcntl |
| ------------------------------------------------------------ | ---- | ------ | ----- |
| 一个socket类型的文件，使用Unix域socket通信的进程运行时使用的就是该类文件 | True | False  | False |
| 一个可执行文件                                               | True | False  | False |
| 一个普通文件，正在用`Python`的`open`函数打开                 | True | True   | False |

#### 小结

用`Python`判断路径是否在使用中最好的方法是使用`lsof`命令:

```python
def is_path_in_use(path):
    return os.popen(f&#34;lsof &#39;{path}&#39;&#34;).read() != &#34;&#34;
```

### xcode命令行工具

查看版本

```shell
pkgutil --pkg-info=com.apple.pkg.CLTools_Executables
```

### curl: (7) Failed to connect

```
curl: (7) Failed to connect to raw.githubusercontent.com port 443 after 12 ms: Couldn&#39;t connect to server
```

出现该类问题，可以在`/etc/hosts`文件中添加对应域名的ip地址。例如`https://ip.chinaz.com/`等网站可以查询出域名`raw.githubusercontent.com`的IP地址其中一个是`185.199.110.133`，那么在`/etc/hosts`文件中添加以下内容即可

```
185.199.110.133 raw.githubusercontent.com
```

##  Terminal Configuration

###  设置主题

新建一个主题

背景：`#300A24`,`#2C001E`

字体：`Menlo Regular 13`

文本：

- [x] 使用粗体字
- [x] 允许闪动文本
- [x] 显示ANSI颜色
- [x] 对粗体文本使用亮丽颜色

- 文本：`#FFFFFF`
- 粗体文本：`#FFFFFF`
- 所选内容：`钨黑#424242`

光标：

- [x] 竖条
- [x] 闪动光标

ANSI颜色

- 蓝色，标准：浅蓝色`#0096FF`，明亮：浅蓝色`#0096FF`

###  zsh

配置文件：`~/.zshrc`

####  修改不同类型文件的颜色

```shell
export LS_OPTIONS=&#34;--color=auto&#34; # 如果没有指定，则自动选择颜色
export CLICOLOR=1 #是否输出颜色
export LSCOLORS=&#34;ExGxFxdaCxDaDahbadecex&#34; #指定颜色
```

`LSCOLORS` 变量由22个字母组成，每2个一组，分别代表一种文件类型的文字颜色和背景颜色。这11种文件类型分别为：

- directory（文件夹）
- symbolic link（链接文件）
- socket
- pipe
- executable（可执行文件）
- block special
- character special
- executable with setuid bit set
- executable with setgid bit set
- directory writable to others, with sticky bit
- directory writable to others, without sticky bit

具体的颜色代码为：

| A 粗体黑色 | B 粗体红色 | C 粗体绿色 | D 粗体棕色 | E 粗体蓝色 | F 粗体洋红色 | G 粗体青色 | H 粗体浅灰色 ||
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| a 黑色 | b 红色 | c 绿色 | d 棕色 | e 蓝色 | f 洋红色 | g 青色 | h 浅灰色 |x 默认颜色|

Mac上`LSCOLORS`默认值是`exfxcxdxbxegedabagacad`，参见：https://apple.stackexchange.com/questions/357353/lscolors-and-clicolor-active-by-default-and-unset

####  修改提示符的颜色

```shell
export PROMPT=&#34;%F{green}%B%n@%m: %F{blue}%~ %f%b$ &#34;
```

重启终端，现在的效果：**&lt;font color=green&gt;star@MacBookPro: &lt;/font&gt;&lt;font color=blue&gt; ~/Downloads&lt;/font&gt;** \$ 

`%n`：用户名，即`star@MacBookPro: ~/Downloads $` % 中的`star`部分；

`%m`：电脑名称，即`star@MacBookPro: ~/Downloads $`中的`MacBookPro`部分；

`%~`：当前文件夹路径名，`%~`会显示完整路径名，`%3~`则只会显示三层父级文件路径

`%F{color}`：设置颜色，`color`可以是颜色名称，也可以是0~255区间的[数字](https://robotmoon.com/256-colors)，对应[shell中256配色表](https://www.ditig.com/publications/256-colors-cheat-sheet)

`%B`：粗体

`%f`：恢复默认颜色

`%b`：字体恢复正常宽度

另外`PROMPT`中`%n` `%m` `%~`的顺序及出现次数都可自行设置，删除亦可，`PROMPT`中可以自行修改和添加字符

参考：
[macOS 修改终端Terminal的颜色设置](https://blog.csdn.net/u010391437/article/details/75126310)
[让MacOS的终端靓起来，给MacOS终端CLI添加颜色](https://zhuanlan.zhihu.com/p/60880207)
[自定义 zsh 提示（配置PROMPT或PS1）](https://www.jianshu.com/p/dcf39bc7821a)
[Prompt Expansion](https://zsh.sourceforge.io/Doc/Release/Prompt-Expansion.html)
[教你写一个 Zsh 主题](https://prinsss.github.io/zsh-prompt-theme-customization/)

### 其它配置

####  alias

&gt;  shell built-in command

可利用`alias`，自定义指令的别名。若仅输入`alias`，则可列出目前所有的别名设置。`alias`命令直接在命令行运行，效果仅生效于该终端窗口，若要每次打开终端都生效，可将命令写入`~/.zprofile`等文件中。示例

```shell
alias gcc=&#39;gcc-10&#39;
alias g&#43;&#43;=&#39;g&#43;&#43;-10&#39;
alias ffmpeg-h=&#39;ffmpeg -hide_banner&#39;
alias ffprobe-h=&#39;ffprobe -hide_banner&#39;
```

##  Terminal Command

参考：https://www.runoob.com/linux/linux-command-manual.html

### grep

```sh
grep [options] pattern [files]
# 多个条件，或
grep &#34;word1\|word2&#34;
grep -E &#34;word1|word2&#34;
# 多个条件，且。本质是运行两次grep命令，比如添加参数-n，后一个grep匹配的行号是基于第一个grep命令的结果
grep word1 | grep word2
# 排除文件夹
grep --exclude-dir ~/Typora/Notes -rn 链接 ~/Typora
```

- `-i`: 忽略大小写进行匹配
- `-v`: 反向查找，只打印不匹配的行
- `-n`: 显示匹配行的行号
- `-r`: 递归查找子目录中的文件
- `-l`: 只打印匹配的文件名
- `-c`: 只打印匹配的行数
- `-w` : 只显示全字符合的列
- `-E`: 正则表达式
- `--exclude-dir`: 排除文件夹

### find

```shell
# 当前文件夹下查找包含test的文件
find . -name &#34;*test*&#34;
# 在~路径下搜索，不在~/Library和~/.Trash中搜索。但搜索结果中会包含~/Library和~/.Trash这两项
find ~ -path ~/Library -prune -o -path ~/.Trash -prune -o -type f -name &#34;.DS_Store&#34; &gt; ~/Desktop/draft.txt
```

`-iname`: 忽略大小写

### ps

```shell
ps # 默认只列出当前用户的由终端控制的进程
-a # 其他用户的进程也会列出
-x # 不由终端控制的进程也会列出
-A # 其他用户的进程也会列出，包括由终端终止的进程
-e # 等同于 -A

-f # 会打印每个进程更多的信息
-o # 指定输出格式
-u # 只列出指定用户的进程
u # 会打印每个进程更多的信息, UID以用户名的方式显示，而不是数字

# 组合用法举例
ps aux
ps -ef
ps -eo uid,pid,stat,command

# 对于 Mac, ps -aux 命令会报错, 在 Ubuntu 上 ps aux 与 ps -aux 都可以
```

https://www.runoob.com/linux/linux-comm-ps.html
https://www.cnblogs.com/programmer-tlh/p/11593330.html

### ioreg

查询macbook pro电池的设计容量、当前可用容量、电池损耗情况、当前电量等信息：

```shell
ioreg -rn AppleSmartBattery | grep -i capacity
```

### diskutil

```shell
diskutil list # 查看所有磁盘信息
sudo diskutil umountDisk /dev/diskN  # 取消U盘挂载
sudo diskutil zeroDisk /dev/diskN  # 使用0覆盖所有扇区
sudo diskutil eraseDisk ExFAT ud /dev/disk3  # 格式化为ExFAT格式的名叫ud的新U盘
```

https://blog.csdn.net/chenhao_c_h/article/details/102552874

### zip/unzip

```shell
zip -rv test.zip test
```

`-r`: 递归处理。如果要压缩的是一个文件夹，没有加该参数则压缩的只是该文件夹中的文件，不包含子文件中的文件
`-v`: 显示压缩过程中的更详细的一些信息

```shell
unzip test.zip -d 123
unzip -v test.zip
```

`-d`: 指定解压后的文件所在的目录
`-v`: 查看压缩包，不解压

### du

查看文件夹或文件的大小

```shell
du -h -d 1 .
du -sh # 等效于 du -s -h
```

`-h`: 以`K\M\G`结尾显示文件大小
`-d`: 指定文件夹深度，默认显示该文件夹中所有子文件的大小
`-a`: 显示所有文件夹和文件的大小，默认只显示文件夹的大小
`-s`: 只显示文件夹总的大小，与`-d 0`效果一致

### ipcs/ipcrm

查看/删除系统消息队列、共享内存、信号量等信息

### paste

实现行对行的合并文件，效果如下

```sh
star@MacBookAir: ~/Desktop $ cat file1.txt                 
a
b
c
star@MacBookAir: ~/Desktop $ cat file2.txt                            
1
2
star@MacBookAir: ~/Desktop $ paste -d , file1.txt file2.txt           
a,1
b,2
c
star@MacBookAir: ~/Desktop $ paste -s file1.txt file2.txt 
a	b	c
1	2
```

`-d`: 间隔字符，默认是`tab`键`\t`

### cut

提取文件每行指定内功，如下

```shell
star@MacBookAir: ~/Desktop $ cat test.txt
2308:frame,1,30.000000,I
2769:frame,1,36.000000,I
star@MacBookAir: ~/Desktop $ cat test.txt | cut -d , -f 1 -f 3
2308,30.000000
2769,36.000000
star@MacBookAir: ~/Desktop $ cat test.txt | cut -d , -f -3 
2308:frame,1,30.000000
2769:frame,1,36.000000
star@MacBookAir: ~/Desktop $ cat test.txt | cut -d , -f 3-
30.000000,I
36.000000,I
star@MacBookAir: ~/Desktop $ cat test.txt | cut -d , -f 2,3
1,30.000000
1,36.000000
```

```shell
test.txt | cut -c 4  # 第4个字符
test.txt | cut -c -4  # 前4个字符
test.txt | cut -c 4-  # 第4个至最后一个字符
test.txt | cut -c 4-10  # 第4到第10个字符
# -d参数同理
```

`-d,-f`: 两者需搭配使用，`-d`指定分割符，`-f`指定显示分割后哪几列
`-c`: 按字符进行提取
`-d`: 按字节进行提取

### inode相关

&gt; `ls -i`: 可以查看文件`inode`值和链接数
&gt;
&gt; `stat`: 查看文件`inode`内容

```shell
star@MacBook-Air: ~/Downloads/test $ ls -li
total 24
4669683 -rw-r--r--  2 star  staff    6  4 27 16:57 test-hard-link.txt
4670725 lrwxr-xr-x  1 star  staff   10  4 27 16:57 test-soft-link.txt -&gt; ./test.txt
4669683 -rw-r--r--  2 star  staff    6  4 27 16:57 test.txt
4669461 -rw-r--r--@ 1 star  staff  868  4 27 16:51 test.txt的替身
# 分别表示: inode, 权限, 链接数

star@MacBook-Air: ~/Downloads/test $ stat test.txt   
16777234 4669683 -rw-r--r-- 2 star staff 0 6 &#34;Apr 27 16:57:55 2024&#34; &#34;Apr 27 16:57:53 2024&#34; &#34;Apr 27 16:57:53 2024&#34; &#34;Apr 27 16:51:19 2024&#34; 4096 8 0 test.txt

star@MacBook-Air: ~/Downloads/test $ stat -s test.txt
st_dev=16777234 st_ino=4669683 st_mode=0100644 st_nlink=2 st_uid=501 st_gid=20 st_rdev=0 st_size=6 st_atime=1714208275 st_mtime=1714208273 st_ctime=1714208273 st_birthtime=1714207879 st_blksize=4096 st_blocks=8 st_flags=0

star@MacBook-Air: ~/Downloads/test $ stat -x test.txt
  File: &#34;test.txt&#34;
  Size: 6            FileType: Regular File
  Mode: (0644/-rw-r--r--)         Uid: (  501/    star)  Gid: (   20/   staff)
Device: 1,18   Inode: 4669683    Links: 2
Access: Sat Apr 27 16:57:55 2024
Modify: Sat Apr 27 16:57:53 2024
Change: Sat Apr 27 16:57:53 2024
 Birth: Sat Apr 27 16:51:19 2024
```

### chflags

```shell
# 隐藏文件或目录
chflags hidden /path/to/your/file_or_directory
# 取消隐藏文件或目录
chflags nohidden /path/to/your/file_or_directory
```

### lsof

```shell
lsof -i:8080  # 查看端口8080的使用情况
lsof -p PID  # 列出指定进程ID（PID）打开的文件
lsof /path/to/file  # 列出打开指定文件的进程
lsof -c &#34;string&#34;  # 列出包含指定字符串的进程打开的文件
```

### xargs

```shell
# 前一个命令的输出，作为后一个命令的输入，这时需要用到 xargs
# 对于前一个命令的输出结果，xargs 默认使用空格和换行符作为分隔符，分割后的各项作为后一个命令的输出
find . -name &#34;*.md&#34; | xargs ls -l
# 例如 find 查找出来的各个结果中可能含有空格, 下面这个命令才能达到预期效果
# -print0 表示使用各项分隔符是空字符(ASCII NUL character \0)而不是换行符
# xargs -0 表示 xargs 将使用空字符\0作为分隔符
# -print0 和 xargs -0 通常一起使用，如果不想空格被视作分隔符的话
find . -name &#34;*.md&#34; -print0 | xargs -0 ls -l
```

### env/printenv

```shell
# 列出当前会话中所有的环境变量及其值
env
# 临时将VAR变量的值设置为value，然后执行command命令。
env VAR=value command

# 列出当前会话中所有的环境变量及其值
printenv
# 只输出自定环境变量的值。
printenv PATH
```

## Python

###  Pypi

####  基本使用

pip配置文件的路径：`~/.config/pip/pip.conf`

清华pypi 镜像使用帮助：https://mirrors.tuna.tsinghua.edu.cn/help/pypi/。临时使用：

```sh
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple some-package
```

设置为默认源，执行下述命令：

```shell
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

该命令会在文件`~/.config/pip/pip.conf`中写入下述内容：

```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

| 常用命令                                        |                                                 |
| ----------------------------------------------- | ----------------------------------------------- |
| pip install packageName1 packageName2           |                                                 |
| pip install -r requirements.txt                 | 将需安装的包写入一个txt文件，亦可同时安装多个包 |
| pip uninstall packageName                       |                                                 |
| pip show packageName                            | 显示包的信息                                    |
| pip list                                        |                                                 |
| pip list --outdated                             | 可更新的包                                      |
| pip install --upgrade packageName1 packageName2 | 更新包                                          |
| pip freeze                                      | 列出安装的第三方库                              |
| pip show packageName                            | 查看已安装包的信息                              |

&gt; 删除所有第三方安装包，可用以下方法
&gt;
&gt; pip freeze &gt; packages.txt
&gt; pip uninstall -r packages.txt -y
&gt;
&gt; 参数-y表示默认全部同意，不加该参数则每删除一个包都需要输入一次y

#### pip-autoremove

```shell
pip install pip-autoremove
```

例如`pip unistall jupyter`命令只会删除`jupyter`这一个包；而`pip-autoremove jupyter`命令则可以删除`jupyter`相关的所有包，删除更彻底。

#### pipdeptree

```shell
pip install pipdeptree
```

用于查看已安装包之间的依赖关系

```shell
# 以树状结构的形式列出所有已安装包之间的关系。会重复显示很多内容，比如A依赖B，B依赖一些包，C也依赖B，那么以B为根节点的这个子树既会显示在以A为根节点的这个树上，也会显示在以C为根节点的这个树上，也就是以B为根节点的这个子树会打印多遍，这样打印的结果非非常冗长，不方便查看
pipdeptree

# 打印的格式是 pip freeze 风格
pipdeptree -f
pipdeptree --freeze

# -d 指定树的深度。-d 0 就是不被任何其他包所依赖的包。-d 1 与 pip show 显示的所依赖的包一致
pipdeptree -d 0
pipdeptree -d 1
pipdeptree -d 1 -f

# -p 指定某一个包
pipdeptree -p jupyter -d 1

# json 格式。与直接使用 pipdeptree 一样，会重复显示很多内容
pipdeptree --json-tree

# json格式。显示每个已安装包的所依赖的包，不递归显示依赖的包依赖哪些包，相当于对 pip freeze 中的每个包进行 pip show 。区别于 pipdeptree -d 1，pipdeptree -d 1 是整个依赖树只显示深度为1的结果，所以某些已安装的包不会在输出结果中。
pipdeptree -j

# 反向显示依赖树，即显示每个包被哪些包所依赖
pipdeptree -r

# pipdeptree 的根节点是每个不被任何其他包所依赖的包。pipdeptree -a 的根节点是每个已安装的包
pipdeptree -a

# 生成 mermaid 格式
pipdeptree --mermaid

# 可生成 svg 等格式。需安装 graphviz, pip install graphviz, brew install graphviz
pipdeptree --graph-output svg &gt; ~/Desktop/draft.svg
```

###  设置Python默认版本

在Mac终端输入`python`，默认进入python2.7环境；现将python命令设置为其他版本

例在用brew安装好python@3.8后，在终端执行命令`brew info python@3.8`可看到以下信息：

```
==&gt; Caveats
Python has been installed as
/usr/local/bin/python3

Unversioned symlinks `python`, `python-config`, `pip` etc. pointing to
`python3`, `python3-config`, `pip3` etc., respectively, have been installed into
/usr/local/opt/python@3.8/libexec/bin
```

关注上面的最后一行，将下述命令写入文件`~/.zprofile`即可：

```
export PATH=/usr/local/opt/python@3.8/libexec/bin:$PATH
```

现在执行`which python`，即可得到下面结果：

```
/usr/local/opt/python@3.8/libexec/bin/python
```

本质上就是创建软链接，从输出信息可看出在文件夹`/usr/local/opt/python@3.8/libexec/bin`下已经创建好了对应的软链接，`export PATH=/usr/local/opt/python@3.8/libexec/bin:$PATH`使得该文件中加载的优先级更高，使得系统忽略了`/usr/bin`中的`python`命令(这是系统自带的Python2.7)

###  使用虚拟环境

```shell
# 创建虚拟环境
python -m venv ~/.venv/pytorch    # 最后一个参数是虚拟环境的路径；默认不会复制pip包到虚拟环境
python -m venv --system-site-packages ~/.venv/pytorch    # 会把系统安装的pip包复制到虚拟环境中

# 激活虚拟环境
source ~/.venv/pytorch/bin/activate    # 即虚拟环境里bin文件夹下的activate

# 退出虚拟环境
deactivate
```

如上，可将虚拟环境放在一个隐藏文件夹下，避免无意被修改

虚拟环境的Python版本会与当前使用Python版本相同；如欲创建Python3.9的虚拟环境，在用brew安装好Python3.9后，用命令`python3.9 -m venv testvenv`创建的testvenv虚拟环境的Python版本就是3.9

对于多个Python版本，欲设置默认Python版本可参见[设置Python默认版本](#1.8-设置Python默认版本)

激活虚拟环境的命令稍显复杂，参见[创建Unix可执行文件](#1.9-创建Unix可执行文件)来实现快捷激活虚拟环境

&gt; 创建完Python虚拟环境`~/.venv/pytorch`后，可在`~/.venv/pytorch/bin`文件夹下看到两个软链接`python`和`python3`，它们的原身都是对应Python的安装路径，如用brew安装的Python:`/usr/local/Cellar/python@3.8/3.8.9/Frameworks/Python.framework/Versions/3.8/bin/python3.8`。这意味着如果以后用brew对Python3.8进行了升级，比如升级到了3.8.10版本，这两个软链接文件就失效了，需要重新创建软链接文件`python`和`python3`，使它们的原身指向更新后的python3.8路径。

```shell
rm ~/.venv/pytorch/bin/python ~/.venv/pytorch/bin/python3
rm ~/.venv/tf2/bin/python ~/.venv/tf2/bin/python3
ln -s /usr/local/Cellar/python@3.8/3.8.12_1/Frameworks/Python.framework/Versions/3.8/bin/python3.8 ~/.venv/pytorch/bin/python
ln -s /usr/local/Cellar/python@3.8/3.8.12_1/Frameworks/Python.framework/Versions/3.8/bin/python3.8 ~/.venv/pytorch/bin/python3
ln -s /usr/local/Cellar/python@3.8/3.8.12_1/Frameworks/Python.framework/Versions/3.8/bin/python3.8 ~/.venv/tf2/bin/python
ln -s /usr/local/Cellar/python@3.8/3.8.12_1/Frameworks/Python.framework/Versions/3.8/bin/python3.8 ~/.venv/tf2/bin/python3
```

###  查看python包安装位置

```shell
star@MacBookPro: ~ $ python
Python 3.12.2 (main, Feb 20 2024, 04:30:04) [Clang 14.0.0 (clang-1400.0.29.202)] on darwin
Type &#34;help&#34;, &#34;copyright&#34;, &#34;credits&#34; or &#34;license&#34; for more information.
&gt;&gt;&gt; import numpy
&gt;&gt;&gt; numpy
&lt;module &#39;numpy&#39; from &#39;/usr/local/lib/python3.12/site-packages/numpy/__init__.py&#39;&gt;
```

###  Python第三方库

####  opencv-python

用pip可安装下面四个版本的opencv：

1. opencv-python：这个存储库只包含OpenCV库的主要模块。
2. opencv-contrib-python ： 该库包含主要模块与contrib模块。
3. opencv-python-headless：与opencv-python相同但没有GUI功能。适用于无界面系统。
4. opencv-contrib-python-headless：与opencv-contrib-python相同，但没有GUI功能。适用于无界面系统。

当opencv与PyQt5发生冲突时(类似如下)，可考虑安装无GUI功能的opencv，这样就不会发生冲突了

```shell
objc[56361]: Class QMacAutoReleasePoolTracker is implemented in both /usr/local/lib/python3.8/site-packages/PyQt5/Qt/lib/QtCore.framework/Versions/5/QtCore (0x10e97f178) and /usr/local/lib/python3.8/site-packages/cv2/.dylibs/QtCore (0x113e21700). One of the two will be used. Which one is undefined.
…………
```

参考：
[pip 安装 opencv](https://zhuanlan.zhihu.com/p/73191013)
[macos 中先安装了pyqt5再安装opencv出现的QtCore冲突问题](https://blog.csdn.net/qq_41429036/article/details/104883231)

## C/C&#43;&#43;

### 编译器

#### GCC/Clang/LLVM

- GCC（GNU Compiler Collection）是一个由GNU项目开发的编译器集合，它支持多种编程语言，包括C、C&#43;&#43;、Objective-C、Fortran、Ada等。GCC最初是为C语言设计的，但随着时间的发展，它已经扩展到支持多种语言。

- LLVM（Low Level Virtual Machine）是一个编译器和工具链技术的集合，它提供了编译器的中间表示(IR)、优化器和代码生成器。LLVM的设计允许它作为多种语言的编译器后端，并且可以用于编译期、链接期和运行时的优化。

- Clang是LLVM项目的一部分，它是C、C&#43;&#43;、Objective-C和Objective-C&#43;&#43;语言的编译器前端。Clang使用LLVM作为其后端，因此它能够利用LLVM提供的各种优化和代码生成技术。Clang的一个主要优势是它的模块化设计，这使得它更容易集成到不同的工具和环境中，并且它的错误信息通常被认为比GCC更清晰和易于理解。

三者之间的关系可以概括为：

- GCC是一个独立的编译器集合，它有自己的前端和后端。
- LLVM是一个编译器基础设施项目，提供了编译器的中间表示和优化器等组件。
- Clang是LLVM的前端，专门用于C、C&#43;&#43;和Objective-C等语言的编译，它使用LLVM的后端进行代码优化和生成。

#### Mac上的编译器

- Mac自带的是Clang，可以通过Homebrew额外安装LLVM和GCC
- Mac自带的`gcc`和`g&#43;&#43;`命令，通过`gcc --version`和`g&#43;&#43; --version`就可以发现，这两命令实际上也是使用的Clang，不是GCC。自带的`gcc`命令不是`clang`的软链接，实际编译运行代码发现二者也不一样

#### 头文件搜索路径

使用下述命令可以查看C/C&#43;&#43;编译器的头文件搜索路径

```shell
clang -v -x c -E /dev/null
clang&#43;&#43; -v -x c&#43;&#43; -E /dev/null
gcc -v -x c -E /dev/null
g&#43;&#43; -v -x c&#43;&#43; -E /dev/null
```

可以在运行结果中看到有下面两行

```
#include &#34;...&#34; search starts here:
#include &lt;...&gt; search starts here:
```

此外，可以通过设置环境变量`C_INCLUDE_PATH`和`CPLUS_INCLUDE_PATH`来添加额外的头文件搜索路径，[How to add a default include path for GCC in Linux?](https://stackoverflow.com/questions/558803/how-to-add-a-default-include-path-for-gcc-in-linux)

```shell
export CPLUS_INCLUDE_PATH=/diy/include
export C_INCLUDE_PATH=/myself/include
```

###  第三方C&#43;&#43;库

比如通过Homebrew安装了Eigen，在代码中使用了相关头文件后，编译报错找不到该头文件，需要手动将该软件的头文件目录添加到编译器的某个头文件搜索目录中。

在`brew install eigen`命令运行完成后，或者使用`brew info eigen`命令可以看到安装路径，在该软件的安装路径下，可以找到头文件所在的文件夹。将该文件夹在编译器的某个头文件搜索目录中创建一个软链接即可。

##  自动操作

shell命令参考：[Linux shell 之 提取文件名和目录名的一些方法](https://blog.csdn.net/ljianhui/article/details/43128465)

创建的文件默认储存路径: `~/Library/Services`

###  用特定软件打开文件(夹)

打开**自动操作.app**，**新建文稿** - **快速操作**，选择**运行Shell脚本**，**工作流程收到当前** - **文件或文件夹**，**位于** - **放达.app**，**Shell**选择**/bin/zsh**即可，**传递输入** - **作为自变量**，写入以下代码：

```shell
for f in &#34;$@&#34;
do
	open -a &#34;Visual Studio Code&#34; &#34;$f&#34;
done
```

自定义名称保存后，即可实现右键用`Visual Studio Coe`打开文件夹。

###  双击打开ipynb文件

利用**自动操作.app**实现双击`ipynb`文件在浏览器中打开

**自动操作** - **新建文稿** - **应用程序**，选择**运行shell脚本**，**传递输入** - **作为自变量**，写入以下代码：

```shell
variable=&#34;&#39;$1&#39;&#34;
the_script=&#39;tell application &#34;terminal&#34; to do script &#34;jupyter notebook &#39;
osascript -e &#34;${the_script}${variable}\&#34;&#34;
```

自定义名称保存，将刚刚创建的应用程序设置为打开`ipynb`文件的默认应用程序即可。
另外，在程序台中直接打开刚创建的应用程序，也会在浏览器中打开`jupyter notebook`

根据需要，可在代码`jupyter notebook `后加上`--notebook-dir=~ `

###  右键解压缩rar

Mac默认支持.zip文件的解压缩，但不支持.rar文件，具体操作见[rar&amp;unrar:解压缩](#4-rar&amp;unrar:解压缩)

每次进入终端进行解压缩稍显繁琐，可在 **自动操作.app** 中新建快捷操作

打开**自动操作.app**，**新建文稿** - **快速操作**，选择**运行Shell脚本**，**工作流程收到当前** - **文件或文件夹**，**位于** - **放达.app**，**Shell**选择**/bin/zsh**即可，**传递输入** - **作为自变量**，写入以下代码：

```shell
for f in &#34;$@&#34;
do
  PATH=&#34;/usr/local/bin:$PATH&#34;
  unrar x $f $(dirname ${f})
done
```

自定义名称保存后，即可实现右键解压rar文件。但有时会提示发生了错误解压失败，这说明当前文件夹内有文件与压缩包内文件重名。

对于压缩，同以上步骤，写入下列代码：

```shell
for f in &#34;$@&#34;
do
	PATH=&#34;/usr/local/bin:$PATH&#34;
	rar a $(echo $f | cut -d . -f1).rar $f
done
```

此时右键进行rar压缩会创建一个与文件名(文件夹名)相同的rar压缩包，但选择多个文件进行压缩时，得到的是多个压缩文件而非一个。

### 转换图片格式-todo

打开**自动操作.app**，**新建文稿** - **快速操作**

https://sspai.com/post/66511

### 新建文件

```shell
tell application &#34;Finder&#34;
	set pathList to (quoted form of POSIX path of (folder of the front window as alias)) -- 访达当前窗口的文件夹的路径
end tell
set filePath to pathList &amp; &#34;未命名.txt&#34;
set fileExists to (do shell script &#34;if [ -e &#34; &amp; filePath &amp; &#34; ]; then echo true; else echo false; fi&#34;) -- 用shell脚本判断文件是否存在
if fileExists is equal to &#34;true&#34; then
	display alert &#34;新建文件失败！&#34; message filePath &amp; &#34;已经存在！&#34; as critical
else
	do shell script &#34;touch &#34; &amp; filePath
end if
```



##  解压缩

###  rar&amp;unrar

Mac默认支持`.zip`文件的解压缩，但不支持`.rar`文件

####  下载

到[**RARLAB**](https://www.rarlab.com/download.htm)官网下载rar包[**RAR 5.91 for macOS (64 bit)**](https://www.rarlab.com/rar/rarosx-5.9.1.tar.gz)

####  安装

将下载的`.tar.gz`压缩包解压得到一个文件夹，打开终端进入该文件夹，执行以下命令进行安装：

```
sudo install -c -o $USER rar /usr/local/bin/sudo install -c -o $USER unrar /usr/local/bin
```

####  解压缩命令

解压：`unrar x fileName.rar `后面也可接文件路径解压到指定地方

压缩：`rar a fileName.rar file1 file2 folder1 folder2`将多个文件和文件夹压缩成一个文件

####  新建右键快捷操作

见[右键解压缩rar](#33-右键解压缩rar)

###  unar

`Mac`自带的`unzip`命令查看与解压压缩包时，命令行中部分中文的输出会显示乱码。而下面提到的`lasr`和`unar`可以通过指定编码方式以正确显示中文。

```shell
brew install unar
```

安装完成后会得到两个命令行程序：
`lsar`: 查看压缩包内容，不解压
`unar`: 解压压缩包

```shell
lsar -l -e utf-8 test.zip
```

`-l`: 打印压缩包中文件的详细信息
`-L`: 打印压缩包中文件的更详细信息
`-e`: 指定编码方式

```shell
unar test.zip -o folder -e utf-8
```

`-o`: 指定输出目录
`-e`: 指定编码方式

##  you-get

使用you-get需要安装`ffmpeg`，执行下述命令进行安装：

```
brew install you-getbrew install ffmpeg
```

视频下载命令：
`you-get url`下载`url`网址对应的视频
`you-get -o path url`下载视频到指定路径
`you-get -i url`显示视频详情，进而可选择不同清晰度进行下载
`you-get --format=格式 url`下载对应清晰度视频，默认下载最高清晰度
`you-get -l url`批量下载一个列表的全部视频

- 有时报错，给`url`加引号即可

GitHub网址：https://github.com/soimort/you-get

##  svn

`git clone`是用于下载整个项目文件，下载`github`上某个特定文件夹，可用下述方法：

例：对于网址`https://github.com/lib-pku/libpku/tree/master/folder1/folder2`，将其中的`/tree/master/`改成`/trunk/`，即`https://github.com/lib-pku/libpku/trunk/folder1/folder2`，后再执行下列命令，即可下载`folder2`文件夹下的所有文件：

```
svn checkout https://github.com/lib-pku/libpku/trunk/folder1/folder2
```

对非`master`分支，同理；若出现下述警告：`svn: error: The subversion command line tools are no longer provided by Xcode.`，则用`brew`安装`svn`即可。

##  .py文件转化成.app文件

进入终端，依次输入下述命令：

```
pip install py2app
py2applet --make-setup MyApplication.py
python setup.py py2app
```

第一个命令会在当前文件夹下创建`bulid`和`dist`两个文件夹以及`setup.py`文件，运行完第二个命令，即可在`dist`文件夹下看到转换后的`.app`文件，如果该`.app`文件打开出现错误，可在第二条命令后加参数`-A`试试，但此时生成的应用会依赖文件`MyApplication.py`，若修改该文件，应用会受到相应的影响。详见官网：https://py2app.readthedocs.io/en/latest/tutorial.html

附：Mac自带python2.7，命令行中`python`命令默认打开python2.7，python3.x版本应使用命令`python3`

##  IJavascript

###  安装

执行下列命令进行安装，参考自官网https://www.npmjs.com/package/ijavascript

```
brew install pkg-config node zeromqpip install --upgrade pyzmq jupyternpm install -g ijavascriptijsinstall
```

成功的话，打开`jupyter notebook`在**新建**下，可看到`Javascript(Node.js)`，新建一个文件，打开即可在其中运行`javascript`；用命令`ijsnotebook`也可以启动`jupyter notebook`

###  可能遇到的问题

####  npm安装ijavascript失败

npm是Node.js默认的、用JavaScript编写的软件包管理系统。

若运行`npm install -g ijavascript`出现错误提示`NPM Error：gyp: No Xcode or CLT version detected!`
在终端运行以下命令：

```
sudo rm -rf $(xcode-select -print-path)xcode-select --install
```

运行完第一条命令，系统自带`g&#43;&#43;`，`git`包括自行安装`brew`等命令都会无法使用，运行这些命令系统会提示需要安装开发者命令行工具，第二条命令也无法运行；系统的**软件更新**里会提示Command Line Tools有更新可安装，如果安装失败，可自行前往 [**官网**](https://developer.apple.com/download/more/) 下载Command Line Tools进行安装，Command Line Tools安装成功后，可再次运行`npm install -g ijavascript`

*ps: 可以试试不运行第一条命令，直接运行第二条命令来安装Command Line Tools*

参考：[NPM Error：gyp: No Xcode or CLT version detected!](https://zhuanlan.zhihu.com/p/105526835)

####  .ipynb无法运行js代码

打开`jupyter notebook`会出现类似如下错误提示，javascript版本的.ipynb文件里js代码无法运行：

```
Error: The module &#39;/usr/local/lib/node_modules/ijavascript/node_modules/zeromq/build/Release/zmq.node&#39;was compiled against a different Node.js version usingNODE_MODULE_VERSION 57. This version of Node.js requiresNODE_MODULE_VERSION 59. Please try re-compiling or re-installingthe module (for instance, using `npm rebuild` or `npm install`).
```

可在终端运行`ijsinstall --spec-path=full`，降低node.js版本(参见[安装指定版本node.js](#91-安装指定版本nodejs)(最新node@14版本降低到node@10)

参考：
https://github.com/n-riesco/ijavascript/issues/151
http://n-riesco.github.io/ijavascript/doc/usage.md.html

##  Node.js

###  安装指定版本node.js

1. 如果之前使用`brew install node`安装过node，需要先执行`brew uninstall node`来移除ndoe.js

2. 运行 `brew search node`查找可使用的node版本

3. 安装你需要的版本, 例 `brew install node@10`
   安装完后，可以看到node@10的安装路径，例`/usr/local/Cellar/node@10/10.22.1`
   自动会在`/usr/local/opt/node@10`创建一个`/usr/local/Cellar/node@10/10.22.1`文件夹的软链接

4. 添加环境变量，添加到用户级环境变量或者添加到系统级环境变量
   
   - `export PATH=&#34;/usr/local/opt/node@10/bin:$PATH&#34;`写入到`~/.zprofile`文件中(用户级系统变量)
   - `/usr/local/opt/node@10/bin`写入到`/etc/paths`文件中(系统级环境变量)，修改该文件需要`sudo`权限
   
   修改后重启终端，输入命令`node -v`可正常执行
   
    替代方案：不修改环境变量，直接执行下述命令在`/usr/local/bin`文件夹下创建软链接亦可，`/node@10/10.22.1`部分因版本而异(执行完 `brew install node@10`最后一行会显示安装路径)
   
   ```
   ln -s /usr/local/Cellar/node@10/10.22.1/bin/node /usr/local/bin/node
   ```
   
   当然，将`/usr/local/Cellar/node@10/10.22.1/bin/node`复制到`/usr/local/bin`下亦可，但没必要，创建软链接即可，打开`/usr/local/bin`文件夹，会看到里面几乎全是软链接

安装完毕后，用`node file.js`命令可执行对应javascript文件，执行命令`node`进入交互模式

安装其他库操作类似，例如`brew install qt`后`qmake`命令不能使用，也需要添加环境变量或添加软链接

参考：[homebrew 安装指定版本node](https://www.jianshu.com/p/c5c298486dbd)

###  node.js里使用d3.js

####  安装相关包

终端执行命令`npm install d3`进行安装，node.js中使用d3.js方式如下

```javascript
var d3 = require(&#34;d3&#34;); var d3 = Object.assign({}, require(&#34;d3-format&#34;), require(&#34;d3-geo&#34;));  // 使用其中几个模块
```

安装好后会在当前文件夹下创建`node_modules`文件夹，这个文件夹是使用d3所必须的，并且**只有在当前文件夹及其子文件夹下上述代码才不会报错**

为了更好的使用d3，还需安装jsdom，用npm安装`npm install jsdom`

安装指定版本的包

```
npm view d3 versionsnpm install d3@5npm ls d3
```

####  使用示例

```javascript
var fs = require(&#39;fs&#39;);var d3 = require(&#39;d3&#39;);var jsdom = require(&#39;jsdom&#39;);var {    JSDOM} = jsdom;var fakeDom = new JSDOM();var body = d3.select(fakeDom.window.document).select(&#39;body&#39;);var svg = body.append(&#34;svg&#34;)    .attr(&#34;width&#34;, 100)    .attr(&#34;height&#34;, 100)    .attr(&#34;xmlns&#34;, &#34;http://www.w3.org/2000/svg&#34;);svg.append(&#34;rect&#34;)    .attr(&#34;width&#34;, 80)    .attr(&#34;height&#34;, 80)    .style(&#34;fill&#34;, &#34;steelblue&#34;);    $$.svg(svg.node().outerHTML);  // 在jupyter notebook中可输出svg图像，在node交互模式中报错fs.writeFileSync(&#34;test.svg&#34;, body.html());  // 保存，输出
```

上述代码运行环境：`jsdom@16.4.0` `d3@6.2.0` `ijavascript@5.2.0`

参考：
[How to use D3 in Node.js properly?](https://stackoverflow.com/questions/9948350/how-to-use-d3-in-node-js-properly)
https://www.npmjs.com/package/d3
https://gist.github.com/kunnix/148eadcfde3e978a1ad1d3ec9e2a7265
[How to output SVG in a Jupyter notebook using jsdom, D3 and IJavascript](https://stackoverflow.com/questions/43488464/how-to-output-svg-in-a-jupyter-notebook-using-jsdom-d3-and-ijavascript)

##  ssh

###  通过ssh访问Linux

在Linux终端执行命令`ifconfig`可看到如下信息：

```
ens33: flags=4163&lt;UP,BROADCAST,RUNNING,MULTICAST&gt;  mtu 1500
        inet 172.16.172.2  netmask 255.255.255.0  broadcast 172.16.172.255
        inet6 fe80::21e1:8759:16b6:f7c8  prefixlen 64  scopeid 0x20&lt;link&gt;
```

从中可以知道ip地址为`172.16.172.2`

再执行命令`sudo apt-get install openssh-server`安装`openssh-server`

最后在Mac终端执行命令`ssh star@172.16.172.2`即可登录Linux服务器（star为Linux用户名）

&gt; Linux在开机的情况下才能通过ssh登录

参考：[Windows下通过ssh连接Linux](https://blog.csdn.net/G_66_hero/article/details/97971023)

##  装系统

###  安装Ubuntu双系统

1. 格式化U盘

进入MAC磁盘工具，将U盘格式化，格式设置为`MS-DOS（FAT）`

2. 制作Ubuntu启动盘

下载balenaEtcher软件来制作启动盘

&gt; 也可以通过命令行来制作启动盘，但该方式制作的速度非常慢

3. 磁盘分区

分出一块磁盘区域用于后续安装Ubuntu，分区磁盘的格式设置为`MS-DOS（FAT）`

4. 安装Ubuntu

重启电脑，按住`option`键，通过U盘启动。进入安装程序后，选择刚刚分区出来的磁盘，然后格式化该磁盘：格式为`ext4`，挂载点为`/`；格式化之后把“用于启动加载程序安装的设备”设置成刚刚格式化的磁盘，后面继续按照安装步骤执行下去即可。

&gt; Ubuntu安装完成后，之后开机默认会进入Ubuntu系统，想进入Mac系统，在开机的时候按住`option`键，可以看到启动盘选择界面，选择Mac对应的磁盘即可。此外，还可以借助第三方工具rEFInd

5. 安装引导工具rEFInd

重启 Mac，按住 `Command&#43;R` 键直到 Apple logo 出现，打开Terminal，在 Terminal 中输入 `csrutil disable`，之后回车重启 Mac。安装完成后，（安装方法可参见下载文件中的readme.txt文件）重启 Mac，按住 `Command&#43;R` 键直到 Apple logo 出现，打开Terminal，在 Terminal 中输入`csrutil enable`

参考：
[Create a bootable USB stick on macOS](https://ubuntu.com/tutorials/create-a-usb-stick-on-macos)
[MacOS&#43;Ubuntu双系统，原来MacBook安装linux也简单！](https://m.vlambda.com/wz_wSZoYlM832.html)
[mac上安装ubuntu双系统教程](http://www.360doc.com/content/17/0520/08/43284313_655470903.shtml)

###  通过U盘重装MacOS

Apple官方网站: [创建可引导的 macOS 安装器](https://support.apple.com/zh-cn/101578)

1. 到App Store下载[macOS Monterey](macappstores://apps.apple.com/cn/app/macos-monterey/id1576738294?mt=12)，下载完后，在`应用程序`文件夹会有`安装macOS Monterey.app`文件。

2. 将U盘插上电脑，执行下述命令

   ```shell
   sudo /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
   ```

   &gt; 其中`MyVolume`是U盘名称，U盘可以不用提前格式化，执行上述命令后，U盘会被格式化为Mac OS 扩展格式。

3. 输入上述命令后，按照提示输入密码和`Y`即可，终端的输出信息如下：

   ```
   star@star-MBP: ~ $ sudo /Applications/Install\ macOS\ Monterey.app/Contents/Resources/createinstallmedia --volume /Volumes/STAR    
   Password:
   Ready to start.
   To continue we need to erase the volume at /Volumes/STAR.
   If you wish to continue type (Y) then press return: Y
   Erasing disk: 0%... 10%... 20%... 30%... 100%
   Making disk bootable...
   Copying to disk: 0%... 10%... 20%... 30%... 40%... 50%... 60%... 70%... 80%... 90%... 100%
   Install media now available at &#34;/Volumes/Install macOS Monterey&#34;
   star@star-MBP: ~ $ 
   ```

##  Typora

手动修改mermaid的版本：

`/Applications/Typora.app/Contents/Resources/TypeMark/lib/diagram/diagram.min.js`换成[mermaid.min.js](https://unpkg.com/browse/mermaid/)文件的内容

参考：[ Typora不支持最新Mermaid语法的解决办法](https://qzy.im/blog/2020/05/typora-integrate-the-latest-version-of-mermaid)

##  Latex

[Latex之安装宏包](https://www.cxymm.net/article/memray/45248259)

https://latex-beamer.com/tutorials/beamer-themes/

使用`minted`包，用`xelatex`编译时需加参数`-shell-escape`

[使用 `minted` 宏包](https://overflow.host/archives/26/#%E4%BD%BF%E7%94%A8-minted-%E5%AE%8F%E5%8C%85)

##  PDFtk

###  安装

官网：&lt;https://www.pdflabs.com/tools/pdftk-server/&gt;，Mac安装`pdf-server`版本，无GUI，命令行工具

可能的报错：（PDFtk版本号过低）

```
pdftk: Bad CPU type in executable
```

解决方案：[How to solve &#34;pdftk: Bad CPU type in executable&#34; on Mac?](https://stackoverflow.com/questions/60859527/how-to-solve-pdftk-bad-cpu-type-in-executable-on-mac)

###  使用示例

#### 书签导出和导入

官网Blog：&lt;https://www.pdflabs.com/blog/export-and-import-pdf-bookmarks/&gt;

```shell
# 导出书签
pdftk input.pdf dump_data output bookmark.txt
# 导入书签
pdftk input.pdf update_info bookmark.txt output output.pdf
```

#### 合并PDF

```shell
pdftk file1.pdf file2.pdf file3.pdf cat output merged.pdf
# 可使用通配符
pdftk *.pdf cat output combined.pdf
```

#### 拆分PDF

将PDF拆分成单独的页面文件

```shell
pdftk input.pdf burst
# 可指定输出文件名
pdftk input.pdf burst output page_%02d.pdf
```

#### 提取PDF中的特定页面

```shell
# 1-10页
pdftk original.pdf cat 1-10 output pages1-10.pdf
# 第1和第5页
pdftk input.pdf cat 1 5 output extracted_pages.pdf
```

##  PDF书签管理

在豆瓣上可以搜到部分书的目录，将目录复制下来写成特定格式的文件就可以使用对应的工具导入书签

###  PDFtk

###  PDF-Bookmark

Github地址：https://github.com/xianghuzhao/pdf-bookmark

### Adobe Acrobat

【页面缩略图】-【选项】-【页面标签】

### 其他

cpdf-binaries: https://github.com/coherentgraphics/cpdf-binaries

## 哔哩哔哩视频下载

### 哔哩哔哩MAC客户端

1. 使用哔哩哔哩MAC客户端下载视频，会得到两个`m4s`文件
2. 用文本编辑器打开这两个`m4s`文件，删除最前面的9个`30`，保存文件
3. 将较大的那个`m4s`文件后缀改成`mp4`即得到视频文件（无声音），将较小的那个`m4s`文件后缀改成`mp3`即得到音频文件
4. 最后合并`mp4`文件和`mp3`文件。用客户端下载视频可以得到原视频封面，可以进一步设置一下合成后的视频的封面

### you-get

但不能下载高清晰度的

### Chrome插件

- NeatDownloadManager：分别下载视频和音频文件，用`FFmpeg`可合并视频文件和音频文件为一个完整的视频
- 猫抓：选择视频文件和音频文件合并下载







---

> Author: [Hu Xin](https://star927.github.io/)  
> URL: http://localhost:1313/posts/mac-notes/  

