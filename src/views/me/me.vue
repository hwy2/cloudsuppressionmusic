<template>
  <div class="me">
    <div class="profile"
         v-if="rendering">
      <div class="left">
        <img :src="userDetail.profile.avatarUrl" />
      </div>
      <div class="center">
        <p>
          {{ userDetail.profile.nickname }}
        </p>
        <p>
          <span>lv.{{ userDetail.level }}</span>
        </p>
      </div>
      <div class="right">
        <i class="iconfont iconzuojiantou-cu"></i>
      </div>
    </div>

    <!-- 常见功能-->
    <div class="common"
         v-if="rendering">
      <div class="bgc">
        <ul class="clearfix">
          <li>
            <div class="">
              <i class="iconfont iconxiazai1"></i>
            </div>
            <p>本地音乐</p>
          </li>
          <li>
            <div class="">
              <i class="iconfont iconshangchuan"></i>
            </div>
            <p>云盘</p>
          </li>
          <li>
            <div class="">
              <i class="iconfont icongou"></i>
            </div>
            <p>已购</p>
          </li>
          <li>
            <div class="">
              <i class="iconfont iconbofang3"></i>
            </div>
            <p>最近播放</p>
          </li>
          <li>
            <i class="iconfont iconhaoyou1"></i>
            <p>我的好友</p>
          </li>
          <li>
            <i class="iconfont iconshoucang1"></i>
            <p>收藏和赞</p>
          </li>
          <li>
            <i class="iconfont iconxiangsidiantai"></i>
            <p>我的电台</p>
          </li>
          <li>
            <div class="">
              <i class="iconfont iconjia"></i>
            </div>
            <p>音乐应用</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 我喜欢的音乐 -->
    <div class="favoriteMusic"
         v-if="rendering">
      <div class="left">
        <div class="">
          <i class="iconfont iconxihuan"></i>
        </div>
      </div>
      <div class="center">
        <p>我喜欢的音乐</p>
        <p>{{userPlaylist.playlist[0].trackCount}}首</p>
      </div>
      <div class="right">
        <div class="">
          <i class=" iconfont iconxindong"></i>
          <span>心动模式</span>
        </div>
      </div>
    </div>

    <!-- 创建歌单 -->
    <div class="createSongList"
         v-if="rendering">
      <div class="bgc">
        <div class="top">
          <div class="left">
            <p>
              创建歌单（{{createSongLists.length}}）个
            </p>
          </div>
          <div class="right">
            <i class="iconfont iconjia1"></i>
            <i class="iconfont iconziyuan"></i>
          </div>
        </div>
        <div class="contentText">
          <ul>
            <li v-for="(item,index) in createSongLists"
                :key="index">
              <div class="left">
                <img :src="item.coverImgUrl"
                     :alt="item.name">
              </div>
              <div class="center">
                <p>
                  {{item.name}}
                </p>
                <p>
                  {{item.trackCount}}首
                </p>
              </div>
              <div class="right">
                <i class=" iconfont iconziyuan"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 收藏歌单 -->
    <div class="createSongList collectionSongLists"
         v-if="rendering">
      <div class="bgc">
        <div class="top">
          <div class="left">
            <p>
              收藏歌单（{{collectionSongLists.length}}）个
            </p>
          </div>
          <div class="right">
            <i class="iconfont iconjia1"></i>
            <i class="iconfont iconziyuan"></i>
          </div>
        </div>
        <div class="contentText">
          <ul>
            <li v-for="(item,index) in collectionSongLists"
                :key="index">
              <div class="left">
                <img :src="item.coverImgUrl"
                     :alt="item.name">
              </div>
              <div class="center">
                <p>
                  {{item.name}}
                </p>
                <p>
                  {{item.trackCount}}首 by {{item.creator.nickname}}
                </p>
              </div>
              <div class="right">
                <i class=" iconfont iconziyuan"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import "../../assets/less/me.less";
import cookie from "json-cookie";
export default {
  data () {
    return {
      userDetail: [], //用户信息
      userPlaylist: [],//用户歌单
      rendering: false, //渲染完成
      createSongLists: [],//创建歌单
      collectionSongLists: [],//收藏歌单
    };
  },
  methods: {
    getUserDetail: function (uid) {
      this.$axios
        .get("/user/detail?uid=" + uid)
        .then((res) => {
          window.console.log(res.data);
          this.userDetail = res.data;
          this.getUserPlaylist(uid);
        })
        .catch((error) => {
          window.console.log("获取失败！/n" + error);
        });
    },
    getUserPlaylist: function (uid) {
      let that = this;
      this.$axios
        .get("/user/playlist?uid=" + uid)
        .then((res) => {
          window.console.log("用户歌单：", res.data);
          this.userPlaylist = res.data;
          this.rendering = true;
          for (let i = 1; i < res.data.playlist.length; i++) {
            if (uid == res.data.playlist[i].creator.userId) {
              that.createSongLists.push(res.data.playlist[i]);
            } else {
              that.collectionSongLists.push(res.data.playlist[i]);
            }
          }
        })
        .catch((error) => {
          window.console.log("获取失败！/n" + error);
        });
    },
  },
  created () {
    let account = cookie.get("account");
    this.getUserDetail(account.id);
  },
};
</script>
