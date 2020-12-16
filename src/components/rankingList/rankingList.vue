<template>
  <div class="dialog-mask rankingList">
    <div class="dialog-wrapper animated fadeInUp"
         ref="dialogWrapper">
      <div class="dialog-container"
           ref="viewBox">
        <div class="containerDiaLog"
             v-if="rendering">
          <!-- rankingListBar -->
          <div class="topBanner rankingListBar">
            <div class="topnarBar">
              <div id="back"
                   @click="rankingListClose()">
                <i class="iconfont iconfanhui1"></i>
                <span>排行榜</span>
              </div>
            </div>
          </div>

          <div class="ListDetail">
            <!-- 榜单推荐 -->
            <div class="listRecommendation">
              <div class="top">
                <p>榜单推荐</p>
              </div>
              <ul class=" clearfix">
                <li v-for="(item,index) in listRecommendation"
                    :key="index"
                    @click="openSongListDialog(item.id)">
                  <div class="image">
                    <img :src="item.coverImgUrl"
                         :alt="item.name">
                    <span>{{item.updateFrequency}}</span>
                  </div>

                  <p>
                    {{item.name}}
                  </p>
                </li>
              </ul>
            </div>

            <!-- 官方榜 -->
            <div class="officialList">
              <div class="top">
                <p>官方榜</p>
              </div>
              <ul class=" clearfix">
                <li v-for="(item,index) in officialList"
                    :key="index"
                    @click="openSongListDialog(item.id)">
                  <div class="left">
                    <img :src="item.coverImgUrl"
                         :alt="item.name">
                    <span>{{item.updateFrequency}}</span>
                  </div>
                  <div class="right">
                    <span v-for="(warp,indexs) in item.tracks"
                          :key="indexs">
                      {{warp.first}}-{{warp.second}}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- 特色榜 -->
            <div class="featureList">
              <div class="top">
                <p>特色榜</p>
              </div>
              <ul class=" clearfix">
                <li v-for="(item,index) in featureList"
                    :key="index"
                    @click="openSongListDialog(item.id)">
                  <div class="image">
                    <img :src="item.coverImgUrl"
                         :alt="item.name">
                    <span>{{item.updateFrequency}}</span>
                  </div>

                  <p>
                    {{item.name}}
                  </p>
                </li>
              </ul>
            </div>

            <!-- 全球榜 -->
            <div class="globalList">
              <div class="top">
                <p>全球榜</p>
              </div>
              <ul class=" clearfix">
                <li v-for="(item,index) in globalList"
                    :key="index"
                    @click="openSongListDialog(item.id)">
                  <div class="image">
                    <img :src="item.coverImgUrl"
                         :alt="item.name">
                    <span>{{item.updateFrequency}}</span>
                  </div>

                  <p>
                    {{item.name}}
                  </p>
                </li>
              </ul>
            </div>

            <!-- 地区榜 -->
            <div class="regionalList">
              <div class="top">
                <p>地区榜</p>
              </div>
              <ul class=" clearfix">
                <li v-for="(item,index) in regionalList"
                    :key="index"
                    @click="openSongListDialog(item.id)">
                  <div class="image">
                    <img :src="item.coverImgUrl"
                         :alt="item.name">
                    <span>{{item.updateFrequency}}</span>
                  </div>

                  <p>
                    {{item.name}}
                  </p>
                </li>
              </ul>
            </div>

            <!-- 曲风榜 -->
            <div class="musicStyleList">
              <div class="top">
                <p>曲风榜</p>
              </div>
              <ul class=" clearfix">
                <li v-for="(item,index) in musicStyleList"
                    :key="index"
                    @click="openSongListDialog(item.id)">
                  <div class="image">
                    <img :src="item.coverImgUrl"
                         :alt="item.name">
                    <span>{{item.updateFrequency}}</span>
                  </div>

                  <p>
                    {{item.name}}
                  </p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!-- 歌单详情弹出层 -->
    <song-listdetails :songListId="songListId"
                      @shut="closeSongListDialog"
                      v-if="songListVisible"></song-listdetails>
  </div>
