<template>
  <div class="find"
       v-if="contentShow">
    <!-- 顶部banner轮播 -->
    <div class="topSwipe">
      <mt-swipe :auto="5000"
                :speed="0">
        <mt-swipe-item v-for="item in swipeList"
                       :key="item.bannerId">
          <img v-lazy="item.pic"
               :alt="item.typeTitle"
               :bannerId="item.bannerId" />
          <span :style="{ background: item.titleColor }">{{ item.typeTitle }}</span>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 二级导航栏 -->
    <div class="navigation">
      <ul class>
        <li v-for="(item, index) in iconList"
            :key="index"
            @click="middleMethods(index)">
          <div class>
            <img :src="item.iconUrl"
                 :alt="item.name" />
            <span v-if="index === 0">{{ day }}</span>
          </div>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>

    <!-- 推荐歌单 -->
    <div class="recommendation"
         v-if="recommendedSongList != '' && recommendedSongList.creatives.length > 0">
      <div class="topTile">
        <div class="left">
          <p>{{ recommendedSongList.uiElement.subTitle.title }}</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)"
             @click="openSongsheetDialog('推荐')">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="item in recommendedSongList.creatives"
              :key="item.creativeId"
              @click="openSongListDialog(item.creativeId)">
            <img :src="item.uiElement.image.imageUrl"
                 :alt="item.uiElement.mainTitle.title" />
            <span>
              <i class="iconfont iconicon--"></i>
              {{ item.resources[0].resourceExtInfo.playCount | retainDoubleDigit }}
            </span>
            <p>{{ item.uiElement.mainTitle.title }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 歌曲推荐 -->
    <div class="recommendation songNew"
         v-if="personalTailor != '' && personalTailor.creatives.length > 0">
      <div class="topTile">
        <div class="left">
          <p>
            <span>{{ personalTailor.uiElement.mainTitle.title }}</span>{{ personalTailor.uiElement.subTitle.title }}
          </p>
        </div>
        <div class="right">
          <a href="javascript:void(0)"
             @click="playMusicAll()"> <i class="iconfont iconbofang"></i><span>播放全部</span> </a>
        </div>
      </div>

      <div class="concentration">
        <ul class="topUl">
          <li v-for="(item, index) in personalTailor.creatives"
              :key="index">
            <ul class="smallList">
              <li v-for="(song, indexs) in item.resources"
                  :key="indexs"
                  @click="playMusic(song.resourceExtInfo.songData, song.uiElement.image.imageUrl)">
                <div class="left">
                  <img :src="song.uiElement.image.imageUrl"
                       alt="d" />
                </div>
                <div class="center">
                  <p>
                    <span>{{ song.uiElement.mainTitle.title }}</span>&nbsp;
                  </p>
                  <p>{{ song.resourceExtInfo.artists[0].name }}</p>
                </div>
                <div class="right">
                  <div class="icon">
                    <i class="iconfont iconbofang"></i>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 音乐日历 -->
    <div class="musicCalendar"
         v-if="musicCalendar != '' && musicCalendar.creatives.length > 0">
      <div class="details">
        <div class="top">
          <p>
            <i class="iconfont iconyinle"></i>
            <span>音乐日历</span>
          </p>
        </div>

        <div class="contentsd">
          <mt-swipe :auto="5000"
                    :speed="0"
                    :showIndicators="false">
            <mt-swipe-item v-for="(item, index) in musicCalendar.creatives"
                           :key="index">
              <div class="left">
                <p v-if="index == 0">今天</p>
                <p v-else>明天</p>
                <p>
                  {{ item.resources[0].uiElement.mainTitle.title }}
                </p>
              </div>
              <div class="right">
                <img :src="item.resources[0].uiElement.image.imageUrl"
                     :alt="item.resources[0].uiElement.labelTexts" />
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 场景推荐 -->
    <div class="recommendation"
         v-if="exclusiveScene != '' && exclusiveScene.creatives.length > 0">
      <div class="topTile">
        <div class="left">
          <p>{{ exclusiveScene.uiElement.subTitle.title }}</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)"
             @click="openSongsheetDialog('官方')">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="(item, index) in exclusiveScene.creatives"
              :key="index"
              @click="openSongListDialog(item.creativeId)">
            <img :src="item.uiElement.image.imageUrl"
                 :alt="item.uiElement.mainTitle.title" />
            <span>
              <i class="iconfont iconicon--"></i>
              {{ item.resources[0].resourceExtInfo.playCount | retainDoubleDigit }}
            </span>
            <p>{{ item.uiElement.mainTitle.title }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- LOOK直播 -->
    <div class="recommendation broadcast"
         v-if="voiceBroadcast != '' && voiceBroadcast.extInfo.length > 0">
      <div class="topTile">
        <div class="left">
          <p>{{ voiceBroadcast.uiElement.subTitle.title }}</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="(item, index) in voiceBroadcast.extInfo"
              :key="index"
              @click="openSongListDialog(item.creativeId)">
            <img :src="item.verticalCover"
                 :alt="item.title" />
            <span>
              <i class="iconfont iconfire"></i>
              {{ item.popularity }}.{{ item.privateTag }}
            </span>
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 新歌|新碟 -->
    <div class="recommendation newDisc"
         v-if="newSong != '' && newSong.creatives.length > 0">
      <div class="topTile">
        <div class="left">
          <p>
            <b :class="clickFlag ? '' : 'active'"
               @click="clickFlag && changeFlag()">新歌</b>
            |
            <b :class="clickFlag ? 'active' : ''"
               @click="!clickFlag && changeFlag()">新碟</b>
          </p>
        </div>
        <div class="right">
          <a href="javascript:void(0)">
            <span v-if="!clickFlag">更多新歌</span>
            <span v-else>更多新碟</span>
          </a>
        </div>
      </div>

      <div class="concentration">
        <mt-swipe v-if="!clickFlag"
                  :auto="0"
                  :speed="0"
                  :showIndicators="false">
          <mt-swipe-item>
            <ul class="smallList">
              <li v-for="(song, indexs) in newSong.creatives[0].resources"
                  :key="indexs"
                  @click="playMusic(song.resourceExtInfo.songData, song.uiElement.image.imageUrl)">
                <div class="left">
                  <img :src="song.uiElement.image.imageUrl"
                       alt="d" />
                </div>
                <div class="center">
                  <p>
                    <span>{{ song.uiElement.mainTitle.title }}</span>&nbsp;<span>-{{ song.resourceExtInfo.artists[0].name }}</span>
                  </p>
                  <p>{{ song.uiElement.subTitle.title }}</p>
                </div>
                <div class="right">
                  <div class="icon">
                    <i class="iconfont iconbofang"></i>
                  </div>
                </div>
              </li>
            </ul>
          </mt-swipe-item>

          <mt-swipe-item>
            <ul class="smallList">
              <li v-for="(song, indexs) in newSong.creatives[1].resources"
                  :key="indexs"
                  @click="playMusic(song.resourceExtInfo.songData, song.uiElement.image.imageUrl)">
                <div class="left">
                  <img :src="song.uiElement.image.imageUrl"
                       alt="d" />
                </div>
                <div class="center">
                  <p>
                    <span>{{ song.uiElement.mainTitle.title }}</span>&nbsp;<span>-{{ song.resourceExtInfo.artists[0].name }}</span>
                  </p>
                  <p>{{ song.uiElement.subTitle.title }}</p>
                </div>
                <div class="right">
                  <div class="icon">
                    <i class="iconfont iconbofang"></i>
                  </div>
                </div>
              </li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>

        <mt-swipe v-if="clickFlag"
                  :auto="0"
                  :speed="0"
                  :showIndicators="false">
          <mt-swipe-item>
            <ul class="smallList">
              <li v-for="(song, indexs) in newSong.creatives[2].resources"
                  :key="indexs">
                <div class="left">
                  <img :src="song.uiElement.image.imageUrl"
                       alt="d" />
                </div>
                <div class="center">
                  <p>
                    <span>{{ song.uiElement.mainTitle.title }}</span>&nbsp;<span>-{{ song.resourceExtInfo.artists[0].name }}</span>
                  </p>
                  <p>{{ song.uiElement.subTitle.title }}</p>
                </div>
              </li>
            </ul>
          </mt-swipe-item>

          <mt-swipe-item>
            <ul class="smallList">
              <li v-for="(song, indexs) in newSong.creatives[3].resources"
                  :key="indexs">
                <div class="left">
                  <img :src="song.uiElement.image.imageUrl"
                       alt="d" />
                </div>
                <div class="center">
                  <p>
                    <span>{{ song.uiElement.mainTitle.title }}</span>&nbsp;<span>-{{ song.resourceExtInfo.artists[0].name }}</span>
                  </p>
                  <p>{{ song.uiElement.subTitle.title }}</p>
                </div>
              </li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>

    <!-- 云村KTV -->
    <div class="recommendation yuncunktv"
         v-if="yuncunktv != '' && yuncunktv.extInfo.roomInfoList.length > 0">
      <div class="topTile">
        <div class="left">
          <p>{{ yuncunktv.uiElement.subTitle.title }}</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="(item, index) in yuncunktv.extInfo.roomInfoList"
              :key="index">
            <img :src="item.bgUrl"
                 :alt="item.title" />
            <span>
              <i class="iconfont iconAPPtubiaozhuanqu-"></i>
              {{ item.label }}
            </span>
            <span>{{ item.title }}</span>

            <span>
              <label v-for="(itemImg, indexs) in item.onlineUserList"
                     :key="indexs">
                <img :src="itemImg.avatarUrl"
                     :alt="itemImg.nickname" />
              </label>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 24小时播客-->
    <div class="recommendation podcast"
         v-if="podcast != '' && podcast.creatives.length > 0">
      <div class="topTile">
        <div class="left">
          <p>{{ podcast.uiElement.subTitle.title }}</p>
        </div>
        <div class="right"></div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="(item, index) in podcast.creatives"
              :key="index">
            <div class="">
              <img :src="item.uiElement.image.imageUrl"
                   :alt="item.uiElement.mainTitle.title" />
              <i class="iconfont iconbofang"></i>
            </div>
            <p>{{ item.uiElement.mainTitle.title }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 每日推荐弹出层 -->
    <daily-recommendation @close="closeDaily"
                          v-if="dailyVisible"></daily-recommendation>

    <!-- 歌单列表弹出层 -->
    <song-sheet :songSheetType="songSheetType"
                @shutdown="closeSongsheetDialog"
                v-if="songSheetVisible"></song-sheet>

    <!-- 歌单详情弹出层 -->
    <song-listdetails :songListId="songListId"
                      @shut="closeSongListDialog"
                      v-if="songListVisible"></song-listdetails>
    <!-- 歌单详情弹出层 -->
    <ranking-list @rankingListDown="closeRankingListDialog"
                  v-if="rankingListVisible"></ranking-list>
  </div>
</template>

<script>
import "../../assets/less/find.less";
import { Indicator } from "mint-ui";
import DailyRecommendation from "../../components/dailyRecommendation/recommendation";
import SongSheet from "../../components/songSheet/songSheet";
import SongListdetails from "../../components/songListDetails/songListDetails";
import RankingList from "../../components/rankingList/rankingList";

export default {
  name: "find",
  components: {
    DailyRecommendation,
    SongSheet,
    SongListdetails,
    RankingList,
  },
  data () {
    return {
      swipeList: [], //轮播图list
      iconList: [], //首页-发现-圆形图标入口列表
      day: "", //当前日期
      homePageData: [], //首页数据
      contentShow: false, //数据渲染前不显示
      clickFlag: false, //判断是否为新歌
      podcast: [], //24小时播客
      yuncunktv: [], //云村KTV
      dailyVisible: false, //每日推荐弹出层
      recommendedSongList: [], //推荐歌单
      personalTailor: [], //私人定制
      exclusiveScene: [], //专属场景歌单
      voiceBroadcast: [], //语音直播
      musicCalendar: [], //音乐日历
      newSong: [], //新歌新碟
      songSheetType: "推荐", //默认打开歌单类型
      songSheetVisible: false, //歌单列表弹出层
      songListId: "",//歌单id
      songListVisible: false,//歌单弹出层
      rankingListVisible: false,//排行榜弹出层
    };
  },
  filters: {
    //拦截器
    retainDoubleDigit: function (data) {
      // 将数据转万
      if (data > 100000000) {
        return (data / 100000000).toFixed(2) + "亿";
      } else {
        return (data / 10000).toFixed(2) + "万";
      }
    },
  },
  methods: {
    getbanner: function () {
      // 获取banner图
      this.$axios
        .get("/banner?type=2")
        .then((res) => {
          this.swipeList = res.data.banners;
          this.geticon();
          // window.console.log(res.data.banners);
        })
        .catch((error) => {
          window.console.log("轮播图获取失败！/n" + error);
          Indicator.close();
        });
    },
    geticon: function () {
      // 获取圆形图标入口列表
      this.$axios({
        url: "/homepage/dragon/ball",
        withCredentials: false
      })
        .then((res) => {
          // window.console.log("圆形图标入口列表", res);
          this.iconList = res.data.data;
          this.gethomedata();
        })
        .catch((err) => {
          window.console.log("圆形图标入口列表失败！", err);
        });
    },
    gethomedata: function () {
      //获取首页数据
      let that = this;
      this.$axios({
        url: "/homepage/block/page",
        params: {
          refresh: true,
        },
        withCredentials: false
      })
        .then((res) => {
          window.console.log("首页", res.data);
          this.homePageData = res.data.data.blocks;
          res.data.data.blocks.forEach(function (item) {
            if (item.uiElement) {
              if (item.uiElement.subTitle) {
                if (item.uiElement.subTitle.title == "24小时播客") {
                  that.podcast = item;
                }

                if (item.uiElement.subTitle.title == "云村KTV") {
                  that.yuncunktv = item;
                }

                if (item.uiElement.subTitle.title == "推荐歌单") {
                  that.recommendedSongList = item;
                }

                if (item.uiElement.subTitle.title == "专属场景歌单") {
                  that.exclusiveScene = item;
                }

                if (item.uiElement.subTitle.title == "语音直播") {
                  that.voiceBroadcast = item;
                }

                if (item.uiElement.subTitle.title == "音乐日历") {
                  that.musicCalendar = item;
                }
              }
              if (item.uiElement.mainTitle) {
                if (item.uiElement.mainTitle.title == "私人定制") {
                  that.personalTailor = item;
                }
              }
            }
            if (item.creatives) {
              if (item.creatives[0].uiElement) {
                if (item.creatives[0].uiElement.mainTitle) {
                  if (item.creatives[0].uiElement.mainTitle.title == "新歌") {
                    that.newSong = item;
                    window.console.log(that.newSong);
                  }
                }
              }
            }
          });
          this.contentShow = true;
          Indicator.close(); //关闭加载层
        })
        .catch((err) => {
          window.console.log("获取首页数据失败！", err);
        });
    },
    changeFlag: function () {
      //选择新歌|新碟
      this.clickFlag = !this.clickFlag;
    },
    closeDaily: function () {
      //关闭每日推荐弹出层
      this.dailyVisible = false;
    },
    openDaily: function () {
      //打开每日推荐弹出层
      this.dailyVisible = true;
    },
    middleMethods: function (type) {
      //根据index打开相应的方法
      switch (type) {
        case 0:
          this.openDaily();
          break;
        case 1:
          this.openSongsheetDialog("推荐");
          break;
        case 2:
          this.openRankingListDialog();
          break;
      }
    },
    openSongsheetDialog: function (type) {
      // dialog开关
      this.songSheetVisible = true;
      this.songSheetType = type;
    },
    closeSongsheetDialog: function () {
      this.songSheetVisible = false;
    },
    playMusicAll: function () {
      let that = this;
      let songAll = [];

      that.personalTailor.creatives.forEach(function (item) {
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
      that.getplayMusic(songAll[0].resourceId, songAll[0]);
    },
    openSongListDialog: function (id) {
      // dialog开关
      this.songListId = id;
      this.songListVisible = true;
    },
    closeSongListDialog: function () {
      this.songListVisible = false;
    },
    playMusic: function (songinfos, songinfospicUrl) {
      window.console.log(songinfos);
      let songId = songinfos.id ? songinfos.id : songinfos.resourceId;
      songinfos["picUrl"] = songinfospicUrl;
      this.$store.commit("setsongInfo", JSON.stringify(songinfos));
      this.getplayMusic(songId, songinfos);
    },
    closeRankingListDialog: function () {
      this.rankingListVisible = false;
    },
    openRankingListDialog: function () {
      this.rankingListVisible = true;
    }
  },
  created () {
    Indicator.open("加载中...");
    // 获取banner图
    this.getbanner();
    let data = new Date();
    this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
  },
};
</script>
