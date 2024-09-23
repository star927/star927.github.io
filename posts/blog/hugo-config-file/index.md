# Hugo博客的配置文件


`Hugo`博客的配置文件介绍

&lt;!--more--&gt;

## 配置文件说明

在博客文件夹中，[配置文件](https://gohugo.io/getting-started/configuration/)将从下面四个路径中查找，优先级从高到低（假设采用`FixIt`主题）：

1. `hugo.toml`
2. `config/_default`
3. `themes/FixIt/hugo.toml`
4. `themes/FixIt/config/_default`

`hugo.toml`文件和`config/_default`文件夹至少存在一个，二者都存在则依据优先级。

## 示例

比如当前配置如下：

```toml {title=&#34;hugo.toml&#34;}
baseURL = &#34;https://star927.github.io/&#34;
title = &#34;Huxley&#39;s Blog&#34;
theme = &#34;FixIt&#34;

[menu]
  [[menu.main]]
    identifier = &#34;categories&#34;
    name = &#34;分类&#34;
    url = &#34;/categories/&#34;
    weight = 2
    [menu.main.params]
      icon = &#34;fa-solid fa-folder-open&#34;
  [[menu.main]]
    identifier = &#34;tags&#34;
    name = &#34;标签&#34;
    url = &#34;/tags/&#34;
    weight = 3
    [menu.main.params]
      icon = &#34;fa-solid fa-tags&#34;

[params]
  # FixIt theme version
  version = &#34;0.3.X&#34; # e.g. &#34;0.2.X&#34;, &#34;0.2.15&#34;, &#34;v0.2.15&#34; etc.
  description = &#34;This is my new Hugo FixIt site&#34;
  [params.author]
    name = &#34;Huxley&#34;
    email = &#34;&#34;
    link = &#34;https://star927.github.io/&#34;
    avatar = &#34;/images/avatar.svg&#34;
```

将所有配置都放在`hugo.toml`文件中，该文件就会太长，可删除该文件，并创建`config/_default/hugo.toml`、`config/_default/menu.toml`、`config/_default/params.toml`文件，如下所示：

```toml {title=&#34;config/_default/hugo.toml&#34;}
baseURL = &#34;https://star927.github.io/&#34;
title = &#34;Huxley&#39;s Blog&#34;
theme = &#34;FixIt&#34;
```

```toml {title=&#34;config/_default/menu.toml&#34;}
[[main]]
identifier = &#34;categories&#34;
name = &#34;分类&#34;
url = &#34;/categories/&#34;
weight = 2
[main.params]
  icon = &#34;fa-solid fa-folder-open&#34;
[[main]]
identifier = &#34;tags&#34;
name = &#34;标签&#34;
url = &#34;/tags/&#34;
weight = 3
[main.params]
  icon = &#34;fa-solid fa-tags&#34;
```

```toml {title=&#34;config/_default/params.toml&#34;}
# FixIt theme version
version = &#34;0.3.X&#34; # e.g. &#34;0.2.X&#34;, &#34;0.2.15&#34;, &#34;v0.2.15&#34; etc.
description = &#34;This is my new Hugo FixIt site&#34;
[author]
name = &#34;Huxley&#34;
email = &#34;&#34;
link = &#34;https://star927.github.io/&#34;
avatar = &#34;/images/avatar.svg&#34;
```

使用这三个文件与使用上面的`hugo.toml`文件是等效的。


---

> 作者: [Huxley](https://star927.github.io/)  
> URL: https://star927.github.io/posts/blog/hugo-config-file/  

