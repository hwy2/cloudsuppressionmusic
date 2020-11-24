<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import cookie from "json-cookie";
export default {
  computed: {
    song: {
      //歌曲信息
      get () {
        return this.$store.state.songInfo;
      },
      set (v) {
        this.$store.commit("setsongInfo", v);
      },
    },
  },
  methods: {
    getnewsong: function () {
      let profile = cookie.get("profile")
      let that = this;
      // 获取播放记录歌曲
      that
        .$axios({
          url: "/user/record",
          params: {
            uid: profile.userId,
            type: 1,
          },
        })
        .then((res) => {
          window.console.log("播放记录", res.data);
          res.data.weekData[res.data.weekData.length - 1].song["picUrl"] =
            res.data.weekData[res.data.weekData.length - 1].song.al.picUrl;
          that.$store.commit(
            "setsongInfo",
            JSON.stringify(res.data.weekData[res.data.weekData.length - 1].song)
          );

          that.getMusicUrl();
        })
        .catch((error) => {
          window.console.log("播放记录获取失败！", error);
        });
    },
    getMusicUrl: function () {
      // 根据localStorage的歌曲id,获取详细歌曲的信息
      this.$axios
        .get("/song/url", {
          params: {
            id: this.song.id,
          },
        })
        .then((res) => {
          this.$store.commit("setsongPlayUrl", res.data.data[0].url);
          this.$store.commit("setisPlay", false);
          // window.console.log("详细歌曲的信息", JSON.stringify(res));
        })
        .catch((error) => {
          window.console.log("歌曲URL获取失败！", error);
        });
    }
  },
  created () {
    //获取用户信息
    this.getnewsong();

    //在页面加载时读取cookie里的状态信息
    if (cookie.get("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          cookie.get("store")
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到cookie里
    window.addEventListener("beforeunload", () => {
      cookie.set("store", this.$store.state);
    });
  },
}
</script>