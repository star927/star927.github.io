# Jekyll博客中基于LeanCloud统计文章阅读量


&lt;!--more--&gt;

## 配置LeanCloud

- 进入LeanCloud官网&lt;https://www.leancloud.cn/&gt;，注册或登录账号。

- 创建应用，应用名称可自行设定。

![Create-App](https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/LeanCloud-1.png)

- 创建Class，【数据存储】-【结构化数据】-【创建Class】，Class名称与后面相关代码有关，为减少不必要的麻烦，建议将Class名称设置为`Counter`，其它设置项默认值即可。

![Create-Class](https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/LeanCloud-2.png)

以后每篇文章的点击量等信息都可在该Class下查看。

- 设置安全域名，【设置】-【安全中心】-【Web安全域名】，填写自己博客的域名即可，在本地调试阶段还可以添加`http://127.0.0.1:4000`

![Web安全域名](https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/LeanCloud-3.png)

- 查看`App ID`和`App Key`，【设置】-【应用凭证】-【Credentials】，`App ID`和`App Key`在后面的配置中会用到。

![Credentials](https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/LeanCloud-4.png)

- 安全设置，【设置】-【安全中心】-【服务开关】，由于`App ID`和`App Key`会出现在博客的配置文件中，相当于是公开的，所以有必要进行安全设置，关闭不需要的服务。

![服务开关](https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/LeanCloud-5.png)

## 修改博客配置文件

需要修改或新增的文件如下：

```
.
├── _config.yml
├── _includes
│   └── leancloud-analytics.html
└── _layouts
    ├── default.html
    └── post.html
```

### _config.yml

```yml
leancloud:
  enable: true 
  app_id: xxxxxx 
  app_key: xxxxxx
```

`enable`是一个总开关，控制LeanCould统计功能是否开启，`app_id`和`app_key`对应LeanCloud的`App ID`和`App Key`

### leancloud-analytics.html

创建`leancloud-analytics.html`文件，放在`_includes`文件夹下，代码如下：

&gt; 代码参考于&lt;https://blog.csdn.net/u013553529/article/details/63357382&gt;

```html
&lt;script src=&#34;https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js&#34;&gt;&lt;/script&gt;
&lt;script src=&#34;https://cdn1.lncld.net/static/js/av-core-mini-0.6.1.js&#34;&gt;&lt;/script&gt;
&lt;script&gt;AV.initialize(&#34;{{site.leancloud.app_id}}&#34;, &#34;{{site.leancloud.app_key}}&#34;);&lt;/script&gt;
&lt;script&gt;
  function showHitCount(Counter) {
    var query = new AV.Query(Counter);
    var entries = [];
    var $visitors = $(&#34;.leancloud_visitors&#34;);

    $visitors.each(function () {
      entries.push( $(this).attr(&#34;id&#34;).trim() );
    });

    query.containedIn(&#39;url&#39;, entries);
    query.find()
      .done(function (results) {
        var COUNT_CONTAINER_REF = &#39;.leancloud-visitors-count&#39;;

        if (results.length === 0) {
          $visitors.find(COUNT_CONTAINER_REF).text(0);
          return;
        }

        for (var i = 0; i &lt; results.length; i&#43;&#43;) {
          var item = results[i];
          var url = item.get(&#39;url&#39;);
          var hits = item.get(&#39;hits&#39;);
          var element = document.getElementById(url);

          $(element).find(COUNT_CONTAINER_REF).text(hits);
        }
        for(var i = 0; i &lt; entries.length; i&#43;&#43;) {
          var url = entries[i];
          var element = document.getElementById(url);
          var countSpan = $(element).find(COUNT_CONTAINER_REF);
          if( countSpan.text() == &#39;&#39;) {
            countSpan.text(0);
          }
        }
      })
      .fail(function (object, error) {
        console.log(&#34;Error: &#34; &#43; error.code &#43; &#34; &#34; &#43; error.message);
      });
  }

  function addCount(Counter) {
    var $visitors = $(&#34;.leancloud_visitors&#34;);
    var url = $visitors.attr(&#39;id&#39;).trim();
    var title = $visitors.attr(&#39;data-flag-title&#39;).trim();
    var query = new AV.Query(Counter);

    query.equalTo(&#34;url&#34;, url);
    query.find({
      success: function(results) {
        if (results.length &gt; 0) {
          var counter = results[0];
          counter.fetchWhenSave(true);
          counter.increment(&#34;hits&#34;);
          counter.save(null, {
            success: function(counter) {
              var $element = $(document.getElementById(url));
              $element.find(&#39;.leancloud-visitors-count&#39;).text(counter.get(&#39;hits&#39;));
            },
            error: function(counter, error) {
              console.log(&#39;Failed to save Visitor num, with error message: &#39; &#43; error.message);
            }
          });
        } else {
          var newcounter = new Counter();
          /* Set ACL */
          var acl = new AV.ACL();
          acl.setPublicReadAccess(true);
          acl.setPublicWriteAccess(true);
          newcounter.setACL(acl);
          /* End Set ACL */
          newcounter.set(&#34;title&#34;, title);
          newcounter.set(&#34;url&#34;, url);
          newcounter.set(&#34;hits&#34;, 1);
          newcounter.save(null, {
            success: function(newcounter) {
              var $element = $(document.getElementById(url));
              $element.find(&#39;.leancloud-visitors-count&#39;).text(newcounter.get(&#39;hits&#39;));
            },
            error: function(newcounter, error) {
              console.log(&#39;Failed to create&#39;);
            }
          });
        }
      },
      error: function(error) {
        console.log(&#39;Error:&#39; &#43; error.code &#43; &#34; &#34; &#43; error.message);
      }
    });
  }

  $(function() {
    var Counter = AV.Object.extend(&#34;Counter&#34;);
    if ($(&#39;.leancloud_visitors&#39;).length == 1) {
      /* in post.html, so add 1 to hit counts */
      addCount(Counter);
    }
  });
&lt;/script&gt;
```

### default.html

将下面代码添加进`_layouts/default.html`文件中，这样每一篇博客中都会加载`leancloud-analytics.html`文件。

```liquid
{% raw %}{% if site.leancloud.enable %}
  {% include leancloud-analytics.html %}
{% endif %}{% endraw %}
```

### post.html

想在每篇博客中显示该篇文章的阅读量，可将下面代码添加在`_layouts/post.html`合适的位置。

```html
{% raw %}{% if site.leancloud.enable %}{% endraw %}
  &lt;span&gt;|&lt;/span&gt;
  &lt;i class=&#34;far fa-eye&#34;&gt;&lt;/i&gt;
  &lt;span id=&#34;{{ page.url }}&#34; class=&#34;leancloud_visitors&#34; data-flag-title=&#34;{{ page.title }}&#34;&gt;
    &lt;span class=&#34;leancloud-visitors-count&#34;&gt;&lt;/span&gt;
    &lt;span class=&#34;post-meta-item-text&#34;&gt;次阅读&lt;/span&gt;
  &lt;/span&gt;
{% raw %}{% endif %}{% endraw %}
```

效果图如下：

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/Image-Hosting@main/202108/LeanCloud-6.png&#34; alt=&#34;leancloud-statistic&#34; style=&#34;zoom:50%;&#34; /&gt;

至此，LeanCloud统计功能配置完毕，登录LeanCloud打开上面创建的Class即可进行后台数据管理。


---

> 作者: [Huxley](https://star927.github.io/)  
> URL: https://star927.github.io/posts/blog/jekyli-leancloud/  