</template>
<script >
import "../../assets/less/recommendation.less";
import "../../assets/less/rankingList.less";
// import { Toast } from "mint-ui";
// import { Indicator } from "mint-ui";
import SongListdetails from "../../components/songListDetails/songListDetails";

export default {
  name: "rankingList",
  components: {
    SongListdetails
  },
  data () {
    return {
      rendering: false,//页面显示
      allList: [],//全部榜单
      listRecommendation: [],//榜单推荐
      officialList: [],//官方榜
      featureList: [],//特色榜
      globalList: [],//全球榜
      regionalList: [],//地区榜
      musicStyleList: [],//曲风榜
      songListId: "",//歌单id
      songListVisible: false,
    };
  },
  filters: {
    //拦截器
  },
  computed: {},
  methods: {
    rankingListClose: function () {
      this.$emit("rankingListDown");
    },
    getToplist: function () {
      this.$axios
        .get("/toplist/detail")
        .then((res) => {
          let that = this;
          window.console.log("所有榜单", res.data);
          this.rendering = true;
          this.allList = res.data.list;
          this.allList.forEach((item) => {
            //官方榜
            if (item.ToplistType) {
              that.officialList.push(item);
            }

            // 推荐榜
            if (item.name === "硬地原创音乐榜") {
              that.listRecommendation.push(item);
            }
            if (item.name === "云音乐电音榜") {
              that.listRecommendation.push(item);
            }
            if (item.name === "云音乐国电榜") {
              that.listRecommendation.push(item);
            }

            // 特色榜
            if (item.name === "抖音排行榜") {
              that.featureList.push(item);
            }
            if (item.name === "云音乐古典音乐榜") {
              that.featureList.push(item);
            }
            if (item.name === "云音乐达人榜") {
              that.featureList.push(item);
            }

            // 全球榜
            if (item.name === "美国Billboard周榜") {
              that.globalList.push(item);
            }
            if (item.name === "UK排行榜周榜") {
              that.globalList.push(item);
            }
            if (item.name === "iTunes榜") {
              that.globalList.push(item);
            }
            if (item.name === "日本Oricon数字单曲周榜") {
              that.globalList.push(item);
            }
            if (item.name === "法国 NRJ Vos Hits 周榜") {
              that.globalList.push(item);
            }
            if (item.name === "云音乐欧美新歌榜") {
              that.globalList.push(item);
            }

            // 地区榜
            if (item.name === "云音乐欧美热歌榜") {
              that.regionalList.push(item);
            }
            if (item.name === "云音乐日语榜") {
              that.regionalList.push(item);
            }
            if (item.name === "云音乐韩语榜") {
              that.regionalList.push(item);
            }

            // 曲风榜
            if (item.name === "云音乐电音榜") {
              that.musicStyleList.push(item);
            }
            if (item.name === "云音乐ACG音乐榜") {
              that.musicStyleList.push(item);
            }
            if (item.name === "云音乐民谣榜") {
              that.musicStyleList.push(item);
            }
            if (item.name === "云音乐说唱榜") {
              that.musicStyleList.push(item);
            }
            if (item.name === "云音乐摇滚榜") {
              that.musicStyleList.push(item);
            }
            if (item.name === "云音乐古风榜") {
              that.musicStyleList.push(item);
            }
          });
        })
        .catch((error) => {
          window.console.log("所有榜单获取失败", error);
        });
    },
    openSongListDialog: function (id) {
      // dialog开关
      this.songListVisible = true;
      this.songListId = id;
    },
    closeSongListDialog: function () {
      this.songListVisible = false;
    },

  },
  watch: {

  },
  created () {
    this.noScroll(); //禁止主页面滚动
    this.getToplist();
  },
  destroyed () {
    //主页面可滑动
    this.canScroll();
  },
};
</script>
<style>
</style>