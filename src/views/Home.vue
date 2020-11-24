<template>
  <div class="home">
    <!-- 左侧抽屉 -->
    <div class="leftDrawer">
      <mt-popup v-model="popupVisible"
                position="left">
        <div class="content">
          <div class="upperPart">
            <div class="vip">
              <p>
                <span>开通黑胶VIP</span>
                <a href="javascript:void();">会员中心</a>
              </p>
              <p>
                <span>加入黑胶VIP，立享超17项专属特权</span>
              </p>
            </div>
            <div class="discount">
              <p>
                <span>领券首开会员仅1.8元，仅限两天!</span>
              </p>
              <p>
                <span>尊享海量会员曲库等超17项特权</span>
              </p>
              <a href="javascript:void();">
                会员
                <br />1.8元
              </a>
              <i class="iconfont iconzuojiantou-cu"></i>
            </div>
          </div>
          <div class="lowerPart">
            <div class="userProfile">
              <div class="top clearfix">
                <div class="left">
                  <img :src="profile.avatarUrl"
                       alt="头像" />
                  <span>{{ profile.nickname }}</span>
                </div>
                <div class="right clearfix">
                  <a href="javascript:void(0)">
                    <i class="iconfont iconqiandao"></i>签到
                  </a>
                </div>
              </div>

              <div class="bottomBar">
                <div>
                  <i class="iconfont iconyoujian"></i>
                  <p>我的消息</p>
                </div>
                <div>
                  <i class="iconfont iconhaoyou"></i>
                  <p>我的好友</p>
                </div>
                <div>
                  <i class="iconfont iconzhuye"></i>
                  <p>个人主页</p>
                </div>
                <div>
                  <i class="iconfont iconquanmianshidai-"></i>
                  <p>个性装扮</p>
                </div>
              </div>
            </div>

            <div class="creator">
              <div>
                <i class="iconfont iconbulb"></i>
                <span>创作者中心</span>
              </div>
            </div>

            <div class="listeningMusic">
              <ul>
                <li>
                  <div class="left">
                    <i class="iconfont iconmaikefeng"></i>
                    <span>听歌识曲</span>
                  </div>
                  <div class="right">
                    <p>可识别其他app歌曲</p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconpiaoquan"></i>
                    <span>演出</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont icongouwuchezhengpin"></i>
                    <span>商城</span>
                  </div>
                  <div class="right">
                    <p>影院级tws 5折</p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont icondingwei"></i>
                    <span>附近的人</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconyouxi"></i>
                    <span>游戏推荐</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconlingdang"></i>
                    <span>口袋彩铃</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="listeningMusic otherFunctions">
              <ul>
                <li>
                  <div class="left">
                    <i class="iconfont icondingdan"></i>
                    <span>我的订单</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont icondingshi"></i>
                    <span>定时停止播放</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconsaoyisao"></i>
                    <span>扫一扫</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont icondingshi1"></i>
                    <span>音乐闹钟</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconV"></i>
                    <span>音乐云盘</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconqianbao"></i>
                    <span>在线听歌免流量</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconyouhuiquan"></i>
                    <span>优惠券</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconanquanzhuye"></i>
                    <span>青少年模式</span>
                  </div>
                  <div class="right">
                    <p>未开启</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="barBotm">
            <div>
              <i class="iconfont iconyueliang"></i>
              <span>夜间模式</span>
            </div>
            <div>
              <i class="iconfont iconshezhi"></i>
              <span>设置</span>
            </div>
            <div>
              <i class="iconfont icontuichu"></i>
              <span>退出</span>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>

    <!-- 顶部导航栏 -->
    <div class="navbarWarp">
      <div class="drawer">
        <i class="iconfont icongengduo"
           @click="ListenDrawer()"></i>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="me">我的</mt-tab-item>
        <mt-tab-item id="find">发现</mt-tab-item>
        <mt-tab-item id="yuncun">云村</mt-tab-item>
        <!--<mt-tab-item id="videoY">视频</mt-tab-item>-->
      </mt-navbar>
      <div class="search">
        <i class="iconfont iconsousuo"
           @click="openSearchdialog()"></i>
      </div>
    </div>

    <router-view />

    <!-- 底部播放区 -->
    <div class="tabbar clearfix"
         id="playArea">
      <div class="left clearfix"
           @click="openPanelDialog()">
        <div class="musicImg">
          <span>
            <img :src="song.picUrl"
                 alt="歌曲封面"
                 id="musicImg"
                 @errοr="defaultImg" />
          </span>
        </div>
        <div class="details">
          <p class="songTitle">{{ song.name }}</p>
          <p>横滑可以切换上下首哦</p>
        </div>
        <audio :autoplay="isPlay"
               ref="audio"
               @ended="palyNextSong()"
               :src="songPlayUrl"
               id="audioPlayer">
          您的浏览器不支持 audio 标签。
        </audio>
      </div>
      <div class="right">
        <i class="iconfont icontubiaozhizuomoban"
           @click="playAudio()"
           v-if="!isPlay"></i>
        <i class="iconfont icontubiaozhizuomoban1"
           @click="pauseAudio()"
           v-if="isPlay"></i>
        <i class="iconfont iconbofangliebiao"></i>
      </div>
    </div>

    <!-- 播放详情 -->
    <panel-play @panelClose="closePanelDialog"
                v-if="panelVisible"
                :appthat="that"></panel-play>

    <!-- 歌单列表弹出层 
    <search @searchdown="closeSearchdialog" v-if="searchVisible"></search>-->
  </div>
