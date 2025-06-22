# Hugo博客的配置文件


`Hugo`博客的配置文件介绍

<!--more-->

## 配置文件说明

在博客文件夹中，[配置文件](https://gohugo.io/getting-started/configuration/)将从下面四个路径中查找，优先级从高到低（假设采用`FixIt`主题）：

1. `hugo.toml`
2. `config/_default`
3. `themes/FixIt/hugo.toml`
4. `themes/FixIt/config/_default`

`hugo.toml`文件和`config/_default`文件夹至少存在一个，二者都存在则依据优先级。

> [!Tip]
>
> `hugo server`命令的运行结果中，会列出当前博客所使用的配置文件，如下
>
> ```
> Watching for config changes in /Users/star/Github/Blog/config/_default, /Users/star/Github/Blog/themes/FixIt/hugo.toml
> ```

## 示例

比如当前配置如下：

```toml {title="hugo.toml"}
baseURL = "https://star927.github.io/"
title = "Huxley's Blog"
theme = "FixIt"

[menu]
  [[menu.main]]
    identifier = "categories"
    name = "分类"
    url = "/categories/"
    weight = 2
    [menu.main.params]
      icon = "fa-solid fa-folder-open"
  [[menu.main]]
    identifier = "tags"
    name = "标签"
    url = "/tags/"
    weight = 3
    [menu.main.params]
      icon = "fa-solid fa-tags"

[params]
  # FixIt theme version
  version = "0.3.X" # e.g. "0.2.X", "0.2.15", "v0.2.15" etc.
  description = "This is my new Hugo FixIt site"
  [params.author]
    name = "Huxley"
    email = ""
    link = "https://star927.github.io/"
    avatar = "/images/avatar.svg"
```

将所有配置都放在`hugo.toml`文件中，该文件就会太长，可删除该文件，并创建`config/_default/hugo.toml`、`config/_default/menu.toml`、`config/_default/params.toml`文件，如下所示：

```toml {title="config/_default/hugo.toml"}
baseURL = "https://star927.github.io/"
title = "Huxley's Blog"
theme = "FixIt"
```

```toml {title="config/_default/menu.toml"}
[[main]]
identifier = "categories"
name = "分类"
url = "/categories/"
weight = 2
[main.params]
  icon = "fa-solid fa-folder-open"
[[main]]
identifier = "tags"
name = "标签"
url = "/tags/"
weight = 3
[main.params]
  icon = "fa-solid fa-tags"
```

```toml {title="config/_default/params.toml"}
# FixIt theme version
version = "0.3.X" # e.g. "0.2.X", "0.2.15", "v0.2.15" etc.
description = "This is my new Hugo FixIt site"
[author]
name = "Huxley"
email = ""
link = "https://star927.github.io/"
avatar = "/images/avatar.svg"
```

使用这三个文件与使用上面的`hugo.toml`文件是等效的。


---

> 作者: [Huxley](https://huxinme.top)  
> URL: https://huxinme.top/posts/blog/hugo-config-file/  

