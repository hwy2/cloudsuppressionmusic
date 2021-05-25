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
        <div>
          <img :src="userPlaylist.playlist[0].coverImgUrl">
        </div>
      </div>
      <div class="center"
           @click="openSongListDialog(userPlaylist.playlist[0].id)">
        <p>我喜欢的音乐</p>
        <p>{{userPlaylist.playlist[0].trackCount}}首</p>
      </div>
      <div class="right">
        <div @click="getIntelligence()">
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
            <i class="iconfont iconjia1"
               @click="alert('未实现')"></i>
            <i class="iconfont iconziyuan"
               @click="alert('未实现')"></i>
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
              <div class="center"
                   @click="openSongListDialog(item.id)">
                <p>
                  {{item.name}}
                </p>
                <p>
                  {{item.trackCount}}首
                </p>
              </div>
              <div class="right">
                <i class=" iconfont iconziyuan"
                   @click="alert('未实现')"></i>
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
            <i class="iconfont"></i>
            <i class="iconfont iconziyuan"
               @click="alert('未实现')"></i>
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
              <div class="center"
                   @click="openSongListDialog(item.id)">
                <p>
                  {{item.name}}
                </p>
                <p>
                  {{item.trackCount}}首 by {{item.creator.nickname}}
                </p>
              </div>
              <div class="right">
                <i class=" iconfont iconziyuan"
                   @click="alert('未实现')"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 歌单详情弹出层 -->
    <song-listdetails :songListId="songListId"
                      @shut="closeSongListDialog"
                      v-if="songListVisible"></song-listdetails>

  </div>
</template>
<script>
import "../../assets/less/me.less";
import cookie from "json-cookie";
import { Indicator } from "mint-ui";
import SongListdetails from "../../components/songListDetails/songListDetails";
export default {
  components: {
    SongListdetails,
  },
  data () {
    return {
      userDetail: [], //用户信息
      userPlaylist: [],//用户歌单
      rendering: false, //渲染完成
      createSongLists: [],//创建歌单
      collectionSongLists: [],//收藏歌单
      songListId: "",//歌单id//2097071529
      songId: '',//首曲id//1600454
      songListVisible: false,//歌单详情
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

          //   cookie.set("userDetail", this.userDetail, {
          //     expires: 7,
          //   });
        })
        .catch((error) => {
          window.console.log("获取失败！/n" + error);
        });
    },
    getUserPlaylist: function (uid) {
      Indicator.open("加载中...");
      let that = this;
      this.$axios
        .get("/user/playlist?uid=" + uid)
        .then((res) => {
          window.console.log("用户歌单：", res.data);
          this.userPlaylist = res.data;
          this.rendering = true;
          this.songListId = this.userPlaylist.playlist[0].id;
          this.getPlaylistMusic();
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
    getPlaylistMusic: function () {
      let that = this;
      // 获取歌单歌曲
      this.$axios
        .get("/playlist/detail?id=" + this.songListId)
        .then(res => {
          window.console.log("歌单歌曲", res.data);
          if (res.data.code === 200) {
            that.songId = res.data.playlist.tracks[0].id;
          }
          Indicator.close();
        })
        .catch(error => {
          window.console.log("歌单获取失败！/n" + error);
          Indicator.close();
        });
    },
    getIntelligence: function () {
      Indicator.open({
        text: '心动模式启动中',
        spinnerType: 'fading-circle'
      });
      let that = this;
      // 获取心动模式音乐
      this.$axios({
        url: "/playmode/intelligence/list",
        params: { id: this.songId, pid: this.songListId, cookie: cookie.get("cookie") }
      })
        .then(res => {
          window.console.log("心动模式音乐：", res.data);
          that.playMusic(res.data.data[0].songInfo);
          let songInfoArray = [];
          res.data.data.forEach(function (item) {
            songInfoArray.push(item.songInfo);
          })
          that.$store.commit("setplaylist", songInfoArray);
          Indicator.close();
        })
        .catch(error => {
          window.console.log("获取心动模式音乐失败！/n" + error);
          Indicator.close();
        });
    },
    openSongListDialog: function (id) {
      // dialog开关
      this.songListId = id;
      this.songListVisible = true;
    },
    closeSongListDialog: function () {
      this.songListVisible = false;
    },
    playMusic: function (songInfo) {
      songInfo["picUrl"] = songInfo.al.picUrl;
      this.getplayMusic(songInfo.id, songInfo);
    }
  },
  created () {
    let profile = cookie.get("profile");
    window.console.log(profile);
    this.getUserDetail(profile.userId);
  },
};
</script>
