# cloudsuppressionmusic

移动端项目

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### NeteaseCloudMusicApi版本
#### version：3.47.2

### 备注
1）本程序打包之后，需要与 NeteaseCloudMusicApi 放在同源的服务器上，否则接口会报301错误
例如我的程序：使用 pm2 代理运行NeteaseCloudMusicApi在服务器上，使用 主域名+端口号访问api,vue程序打包之后用主域名的二级域名解析到运行api的服务上，Apache 服务器做服务器

2）api请求的主域名修改在 main.js 中

### 实现功能

#### 我的 页面实现功能：

1）显示用户基本信息（头像，昵称，等级等）

2）显示用户喜欢的音乐，创建的歌单等信息

3）实现心动模式智能播放

4）实现歌单详情获取显示功能
 
#### 发现 页面实现功能

1）轮播图

2）二级导航栏

3）每日推荐

4）歌单

5）歌单详情

6）音乐播放

7）首页数据渲染

#### 云村 页面实现功能

1）广场页面实现获取推荐视频

2）下拉获取新内容

3）打开视频播放页


#### 云村视频播放 页面实现功能

1）获取视频详情

2）获取视频播放链接

3）获取视频评论信息

4）评论上拉刷新获取新评论信息

5）获取相关视频，并可以播放

#### 每日推荐 页面实现功能

1）页面音乐列表显示

2）音乐单曲播放

3）页面播放全部


#### 歌单广场 页面实现功能

1）热门分类导航栏渲染

2）推荐歌单渲染

3）歌单详情

4）歌单分类

5）歌单分类获取相应的歌单

#### 搜索 页面实现功能

1）热搜列表

2）搜索结果分类显示

3）单曲播放

4）歌单详情

5）视频播放

#### 登录 页面实现功能

1）登录功能

2）获取播放记录