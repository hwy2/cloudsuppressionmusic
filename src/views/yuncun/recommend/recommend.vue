<template>
  <div class="recommend">
    <!-- 导航栏 -->
    <div class="videoNavigationbar">
      <ul class="clearfix">
        <li v-for="(list,index) in videoGroupList"
            :key="index"
            @click="setVideoGroupID(list.id,index)">
          <p :class="list.active?'active':''">{{list.name}}</p>
        </li>
      </ul>
    </div>
    <div class="videoList">
      <mt-loadmore :bottom-method="loadBottomVideo"
                   :bottom-all-loaded="allLoaded"
                   :auto-fill="false"
                   ref="loadmore"
                   id="loadmore">
        <ul class=" clearfix">
          <li v-for="(item,index) in videoList"
              :key="index">
            <div class="warp"
                 v-if="item.type == 1"
                 @click="openVideoDatails(item.data.vid)">
              <div class="image">
                <img :src="item.data.coverUrl"
                     :alt="item.data.title"
                     ref="imgError">
                <img :src="item.data.creator.avatarUrl"
                     :alt="item.data.creator.nickname">

                <span>{{item.data.durationms|formatMilliseconds}}</span>
              </div>
              <p class="description">
                {{item.data.title}}
              </p>
              <div class="items">
                <p><i class=" iconfont iconicon--"></i><span>{{item.data.playTime| retainDoubleDigit }}</span></p>
                <p><i class=" iconfont icondianzan"></i><span>{{item.data.praisedCount}}</span></p>
              </div>
            </div>
            <div class="warp"
                 v-else
                 @click="openVideoDatails(item.data.id)">
              <div class="image">
                <img :src="item.data.coverUrl"
                     :alt="item.data.name">
              </div>
              <p class="description">
                {{item.data.name}}
              </p>

              <div class="items">
                <p><i class=" iconfont iconicon--"></i><span>{{item.data.playCount| retainDoubleDigit }}</span></p>
                <p><i class=" iconfont iconshoucang"></i><span>{{item.data.likeCount}}</span></p>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
    <video-details @closure="closeVideoDatails"
                   v-if="videoDetailsVisible"
                   :videoId='videoId'
                   :videoType="videoType"></video-details>
  </div>
</template>
<script>
import "../../../assets/less/videoRecommend.less";
import { Indicator } from "mint-ui";
import VideoDetails from "../../../components/videoDetails/videoDetails";
export default {
  name: "recommend",
  components: {
    VideoDetails
  },
  data () {
    return {
      videoList: [],//视频
      videoGroupList: [],//视频标签列表
      allLoaded: false,
      page: 1, //页码
      videoDetailsVisible: false,//视频页
      videoId: '',//视频id
      videoGroupId: '',//视频分类id 
      videoType: "video",
    }
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
    formatMilliseconds: function (value) {
      var second = parseInt(value) / 1000; // second
      var minute = 0; // minute
      var hour = 0; // hour
      if (second > 60) {
        minute = parseInt(second / 60);
        second = parseInt(second % 60);
        if (minute > 60) {
          hour = parseInt(minute / 60);
          minute = parseInt(minute % 60);
        }
      }
      var result;
      if (second >= 10) {
        result = "" + parseInt(second);
      } else {
        result = "" + "0" + parseInt(second);
      }
      if (minute >= 10) {
        result = "" + parseInt(minute) + ":" + result;
      } else {
        result = "" + "0" + parseInt(minute) + ":" + result;
      }
      if (hour >= 10) {
        result = "" + parseInt(hour) + ":" + result;
      } else {
        if (hour > 0) {
          result = "" + "0" + parseInt(hour) + ":" + result;
        }
      }
      return result;
    },

  },
  methods: {
    getVideoGroupList: function () {
      // 获取视频标签列表
      this.$axios({
        url: "/video/category/list",
        params: {
          cookie: this.cookiesControl("get", "cookie")
        }
      })
        .then((res) => {
          window.console.log("获取视频标签列表", res);
          this.videoGroupList = res.data.data;
          this.videoGroupId = res.data.data[0].id
          this.videoGroupList.forEach((item) => {
            item['active'] = false;
          })
          this.videoGroupList[0].active = true;
          this.getVideoList();
        })
        .catch((err) => {
          window.console.log("获取视频标签列表失败！", err);
        });
    },
    getVideoList: function () {
      Indicator.open("加载中...")
      // 获取视频推荐
      this.$axios({
        url: "/video/group",
        params: {
          id: this.videoGroupId,
          cookie: this.cookiesControl("get", "cookie")
        }
      })
        .then((res) => {
          window.console.log("获取视频推荐", JSON.stringify(res));
          this.videoList = res.data.datas;
          Indicator.close();
        })
        .catch((err) => {
          Indicator.close();
          window.console.log("获取视频推荐失败！", err);
        });
    },
    loadBottomVideo: function () {
      // 上拉加载
      this.$axios({
        url: "/video/group",
        params: {
          offset: this.page,
          id: this.videoGroupId,
          cookie: this.cookiesControl("get", "cookie")
        },
      })
        .then((res) => {
          //   window.console.log("获取视频推荐", JSON.stringify(res));
          let videoList = this.videoList;
          let playlists = res.data.datas;
          this.page++;
          //   playlists.forEach(function (item) {
          //     if (item.data.urlInfo) {
          //       item.data.coverUrl = "";
          //       let video = document.createElement('video');
          //       video.setAttribute('crossOrigin', 'Anonymous')
          //       video.src = item.data.urlInfo.url;
          //       //如果不设置currentTime，画出来的图片是空的
          //       video.currentTime = 0.001;
          //       video.addEventListener("loadeddata", function () {
          //         let canvas = document.createElement('canvas');
          //         canvas.width = 330;
          //         canvas.height = 400;
          //         canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          //         let url = canvas.toDataURL('image/png', 1);
          //         item.data.coverUrl = url
          //       });
          //     }

          //   })

          this.videoList = [...videoList, ...playlists];
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch((err) => {
          window.console.log("获取视频推荐失败！", err);
          this.$refs.loadmore.onBottomLoaded();
        });

    },
    closeVideoDatails: function () {
      this.videoDetailsVisible = false;
      this.$store.commit("setisShow", true);
    },
    openVideoDatails: function (id) {
      this.videoId = id;
      this.videoDetailsVisible = true;
      this.$store.commit("setisShow", false);
    },
    getVideoDetails: function (id) {
      let videoDetails = [];
      this.$axios
        .get("/video/detail?id=" + id)
        .then((res) => {
          window.console.log("视频详情获取失败", res.data);
          if (res.data.message == "success") {
            videoDetails = res.data.data;
          }
        })
        .catch((error) => {
          window.console.log("视频详情获取失败", error);
        });
      return videoDetails;
    },
    setVideoGroupID: function (id, index) {
      this.videoGroupId = id;
      this.videoGroupList.forEach((item) => {
        item['active'] = false;
      })
      this.videoGroupList[index].active = true;
      if (id === 1000) {
        this.videoType = "mv";
      } else {
        this.videoType = "video";
      }
      this.videoList = [];
      this.getVideoList();
    }
  },
  created () {
    this.getVideoGroupList();
  },
}
</script>