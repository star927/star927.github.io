# FFmpeg Notes



## 简介

### 基本命令格式

```shell
ffmpeg [全局参数] [输入文件参数] -i [输入文件] [输出文件参数] [输出文件]
```

### 输出视频信息到文件

```shell
ffmpeg -i vedio.mp4 &gt; output.txt 2&gt;&amp;1
```

### 常见参数

`-i`: 设定输入流
`-v,-loglevel`: 设置log等级
`-hide_banner`: 输出信息中隐藏`ffmpeg`自身的相关信息
`-y`: yes
`-ss`: 开始处理的视频时间
`-to`: 结束处理的视频时间
`-t`: 处理视频的时间，如果同时使用了参数`-to`，`-t`优先级更高
`-r`: 设定帧速率，默认为25
`-s`: 设定画面的宽与高
`-aspect`: 设定画面的比例
`-b`: 设置平均码率
`-b:v`: 设定视频平均码率
`-c,-codec`: 设置编解码器
`-c:v,-codec:v,-vcodec`: 设置视频编解码器
`-c:v:1,-codec:v:1,-vcodec:1`: 设置第二个视频流的编解码器
`-c copy`: 使用原来的编解码器，不重新编解码
`-vn`: 不处理视频
`-vf,-filter:v`: 处理视频

在ffmpeg中，v表示视频，a表示音频。比如`-v:n`表示设置视频编解码器，`-v:a`表示设置音频解码器

### Tips

假如不知道某些参数可以设定成哪些值，有时可以通过随便指定一个值，在ffmpeg的报错信息中就可以看到正确的取值有哪些了，如下

```shell
ffmpeg -i test.mp4 -crf 18 -preset anything nothing.mp4
```

在输出中可以就看到如下信息

```
Possible presets: ultrafast superfast veryfast faster fast medium slow slower veryslow placebo
```

### 参考

