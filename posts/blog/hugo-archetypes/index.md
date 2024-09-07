# Hugo博客文章模板-Archetypes

用`hugo new content`命令可以创建一篇文章，[Archetypes](https://gohugo.io/content-management/archetypes/)就是新建文章的模板。

&lt;!--more--&gt;

## [hugo new命令](https://gohugo.io/commands/hugo_new/)

以`hugo new`开头的命令有`hugo new content`、`hugo new site`等，`hugo new`默认就是`hugo new content`，也就是下面两条命令等效。

```shell
hugo new posts/my-new-post.md
hugo new content posts/my-new-post.md
```

## 新建一篇文章

### hugo new [path]

```shell
hugo new posts/my-new-post.md
```

上面命令用于创建一个新文件`content/posts/my-new-post.md`，按照下列顺序寻找模板

1. `archetypes/posts.md`
2. `themes/my-theme/archetypes/posts.md`
3. `archetypes/default.md`
4. `themes/my-theme/archetypes/default.md`

如果上述文件都不存在，则使用hugo内置的默认模板

### hugo new --kind [name] [path]

```shell
hugo new --kind test posts/new-post.md
```

上面命令用于创建一个新文件`content/posts/my-new-post.md`，按照下列顺序寻找模板

1. `archetypes/test.md`
2. `themes/my-theme/archetypes/test.md`
3. `archetypes/default.md`
4. `themes/my-theme/archetypes/default.md`

如果上述文件都不存在，则使用hugo内置的默认模板

## 新建一篇基于目录的文章

{{&lt; admonition &gt;}}
[一个文件夹对应一篇博客文章](https://gohugo.io/content-management/page-bundles/#leaf-bundles)这种方式，文章的文件名应该是`index.md`
{{&lt; /admonition &gt;}}

### hugo new [path]

```shell
hugo new post-bundle/new-post/
```

上面命令用于创建一个新文件夹`content/post-bundle/new-post/`，按照下列顺序寻找模板

1. `archetypes/post-bundle/`
2. `themes/my-theme/post-bundle/`

如果上述文件夹都不存在，则创建失败

### hugo new --kind [name] [path]

```shell
hugo new --kind post-bundle posts/new-post/
```

上面命令用于创建一个新文件夹`content/posts/new-post/`，按照下列顺序寻找模板

1. `archetypes/post-bundle/`
2. `themes/my-theme/post-bundle/`

如果上述文件夹都不存在，则创建失败

## 示例

目录结构

```
archetypes
├── post-bundle
│   └── index.md
├── default.md
└── posts.md
```

一个文章模版示例

```markdown
---
title: {{ replace .TranslationBaseName &#34;-&#34; &#34; &#34; | title }}
subtitle:
date: {{ .Date }}
lastmod:
categories:
tags:
collections:
draft: true
---

&lt;!--more--&gt;

```


---

> 作者: [Huxley](https://star927.github.io/)  
> URL: https://star927.github.io/posts/blog/hugo-archetypes/  

