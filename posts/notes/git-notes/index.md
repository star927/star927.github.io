# Git Notes


`Git`相关介绍、常用命令总结及使用过程中的遇到的相关问题记录

&lt;!--more--&gt;

## Git相关知识

### Git工作区域

```mermaid
flowchart LR
work[[&#34;`Workspace
工作区`&#34;]]
stage[(&#34;`Stage
暂存区`&#34;)]
repo[(&#34;`Repository
版本库`&#34;)]
remote[(&#34;`Remote
远程仓库`&#34;)]

work--&gt;|git add|stage
stage--&gt;|&#34;`git commit
git commit --amend`&#34;|repo
stage--&gt;|git restore --staged|work
repo--&gt;|git push|remote
repo--&gt;|git reset --soft|stage
repo--&gt;|git reset --mixed|work
repo--&gt;|git commit --amend|repo
remote--&gt;|git fetch|repo
remote--&gt;|git pull| work
remote--&gt;|git clone| work
```

- **工作区**：就是在电脑里能看到的目录。
- **版本库**：工作区有一个隐藏目录`.git`，这个不算工作区，而是 Git 的版本库。
- **暂存区**：英文叫stage或index。对应`.git`目录下的`index`文件。
- **远程仓库**：托管代码的服务器，`Github`等。

### 文件状态

```mermaid
flowchart LR
untracked([untracked])
modified([&#34;`modified
tracked`&#34;])
staged([staged])
committed([committed])
delete[Deletion]
undo[&#34;`Undo changes to
modified files`&#34;]

untracked &amp; modified--&gt;|git add|staged
staged--&gt;|git commit|committed
staged--&gt;|git restore --staged|untracked &amp; modified
modified-.-&gt;|git restore|undo
untracked-.-&gt;|git clean|delete
committed-.-&gt;|git rm|delete
modified &amp; staged-.-&gt;|git rm -f |delete
modified &amp; staged &amp; committed --&gt;|git rm --cached|untracked
```



- **未跟踪（untrack）**：表示文件为新增加的。
- **已修改（modified/tracked）**：表示修改了文件，但还没保存到git仓库中。
- **已暂存（staged）**：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。 
- **已提交（committed）**：表示文件已保存在git仓库中。

## Git命令