- [ffmpeg Documentation-官网](https://ffmpeg.org/ffmpeg.html)
- [ffmpeg常用命令-CSDN](https://blog.csdn.net/newchenxf/article/details/51384360)
- [使用ffmpeg修改mp3的ID3 tag（添加歌词、专辑等信息）](https://fooyou.github.io/document/2015/12/03/modify-id3-tags-using-ffmpeg.html)
- [FFmpeg -crf参数优化-腾讯云社区](https://cloud.tencent.com/developer/article/1871779)
- [FFmpeg 视频处理入门教程-阮一峰](https://www.ruanyifeng.com/blog/2020/01/ffmpeg.html)
- [FFmpeg 命令示例-知乎](https://zhuanlan.zhihu.com/p/67878761)
- [ffmpeg-给视频添加字幕-简书](https://www.jianshu.com/p/f33910818a1c)
- [ffmpeg去除视频黑边命令-CSDN](https://blog.csdn.net/starandsea/article/details/121183546)
- [ffmpeg与x264编码指南-CSDN](https://blog.csdn.net/vblittleboy/article/details/8982857)
- [ffmpeg输出信息中个参数的含义-知乎](https://zhuanlan.zhihu.com/p/506499639)
- [I帧、P帧、B帧、GOP、IDR 和PTS, DTS之间的关系 ](https://www.cnblogs.com/yongdaimi/p/10676309.html)


## 视频处理

### 视频格式转换

```shell
ffmpeg -i input.avi output.mp4
ffmpeg -i input.avi -c:v libx265 output.mp4
ffmpeg -i input.avi -c copy output.mp4 # 只是转一下容器，内部编码格式不变，命令执行速度较快
```

`ffmpeg`的输出视频默认使用`profile`为`High`的`H264`视频编码器和`profile`为`LC`的`AAC`音频编码器

`H265`编码，比`H264`压缩效率更高，更节省空间，但`H265`压缩算法编解码更费时，并且兼容性比`H264`兼容性弱

### 更改视频分辨率

```shell
ffmpeg -i input.mp4 -vf scale=-1:1080 output.mp4
```

该命令也可以用于拉伸图片

```shell
ffmpeg -i input.png -vf scale=1920:1080 output.png
```

### 提取音频

```shell
ffmpeg -i input.mp4 output.mp3
ffmpeg -i input.mp4 -vn -c:a copy output.aac
```

### 提取帧

```shell
# 在时间为00:27:10出截图一帧
ffmpeg -ss 00:27:10 -i input.mp4 -vframes 1 output.png
ffmpeg -i input.mp4 -ss 00:27:10 -vframes 1 output.png
# 从00:27:10开始一直到视频结尾
ffmpeg -i input.mp4 -ss 00:27:10 output.png frame/output-%3d.png
# 截取15帧, 放在frame文件夹下
ffmpeg -i input.mp4 -ss 00:27:10 -vframes 15 frame/output-%2d.png
#	从00:01:30开始，每秒提取2帧，持续时长00:00:30，共60帧
ffmpeg -i input.mp4 -ss 00:03:00 -r 2 -t 00:00:30 frame/output-%3d.jpg
#	整个视频，每分钟提取一帧
ffmpeg -i input.mp4 -r 1/60 frame/output-%3d.png
```

`jpg`和`png`都可以作为输出图片的格式，但`png`的图片更清晰

#### 提取I帧(关键帧)

```shell
ffmpeg -i input.mp4 -vf select=&#39;eq(pict_type\,I)&#39; -vsync 2 -f image2 frame/output-%03d.png
```

上述命令是按照顺序对提取的帧进行编号命名。查看上述每帧的在视频中的播放时刻和在视频所有帧中的序号，可使用下述命令

```
ffprobe input.mp4 -show_entries frame=media_type,pict_type,pts_time -of csv | grep video | grep -n I &gt; ~/Desktop/frames_I.txt
```

`media_type`: 帧的类型，可能的值是`video`或`audio`
`pict_type`: 视频帧的图片类型
`pts_time`: 帧的播放时刻
`grep -n`: 以`csv`文件的形式显示结果，那么一行就是一帧的信息，用`grep`显示的行号即为该帧在所有帧的序号

### 更改视频画面长宽比

```shell
ffmpeg -i input.mp4 -aspect 16:9 -c copy output.mp4
```

### 设置DAR\SAR

- PAR - pixel aspect ratio，单个像素的宽高比

- DAR - display aspect ratio，画面显示宽高比

- SAR - Sample aspect ratio，采样纵横比， 表示横向的像素点数和纵向的像素点数的比值，即为我们通常提到的分辨率宽高比。就是对图像采集时，横向采集与纵向采集构成的点阵，横向点数与纵向点数的比值。
- $PAR\times SAR = DAR$​

```shell
ffmpeg-h -i input.mp4 -vf setsar=sar=1/1,setdar=dar=9/16 output.mp4
ffmpeg-h -i input.mp4 -vf scale=1280:720,setsar=sar=1/1,setdar=dar=16/9 output.mp4
```

### 裁剪画面

```shell
ffmpeg -i input.mp4 -vf crop=1200:1600:6:280 output.mp4
```

&gt;  crop=width,height,x,y
&gt;
&gt;  输出画面宽为width，高为height，x和y是裁剪后的画面左上角第一个像素在原画面中的坐标，例：原始画面1212 × 2160，裁剪后1200 × 1600

### 旋转与翻转画面

```sh
# 顺时针旋转90度
ffmpeg -i input.mp4 -vf &#34;transpose=1&#34; output.mp4
# 逆时针旋转90度
ffmpeg -i input.mp4 -vf &#34;transpose=2&#34; output.mp4
# 水平翻转
ffmpeg -i input.mp4 -vf hflip output.mp4
# 垂直翻转
ffmpeg -i input.mp4 -vf vflip output.mp4
# 旋转180度，顺时针旋转90度2次
ffmpeg -i input.mp4 -vf &#34;transpose=1,transpose=1&#34; output.mp4
```

上述命令会对视频进行重新编解码，下述命令只是修改视频的`rotation`属性。用`HUAWEI P60 Pro`拍摄的视频，不论是横屏拍摄还是竖屏拍摄，通过`ffmpeg`查看视频的宽和高，可以发现都是横屏视频(宽大于高)，只是竖屏拍摄的视频添加了`rotation`属性。

```shell
# 顺时针旋转90度
ffmpeg-h -display_rotation:0 -90 -i input.mp4 -c copy output.mp4
# 删除视频rotation属性
ffmpeg-h -display_rotation:0 0 -i input.mp4 -c copy output.mp4
```

### 视频拼接

先创建一个文本文件`filelist.txt`，按视频拼接顺序以下述格式写下各个视频片段的路径

```txt
file &#39;input-01.mp4&#39;
file &#39;input-02.mp4&#39;
```

然后执行下述命令

```shell
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.mp4
```

- 如果文件名有奇怪的字符，要在`filelist.txt`中转义
- 可能会出现报错`Unsafe file name`，导致命令运行不成功，`-safe 0`可以避免该问题
- 上述方法对于所有视频只有一个视频流的情况是支持的。如果参与拼接的视频还存在一个视频流是视频封面，上述方法会失败，可先删除视频封面再进行拼接。
- 假如有内容上是连续的两个视频片段，前一个视频片段的最后一帧和后一个视频的第一帧是一样的，`-c copy`拼接出来的视频在该时刻的画面可能会不流畅，此时尝试不使用`-c copy`参数

### 视频截取片段

```shell
ffmpeg -i input.mp4 -ss 00:01:00 -t 00:02:30 -c copy output.mp4
ffmpeg -i input.mp4 -t 30 -c copy output.mp4
ffmpeg -i input.mp4 -ss 00:01:00 -to 00:02:30 -c copy output.mp4
```

&gt; `-ss`放在`-i`前面运行会更快，把`-ss 1:05`放到`-i`前面，与原来的区别是，这样会先跳转到第1:05秒在开始解码输入视频，而原来的会从开始解码，只是丢弃掉前1:05秒的结果。如果将`-ss`放在`-i input.mp4`后面则`-to`的作用就没了，跟`-t`一样的效果了。

### 视频封面

#### 添加封面

下面两个命令都可以给视频添加封面。如果视频原来就有封面，再运行下面两个命令，第一个命令的结果是视频还是原来的封面，并且原封面对应的流的`attached_pic`属性会变成0；第二个命令的结果是视频显示是新封面，也不会改变原来封面的属性`attached_pic`的值。

&gt; 命令`ffprobe -show_streams VIDEO_FILE`可以查看流的`attached_pic`值

```shell
ffmpeg -i input.mp4 -i input.png -map 0 -map 1 -c copy -disposition:v:1 attached_pic output.mp4
ffmpeg -i input.mp4 -i input.png -map 1 -map 0 -c copy -disposition:0 attached_pic output.mp4
```

#### 替换封面

例如，通过`ffmpeg`看到一个视频的信息如下

```
Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(progressive), 1920x1080 [SAR 1:1 DAR 16:9], 2041 kb/s, 30 fps, 30 tbr, 90k tbn (default)
Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 146 kb/s (default)
Stream #0:2[0x0]: Video: png, rgb24(pc, gbr/unknown/unknown), 320x180 [SAR 1:1 DAR 16:9], 90k tbr, 90k tbn (attached pic)
```

三个数据流依次是视频、音频、封面，替换原来封面使用新封面的命令如下

```shell
ffmpeg -i input.mp4 -i input.png -map 0:0 -map 0:1 -map 1 -c copy -disposition:v:1 attached_pic output.mp4
ffmpeg -i input.mp4 -i input.png -map 1 -map 0:0 -map 0:1 -c copy -disposition:0 attached_pic output.mp4
```

以第一个命令为例
`-map 0:0`: 表示第一个文件的第一个流，第一个文件就是`input.mp4`，`input.mp4`的第一个流就是视频流
`-map 0:1`: 表示第一个文件的第二个流，也就是文件`input.mp4`的音频流
`-map 1`: 表示第二个文件，也就是`input.png`

上述命令中的`-map 0:1`可以写成`-map 0:a`，二者等价（对于该文件而言），都表示音频流。但命令中的`-map 0:0`不可以写成`-map 0:v`，因为`-map 0:v`表示视频流，但是封面也是视频流，既然是替换封面，就应该忽略掉原封面对应的流。

#### 删除封面

例如，通过`ffmpeg`看到一个视频的信息如下

```
Stream #0:0[0x1](und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(progressive), 1920x1080 [SAR 1:1 DAR 16:9], 2041 kb/s, 30 fps, 30 tbr, 90k tbn (default)
Stream #0:1[0x2](und): Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 146 kb/s (default)
Stream #0:2[0x0]: Video: png, rgb24(pc, gbr/unknown/unknown), 320x180 [SAR 1:1 DAR 16:9], 90k tbr, 90k tbn (attached pic)
```

三个数据流依次是视频、音频、封面，下述命令可以删除视频封面，即只保留第一个和第二个数据流：

```shell
ffmpeg -i input.mp4 -map 0:0 -map 0:1 -c copy output.mp4
```

下述命令也可删除封面（原理待研究）

```shell
ffmpeg -i input.mp4 -c copy -map_metadata -1 output.mp4
```

### 音频视频合并

```shell
ffmpeg -i video.mp4 -i audio.mp3 -c copy output.mp4
```

### 去除视频某些信息

删除视频章节信息，用`ffmpeg`查看视频信息，比如结果如下

```
Chapters:
  Chapter #0:0: start 0.000000, end 2321.237000
    Metadata:
      title           : 
Stream #0:0[0x1](und): Video: h264 (High) ...
Stream #0:1[0x2](und): Audio: aac (HE-AAC) ...
Stream #0:2[0x3](eng): Data: bin_data (text / 0x74786574)
  Metadata:
    handler_name    : SubtitleHandler
```

其中`Chapters`就是章节信息，对应`handler_name`为`SubtitleHandler`、类型`bin_data`的`Data`的这个流。下述信息可以删除章节信息

```shell
ffmpeg -i input.mp4 -c copy -map_chapters -1 output.mp4
```

用`ffmpeg`查看视频信息时，有的视频除了一个视频流和一个音频流外，还会有第三个流

```shell
ffmpeg -i input.mp4 -c copy -map_metadata -1 output.mp4
```

### 更改视频帧率

```shell
# 帧率修改为25
ffmpeg -i input.mp4 -r 25 output.mp4
```

### 压缩视频-crf参数

```shell
ffmpeg -i test.mp4 -crf 18 test-crf18.mp4
```

`crf`这个参数的取值范围为0~51，其中0为无损模式，数值越大，画质越差，生成的文件越小。一般取值在 18 到 28 之间。18往往被认为从视觉上看是无损的，但从技术的角度来讲，它依然是有损压缩。 若`crf`值加6，输出码率大概减少一半。使用`H264`编码时`crf`默认是23；使用`H265`编码时`crf`默认是28。

### 设置视频码率

```shell
ffmpeg -i input.mp4 -b:v 2000k output.mp4
ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k output.mp4
ffmpeg -i input.mp4 -b:v 2000k -bufsize 2000k -minrate 1800k -maxrate 2200k output.mp4
```

`-b:v`主要是控制平均码率

`-bufsize`用于设置码率控制缓冲器的大小，设置的好处是，让整体的码率更趋近于希望的值，减少波动。（简单来说，比如1 2的平均值是1.5， 1.49 1.51 也是1.5, 当然是第二种比较好）

`-minrate`,`-maxrate`将视频码率波动控制在一个范围内

### 设置视频大小

```shell
ffmpeg -i input.mp4 -fs 10MB output.mp4
ffmpeg -i input.mp4 -fs 10M output.mp4
ffmpeg -i test.mp4 -fs 5000K output.mp4
ffmpeg -i test.mp4 -fs 5000k output.mp4
# 下述命令报错,改成10M可行
ffmpeg -i input.mp4 -fs 10m output.mp4
```

`fs`参数以字节为单位，输出的视频的大小会变成与指定的大小相近

该参数可能会改变视频总帧数。比如原视频是30秒帧率30共900帧，用fs参数压缩后，虽然视频信息显示还是900帧，但实际总帧数小于900帧。（查看视频总帧数用的是下述命令）

```shell
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 output.mp4
```

### preset参数

```shell
ffmpeg -i input.mp4 -crf 18 -preset veryslow output.mp4
ffmpeg -i input.mp4 -crf 18 -preset medium output.mp4
ffmpeg -i input.mp4 -crf 18 -preset ultrafast output.mp4
```

`preset`参数主要调节编码速度和质量的平衡，编码速度慢会提供更高的压缩效率。有ultrafast、superfast、veryfast、faster、fast、medium、slow、slower、veryslow、placebo这10个选项。缺省值为medium。

与 veryslow相比，placebo以极高的编码时间为代价换取了大概1%的视频质量提升，这是一种收益递减准则，veryslow 与 slower相比提升了3%；slower 与 slow相比提升了5%；slow 与 medium相比提升了5%~10%。有需要的话，一般用veryslow就行，placebo可忽略考虑。

### H264编码profile

`H264`有四种画质级别,分别是`baseline`, `extended`, `main`, `high`:

1. `Baseline Profile`: 基本画质。支持I/P 帧，只支持无交错（Progressive）和CAVLC。
2. `Extended profile`: 进阶画质。支持I/P/B/SP/SI 帧，只支持无交错（Progressive）和CAVLC。(用的少)
3. `Main profile`: 主流画质。提供I/P/B 帧，支持无交错（Progressive）和交错（Interlaced），也支持CAVLC 和CABAC 的支持。
4. `High profile`: 高级画质。在main Profile 的基础上增加了8x8内部预测、自定义量化、 无损视频编码和更多的YUV 格式。

从压缩比例来说，`baseline&lt;main&lt;high`。`Baseline profile`多应用于实时通信领域，`Main profile`多应用于流媒体领域，`High profile`则多应用于广电和存储领域。

```shell
ffmpeg -i test.mp4 -c:v libx264 -profile:v baseline test-profile-baseline.mp4
ffmpeg -i test.mp4 -c:v libx264 -profile:v main test-profile-main.mp4
ffmpeg -i test.mp4 -c:v libx264 -profile:v high test-profile-high.mp4
```

`main`和`high`等profile是对于`H264`编解码器而言的，实际使用中发现`ffmpeg`默认是使用`profile`为`high`的`H264`，所以上述命令中`-c:v libx264`其实可以省略。比如，即使是对于一个原编解码器是`MPEG4`的视频来说，命令`ffmpeg -i test.mp4 -profile:v high test-profile-high.mp4`是可以正常运行的，输出视频的编解码器是`H264`，`profile`是`high`。

### 视频补帧提高帧率

```shell
# 前两个命令效果一样
ffmpeg -i input.mp4 -filter_complex &#34;minterpolate=&#39;fps=30&#39;&#34; output.mp4
ffmpeg -i input.mp4 -vf minterpolate=&#39;fps=30&#39; output.mp4
ffmpeg -i input.mp4 -r 30 -vf minterpolate output.mp4
```

### 视频黑边检测

#### [-cropdetect](https://ffmpeg.org/ffmpeg-filters.html#cropdetect)

&gt; 检测视频黑边

```shell
ffmpeg -i test-053.mp4 -t 1 -vf cropdetect=round=2 -f null -
ffmpeg -i test-053.mp4 -t 1 -vf cropdetect=limit=24:round=2 -f null -
```

`limit`默认值24
`round`默认值是16，`round`值整除视频宽度和高度。据`ffmpeg`官网描述，对多数编解码器来说，16是最好的。当然，设置成2，即让视频宽度和高度是2的倍数，也是可以的。

#### [-bbox](https://ffmpeg.org/ffmpeg-filters.html#bbox)

&gt; 检测视频黑边

```shell
ffmpeg -i input.mp4 -t 1 -vf bbox -f null -
ffmpeg -i input.mp4 -t 1 -vf bbox=16 -f null -
```

下面是命令运行结果的部分内容

```
n:23 pts:23000 pts_time:0.766692 x1:648 x2:1271 y1:0 y2:1079 w:624 h:1080 crop=624:1080:648:0 drawbox=648:0:624:1080
```

`n:23`: 第23帧
`x1,x2,y1,y2`: 表示非黑部分左上角和左下角的坐标
`crop=a,b,c,d`: 可直接用于裁剪视频

#### Tips

可能会遇到这样的视频，视频左右两边有黑色区域，但是视频中有小的logo一直在整个视频画面中运动（包括黑色区域）。对于黑色区域有小logo的某一帧：参数`-vf cropdetect=limit=24`可能可以忽略掉小logo的影响，检测出黑色区域；若减小`limit`值，比如`-vf cropdetect=limit=16`可能检测出来的非黑色区域就包括了小logo，即检测出来的区域更大。对于该类视频，想忽略掉小logo的影响，调整`cropdetect`的`limit`值比用`bbox`更方便。

### 黑屏检测

检查视频中纯黑色画面的片段，https://ffmpeg.org/ffmpeg-filters.html#blackdetect

```shell
ffmpeg -i input.mp4 -vf blackdetect -f null -
ffmpeg -i input.mp4 -vf &#34;blackdetect=d=2:pix_th=0.00&#34; -f null -
```

- black_min_duration, d: 设置黑场时间阈值，只有黑场的连续时间大于门限值才认为是黑场视频。阈值大于等于0，默认2.0。
- picture_black_ratio_th, pic_th: 设置黑场的判断阈值，nb_black_pixels/nb_pixels（黑场像素/总像素），该值为百分比，大于等于此阈值认为此帧图片是黑场. 默认值0.98.
- pixel_black_th, pix_th:
  设置黑场像素的判断阈值，默认值0.10。根据此阈值计算绝对阈值，低于绝对阈值的像素认为是黑场像素点。绝对阈值计算公式：$absolute\_threshold = luminance\_minimum\_value &#43; pixel\_black\_th * luminance\_range\_size$​
  $luminance\_range\_size$​和$luminance\_minimum\_value$​ 依赖输入视频的格式, 对于YUV full-range 其范围是 [0-255]，对于YUV non full-range 其范围是 [16-235];

命令的运行结果示例如下，可以输出检测到的黑屏开始时间、黑屏结束时间、黑屏持续时间

```
[blackdetect @ 0x600000da4070] black_start:298.266667 black_end:300.7 black_duration:2.433333
[blackdetect @ 0x600000da4070] black_start:589.333333 black_end:601.166667 black_duration:11.833333
[blackdetect @ 0x600000da4070] black_start:893.266667 black_end:901.616667 black_duration:8.35
[blackdetect @ 0x600000da4070] black_start:1193.366667 black_end:1202.116667 black_duration:8.75
[blackdetect @ 0x600000da4070] black_start:1498.65 black_end:1502.55 black_duration:3.9
[blackdetect @ 0x600000da4070] black_start:1792.15 black_end:1803.016667 black_duration:10.866667
[blackdetect @ 0x600000da4070] black_start:2081.05 black_end:2103.266667 black_duration:22.216667
```

### 黑帧检测

检测视频的中黑色的帧，https://ffmpeg.org/ffmpeg-filters.html#blackframe

```shell
ffmpeg -i intput.mp4 -vf blackframe -f null -
# 下面三个命令等效
ffmpeg -i intput.mp4 -vf blackframe=98:32 -f null -
ffmpeg -i intput.mp4 -vf blackframe=amount=98:threshold=32 -f null -
ffmpeg -i intput.mp4 -vf blackframe=amount=98:thresh=32 -f null -
```

`amount`: 黑色像素比例高于等于该值被视作是黑帧
`threshold, thresh`: 像素值低于该值的被视为黑色像素

命令运行结果示例如下，

```
[Parsed_blackframe_0 @ 0x600001be0000] frame:1 pblack:100 pts:400 t:0.034734 type:B last_keyframe:0
[Parsed_blackframe_0 @ 0x600001be0000] frame:2 pblack:100 pts:800 t:0.069469 type:P last_keyframe:0
[Parsed_blackframe_0 @ 0x600001be0000] frame:8586 pblack:100 pts:3434400 t:298.228552 type:B last_keyframe:8421
[Parsed_blackframe_0 @ 0x600001be0000] frame:8587 pblack:100 pts:3434800 t:298.263286 type:P last_keyframe:8421
```

书序信息分别表示：帧序号、黑色像素占比、时间戳、时间(秒)、帧类型、当前gop的idr帧的位置

通过`ffprobe -show_streams`查看视频流信息，可以看到`time_base`；通过`ffprobe -show_frames`查看帧信息，可以看到`pts`和`pts_time`；三者之间的关系是：$pts\_time=pts*time\_base$，上述输出信息中的`t`就是`pts_time`

### metadata

https://ffmpeg.org/ffmpeg-filters.html#metadata_002c-ametadata

下述命令实现了提取视频第一个非黑色的帧（可用于视频的缩略图）

```shell
ffmpeg -i input.mp4 -vf &#34;blackframe=0,metadata=select:key=lavfi.blackframe.pblack:value=50:function=less&#34; -vframes 1 -f image2 out.png
```

`blackframe=0`: 黑色像素比例大于0的帧，即所有帧
`metadata=select:key=lavfi.blackframe.pblack:value=50:function=less`: 选择`pblack`小于50的帧，即黑色像素占比低于50的帧
`-vframes 1`: 只输出符合要求的第一帧

即上述命令的含义就是输出所有帧中第一个黑色像素占比低于50的帧

### 图片合成视频

```shell
ffmpeg -r 1 -f image2 -i img-%2d.jpg output.mp4
```

图片命令的序号必须连续

## 音频处理

### 导出音频信息

```shell
ffmpeg -i input.mp3 -f ffmetadata output.txt
```

### 修改音频信息

```shell
# 修改title, 删除album, 其他不变
ffmpeg -i input.mp3 -metadata title=&#34;new title&#34; -metadata album=&#34;&#34; -c copy output.mp3
ffmpeg -i input.mp3 -metadata title=new-title -metadata album= output.mp3
# 删除所有信息(metadata)
ffmpeg -i input.mp3 -map_metadata -1 output.mp3
# 删除所有信息(metadata), 仅设置title
ffmpeg -i input.mp3 -map_metadata -1 -metadata title=new-title output.mp3
```

### 压缩音频

```shell
ffmpeg -i input.mp3 -ab 24k -ar 16k output.mp3
```

`-ab`: 等同于`-b:v`，设置码率
`-ar`: 设置音频采样速率

### 查看音量

```sh
ffmpeg -i input.mp4 -af volumedetect -f null -
```

上述命令的运行结果的其中两行信息如下，分别表示平均音量和最大音量

```
[Parsed_volumedetect_0 @ 0x6000025e9b80] mean_volume: -38.7 dB
[Parsed_volumedetect_0 @ 0x6000025e9b80] max_volume: -10.1 dB
```

### 调整音量

```sh
# 音量调大10分贝
ffmpeg -i input.mp4 -c:v copy -af &#34;volume=10dB&#34; output.mp4
# 音量调小5分贝
ffmpeg -i input.mp4 -c:v copy -af &#34;volume=-5dB&#34; output.mp4
# 音量调为150%
ffmpeg -i input.mp4 -c:v copy -af &#34;volume=1.5&#34; output.mp4
# 音量调为80%
ffmpeg -i input.mp4 -c:v copy -af &#34;volume=0.8&#34; output.mp4
```

### 绘制音量波形图

https://ffmpeg.org/ffmpeg-filters.html#showwavespic

```shell
ffmpeg -i input.mp4 -filter_complex &#34;showwavespic=s=600x240:scale=3&#34; -vframes 1 output.png
```

`s`: 指定图片大小，默认是`600x240`
`scale`: 设置音量振幅放缩比例，范围是`[0-3]`

## ffprobe

### 简介

ffprobe 是ffmpeg的一个工具包，主要用于探测音视频文件的各种信息

参考：

- [ffprobe Documentation-官网](https://ffmpeg.org/ffprobe.html)
- [ffprobe 使用小结-简书](https://www.jianshu.com/p/789244ad10d8)
- [FFmpeg之ffprobe-掘金](https://juejin.cn/post/6844903920750297101)
- [ffprobe输出元数据参数解析-博客园](https://www.cnblogs.com/chentiao/p/17085229.html)

### 参数介绍

```shell
# 下述两个命令等效，输出信息类似于: ffmpeg -i input.mp4
ffprobe input.mp4
ffprobe -i input.mp4
```

#### `-show_format`

&gt; 查看容器格式相关信息

```shell
ffprobe -show_format input.mp4
```

#### `-show_streams` 

&gt; 查看流信息

```shell
ffprobe -show_streams input.mp4
```

#### `-show_frames`

&gt; 查看帧信息

#### `-show_entries`

&gt; 设置只输出指定条目

```shell
# 只输出下述四项
# -show_format中的bit_rate,duration
# -show_streams中的codec_type,codec_name,bit_rate
# -show_streams中的tags
# -show_streams中的disposition中的attached_pic
ffprobe -v error -show_entries format=bit_rate,duration:stream=codec_type,codec_name,bit_rate:stream_tags:stream_disposition=attached_pic input.mp4
```

#### `-output_format, -of`:

&gt; 设置输出格式

例如

```shell
ffprobe -v error -show_entries format=bit_rate,duration test.mp4
```

输出如下

```
[FORMAT]
duration=30.000181
bit_rate=13020820
[/FORMAT]
```

那么，下述命令及其输出如下

```shell
ffprobe -v error -show_entries format=bit_rate,duration -output_format default=noprint_wrappers=1 test.mp4
```

```
duration=30.000181
bit_rate=13020820
```

```shell
ffprobe -v error -show_entries format=bit_rate,duration -of default=nokey=1 test.mp4
```

```
[FORMAT]
30.000181
13020820
[/FORMAT]
```

同时设置`nokey`和`noprint_wrappers`的命令如下

```shell
ffprobe -v error -show_entries format=bit_rate,duration -of default=nokey=1:noprint_wrappers=1 test.mp4
```

等价于下述命令，`nokey`简写`nk`，`noprint_wrappers`简写`nw`

```shell
ffprobe -v error -show_entries format=bit_rate,duration -of default=nk=1:nw=1 test.mp4
```

亦可指定输出格式，以json格式输出的命令如下

```shell
ffprobe -v error -show_entries format=bit_rate,duration -of json test.mp4
```

#### `-select_streams`

&gt; 输出指定流的信息

```shell
# 音频流
ffprobe -v error -show_streams -select_streams a test.mp4
# 视频流
ffprobe -v error -show_streams -select_streams v test.mp4
# 第一个视频流
ffprobe -v error -show_streams -select_streams v:0 test.mp4
# 第二个视频流
ffprobe -v error -show_streams -select_streams v:1 test.mp4
# 第二个流
ffprobe -v error -show_streams -select_streams 1 test.mp4
```

#### `-count_frames`

&gt; 计算每个流的帧数，并在相应的流部分中报告

例如，视频总帧数命令如下

```shell
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames test.mp4
```

不指定参数`-select_streams`时，`nb_read_frames`是`N/A`

## 小结

### 压缩视频

- 降低分辨率
- 降低帧率
- 用crf参数进行压缩
- 非H264的视频，可考虑改成H264，H264压缩可能比原编解码器更高
- 更改H264格式视频的profile，从压缩比例来说，baseline&lt;main&lt;high
- 使用H265编码，比H264压缩效率更高，但需要考虑兼容性，H264兼容性更高


---

> Author: [Huxley](https://star927.github.io/)  
> URL: https://example.org/posts/ffmpeg/  

