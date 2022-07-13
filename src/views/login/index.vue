<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="code" placeholder="请输入验证码" v-model="user.code">
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>

        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 10"
            format="ss s"
            @finish="isCountDownShow = false"
            style="margin-left: 5px"
          />
          <!-- finish事件手动改为false -->
          <van-button
            v-else
            @click="onSendSms"
            native-type="button"
            class="send-sms-btn"
            round
            size="small"
            type="number"
            maxlength="6"
            name="code"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login, validateCode } from "@/api/user";
export default {
  name: "LoginIndex",
  data() {
    return {
      // 用户表单 数据
      user: {
        mobile: "",
        code: "",
      },
      // 验证规则
      userFormRules: {
        mobile: [
          { required: true, message: "不能为空" },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },

      isCountDownShow: false, // 控制显示 和隐藏
    };
  },
  methods: {
    // 登录
    async onSubmit() {
      const user = this.user;
      this.$toast.loading({
        forbidClick: true, // 是否禁止背景点击
        message: "登录中...", // 提示消息
        duration: 0, // 持续时间，0表示持续展示不停止
      });
      // 登录请求方法
      try {
        const res = await login(user);
        console.log(res);
        // 登录成功
        this.$toast.success("登录成功"); // 关闭之前加载的toast
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    // 发送验证码
    async onSendSms() {
      try {
        // 校验手机号 用 vant 里面的validate通过表单的那么来验证
        console.log(this.$refs);
        // 拿到表单内容进行验证
        await this.$refs.loginForm.validate("mobile");
        console.log("验证通过");
      } catch (error) {
        return console.log("验证失败", error);
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true;
      try {
        // 验证通过发送验证码
        const res = await validateCode(this.user.mobile);
        this.$toast("发送成功", res);
      } catch (error) {
        // 发送失败开始倒计时
        this.isCountDownShow = false;
        if (error.data.status === 429) {
          this.$toast("请求太频繁，请稍后再试");
        } else {
          this.$toast("请求验证码失败");
        }
      }
    },
  },
  created() {},
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    padding: 0; // 原有button 带有 padding 需要清除
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
