<template>
  <div class="my">
    <header>

    <!-- 登录 -->
    <div class="user-info banner" v-if="isLogin">
    <!-- 占位 -->
      <van-row></van-row>
      <!-- 用户信息 -->
      <van-row class="row-2">
        <!-- 左侧 -->
        <van-col span="12">
          <van-row type="flex" justify="space-around" align="center">
            <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <!-- 手机号 -->
              <span class="mobile">{{userInfo.name}}</span>
          </van-row>
        </van-col>
        <!-- 右侧 -->
        <van-col span="11">
          <van-row class="code-row" type="flex" align="center" justify="end" >
            <van-button class="code-btn" size="mini" round>
              编辑资料
            </van-button>
          </van-row>
        </van-col>
      </van-row>
      <van-row>
        <van-grid class="grid" :border="false">
          <van-grid-item text="头条" >
            <template #icon>
              <span>{{userInfo.art_count}}</span>
            
                
              
            </template>
          </van-grid-item>
          <van-grid-item text="粉丝" >
            <template #icon>
              <span>{{userInfo.fans_count}}</span>
            
                
              
            </template>
          </van-grid-item>
          <van-grid-item text="关注" >
            <template #icon>
              <span>{{userInfo.follow_count}}</span>
            
                
              
            </template>
          </van-grid-item>
          <van-grid-item text="获赞" >
            <template #icon>
              <span>{{userInfo.like_count}}</span>
            
                
              
            </template>
          </van-grid-item>
        </van-grid>
      </van-row>
    </div>
    <!-- 未登录 -->
    <div class="login-register banner" v-else>
      <div class="wrap"  @click="login">
        <img src="../../assets/mobile.png" alt=""/>
        <span>登录 / 注册</span>
      </div>
    </div>
    </header>

    <main>
      <!-- 历史搜索 -->
      <div>
        <van-grid class="grid" column-num="2" clickable>
          <van-grid-item text="收藏" >
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
                
              
            </template>
          </van-grid-item>

          <van-grid-item text="历史" >
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
                
              
            </template>
          </van-grid-item>
          </van-grid>
      </div>

      <!-- 消息通知 -->
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link>    </van-cell>
      </div>
    </main>

    <van-button v-if="isLogin" block class="login-btn" @click="loginout">退出按钮</van-button>
  </div>
</template>

<script>
import {getUserInfo} from '@/api'
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  created(){
    this.getUserInfo()
  },
  methods:{
    //去登录
    login(){
      this.$router.push('/login')
    },
    //退出登录
    loginout(){
      this.$dialog.confirm({
          title: '头条',
          message: '是否要退出登录？',
        })
          .then(() => {
            // on confirm
            this.$store.commit('setUser',{})//把token设置为空
          })
          .catch(() => {
            // on cancel
          });
    },
    //获取用户信息并且处理数据
  async getUserInfo(){
    // const res = await getUserInfo()
    //如果登录之后，才可以获取
    if(this.isLogin){
      const {
        data:{data}
      } = await getUserInfo()
      this.userInfo = data
    }
    console.log(data);
  }

  },
  computed:{
    isLogin(){
      return !!this.$store.state.user.token //！！ 转为boolean值
    }
  }

}
</script>

<style lang="less" scoped>
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/banner.png') no-repeat 0 0 / cover;
}
// 登录
.user-info{
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
    color: #fff;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }

  .code-row {
    height: 100%;
  }

  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    font-size: 30px;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }

}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 30px;
    img {
      height: 150px;
      width: 150px;
      margin-bottom: 10px;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}

.login-btn {
  :deep(.van-button__text){
    color: red;
  }
}
</style>
