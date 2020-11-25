<template>
  <div class="login">
    <div class="topProfile">
      <div class="portrait">
        <img src="../assets/logo.png" />
      </div>
      <div class="welcome">
        <p>Welcome back!</p>
        <p>Sign in to account</p>
      </div>
    </div>
    <div class="forms">
      <form>
        <div class="row">
          <label for="phone">
            <input type="text"
                   name="phone"
                   v-model="userPhone" />
            <i class="iconfont iconzhanghao"></i>
          </label>
        </div>
        <div class="row">
          <label for="password">
            <input type="password"
                   name="password"
                   v-model="userPassword" />
            <i class="iconfont iconmima"></i>
          </label>
          <p @click="sorry()">Forget the password?</p>
        </div>

        <div class="row">
          <input type="button"
                 value="Sign in"
                 @click="login()" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import "../assets/less/login.less";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import cookie from "json-cookie";
export default {
  data () {
    return {
      userPhone: "", //手机号
      userPassword: "", //密码
    };
  },
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
    sorry: function () {
      Toast({
        message: "Well, then I cann't help you with this one.",
        position: "top",
        duration: 5000,
      });
    },
    login: function () {
      const phone = this.userPhone;
      const password = this.userPassword;
      let that = this;
      // 登录网易云
      if (phone == "" || password == "") {
        Toast({
          message: "请填写你的手机号码和密码",
          position: "top",
          duration: 3000,
        });
        throw new Error("请设置你的手机号码和密码");
      }
      Indicator.open("登录中...");
      this.$axios({
        url: `/login/cellphone?phone=${phone}&password=${password}`,
        withCredentials: true
      })
        .then(function (res) {
          console.log("登录信息", res.data);
          Indicator.close();
          if (res.data.code == 200) {
            cookie.set("profile", res.data.profile, {
              expires: 1,
            });
            cookie.set("account", res.data.account, {
              expires: 1,
            });

            cookie.set("cookie", res.data.cookie, {
              expires: 1,
            });
            Toast({
              message: "登录成功",
              position: "top",
              duration: 3000,
            });
            that.$router.push({ name: "find" });
            that.$store.commit("setSelected", "find");
            //获取用户播放记录
            that.getnewsong();
          } else {
            Toast({
              message: res.data.msg,
              position: "top",
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          window.console.log("登录信息获取失败！/n" + error);
          Indicator.close();
          Toast({
            message: "登录失败，账号或密码错误",
            position: "top",
            duration: 3000,
          });
        });
    },
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

          cookie.set("songInfo", res.data.weekData[res.data.weekData.length - 1].song);

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
};
</script>