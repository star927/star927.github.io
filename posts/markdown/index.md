# Text and Typography


## Notes

&gt; [!NOTE]  
&gt; Highlights information that users should take into account, even when skimming.

&gt; [!TIP]
&gt; Optional information to help a user be more successful.

&gt; [!IMPORTANT]  
&gt; Crucial information necessary for users to succeed.

&gt; [!WARNING]  
&gt; Critical content demanding immediate user attention due to potential risks.

&gt; [!CAUTION]
&gt; Negative potential consequences of an action.



### 图片

```markdown
![unnamed-2](https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png)
```

![unnamed-2](https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png)

```html
&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png&#34; alt=&#34;unnamed-1&#34; style=&#34;zoom:10%;&#34; /&gt;
```

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png&#34; alt=&#34;unnamed-1&#34; style=&#34;zoom:10%;&#34; /&gt;



```html
&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png&#34; alt=&#34;unnamed-1&#34; width=200 height=200 align=left /&gt;
```

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png&#34; alt=&#34;unnamed-1&#34; width=200 height=200 align=left /&gt;

```html
&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png&#34; alt=&#34;unnamed-1&#34; width=40% /&gt;&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png&#34; alt=&#34;unnamed-2&#34; style=&#34;width:40%;&#34; /&gt;
```

&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png&#34; alt=&#34;unnamed-1&#34; width=40% /&gt;&lt;img src=&#34;https://cdn.jsdelivr.net/gh/star927/star927.github.io/assets/img/avatar.png&#34; alt=&#34;unnamed-2&#34; style=&#34;width:40%;&#34; /&gt;



### TODO List

- [ ] One
- [x] Two

### 特殊符号 HTML Entities Codes

&amp;copy; &amp;  &amp;uml; &amp;trade; &amp;iexcl; &amp;pound;
&amp;amp; &amp;lt; &amp;gt; &amp;yen; &amp;euro; &amp;reg; &amp;plusmn; &amp;para; &amp;sect; &amp;brvbar; &amp;macr; &amp;laquo; &amp;middot;

X&amp;sup2; Y&amp;sup3; &amp;frac34; &amp;frac14;  &amp;times;  &amp;divide;   &amp;raquo;

18&amp;ordm;C  &amp;quot;  &amp;apos;

### Emoji表情 :smiley:

&gt; Blockquotes :star:
#### GFM task lists &amp; Emoji &amp; fontAwesome icon emoji &amp; editormd logo emoji :editormd-logo-5x:

