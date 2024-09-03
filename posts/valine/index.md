# Jekyll博客中添加Valine评论系统


Valine评论系统的效果图如下：

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/Valine.png&#34; alt=&#34;Valine&#34; style=&#34;zoom:50%;&#34; /&gt;

下面一步步来配置Valine评论系统

## 1 配置LeanCloud

- 进入LeanCloud官网&lt;https://www.leancloud.cn/&gt;，注册/登录账号。

- 创建应用，应用名称可自行设定。

![Create-App](https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/LeanCloud-1.png)

- 查看`App ID`和`App Key`，【设置】-【应用凭证】-【Credentials】，`App ID`和`App Key`在后面的配置中会用到。

![Credentials](https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/LeanCloud-4.png)

## 2 修改博客配置文件

- 在`_config.yml`文件中添加以下代码：

```yml
valine:
  enable: true
  app_id: xxxxxx
  app_key: xxxxxx
```

`enable`是一个总开关，控制Valine评论功能是否开启，`app_id`和`app_key`对应LeanCloud的`App ID`和`App Key`。
更多配置项参见官方文档：&lt;https://valine.js.org/configuration.html&gt;

- 创建`valine.html`文件，放在`_includes`文件夹下，代码如下：

```html
&lt;script src=&#39;//unpkg.com/valine/dist/Valine.min.js&#39;&gt;&lt;/script&gt;
&lt;div id=&#34;vcomments&#34;&gt;&lt;/div&gt;
&lt;script&gt;
    new Valine({
        el: &#39;#vcomments&#39;,
        appId: &#39;{% raw %}{{ site.valine.app_id }}{% endraw %}&#39;,
        appKey: &#39;{% raw %}{{ site.valine.app_key }}{% endraw %}&#39;,
    })
&lt;/script&gt;
```

- 在需要添加Valine评论的地方添加以下代码，如`_layouts/post.html`文件

```liquid
{% raw %}{% if site.valine.enable %}
  {% include valine.html %}
{% endif %}{% endraw %}
```

至此Valine评论系统配置完毕。打开对应的LeanCloud应用，在【数据存储】-【结构化数据】-【Comment&lt;/&gt;】中可查看和管理所有评论数据。

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/Valine-Comment.png&#34; alt=&#34;Valine-Comment&#34; style=&#34;zoom:50%;&#34; /&gt;

## 3 配置Valine邮件提醒功能

参见&lt;https://github.com/DesertsP/Valine-Admin&gt;



---

> Author: [Huxley](https://star927.github.io/)  
> URL: https://example.org/posts/valine/  

