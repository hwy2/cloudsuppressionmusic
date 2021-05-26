<template>
  <div class="search">
    <div class="dialog-mask">
      <div class="dialog-wrapper animated fadeInUp"
           ref="dialogWrapper">
        <div class="dialog-container"
             ref="viewBox">

          <!-- 搜索头 -->
          <div class="topSearchBar">
            <div class="left"
                 @click="dialogClose()">
              <i class="iconfont iconfanhui1"></i>
            </div>

            <div class="right">
              <mt-search v-model="searchvalue"
                         id="minsearch"
                         @keyup.enter.native="getSearch()">
                <!--<mt-cell v-for="(item,i) in resultSong"
                           :key="i"
                           :title="item.name"
                           :value="item.value"
                           @click.native="select(item.name)"></mt-cell>-->
              </mt-search>
            </div>
          </div>
          <!-- 搜索分类 -->
          <div class="classificationList"
               v-show="resultForT">
            <div class="bgc">
              <ul class=" clearfix">
                <li v-for="(item,index) in searchCategory "
                    :key="index"
                    :class="item.active?'active':''"
                    @click="selectCategoryFun(item,index)">
                  <p>{{item.name}}</p>
                </li>
              </ul>
            </div>

          </div>
          <!-- 热搜榜 -->
          <div class="hotSearchList"
               v-show="!resultForT">
            <div class="title">
              <p>
                热搜榜
              </p>
            </div>
            <div class="details">
              <ul class=" clearfix">
                <li v-for="(item ,index) in searchHot"
                    :key="index"
                    @click="selectKeywords(item.first)">
                  <p>
                    <span>{{index+1}}</span><span>{{item.first}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 单曲 -->
          <div class="singleResults"
               v-if="singleVisible">
            <mt-loadmore :bottom-method="loadBottomSingle"
                         :bottom-all-loaded="allLoaded"
                         :auto-fill="false"
                         ref="loadmore"
                         id="loadmore">
              <ul>
                <li v-for="(item ,index) in singleList"
                    :key="index"
                    @click="playMusic(item)">
                  <div class="center">
                    <p>
                      <span>{{ item.name }}</span>&nbsp;
                    </p>
                    <p><span v-if="item.artists">{{item.artists[0].name}}</span>-<span v-if="item.album">{{item.album.name}}</span></p>
                  </div>
                  <div class="right">
                    <div class="icon">
                      <i v-if="item.mvid>0"
                         class="iconfont iconbofang"></i>
                      <i v-else
                         class="iconfont"></i>
                      <i class="iconfont iconziyuan"></i>
                    </div>
                  </div>
                </li>
              </ul>
            </mt-loadmore>
          </div>
          <!-- 歌单 -->
          <div class="playlistsResults"
               v-if="playlistsVisible">
            <mt-loadmore :bottom-method="loadBottomPlaylists"
                         :bottom-all-loaded="allLoaded"
                         :auto-fill="false"
                         ref="loadmore"
                         id="loadmore">
              <ul>
                <li v-for="(item ,index) in playlistsList"
                    :key="index"
                    @click="openSongListDialog(item.id)">
                  <div class="left">
                    <img :src="item.coverImgUrl"
                         :alt="item.name">
                  </div>
                  <div class="center">
                    <p>
                      <span>{{ item.name }}</span>&nbsp;
                    </p>
                    <p><span>{{item.trackCount}}首</span>,<span v-if="item.creator">by {{item.creator.nickname}}</span></p>
                  </div>
                </li>
              </ul>
            </mt-loadmore>
          </div>
          <!-- 视频 -->
          <div class="videos"
               v-if="videosVisible">
            <mt-loadmore :bottom-method="loadBottomVideos"
                         :bottom-all-loaded="allLoaded"
                         :auto-fill="false"
                         ref="loadmore"
                         id="loadmore">
              <ul class=" clearfix">
                <li v-for="(item ,index) in videosList"
                    :key="index"
                    @click="openVideoDatails(item.vid)">
                  <div class="top">
                    <img :src="item.coverUrl"
                         :alt="item.title">
                  </div>
                  <div class="center">
                    <p>
                      {{item.title}}
                    </p>
                  </div>
                </li>
              </ul>
            </mt-loadmore>
          </div>
          <!-- 歌手 -->
          <div class="singer"
               v-if="singerVisible">
            <mt-loadmore :bottom-method="loadBottomSinger"
                         :bottom-all-loaded="allLoaded"
                         :auto-fill="false"
                         ref="loadmore"
                         id="loadmore">
              <ul>
                <li v-for="(item ,index) in singerList"
                    :key="index">
                  <div class="left">
                    <img :src="item.picUrl"
                         :alt="item.name">
                  </div>
                  <div class="center">
                    <p>
                      <span>{{ item.name }}</span>&nbsp;
                    </p>
                  </div>
                </li>
              </ul>
            </mt-loadmore>
          </div>
          <!-- 专辑 -->
          <div class="album"
               v-if="albumVisible">
            <mt-loadmore :bottom-method="loadBottomAlbum"
                         :bottom-all-loaded="allLoaded"
                         :auto-fill="false"
                         ref="loadmore"
                         id="loadmore">
              <ul>
                <li v-for="(item ,index) in albumList"
                    :key="index">
                  <div class="left">
                    <img :src="item.picUrl"
                         :alt="item.name">
                  </div>
                  <div class="center">
                    <p>
                      <span>{{ item.name }}</span>&nbsp;
                    </p>
                    <p>{{item.artists[0].name}}</p>
                  </div>
                </li>
              </ul>
            </mt-loadmore>
          </div>
          <!-- 用户 -->
          <div class="subscriber"
               v-if="subscriberVisible">
            <mt-loadmore :bottom-method="loadBottomSubscriber"
                         :bottom-all-loaded="allLoaded"
                         :auto-fill="false"
                         ref="loadmore"
                         id="loadmore">
              <ul>
                <li v-for="(item ,index) in subscriberList"
                    :key="index">
                  <div class="left">
                    <img :src="item.avatarUrl"
                         :alt="item.name">
                  </div>
                  <div class="center">
                    <p>
                      <span>{{ item.nickname }}</span>&nbsp;
                    </p>
                    <p>{{item.signature}}</p>
                  </div>
                </li>
              </ul>
            </mt-loadmore>
          </div>

        </div>
      </div>
    </div>

    <!-- 歌单详情弹出层 -->
    <song-listdetails :songListId="songListId"
                      @shut="closeSongListDialog"
                      v-if="songListVisible"></song-listdetails>

    <!--视频页详情-->
    <video-details @closure="closeVideoDatails"
                   v-if="videoDetailsVisible"
                   :videoId='videoId'></video-details>
  </div>
</template>

<script>
import "../../assets/less/recommendation.less";
import "../../assets/less/search.less";
import SongListdetails from "../songListDetails/songListDetails";
import VideoDetails from "../videoDetails/videoDetails";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  name: "search",
  components: {
    SongListdetails,
    VideoDetails
  },
  data () {
    return {
      searchvalue: "",
      searchCategory: [
        {
          id: 1,
          name: "单曲",
          active: true
        },
        {
          id: 1000,
          name: "歌单",
          active: false
        },
        {
          id: 1014,
          name: "视频",
          active: false
        },
        {
          id: 100,
          name: "歌手",
          active: false
        },
        {
          id: 10,
          name: "专辑",
          active: false
        },
        {
          id: 1002,
          name: "用户",
          active: false
        }
      ],//搜索分类
      resultForT: false,
      searchHot: [],//热搜
      singleList: [],//单曲结果
      playlistsList: [],//歌单结果
      videosList: [],//视频结果
      singerList: [],//歌手结果
      albumList: [],//专辑结果
      subscriberList: [],//用户结果
      singleVisible: false,//单曲显示
      playlistsVisible: false,//歌单显示
      videosVisible: false,//视频显示
      singerVisible: false,//歌手显示
      albumVisible: false,//专辑显示
      subscriberVisible: false,//用户显示
      allLoaded: false,//单曲到达底部
      page: 1,//单曲页数
      songinfo: "",//歌曲信息
      songListId: '',//歌单id
      songListVisible: false,//歌单弹出层
      videoId: '',//视频id
      videoDetailsVisible: false,//视频弹出层

    };
  },
  methods: {
    dialogClose: function () {
      this.$emit("searchdown");
    },
    getSearch: function (id) {
      Indicator.open("加载中...");
      this.$axios
        .get("/search", {
          params: {
            keywords: this.searchvalue,
            type: id
          },
        })
        .then((res) => {
          window.console.log("搜索", res.data);
          this.resultForT = true;
          if (id == 1) {
            this.singleVisible = true;
            this.playlistsVisible = false;
            this.videosVisible = false;
            this.singerVisible = false;
            this.albumVisible = false;
            this.subscriberVisible = false;
            this.singleList = res.data.result.songs;
          } else if (id == 1000) {
            this.singleVisible = false;
            this.playlistsVisible = true;
            this.videosVisible = false;
            this.singerVisible = false;
            this.albumVisible = false;
            this.subscriberVisible = false;
            this.playlistsList = res.data.result.playlists;
          } else if (id == 1014) {
            this.singleVisible = false;
            this.playlistsVisible = false;
            this.videosVisible = true;
            this.singerVisible = false;
            this.albumVisible = false;
            this.subscriberVisible = false;
            this.videosList = res.data.result.videos;
          }
          else if (id == 100) {
            this.singleVisible = false;
            this.playlistsVisible = false;
            this.videosVisible = false;
            this.singerVisible = true;
            this.albumVisible = false;
            this.subscriberVisible = false;
            if (res.data.result.artistCount == 0) {
              Toast({
                message: "无数据",
                position: "top",
                duration: 3000
              });
            }
            this.singerList = res.data.result.artists;
          }
          else if (id == 10) {
            this.singleVisible = false;
            this.playlistsVisible = false;
            this.videosVisible = false;
            this.singerVisible = false;
            this.albumVisible = true;
            this.subscriberVisible = false;
            if (res.data.result.albumCount == 0) {
              Toast({
                message: "无数据",
                position: "top",
                duration: 3000
              });
            }
            this.albumList = res.data.result.albums;

          }
          else if (id == 1002) {
            this.singleVisible = false;
            this.playlistsVisible = false;
            this.videosVisible = false;
            this.singerVisible = false;
            this.albumVisible = false;
            this.subscriberVisible = true;
            this.subscriberList = res.data.result.userprofiles;
          } else {
            return;
          }
          Indicator.close();
        })
        .catch((error) => {
          Indicator.close();
          window.console.log("获取失败", error);
        });
    },
    selectCategoryFun: function (obj, index) {
      this.searchCategory.forEach(function (item) {
        item.active = false;
      });
      this.searchCategory[index].active = true;
      this.getSearch(obj.id);
      this.page = 1;
      this.allLoaded = false;
    },
    getSearchhot: function () {
      this.$axios
        .get("/search/hot")
        .then((res) => {
          window.console.log("热搜索", res.data);
          this.searchHot = res.data.result.hots
        })
        .catch((error) => {
          window.console.log("获取失败", error);
        });
    },
    selectKeywords: function (keywords) {
      this.searchvalue = keywords;
      this.getSearch(1);
    },
    loadBottomSingle: function () {
      this.$axios
        .get("/search", {
          params: {
            keywords: this.searchvalue,
            type: 1,
            limit: 30,
            offset: this.page * 30
          },
        })
        .then((res) => {
          window.console.log("单曲搜索", res.data);
          let singleList = this.singleList;
          let songs = res.data.result.songs;
          this.singleList = [...singleList, ...songs];
          this.page++;
          this.$refs.loadmore.onBottomLoaded();
          if (this.singleList.length >= res.data.result.songCount) {
            this.allLoaded = true;
          }
        })
        .catch((error) => {
          this.$refs.loadmore.onBottomLoaded();
          window.console.log("获取失败", error);
        });
    },
    loadBottomPlaylists: function () {
      this.$axios
        .get("/search", {
          params: {
            keywords: this.searchvalue,
            type: 1000,
            limit: 30,
            offset: this.page * 30
          },
        })
        .then((res) => {
          window.console.log("歌单搜索", res.data);
          let playlistsList = this.playlistsList;
          let playlists = res.data.result.playlists;
          this.playlistsList = [...playlistsList, ...playlists];
          this.page++;
          this.$refs.loadmore.onBottomLoaded();
          if (this.playlistsList.length >= res.data.result.playlistCount) {
            this.allLoaded = true;
          }
        })
        .catch((error) => {
          this.$refs.loadmore.onBottomLoaded();
          window.console.log("获取失败", error);
        });
    },
    loadBottomVideos: function () {
      this.$axios
        .get("/search", {
          params: {
            keywords: this.searchvalue,
            type: 1014,
            limit: 30,
            offset: this.page * 30
          },
        })
        .then((res) => {
          window.console.log("视频搜索", res.data);
          let videosList = this.videosList;
          let videos = res.data.result.videos;
          this.videosList = [...videosList, ...videos];
          this.page++;
          this.$refs.loadmore.onBottomLoaded();
          if (this.videosList.length >= res.data.result.videoCount) {
            this.allLoaded = true;
          }
        })
        .catch((error) => {
          this.$refs.loadmore.onBottomLoaded();
          window.console.log("获取失败", error);
        });
    },
    loadBottomSinger: function () {
      this.$axios
        .get("/search", {
          params: {
            keywords: this.searchvalue,
            type: 100,
            limit: 30,
            offset: this.page * 30
          },
        })
        .then((res) => {
          window.console.log("歌手搜索", res.data);
          let singerList = this.singerList;
          let artists = res.data.result.artists;
          this.singerList = [...singerList, ...artists];
          this.page++;
          this.$refs.loadmore.onBottomLoaded();
          if (this.singerList.length >= res.data.result.artistCount) {
            this.allLoaded = true;
          }
        })
        .catch((error) => {
          this.$refs.loadmore.onBottomLoaded();
          window.console.log("获取失败", error);
        });
    },
    loadBottomAlbum: function () {
      this.$axios
        .get("/search", {
          params: {
            keywords: this.searchvalue,
            type: 10,
            limit: 30,
            offset: this.page * 30
          },
        })
        .then((res) => {
          window.console.log("专辑搜索", res.data);
          let albumList = this.albumList;
          let albums = res.data.result.albums;
          this.albumList = [...albumList, ...albums];
          this.page++;
          this.$refs.loadmore.onBottomLoaded();
          if (this.albumList.length >= res.data.result.albumCount) {
            this.allLoaded = true;
          }
        })
        .catch((error) => {
          this.$refs.loadmore.onBottomLoaded();
          window.console.log("获取失败", error);
        });
    },
    loadBottomSubscriber: function () {
      this.$axios
        .get("/search", {
          params: {
            keywords: this.searchvalue,
            type: 1002,
            limit: 30,
            offset: this.page * 30
          },
        })
        .then((res) => {
          window.console.log("用户搜索", res.data);
          let subscriberList = this.subscriberList;
          let userprofiles = res.data.result.userprofiles;
          this.subscriberList = [...subscriberList, ...userprofiles];
          this.page++;
          this.$refs.loadmore.onBottomLoaded();
          if (this.subscriberList.length >= res.data.result.userprofileCount) {
            this.allLoaded = true;
          }
        })
        .catch((error) => {
          this.$refs.loadmore.onBottomLoaded();
          window.console.log("获取失败", error);
        });
    },
    playMusic: function (songinfos) {
      this.getSongDetail(songinfos.id, songinfos);
    },
    getSongDetail: function (id, songinfos) {
      this.$axios
        .get("/song/detail", {
          params: {
            ids: id
          },
        })
        .then((res) => {
          window.console.log("歌曲详情搜索", res.data);
          this.songinfo = res.data;


          let songId = id;
          songinfos["picUrl"] = this.songinfo.songs[0].al.picUrl;
          this.$store.commit("setsongInfo", songinfos);
          this.getplayMusic(songId, songinfos);
        })
        .catch((error) => {
          this.$refs.loadmore.onBottomLoaded();
          window.console.log("获取失败", error);
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
    closeVideoDatails: function () {
      this.videoDetailsVisible = false;
    },
    openVideoDatails: function (id) {
      this.videoId = id;
      this.videoDetailsVisible = true;
    },

  },
  created () {
    this.noScroll(); //禁止主页面滚动
    this.getSearchhot();
  },
  destroyed () {
    //主页面可滑动  
    this.canScroll();
  },
};
</script>

<style>
</style>