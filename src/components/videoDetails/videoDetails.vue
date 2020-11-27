<template >
  <div class="dialog-mask songSheet videoDetails">
    <div class="dialog-wrapper animated fadeInUp"
         ref="dialogWrapper">
      <div class="dialog-container"
           ref="viewBox">
        <div class="containerDiaLog"
             v-if="rendering">
          <!-- menu -->
          <div class="topBanner  ">
            <div class="topnarBar">
              <div id="back"
                   @click="videoDetailsClose()">
                <i class="iconfont iconfanhui1"></i>
                <span></span>
              </div>
            </div>
          </div>

          <div class="videoMain">
            <div class="videoPlay">
              <video :src="videoUrl"
                     preload="preload"
                     controls="false"
                     :poster="videoDetails.coverUrl"
                     autoplay="autoplay"
                     @click="control()"
                     id="videoControl">
                您的浏览器不支持 video 标签。
              </video>
            </div>
            <div class="videosub">
              <div class="levelNavigation">
                <ul class=" clearfix">
                  <li @click="switchNavigation('简介')"
                      :class="showComments? '':'active'">
                    <p>简介</p>
                  </li>
                  <li @click="switchNavigation('评论')"
                      :class="showComments? 'active':''">
                    <p>评论</p>
                  </li>
                </ul>
              </div>
              <div class="substance">
                <div class="briefIntroduction"
                     v-if="!showComments">
                  <div class="creator">
                    <img :src="videoDetails.creator.avatarUrl"
                         :alt="videoDetails.creator.nickname">
                    <span>{{videoDetails.creator.nickname}}</span>
                  </div>
                  <div class="videoName">
                    <p>{{videoDetails.title}}</p>
                  </div>
                  <div class="likePlaying clearfix">
                    <p><i class=" iconfont iconicon--"></i><span>{{videoDetails.playTime| retainDoubleDigit }}</span></p>
                    <p><i class=" iconfont icondianzan"></i><span>{{videoDetails.praisedCount}}</span></p>
                  </div>

                  <div class="related">
                    <div class="related-title">
                      <p>
                        相关视频
                      </p>
                    </div>
                    <ul>
                      <li v-for="(item,index) in relatedVideo"
                          :key="index"
                          @click="modifyInformation(item.vid)">
                        <div class="left">
                          <img :src="item.coverUrl"
                               :alt="item.title">
                        </div>
                        <div class="right">
                          <p>{{item.title}}</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
                <div class="discuss"
                     v-if="showComments">
                  <mt-loadmore :bottom-method="loadBottom"
                               :bottom-all-loaded="allLoaded"
                               ref="loadmore">
                    <ul>
                      <li v-for="(item,index) in commentHot"
                          :key="index">
                        <div class="top">
                          <div class="left">
                            <img :src="item.user.avatarUrl"
                                 :alt="item.user.nickname">
                            <img v-if="item.pendantData"
                                 :src="item.pendantData.imageUrl">
                          </div>
                          <div class="center">
                            <p>{{item.user.nickname}}</p>
                            <p>{{item.time|timeTransformation}}</p>
                          </div>
                          <div class="right">
                            <i class=" iconfont icondianzan"></i>
                            <span>{{item.likedCount}}</span>
                          </div>
                        </div>
                        <div class="contentss">
                          <p>
                            {{item.content}}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </mt-loadmore>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/less/recommendation.less";
import "../../assets/less/songListDetails.less";
import "../../assets/less/videoDetails.less";
export default {
  data () {
    return {
      videoDetails: "",//视频详情
      rendering: false,
      videoUrl: '',//视频url
      commentHot: [],//视频评论
      showComments: false,//显示评论
      page: 1,//页码
      allLoaded: false,
      relatedVideo: [],//相关视频
    }
  },
  props: ["videoId"],
  filters: {
    retainDoubleDigit: function (data) {
      // 将数据转万
      if (data > 100000000) {
        return (data / 100000000).toFixed(2) + "亿";
      } else {
        return (data / 10000).toFixed(2) + "万";
      }
    },
    timeTransformation: function (data) {
      var date = new Date(data);
      var year = date.getFullYear();
      var month = (date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
      return year + "-" + month + "-" + day;
    }

  },
  methods: {
    videoDetailsClose: function () {
      this.$emit("closure");
    },
    getVideoDetail: function () {
      this.$axios
        .get("/video/detail?id=" + this.videoId)
        .then((res) => {
          window.console.log("视频详情", res.data);
          this.videoDetails = res.data.data;
          this.rendering = true;
          this.getVideoUrl();
        })
        .catch((error) => {
          window.console.log("视频详情获取失败", error);
        });
    },
    getVideoUrl: function () {
      this.$axios
        .get("/video/url?id=" + this.videoId)
        .then((res) => {
          window.console.log("视频url", res.data);
          this.videoUrl = res.data.urls[0].url;
          this.getVideoDetailInfo();
          this.getrelatedVideoAll();
        })
        .catch((error) => {
          window.console.log("视频url获取失败", error);
        });
    },
    control: function () {
      if (document.getElementById("videoControl").controls) {
        setTimeout(() => {
          document.getElementById("videoControl").controls = false
        }, 1000)
      } else {
        document.getElementById("videoControl").controls = "controls";
        setTimeout(() => {
          document.getElementById("videoControl").controls = false
        }, 1000)
      }
    },
    getVideoDetailInfo: function () {
      this.$axios
        .get("/comment/video?id=" + this.videoId)
        .then((res) => {
          window.console.log("评论信息", res.data);
          this.commentHot = res.data.comments;
        })
        .catch((error) => {
          window.console.log("评论信息获取失败", error);
        });
    },
    switchNavigation: function (data) {
      if (data === "简介") {
        this.showComments = false;
      } else {
        this.showComments = true;
      }
    },
    loadBottom: function () {
      this.$axios({
        url: "/comment/video",
        params: {
          id: this.videoId,
          limit: 20,
          offset: this.page * 20,
          before: this.commentHot[this.commentHot.length - 1].time
        }
      })
        .then((res) => {
          window.console.log("新评论信息", res.data);
          let temporary = this.commentHot;
          let playlists = res.data.comments;
          this.commentHot = [...temporary, ...playlists];
          this.page++;
          if (res.data.total == this.commentHot.length) {
            this.allLoaded = true;
          }

          document.getElementsByClassName("mint-loadmore-content").style = "transform: translate3d(0px, -0px, 0px);";
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch((error) => {
          window.console.log("新评论信息获取失败", error);
          this.$refs.loadmore.onBottomLoaded();
        });

    },
    getrelatedVideoAll: function () {
      this.$axios
        .get("/related/allvideo?id=" + this.videoId)
        .then((res) => {
          window.console.log("相关视频：", res.data);
          this.relatedVideo = res.data.data;
        })
        .catch((error) => {
          window.console.log("相关视频获取失败", error);
        });
    },
    modifyInformation: function (id) {
      this.videoId = id;
      this.getVideoDetail();
    }

  },
  created () {
    this.noScroll(); //禁止主页面滚动
    this.getVideoDetail();
  },

  destroyed () {
    //主页面可滑动
    this.canScroll();
  }
}
</script>