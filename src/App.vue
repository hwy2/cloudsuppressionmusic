<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import cookie from "json-cookie";
export default {
  methods: {
  },
  beforeCreate () {
    if (cookie.get("songInfo")) {
      this.$store.commit(
        "setsongInfo",
        JSON.stringify(cookie.get("songInfo"))
      );
    }
  },
  created () {
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
  },
  beforeDestroy () {
    //在页面刷新时将vuex里的信息保存到cookie里
    window.addEventListener("beforeunload", () => {
      cookie.set("store", this.$store.state);
    });
  },
}
</script>