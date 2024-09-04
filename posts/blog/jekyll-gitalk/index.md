# Jekyll博客中添加Gitalk评论系统


Gitalk评论系统的效果图如下：

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/gitalk.png&#34; alt=&#34;gitalk&#34; style=&#34;zoom:50%;&#34; /&gt;

&lt;!--more--&gt;

Gitalk每篇文章的评论对应于Github上的一个Issues，配置完Gitalk后，进入博客对应的Github仓库的Issues，就可以管理评论数据了，下面来配置Gitalk评论系统。

## 创建Github OAuth Apps

进入Github主页，点击右上角个人头像，【Settings】-【Developer settings】-【OAuth Apps】-【New OAuth App】，可看到如下界面：

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/github-oauth-app.png&#34; alt=&#34;github-oauth-app&#34; style=&#34;zoom:50%;&#34; /&gt;

- Application name: 应用的名字，自定义
- Homepage URL: 填写自己博客的URL，如&lt;https://star927.github.io/&gt;
- Application description: 应用描述，选填项
- Authorization callback URL: 与Homepage URL一样即可

如果Github Pages已经绑定了个人域名，则`Homepage URL`和`Authorization callback URL`需要填写自己的域名，如&lt;https://hxhuxin.top/&gt;

## 在Jekyll中配置Gitalk

需要修改文件如下：

```
.
├── _config.yml
├── _includes
│   └── head.html
└── _layouts
    └── post.html
```

### _config.yml

在`_config.yml`文件中添加以下代码：

```yml
gitalk:
  enable: true # 总开关，控制gitalk功能是否开启
  clientId: 申请的OAuth App的Client ID 
  clientSecret: 申请的OAuth App的Client ID
  repo: 博客对应的仓库名称
  owner: 自己的Github用户名
  admin: 自己的Github用户名
  distractionFreeMode: true # 若设置为true，则当在评论框输入时，周围区域会变暗
```

repo是自己博客对应的仓库的名称，如`star927.github.io`，而不是该仓库的URL

### head.html

找到自己博客`&lt;head&gt;`标签所在的文件，如`_includes/head.html`，在`&lt;/head&gt;`标签前添加以下代码。

```html
{% raw %}{% if page.layout == &#39;post&#39; and site.gitalk.enable %}{% endraw %}
  &lt;link rel=&#34;stylesheet&#34; href=&#34;https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css&#34;&gt;
{% raw %}{% endif %}{% endraw %}
```

### post.html

在`_layouts/post.html`文件的适当位置添加以下代码，这样每篇博客最后都会有Gitalk评论区。

```html
&lt;div id=&#34;gitalk-container&#34;&gt;&lt;/div&gt;
&lt;script src=&#34;https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js&#34;&gt;&lt;/script&gt;
&lt;script&gt;
    const gitalk  = new Gitalk ({
        id: window.location.pathname,
        clientID: &#39;{% raw %}{{ site.gitalk.clientId }}{% endraw %}&#39;,
        clientSecret: &#39;{% raw %}{{ site.gitalk.clientSecret }}{% endraw %}&#39;,
        repo: &#39;{% raw %}{{ site.gitalk.repo }}{% endraw %}&#39;,
        owner: &#39;{% raw %}{{ site.gitalk.owner }}{% endraw %}&#39;,
        admin: [&#39;{% raw %}{{ site.gitalk.admin }}{% endraw %}&#39;],
        distractionFreeMode: &#39;{% raw %}{{ site.gitalk.distractionFreeMode }}{% endraw %}&#39;
    });
    gitalk.render(&#39;gitalk-container&#39;);
&lt;/script&gt; 
```

上述步骤完成后，在评论区如果出现问题 **Error: Not Found.**（如下图），请仔细检查代码是否有误。

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/gitalk-error-not-found.png&#34; alt=&#34;gitalk-error-not-found&#34; style=&#34;zoom:50%;&#34; /&gt;

## 初始化Gitalk

正确完成上述步骤后，在评论区可看到以下内容，点击`使用Github登录`即可。

&gt; 必须将上述代码的修改提交到Github上，通过&lt;https://your-user-name.github.io/&gt;或者自己已绑定的域名访问自己的博客，再点击`使用Github登录`，而不是在本地服务器&lt;http://127.0.0.1:4000/&gt;点击`使用Github登录`。

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/gitalk-init.png&#34; alt=&#34;gitalk-init&#34; style=&#34;zoom:50%;&#34; /&gt;

登录自己的Github账号后，就可以看到Gitalk评论区了。


---

> 作者: [Huxley](https://star927.github.io/)  
> URL: https://star927.github.io/posts/blog/jekyll-gitalk/  

