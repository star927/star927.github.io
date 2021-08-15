---
title:  VSCode Notes
description: Configuration and FAQ about VSCode
last_modified_at: 2021-08-13 12:00
tags: VScode
categories: Notes VScode
code-clipboard: true
---

## 1 实用插件

### 1.1 Python

打开一个文件夹，"运行 - 创建 lanuch.json 文件 - 当前文件夹名称 - Python File"，即可配置Python 环境。

打开`settings.json`文件，设置`"python.pythonPath":"",`可指定工作区默认Python版本

### 1.2 C/C++

#### 1.2.1 相关设置

“设置 -> 扩展 -> C/C++ -> C_Cpp.clang_format_fallbackStyle” 改成 `{ BasedOnStyle: Google, IndentWidth: 4 , ColumnLimit: 0}` 则格式化代码时，大括号不换行  
或，打开设置，右上角打开setting.json，添加 `"C_Cpp.clang_format_fallbackStyle": "{ BasedOnStyle: Google, IndentWidth: 4 , ColumnLimit: 0}"`

### 1.3 Coder Runner

#### 1.3.1 基本设置

不用配置launch.json等文件，可改插件直接运行C\C++代码（不能打断点进行调式），在settings.josn中添加`"code-runner.runInTerminal": true`

#### 1.3.2 自定义运行不同语言时执行的命令

依次打开**Settings** - **Extensions** - **Run code configuration**, **Executor Map** - **Edit in settings.json**, 即可看到**Coder Runner**对不同编程语言文件所执行的命令。（可将`"python": "python -u",`改成`"python": "python3 -u",`即可用**Coder Runner**来运行Python文件，Mac中Python3.x版本需要用命令`python3`，命令`python`是系统自带的Python2.7）

### 1.4 Markdown Preview Enhanced

markdown预览插件，可将markdown导出为pdf等。

### 1.5 LaTeX Workshop

在settings.json中添加相关配置，可根据需求自行修改

```json
  "latex-workshop.view.pdf.viewer": "tab", 
  "latex-workshop.latex.recipes": [
    {
      "name": "xelatex",
      "tools": [
        "xelatex"
      ]
    },
  ],
  "latex-workshop.latex.tools": [
    {
      "name": "xelatex",
      "command": "xelatex",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "%DOC%"
      ]
    },
  ],
  "latex-workshop.latex.clean.fileTypes": [
    "*.aux",
    "*.bbl",
    "*.blg",
    "*.idx",
    "*.ind",
    "*.lof",
    "*.lot",
    "*.out",
    "*.toc",
    "*.acn",
    "*.acr",
    "*.alg",
    "*.glg",
    "*.glo",
    "*.gls",
    "*.ist",
    "*.fls",
    "*.log",
    "*.fdb_latexmk",
    "*.synctex.gz"
  ],
```

### 1.6 Chinese (Simplified) Language Pack for Visual Studio Code

界面中文化

### 1.7 Braket Pair Colorizer

代码中不同层次的括号显示不同的颜色

### 1.8 Material Icon Theme

一个文件图标主题
Ctrl + Shift + P 输入File Icon Theme选择图标主题， 
Ctrl + Shift + P 输入Material Icon可进行该主题的相关设置

### 1.9 MySQL

SQL插件

插件`MySQL Syntax`：实现SQL语法高亮

### 1.10 Live Server

搭建本地服务器，实时浏览html	

### 1.1 Bookmarks

实现代码中插入书签并跳转

### 1.2 GitLens — Git supercharged

以及插件Git History。更好的Git体验

## 2 其他

### 2.1 编码问题

sublime test 3 和 matlab 2019a 代码的编码方式是GBK；可在 settings.json 中添加`"files.autoGuessEncoding": true`，即自动猜测文件编码，防止打开时是乱码。

### 2.2 PyQt5函数报错

vscode 对PyQt5中的函数会出现类似`No name 'QWidget' in module 'PyQt5.QtWidgets'`的报错，实际上代码没有问题。vscode中使用pylint来检查python语法问题，但`pylint doesn't load any C extensions by default, because those can run arbitrary code.`解决这个问题，可以在当前文件夹下创建`.pylintrc`文件，写入以下内容：`extension-pkg-whitelist=PyQt5`

### 2.3 红色波浪线

对于`#include <Eigen/Dense>`，vscode会以红色波浪线标出，由于Eigen是在`/usr/local/include`路径下，在vscode中打开Command Palette(command+shift+P)，打开C/C++:Edit Configurations(JSON)，在`includePath`下添加路径`/usr/local/include`，如下：

```json
"includePath": [
    "${workspaceFolder}/**",
    "/usr/local/include"
],
```

cv2红色波浪线，在settings.json文件中加入语句:
`"python.linting.pylintArgs": ["--generate-members"],`

### 2.4 第三方js库语法提示

在当前工作区下新建jsconfig.json文件，写入以下内容，可实现d3的语法提示(前提应该是用npm安装了d3)

```json
{
    "exclude": ["node_modules"],
    "typeAcquisition": {
      "include": [
        "d3" // 填你想要提示的代码库名字
      ]
    }
}
```

参考：[vscode添加第三方库代码提示](https://blog.csdn.net/qq799028706/article/details/100831197)

### 2.5 使用Python虚拟环境

创建好

在设置里搜索`python.v`，在`Python:Venv Path`里填入虚拟环境的路径即可；例如可将创建的虚拟环境全部放入文件夹`~/.venv`中，该处填写`~/.venv`即可；重启VSCode生效。快捷键`command+shift+P`打开命令控制板选择`Python:Select Interpreter`即可看到`~/.venv`文件夹下的各个虚拟环境。

当然也可以直接在`setting.json`文件中添加语句`"python.venvPath": "~/.venv",`