- [x] :smiley: @mentions, :smiley: #refs, [links](), **formatting**, and &lt;del&gt;tags&lt;/del&gt; supported :editormd-logo:;
- [x] list syntax required (any unordered or ordered list supported) :editormd-logo-3x:;
- [x] [ ] :smiley: this is a complete item :smiley:;
- [ ] []this is an incomplete item [test link](#) :fa-star: @pandao;
- [ ] [ ]this is an incomplete item :fa-star: :fa-gear:;
  - [ ] :smiley: this is an incomplete item [test link](#) :fa-star: :fa-gear:;
  - [ ] :smiley: this is  :fa-star: :fa-gear: an incomplete item [test link](#);

### 分页符 Page break

---

### 绘制流程图 Flowchart

语法：`tag=&gt;type: content:&gt;url`
type有六种类型：

&gt;  start(开始)、end(结束)、operation(操作)、subroutine(子程序)、condition(条件)、inputoutput(输入输出)

```flowchart
st=&gt;start: Start|past:&gt;http://www.baidu.com
e=&gt;end:  End|future:&gt;http://www.baidu.com
op1=&gt;operation:  My Operation
op2=&gt;operation:  Stuff|current
sub1=&gt;subroutine:  My Subroutine|invalid
cond1=&gt;condition:  Yes or No|approved:&gt;http://www.google.com
cond2=&gt;condition:  Good idea|rejected
io=&gt;inputoutput:  catch something...|future

st-&gt;op1(right)-&gt;cond1
cond1(yes, right)-&gt;cond2
cond1(no)-&gt;sub1(left)-&gt;op1
cond2(yes)-&gt;io-&gt;e
cond2(no)-&gt;op2-&gt;e
```

```flow
st=&gt;start: Start|past:&gt;http://www.baidu.com
e=&gt;end:  End|future:&gt;http://www.baidu.com
op1=&gt;operation:  My Operation
op2=&gt;operation:  Stuff|current
sub1=&gt;subroutine:  My Subroutine|invalid
cond1=&gt;condition:  Yes or No|approved:&gt;http://www.google.com
cond2=&gt;condition:  Good idea|rejected
io=&gt;inputoutput:  catch something...|future

st-&gt;op1(right)-&gt;cond1
cond1(yes, right)-&gt;cond2
cond1(no)-&gt;sub1(left)-&gt;op1
cond2(yes)-&gt;io-&gt;e
cond2(no)-&gt;op2-&gt;e
```

### 绘制序列图 Sequence Diagram

```sequence
Andrew-&gt;China: Says Hello
Note right of China: China thinks\nabout it
China--&gt;Andrew: How are you?
Andrew-&gt;&gt;China: I am good thanks!
```

### 甘特图mermaid

[mermaid](https://mermaid.js.org/)

[如何在Markdown中画流程图](https://www.jianshu.com/p/b421cc723da5)

[typora 画流程图、时序图(顺序图)、甘特图](https://www.runoob.com/note/47651)

#### Flowchart Orientation

```mermaid
flowchart TB
top --&gt; bottom
```

```mermaid
flowchart TD
top_down --&gt; same_as_top_to_bottom
```

```mermaid
flowchart BT
bottom --&gt; top
```

```mermaid
flowchart RL
right --&gt; left
```

```mermaid
flowchart LR
left --&gt; right
```

#### Node shapes

```mermaid
flowchart TB
text &lt;--&gt; id1[Hello\nWorld!] --&gt; id2(text) --&gt; id3([Hello World!])
id4[[text]] --&gt; id5[(Database)] --&gt; id6((circle)) --&gt; id7&gt;text]
id8{text} --&gt; id9{{text}}
id10[/text/] --&gt; id11[\text\] --&gt; id12[\text/] --&gt; id13[/text\]
```

#### Links between nodes

```mermaid
flowchart TD
A1--&gt;B1
A2---B2
A3-- This is the text! ---B3
A4---|This is the text|B4
A5--&gt;|text|B5
A6-- text --&gt;B6
```

```mermaid
flowchart TD
A1-.-&gt;B1
A2-. text .-&gt; B2
A3 ==&gt; B3
A4 == text ==&gt; B4
```

```mermaid
flowchart TD
A -- text --&gt; B -- text2 --&gt; C
a --&gt; b &amp; c--&gt; d
m &amp; n--&gt; x &amp; y
```

```mermaid
flowchart TD
A1 --o B1
A2 --x B2
A3 o--o B3
A4 &lt;---&gt; B4
A5 x----x B5
```

#### Special characters that break syntax

```mermaid
flowchart LR
id1[&#34;This is the (text) in the box&#34;]
A[&#34;A double quote:#quot;&#34;] --&gt;B[&#34;A dec char:#9829;&#34;]
```

#### Subgraphs

```mermaid
flowchart TB
c1--&gt;a2
subgraph one
a1--&gt;a2
end
subgraph two
b1--&gt;b2
end
subgraph three
c1--&gt;c2
end
```

```mermaid
flowchart TB
c1--&gt;a2
subgraph ide1 [one]
a1--&gt;a2
end
```

```mermaid
flowchart TB
c1--&gt;a2
subgraph one
a1--&gt;a2
end
subgraph two
b1--&gt;b2
end
subgraph three
c1--&gt;c2
end
one --&gt; two
three --&gt; two
two --&gt; c2
```

```mermaid
flowchart LR
  subgraph TOP
    direction TB
    subgraph B1
        direction RL
        i1 --&gt;f1
    end
    subgraph B2
        direction BT
        i2 --&gt;f2
    end
  end
  A --&gt; TOP --&gt; B
  B1 --&gt; B2
```

```mermaid
sequenceDiagram
par Alice to Bob
    Alice-&gt;&gt;Bob: Go help John
and Alice to John
    Alice-&gt;&gt;John: I want this done today
    par John to Charlie
        John-&gt;&gt;Charlie: Can we do this today?
    and John to Diana
        John-&gt;&gt;Diana: Can you help us today?
    end
end
```



---

> Author: [Huxley](https://star927.github.io/)  
> URL: https://example.org/posts/markdown/  