</template>

<script>
import "../assets/less/home.less";
import cookie from "json-cookie";
// import Search from "../components/search";
import PanelPlay from "../components/playPanel/playPanel";

export default {
  name: "Home",
  components: { PanelPlay, },
  data () {
    return {
      popupVisible: false,
      searchVisible: false, //搜索页
      profile: [],//用户信息
      panelVisible: false,//播放详情页面
      that: this,
    };
  },
  methods: {
    ListenDrawer: function () {
      this.popupVisible = true;
    },
    closeSearchdialog: function () {
      this.searchVisible = false;
    },
    openSearchdialog: function () {
      this.searchVisible = true;
    },
    defaultImg: () => {
      let img = event.srcElement;
      img.src = require("../assets/images/lo.png");
      img.onerror = null; //防止闪图
    },
    closePanelDialog: function () {
      this.panelVisible = false;
    },
    openPanelDialog: function () {
      // dialog开关
      this.panelVisible = true;
    },
    playAudio: function () {
      // 播放音乐，并修改状态
      // window.console.log(document.getElementById("audioPlayer"));
      this.$refs.audio.play();
      this.$store.commit("setisPlay", true);
      let musicrotateAn = document.getElementById("musicImg");
      musicrotateAn.setAttribute(
        "style",
        "-webkit-animation: rotateAn 8s linear infinite; animation: rotateAn 8s linear infinite;"
      );
    },
    pauseAudio: function () {
      // 暂停音乐，并修改状态
      this.$refs.audio.pause();
      this.$store.commit("setisPlay", false);
      let musicrotateAn = document.getElementById("musicImg");
      musicrotateAn.setAttribute("style", "");
    },
    palyNextSong: function () {
      this.nextSong(this.serialNumber, this.playlist);
    },
    playMusicAll: function () {
      let that = this;
      let songAll = [];

      that.newsongList.creatives.forEach(function (item) {
        item.resources.forEach(function (i) {
          let images = i.uiElement.image.imageUrl;
          i.picUrl = images;
          i.name = i.uiElement.mainTitle.title;
          window.console.log(i);
          songAll.push(i);
        });
      });
      that.$store.commit("setplaylist", songAll);
      that.$store.commit("setserialNumber", 0);
      that.playMusic(songAll[0], songAll[0].picUrl);
    },
  },
  watch: {
    selected: function (newV, oldV) {
      window.console.log("当前选择：" + newV);
      window.console.log("上一个选择：" + oldV);
      this.$router.push({ name: newV });
      this.$store.commit("setSelected", newV);
    },
    popupVisible: function (newV) {
      if (newV) {
        this.noScroll(); //禁止主页面滚动
        let styleLang = document.getElementById("playArea");
        styleLang.style.zIndex = 2000;
      } else {
        //主页面可滑动
        this.canScroll();
        let styleLang = document.getElementById("playArea");
        styleLang.style.zIndex = 2002;
      }
    },
    isPlay: function (newV) {
      if (newV) {
        this.playAudio();
      } else {
        this.pauseAudio();
      }
    }
  },
  computed: {
    selected: {//导航栏选中
      get () {
        return this.$store.state.selected;
      },
      set (v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit("setSelected", v);
      },
    },
    song: {
      //歌曲信息
      get () {
        return this.$store.state.songInfo;
      },
      set (v) {
        this.$store.commit("setsongInfo", v);
      },
    },
    songPlayUrl: {
      //歌曲URL
      get () {
        return this.$store.state.songPlayUrl;
      },
      set (v) {
        this.$store.commit("setsongPlayUrl", v);
      },
    },
    serialNumber: {
      //播放列表序号
      get () {
        return this.$store.state.serialNumber;
      },
      set (v) {
        this.$store.commit("setserialNumber", v);
      },
    },
    playlist: {
      //歌曲列表
      get () {
        return this.$store.state.playlist;
      },
      set (v) {
        this.$store.commit("setplaylist", v);
      },
    },
    isPlay: {
      //播放状态
      get () {
        return this.$store.state.isPlay;
      },
      set (v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit("setisPlay", v);
      },
    },
  },
  created () {
    let profile = cookie.get("profile");
    this.profile = profile;
  },
};
</script>