| [git add](#git-add) | [git branch](#git-branch) | [git checkout](#git-checkout) | [git cherry-pick](#git-cherry-pick) | [git clean](#git-clean) | [git clone](#git-clone) |
| ------------------------- | ------------------------- | ----------------------------------- | --------------------------- | ----------------------- | ------------------------- |
| [git commit](#git-commit) | [git config](#git-config) | [git diff](#git-diff) | [git fetch](#git-fetch) | [git init](#git-init) | [git log](#git-log) |
| [git merge](#git-merge) | [git mv](#git-mv)               | [git pull](#git-pull)         | [git push](#git-push)               | [git rebase](#git-rebase) | [git reflog](#git-reflog) |
| [git remote](#git-remote) | [git reset](#git-reset)         | [git restore](#git-restore)   | [git revert](#git-revert)           | [git rm](#git-rm)         | [git show](#git-show) |
| [git stash](#git-stash)   | [git submodule](#git-submodule) | [git switch](#git-switch)     | [git tag](#git-tag) |  |  |

多数命令有参数`-v/--verbose`，会打印更详细的信息。

### 相关概念

- `HEAD` 代表了当前工作目录所指向的当前分支的最新提交。`HEAD^`表示上一个版本，`HEAD^^`表示上上一个版本，`^`个数不限，几个`^`表示落后`HEAD`几个版本；`HEAD~5`表示落后`HEAD`5个版本。

- `origin`是一个远程仓库的默认名称，这个名称并不是强制的，它代表了远程仓库的地址。`origin main`和`origin/main`含义相同，表示远程仓库的`main`分支。再比如 `origin/HEAD`表示远程仓库默认分支的最新提交，`origin v1.0.0`表示远程仓库tag为`v1.0.0`的那次提交。
- 上游分支：本地分支一般会与远程仓库的某个分支相关联，关联的这个远程分支就称作是这个本地分支的上游分支。

### git config

Git配置级别主要有以下3类：

1. 仓库级别local【优先级最高】，对应的文件是仓库下的`.git/config`

2. 用户级别global【优先级次之】，对应的文件是`~/.gitconfig`

3. 系统级别system【优先级最低】

```shell
git config -l  # 查看所有配置
git config --local -l # 查看仓库配置
git config --global -l  # 用户全局配置
git config --system -l  # 系统配置
git config --global user.name &lt;name&gt;  # 设置用户名
git config --global user.email &lt;email&gt;  # 设置邮箱
git config --unset config_name  # 删除某个配置
git config --global -e/--edit  # 编辑配置文件，该命令会显示配置文件的路径
git config --global init.defaultBranch main # 修改默认分支
git config pull.rebase false  # 在一个git仓库中，不带--system和--global参数，配置的就是仓库级别
```

### git init

```shell
git init  # 初始化，采用默认分支名称。默认分支名称可通过 git config 来配置
git init -b branch_name  # 初始化，并指定分支名称
```

### git clone

将远程仓库克隆到本地

```shell
git clone url # 克隆某个仓库
git clone url &lt;local_path&gt;  # 克隆的文件放在指定文件夹下
git clone --branch &lt;branch_name/tag_name&gt; url # 克隆某个分支或标签
```

```shell
git clone url --depth 3  # 只下载最近3次的提交历史，下载完后通过 git log 也只会看到最近3次提交记录
```

`git clone`加了参数`--depth`之后，执行`git fetch --unshallow`可获取完整的仓库历史记录。

```shell
git clone --recursive url
```

当使用`git clone`命令克隆一个包含子模块的仓库时，Git会克隆主仓库，但不会自动克隆子模块目录中的内容。子模块目录会保留，但会是空的，或者包含指向提交对象的占位符（通常是一个特殊的提交，表示子模块指向的特定版本）。当在`git clone`命令中加上`--recursive`参数时，Git不仅会克隆主仓库，还会自动地初始化并克隆仓库中所有的子模块。

如果已经克隆了一个仓库但没有使用`--recursive`参数，可以在之后通过`git submodule update --init --recursive`命令来初始化并更新子模块。

### git add

将文件放入暂存区

```shell
git add .  # 将当前文件夹下的文件和文件夹都放入暂存区
git add file1 file2  # 将指定文件/文件夹放入暂存区
```

### git commit

将暂存区中文件提交到版本库

```shell
git commit -m &lt;message&gt;  # 提交暂存区中的文件到版本库
git commit  # 以交互的方式填写提交信息
git commit --amend  # 修改最近一次的提交信息，如果此时暂存区中有文件，则暂存区中的文件也会被提交到版本库
# 该命令仅修改最新提交的用户名和邮箱，比如修改了配置中的 user.name 和 user.email 之后可使用该命令
git commit --amend --reset-author
```

### git push

将版本库中推导远程仓库

```shell
git push  # 将当前分支推到上游分支，当前与上游分支的名称一致才可以使用该命令，否则报错提醒名称不匹配
git push origin branch_name  # 将本地main分支(注意不是当前分支)推到远程仓库指定分支
git push origin &lt;local-branch&gt;:&lt;remote-branch&gt;  # 将本地的指定分支推送到远程仓库的指定分支
git push -f  # 强制推到远程仓库，比如落后远程仓库时强制推到远程仓库，则会使远程仓库的版本回退
git push origin :branch_name  # 删除远端分支
git push origin v1.0.0  # 推送指定标签到远程仓库
git push origin --tags  # 推送所有标签到远程仓库
git push origin :refs/tags/v1.0.0  # 删除远程标签
git push --dry-run  # 模拟推送操作，而不实际将更改推送到远程仓库
```

```
git push --all
```

这个命令会推送所有本地分支到远程仓库，如果远程仓库中已经存在同名分支，它们将被更新；如果不存在，则会在远程仓库中创建与本地分支同名的新分支。各个本地分支是否有上游分支、其上游分支是不是与本地分支同名，这些对该命令都没有影响。

```shell
git push -u origin branch_name
```

将本地`branch_name`分支推到远程仓库的`branch_name`分支上，并设置当前分支的上游分支为远程仓库的`branch_name`分支。

```shell
git push -u origin local-branch:remote-branch
```

将本地`local-branch`分支推到远程仓库的`remote-branch`分支上，并设置当前分支的上游分支为远程仓库的`branch_name`分支。

{{&lt; admonition &gt;}}
先`git branch --set-upstream-to`再`git push`，与`git push -u`某些情况下等效。但是`git branch --set-upstream-to=origin/branch_name`要求`origin/branch_name`是已存在的分支。而`git push -u`对于空仓库也可以，它会为这个空仓库创建这个分支并将本地相关分支推上去，同时设置上游分支。
{{&lt; /admonition &gt;}}

### git remote

```shell
git remote add origin git@github.com:user_name/repository_name.git  # 关联远端仓库
git remote remove origin  # 移除与远端仓库的关联
git remote -v  # 查看远程仓库地址
```

{{&lt; admonition &gt;}}
`git remote add origin`只是关联远程仓库地址，没有获取远程仓库分支的信息；此时运行`git branch -r`就会发现为空（即使关联的是一个非空仓库），运行命令`git branch --set-upstream-to=origin/main`也会报错（即使远程仓库存在`main`分支）。
{{&lt; /admonition &gt;}}

### git fetch

获取远程仓库最新信息。比如远程仓库已经有一些新的提交，`git pull`是直接下载最新代码到本地，`git fetch`不会下载最新的代码，只是获取仓库的最新信息，`git fetch` 之后可通过`git status`看到落后上游分支，也可通过`git log origin/branch_name`查看最新`log`信息。

```shell
git fetch  # 获取当前分支的上游远程仓库（如origin）的最新信息
git fetch --all  # 获取所有配置的远程仓库的最新信息
git fetch origin  # 获取origin这个远程仓库的最新信息
git fetch origin main  # 只获取origin这个远程仓库main分支的信息
```

```shell
git fetch --unshallow
```

比如`git clone --depth 1`只会下载最近一次提交记录，现在需要完整的仓库历史记录，可以使用 `git fetch --unshallow`使其包含完整的提交历史。

### git pull

```shell
git pull  # 拉取上游分支的代码
git pull origin main  # 拉取指定远程仓库的指定分支的代码
```

如果当前分支不存在上游分支，需要先设置一下上游分支再`git pull`，或者用`git pull origin main`指定远程仓库名称和远程分支名称。

```mermaid
%%{init: {&#39;gitGraph&#39;: {&#39;mainBranchName&#39;: &#39;origin/main&#39;}} }%%
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
branch main
commit id: &#34;C3&#34;
checkout origin/main
commit id: &#34;C5&#34;
checkout main
commit id: &#34;C4&#34;
checkout origin/main
commit id: &#34;C6&#34;
checkout main
```

如果远程分支和本地分支处于不同的提交节点，直接`git pull`不行，需指定`git pull`的行为方式

```shell
# 采用 git rebase 的方式合并本地的提交和远程的提交

# 下面两条命令等效
git pull --rebase
git pull --rebase=true
# 或者添加配置设置 git pull 的默认行为，再使用 git pull
git config [--global] pull.rebase true
git pull
```

```shell
# 采用 git merge 的方式合并本地的提交和远程的提交

# 下面两条命令等效
git pull --no-rebase
git pull --rebase=false
# 或者添加配置设置 git pull 的默认行为，再使用 git pull
git config [--global] pull.rebase false
git pull
```

`git pull`过程中可能会遇到冲突。`git pull --rebase`解决冲突的方法与`git rebase`解决冲突的方法一样，`git pull --no-rebase`解决冲突的方法与`git merge`解决冲突的方法一样。

```shell
# 只有当本地分支是当前远程分支的直接祖先时，这个命令才会成功执行。
git pull --ff-only
# 或者添加配置设置 git pull 的默认行为，再使用 git pull
git config [--global] pull.ff only
git pull
```

以参数`--rebase, --no-rebase, --ff-only`的形式指定`git pull`的行为的优先级高于配置文件指定`git pull`的行为。

### git log

```shell
git log  # 查看当前分支的log
git log origin/main # 查看远程main分支的log
git log branc_name file_path # 查看指定分支指定文件的log
git log --pretty=oneline  # 指定输出格式，一行显示一条记录, 完整的commit id
git log --oneline  # 指定输出格式，一行显示一条记录, 简短的commit id
git log --stat  # 会显示哪些文件有修改，修改了多少行或字节(二进制文件)
git log --stat --patch  # 会显示文件具体修改内容
git log --graph --oneline  # --graph显示分支结构
```

```shell
# 相当于 git log --graph --oneline 的进阶版
git log --graph --pretty=&#34;%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ad) %C(bold blue)&lt;%an&gt;%Creset&#34;
```



```mermaid
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
branch dev
commit id: &#34;C3&#34;
commit id: &#34;C4&#34;
checkout main
commit id: &#34;C5&#34;
commit id: &#34;C6&#34;
```

```shell
git log main..dev  # 查看远程dev分支上但不在main分支上的提交，如上图中的C3、C4
git log dev..main  # 查看本地main分支上但不在dev分支上的提交，如上图中的C5、C5
git log main...dev  # 查看两个分支上不同的提交，如上图中的C3、C4、C5、C6
```

### git reflog

```shell
git reflog
```

`git reflog` 显示了你在过去所做的所有Git操作的日志，包括提交、分支切换、重置等。而`git log`是查看提交历史。

### git branch

```shell
git branch  # 列出所有本地分支，当前分支会有显著标记
git branch -r  # 列出所有远程分支
git branch -a  # 列出所有本地分支和远程分支
git branch name  # 创建分支
git branch -d name1 name2  # 删除分支, 当分支上存在未合并的提交就会删除失败
git branch -D name1 name2  # 强制删除分支
git branch -m new_banch_name  # 重命名当前分支，new_banch_name分支已存在则报错
git branch -M new_banch_name  # 强制重命名当前分支，即使new_banch_name分时已存在
```

{{&lt; admonition &gt;}}
远程分支不能像本地分支一样直接重命名，可先用`git push origin :branh_name`删除远程分支，再将本地分支推到远程仓库。
{{&lt; /admonition &gt;}}

```shell
git branch --set-upstream-to=origin/main  # 设置当前分支的上游分支
git branch --set-upstream-to=origin/main local_branch  # 设置指定本地分支的上游分支
git branch --unset-upstream  # 取消当前分支与上游分支(相关联的远程仓库分支)的关联
git branch --unset-upstream local_branch  # 取消指定分支的上游分支
git branch -v  # 查看本地每个分支，包括分支名、分支最新提交的commit-id和commit-message
git branch -vv  # 还会显示每个分支的上游分支名称
```

{{&lt; admonition &gt;}}
`git branch --set-upstream-to=origin/branch_name`要求远程仓库`branch_name`分支必须存在，并且本地有远程仓库`branch_name`分支的信息；也就是说比如通过`git remote add origin`关联了一个包含`branch_name`分支的远程仓库之后，还得使用`git fetch`命令获取`branch_name`分支的信息，这时`git branch --set-upstream-to=origin/branch_name`这条命令才会成功。
{{&lt; /admonition &gt;}}

### git checkout

```shell
git checkout branch_name  # 切换分支
```

{{&lt; admonition &gt;}}
`git checkout branch_name`如果本地分支`branch_name`不存在，但远程仓库分支`branch_name`存在，则会自动创建本地分支`branch_name`并设置上游分支；但如果远程仓库分支`branch_name`也不存在，那么该命令就会报错。
{{&lt; /admonition &gt;}}

```shell
git checkout -b branch_name  # 创建并切换分支，不会设置上游分支，即使远程仓库存在同名分支
```

### git switch

`git switch`专注于切换分支的功能，相比`git checkout`在专注性和安全性方面更胜一筹。切换分支只是`git checkout`的一部分功能。

```shell
git switch branch_name
```

{{&lt; admonition &gt;}}
`git switch branch_name`如果本地分支`branch_name`不存在，但远程仓库分支`branch_name`存在，则会自动创建本地分支`branch_name`并设置上游分支；但如果远程仓库分支`branch_name`也不存在，那么该命令就会报错。
{{&lt; /admonition &gt;}}

```shell
git switch -c branch_name  # 创建并切换分支，不会设置上游分支，即使远程仓库存在同名分支
```

### git tag

```shell
git tag  # 查看所有标签
git tag v1.0.0  # 轻量级标签
git tag -a v1.0.0 -m &#34;version 1.0.0&#34;  # 带注释的标签
git tag -a v1.0.0  # 带注释的标签，接着Git会提示你输入标签消息
git tag -d v1.0.0  # 删除本地标签
```

{{&lt; admonition &gt;}}
`git tag v1.0.0`给当前分支的最新提交添加标签。添加标签时，工作区存在未跟踪的文件、已修改未暂存的文件、暂存区有未提交的文件都没有关系。
{{&lt; /admonition &gt;}}

### git restore

```shell
git restore --staged .  # 将当前文件夹下的暂存区中的文件和文件夹放回工作区
git restore --staged file1 file2  # 将暂存区中的指定文件/文件夹放回工作区
git restore .  # 撤销对于当前文件夹下的已跟踪文件的修改
git restore file1 file2  # 撤销对于指定已跟踪文件的修改
```

### git clean

`git clean` 命令在 Git 版本控制系统中用于移除**当前工作目录**中未跟踪的文件和目录。使用 `git clean` 时需要谨慎，因为它会永久删除这些文件。

- `-f` 或 `--force`：强制执行清理操作，不询问确认。
- `-i` 或 `--interactive`：以交互模式运行，让用户选择要删除的文件。
- `-n` 或 `--dry-run`：模拟执行，显示将要删除的文件列表，但不实际删除它们。
- `-d`：同时删除未跟踪的目录。默认情况下，`git clean` 只删除文件。

```shell
git clean -f
git clean -fd
git clean -fdn
```

### git rm

`git rm`用于将已跟踪的文件变成未跟踪状态或删除已跟踪的文件，未跟踪的文件不能用 git rm 删除, 可用 git clean 命令进行删除。

```shell
git rm file_committed.txt  # 删除版本库中的一个或多个文件
git rm -r dir_committed.txt  # 加参数-r用于删除目录
git rm -f file_modified.txt file_staged.txt  # 删除已修改未暂存或已暂存未提交的文件，需要加参数-f强制删除
# --cached 将文件变成未跟踪状态, 不删除文件
git rm --cached file_committed.txt file_modified.txt file_staged.txt
```

手动删除已跟踪的文件，删除文件的操作记录是在工作区；`git rm`删除文件后，删除文件的操作记录是在暂存区；`git rm`相当于是手动删除文件后并执行`git add`操作。而只是想停止跟踪文件而不删除文件，就可以使用`git rm --cached`。

### git mv

```shell
git mv old_name new_name  # 重名已跟踪的文件或文件夹，并将重命名操作记录到暂存区
```

`git mv`相当于就是手动重命名文件后再`git add`

### git reset

```shell
git reset [--hard --soft --mixed] [branch_name origin/branch_name HEAD^ commit_id tag_name]
```

`git reset --hard`将`HEAD`指针移动到指定的提交，同时丢弃暂存区和工作目录中的所有更改。所有文件的内容与指定的提交保持一致，不会删除未跟踪的文件。

`git reset --soft`将 HEAD 指针移动到指定的提交，但保留暂存区和工作目录的更改。所有文件的内容与`git reset --soft`之前还是一样的，除了`git reset --soft`之前的暂存区和工作目录的更改，其他文件与指定提交间的差异将放到暂存区。

`git reset --mixed`将 HEAD 指针移动到指定的提交，保留工作目录的更改，但清空暂存区。所有文件的内容与`git reset --mixed`之前还是一样的，所有文件与指定提交间的差异都将放到工作区。

`git reset`不带`--soft`、`--mixed`或`--hard`选项，那么默认的行为是`--mixed`。

### git revert

`git revert`用于撤销已提交更改。与 `git reset` 不同，`git revert` 不会改变项目的提交记录，而是通过创建新的提交来回滚之前的更改。

```shell
git revert C2 C5  # 撤销 C2 和 C5 的更改
git revert C2^...C5  # 撤销 C2 到 C5 之间所有的更改，闭区间
git revert C2..C5  # 撤销 C2 到 C5 的更改，左开右闭区间
```



```mermaid
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
commit id: &#34;C3&#34;
commit id: &#34;C4&#34;
commit id: &#34;C5&#34;
commit id: &#34;C6&#34;
```

如上图，当前分支处于`C6`处，执行`git revert C2^...C5`后，状态如下

```mermaid
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
commit id: &#34;C3&#34;
commit id: &#34;C4&#34;
commit id: &#34;C5&#34;
commit id: &#34;C6&#34;
commit id: &#34;C5-1&#34;
commit id: &#34;C4-1&#34;
commit id: &#34;C3-1&#34;
commit id: &#34;C2-1&#34;
```

`git revert`过程中可能会遇到冲突，会提示冲突的文件，手动修改完冲突文件的内容后，再`git add`和`git revert --continue`就可以；或者`git revert --abort`放弃`git revert`操作。

### git diff

```shell
git diff  # 查看当前分支工作区中所有文件与暂存区或版本库的修改内容
git diff file_path  # 查看当前分支工作区中指定文件与版本库修改内容
git diff branch_name file_path  # 查看当前分支指定文件与指定分支的区别
git diff branch1 branch2 file_path  # 查看指定两个分支最新提交上指定文件的区别
```

{{&lt; admonition &gt;}}
`git diff`和`git diff file_path`是工作区中的文件与暂存区或版本库的比较，不包括暂存区与版本库的比较。

`git diff branch1 branch2 file_path`是版本库上该文件的比较，`git diff branch_name file_path`是当前分支上的该文件(在版本库、工作区或暂存区都可以)与指定分支版本库之间的比较。
{{&lt; /admonition &gt;}}

### git show

```shell
git show  # 显示当前分支上最新一次提交的详细信息
git show [branch_name origin/branch_name HEAD^ commit_id tag_name]
```

### git merge

```mermaid
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
branch dev
commit id: &#34;C3&#34;
commit id: &#34;C4&#34;
checkout main
commit id: &#34;C5&#34;
commit id: &#34;C6&#34;
merge dev id: &#34;C7&#34;
commit id: &#34;C8&#34;
checkout dev
commit id: &#34;C9&#34;
```

```shell
git merge branch1 branch2  # 将branch1和branch2分支的更改合并到当前所在的分支中
```

如上图，如果在`main`分支上`git merge dev`后，在`main`分支上会生成一次新的提交`C7`，该次提交包含了`C3`和`C4`所做的修改，新的提交`C8`是基于`C7`的。但切回`dev`分支再提交`C9`，`C9`是基于`C4`的而不是`C7`。

`git merge`遇到冲突时，会提示冲突的文件，手动修改完冲突文件的内容后，再`git add`和`git commit`就可以；或者`git merge --abort`放弃合并。

### git rebase

```mermaid
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
branch dev
commit id: &#34;C3&#34;
checkout main
commit id: &#34;C5&#34;
checkout dev
commit id: &#34;C4&#34;
checkout main
commit id: &#34;C6&#34;
commit id: &#34;C3-1&#34;
commit id: &#34;C4-1&#34;
```

```
git rebase branch_name
```

如上图，当`main`分支最新提交是`C6`，`dev`分支最新提交是`C4`时，在`dev`分支上执行`git rebase main`后，`dev`分支上的提交`C3`和`C4`会按顺序整合到`C6`后面，变成新的提交`C3-1`和`C4-1`，`dev`分支会来到`C4-1`处，但`main`分支还是会在`C6`处。使用`git rebase`后新的最新节点的内容和使用`git merge`后生成的新的提交节点的内容是一致的。

`git rebase`遇到冲突时，会提示冲突的文件，手动修改完冲突文件的内容后，再`git add`和`git rebase --continue`就可以；或者`git rebase --abort`放弃合并。

### git cherry-pick

`git cherry-pick` 用于将某个特定的一个或多个提交从一个分支应用到当前分支。

```mermaid
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
branch dev
commit id: &#34;C3&#34;
checkout main
commit id: &#34;C5&#34;
checkout dev
commit id: &#34;C4&#34;
checkout main
commit id: &#34;C6&#34;
commit id: &#34;C7&#34;
commit id: &#34;C8&#34;
```

比如当前提交情况如上图，当前处于`dev`分支上

```shell
git cherry-pick C5 C7  # 一个或多个提交的 commit-id
```

该命令将`C5`和`C7`的更改应用到当前分支上，运行完该命令状态如下，`git cherry-pick`了几个提交，当前分支就会多几个对应的提交：

```mermaid
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
branch dev
commit id: &#34;C3&#34;
checkout main
commit id: &#34;C5&#34;
checkout dev
commit id: &#34;C4&#34;
checkout main
commit id: &#34;C6&#34;
commit id: &#34;C7&#34;
commit id: &#34;C8&#34;
checkout dev
commit id: &#34;C5-1&#34;
commit id: &#34;C7-1&#34;
```

```shell
git cherry-pick C5^..C7  # 某两个提交之间的所有提交都进行 git cherry-pick
```

运行该命令状态如下：

```mermaid
gitGraph
commit id: &#34;C1&#34;
commit id: &#34;C2&#34;
branch dev
commit id: &#34;C3&#34;
checkout main
commit id: &#34;C5&#34;
checkout dev
commit id: &#34;C4&#34;
checkout main
commit id: &#34;C6&#34;
commit id: &#34;C7&#34;
commit id: &#34;C8&#34;
checkout dev
commit id: &#34;C5-1&#34;
commit id: &#34;C6-1&#34;
commit id: &#34;C7-1&#34;
```

`git cherry-pick`过程中可能会遇到冲突，会提示冲突的文件，手动修改完冲突文件的内容后，再`git add`和`git cherry-pick --continue`就可以；或者`git cherry-pick --abort`放弃`git cherry-pick`操作。

### git stash

```bash
git stash  # 保存当前工作进度
git stash -u/--include-untracked  # 只有未跟踪的文件时，需要加该参数才能保存
```

{{&lt; admonition &gt;}}未跟踪的文件、已修改未暂存的文件、暂存区中的文件都会保存。但是如果当前只有未跟踪的文件，需要`--include-untracked`参数才能保存，否则会提示没有要保存的文件。
{{&lt; /admonition &gt;}}

```shell
git stash save &#34;&lt;message&gt;&#34;  # 保存并附带信息
git stash list  # 查看所有stash，每个stash前面都有一个编号
# 可以使用stash的编号来应用一个特定的stash，这会将更改应用到你的工作目录，但不会从stash列表中删除它
# 没指定stash编号则应用最新的stash
git stash apply &lt;stash&gt;
git stash pop  # 应用最新的stash并删除
git stash drop &lt;stash&gt;  # 删除一个特定的stash
git stash clear  # 删除所有stash
```

一个使用场景是，当想切换分支做其它工作时，需先保存一个stash，之后切换回来再应用保存的stash即可。

### git submodule

```shell
# 克隆子模块[的指定分支][到指定文件夹]
git submodule add [-b dev] https://github.com/hugo-fixit/FixIt.git [themes/FixIt]
```

当在git仓库中添加子模块后，仓库根目录下会新增文件`.gitmodules`，该文件记录了每个子模块的信息，示例如下。此外`.git/config`和`.git/modules`也会有相应的改变。

```ini
[submodule &#34;themes/FixIt&#34;]
	path = themes/FixIt
	url = https://github.com/hugo-fixit/FixIt.git
	branch = dev
[submodule &#34;submodule/star927&#34;]
	path = submodule/star927
	url = git@github.com:star927/star927.github.io.git
```

```shell
git submodule [status]  # 查看子模块信息
git submodule set-branch -b dev themes/FixIt  # 将子模块分支切换到 dev
git submodule update --remote themes/FixIt  # 更新指定子模块
git submodule update --remote  # 更新所有子模块
git submodule update --init --recursive  # 如果克隆仓库时没有克隆子模块代码时，该命令会下载所有子模块代码
```

更新子模块也可以进入到子模块对应的目录下，执行`git fetch`、`git pull`等操作。

需要应用子模块指定提交，进入到子模块文件夹，执行`git reset`等操作即可。

```shell
# 依次运行下述两条命令，用于删除指定子模块
git submodule deinit [-f] submodule/star927  # 在 .git/config 中删除了指定子模块
git rm submodule/star927  # 在 .gitmodules 中删除了指定子模块
# 运行完上述两条命令，.git/modules 中依旧保留了该子模块对应的文件夹, 但不影响，该子模块已删除
```

## Git LFS

将大文件从本地提交到Github仓库需要使用`git-lfs`，见官网：&lt;https://git-lfs.github.com&gt;

## .gitignore

```
# 注释
.DS_Store  # 忽略该文件
*.exe  # 所有.exe文件
!index.html  # 该文件不被忽略

test  # 忽略名为test的文件或文件夹
test/  # 忽略名为test的文件夹
/test/  # 根目录下名为test的文件
```

更多详细内容见官网：&lt;https://git-scm.com/docs/gitignore&gt;

## 常见报错

### Failed to connect

{{&lt; admonition failure &gt;}}
Failed to connect to github.com port 443 after 75002 ms: Couldn&#39;t connect to server
{{&lt; /admonition &gt;}}

在使用了VPN时，配置http代理，如下，`7890`是代理的端口号，打开`ClashX`可以查看使用的端口号

```
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890
```

### RPC failed

{{&lt; admonition failure &gt;}}
RPC failed; curl 92 HTTP/2 stream 5 was not closed cleanly: CANCEL (err 8)
{{&lt; /admonition &gt;}}

- `git clone`遇到该问题时，有时再运行一遍`git clone`命令就可以
- 指定使用`http 1.1`，`git config --global http.version HTTP/1.1`

{{&lt; admonition failure &gt;}}
RPC failed; curl 18 transfer closed with outstanding read data remaining
{{&lt; /admonition &gt;}}

- 使用`git clone`时，可加参数`--depth 1`
- 增大缓冲区，`git config --global http.postBuffer 536870912`
- 多尝试几遍

## 相关资料

- [Git 大全 - Gitee](https://gitee.com/all-about-git)
- [Learn Git Branching](https://help.gitee.com/learn-Git-Branching)
- [【B站最全Git进阶课程】git rebase: 人生无法重来，但代码可以！](https://www.bilibili.com/video/BV1Xb4y1773F)


---

> 作者: [Huxley](https://star927.github.io/)  
> URL: https://star927.github.io/posts/notes/git-notes/  

