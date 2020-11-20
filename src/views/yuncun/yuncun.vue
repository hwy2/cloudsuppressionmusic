<template>
  <div class="yuncun">
    <!-- 顶部导航栏 -->
    <div class="navigation">
      <mt-navbar v-model="selected">
        <mt-tab-item id="square">广场</mt-tab-item>
        <mt-tab-item id="follow">关注</mt-tab-item>
      </mt-navbar>
    </div>
    <router-view />
  </div>
</template>
<script>
import "../../assets/less/yuncun.less"
export default {
  name: "yuncun",
  data () {
    return {
      selected: "square"
    }
  },
  watch: {
    selected: function (newV, oldV) {
      window.console.log("当前选择：" + newV);
      window.console.log("上一个选择：" + oldV);
      this.$router.push({ name: newV });
    }
  },
}
</script>