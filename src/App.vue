<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
  },
  beforeCreate () {
    if (this.cookiesControl('get', "songInfo")) {
      this.$store.commit("setsongInfo", this.cookiesControl("get", "songInfo"));
    }
    //在页面加载时读取this.cookiesControl里的状态信息
    if (this.cookiesControl("get", "store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          this.cookiesControl("get", "store")
        )
      );
      let songInfo = this.cookiesControl('get', "songInfo");
      this.getMusicUrl(songInfo.id, songInfo)
      setTimeout(() => {
        this.$store.commit("setisPlay", false);
      }, 180);
    }
  },
  created () {
    this.$store.commit("setisPlay", false);
    //在页面刷新时将vuex里的信息保存到this.cookiesControl里
    window.addEventListener("beforeunload", () => {
      this.cookiesControl("set", "store", this.$store.state);
    });
  }
}
</script>