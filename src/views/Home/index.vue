<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round>
          <van-icon name="search">搜索</van-icon>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- tabs -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in myChannels" :key="item.id">
        <!-- 文章内容 -->
        <ArticleListVue :id="item.id"></ArticleListVue>
      </van-tab>

      <span class="toutiao toutiao-gengduo" @click="isShow"></span>
    </van-tabs>

    <!-- 频道弹出层 -->
    <EditChannelPopup ref="popup" :myChannels="myChannels" @delMychannel="delMychannel" @changeActive="changeActive"
      @addChannel="addChannel"></EditChannelPopup>
  </div>
</template>

<script>
import {
  getUserChannel,
  getChannelsFromLocal,
  setChannelstoLocal,
  delChannel,
  addChannel
} from "@/api";
import ArticleListVue from "./component/ArticleList.vue";
import EditChannelPopup from "./component/EditChannelPopup.vue";
export default {
  data() {
    return {
      active: 0,
      myChannels: [],
    };
  },
  components: {
    ArticleListVue,
    EditChannelPopup,
  },
  computed: {
    //判断是否登录
    isLogin() {
      return !!this.$store.state.user.token;
    },
  },
  methods: {
    async getUserChannel() {
      try {
        if (!this.isLogin) {
          //如果是离线状态，那么当前的频道就从本地拿去
          const myLocalChannels = getChannelsFromLocal();
          if (myLocalChannels) {
            // 1.离线时候本地有数据，就直接拿本地
            this.myChannels = myLocalChannels;
          } else {
            // 2.离线时候本地没数据就，先发一次请求
            const { data } = await getUserChannel();
            console.log(data);
            this.myChannels = data.data.channels;
          }
        } else {
          //如果是登录状态，发送请求
          const { data } = await getUserChannel();
          // console.log(data);
          this.myChannels = data.data.channels;
        }
      } catch (error) {
        this.$toast.fail("请重新登录获取");
      }
    },
    //展示弹框
    isShow() {
      console.log(this.$refs);
      //拿到子组件的show属性改变他
      this.$refs.popup.show = true;
    },
    //删除频道
    async delMychannel(id) {
      this.myChannels = this.myChannels.filter((item) => {
        return item.id !== id;
      });
      if (!this.isLogin) {
        // 如果是离线状态，那就把频道数据存储到本地中
        setChannelstoLocal(this.myChannels);
      } else {
        //如果是登录状态，那就用接口删除频道
        try {
          await delChannel(id);
        } catch (error) {
          return this.$toast.fail("删除失败");
        }
      }
      this.$toast.success("删除成功");
    },
    //切换频道
    changeActive(index) {
      // 子组件的索引赋值给active
      this.active = index;
    },
    //添加频道
   async addChannel(channel) {
      this.myChannels.push(channel);

      if (!this.isLogin) {
        // 如果是离线状态，那就把频道数据存储到本地中
        setChannelstoLocal(this.myChannels);
      } else {
        try {
          //如果是登录状态，那就从后台返回频道
          // 添加到频道数组最后
          await addChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加失败')
        }
      }
      this.$toast.success("添加成功");
    },
  },
  created() {
    this.getUserChannel();
  },
};
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;

  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }

  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  .van-button__text {
    color: #fff;
  }

  .van-icon-search {
    color: #fff;
  }

  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  z-index: 100;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url("~@/assets/images/gradient-gray-line.png");
  }
}

// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}

:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}

.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
