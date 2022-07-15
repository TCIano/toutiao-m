<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" @click-left="backPrePage">
      <!-- 退出按钮插槽 -->
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field name="code" placeholder="请输入验证码" v-model="user.code" :rules="code">
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
import {mobile,code} from './rules'
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
      mobile,
      code,
      isCountDownShow: false, // 控制显示 和隐藏
    };
  },
  methods: {
    //返回上一页面
    backPrePage() {
      console.log(this);
      this.$router.back();
    },
    // 登录
    async onSubmit() {
      const user = this.user;
      //登录加载
      this.$toast.loading({
        forbidClick: true, // 是否禁止背景点击
        message: "登录中...", // 提示消息
        duration: 0, // 持续时间，0表示持续展示不停止
      });
      // 登录请求方法
      try {
        const res = await login(user);
        console.log(res);
        //用vuex存储token
        this.$store.commit('setUser',res.data.data)
        //跳转页面
        this.$router.push('/profile')
        // 登录成功
        this.$toast.success("登录成功"); // 关闭之前加载的toast
      } catch (error) {
        // console.log(error);
        //  状态码判断
        if (error.response.status === 400) {
          this.$toast.fail(error.response.data.message);
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }

      //登录成功之后存储token，在vuex中
    },
    // 发送验证码
    async onSendSms() {
      try {
        // 校验手机号 用 vant 里面的validate通过表单的那么来验证
        console.log(this.$refs);
        // 拿到表单内容进行验证
        await this.$refs.loginForm.validate("mobile");
        // console.log("验证通过");
         await validateCode(this.user.mobile);
        // this.$toast("发送成功", res);
        // 2. 验证通过，显示倒计时
        this.isCountDownShow = true;
      } catch (error) {
        // return console.log("验证失败", error);
        // 发送失败开始倒计时
        this.isCountDownShow = false;
        //表单验证失败
        if(!error.response){
          this.$toast.fail('手机号格式不正确')
        }else {
          //验证码发送失败
          const status = error.response.status
          if(status == 404||status==429){
            this.$toast.fail(error.response.data.message)
          }
        }
      
    
      }
    },
  },
 
};
</script>
<style scoped lang="less">
.login-container {
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  // x号样式
  .van-icon-cross {
    color: #fff;
  }
  .toutiao {
    font-size: 50px;
  }
  //验证码按钮
  .send-sms-btn {
    padding: 0; // 原有button 带有 padding 需要清除
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  //登录按钮
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
