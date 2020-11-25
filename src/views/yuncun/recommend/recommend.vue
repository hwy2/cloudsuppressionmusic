<template>
  <div class="recommend">
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
                 v-if="item.type == 1">
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
                 v-else>
              <div class="image">
                <img :src="item.data.liveData.liveRoom.coverUrl"
                     :alt="item.data.liveData.liveRoom.title">
              </div>
              <p class="description">
                {{item.data.liveData.liveRoom.title}}
              </p>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>
<script>
import "../../../assets/less/videoRecommend.less"
export default {
  name: "recommend",
  data () {
    return {
      videoList: [],//视频
      videoGroupList: [],//视频标签列表
      allLoaded: false,
      page: 1,
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
      })
        .then((res) => {
          window.console.log("获取视频标签列表", res);
          this.videoGroupList = res.data;

        })
        .catch((err) => {
          window.console.log("获取视频标签列表失败！", err);
        });
    },
    getVideoList: function () {
      // 获取视频推荐
      this.$axios({
        url: "/video/timeline/recommend",
      })
        .then((res) => {
          window.console.log("获取视频推荐", JSON.stringify(res));
          this.videoList = res.data.datas;

          this.videoList.forEach(function (item) {
            if (item.data.urlInfo) {
              item.data.coverUrl = "";
              let video = document.createElement('video');
              video.setAttribute('crossOrigin', 'Anonymous')
              video.src = item.data.urlInfo.url;
              //如果不设置currentTime，画出来的图片是空的
              video.currentTime = 0.001;
              video.addEventListener("loadeddata", function () {
                let canvas = document.createElement('canvas');
                canvas.width = 330;
                canvas.height = 400;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                let url = canvas.toDataURL('image/png', 1);
                item.data.coverUrl = url
              });
            }

          })

        })
        .catch((err) => {
          window.console.log("获取视频推荐失败！", err);
        });
    },
    loadBottomVideo: function () {
      // 上拉加载
      this.$axios({
        url: "/video/timeline/recommend",
        params: {
          offset: this.page,
        },
      })
        .then((res) => {
          //   window.console.log("获取视频推荐", JSON.stringify(res));
          let videoList = this.videoList;
          let playlists = res.data.datas;
          this.page++;
          this.$refs.loadmore.$el.style.padding = "1.333333rem 0 0";
          playlists.forEach(function (item) {
            if (item.data.urlInfo) {
              item.data.coverUrl = "";
              let video = document.createElement('video');
              video.setAttribute('crossOrigin', 'Anonymous')
              video.src = item.data.urlInfo.url;
              //如果不设置currentTime，画出来的图片是空的
              video.currentTime = 0.001;
              video.addEventListener("loadeddata", function () {
                let canvas = document.createElement('canvas');
                canvas.width = 330;
                canvas.height = 400;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                let url = canvas.toDataURL('image/png', 1);
                item.data.coverUrl = url
              });
            }

          })

          this.videoList = [...videoList, ...playlists];
        })
        .catch((err) => {
          window.console.log("获取视频推荐失败！", err);
        });
    },
  },
  created () {
    this.getVideoGroupList();
    this.getVideoList();
  },
}
</script>