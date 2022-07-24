<template>
  <div class="reply">
    <van-nav-bar title="**回复" left-arrow @click-left="$router.go(-1)" />
    <!-- 回复区域  -->
    <main>
      <div class="my">
        <van-list
          ref="list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell>
            <van-row class="row">
              <!-- 头像 -->
              <van-col span="4" class="avator">
                <van-image round width="1.2rem" height="1.2rem" src="" />
              </van-col>
              <van-col span="14" class="name">
                <p class="auth">{{}}</p>
                <p class="comment">{{}}</p>
                <div class="data">
                  <span class="time">{{}}</span>
                  <van-button class="reply">回复 {{}}</van-button>
                </div>
              </van-col>
              <van-col span="6" class="follow">
                <van-icon name="good-job-o"> {{ "点赞" }}</van-icon>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
      </div>
    </main>
    <!-- 底部按钮 -->
    <footer>
      <van-button size="large">评论</van-button>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad(){}
  },
};
</script>

<style scoped lang="less">
.reply {
  :deep(.navbar) {
    background-color: #3296fa !important;
  }
  :deep(.van-nav-bar__title) {
    color: black !important;
  }
  :deep(.van-icon-arrow-left) {
    color: black !important;
  }

   .row {
    margin: 0px;
    .avator {
      // padding-left: 20px;
    }
    .name {
      p.auth {
        margin-top: 5px;
        font-size: 20px;
        color: #407dc4;
      }
      p.comment {
        font-size: 40px;
      }
      .data {
        margin-top: -15px;
        height: 80px;
        padding-top: 0px;
        line-height: 80px;
        span.time {
          // margin-top: 5px;
          padding-top: 15px;
          font-size: 15px !important;
        }
        .reply.van-button {
          font-size: 15px;
          margin-top: 10px;
          padding-top: 0px;
          margin-left: 15px;
          border-radius: 50px;
          width: 150px;
          height: 50px;
        }
      }
    }
    .follow {
      padding-right: 30px;
      font-size: 30px;
      .van-button {
        // line-height: 70px;
        margin-top: 15px;
        width: 200px;
        height: 70px;
      }
    }
  }

  .van-button {
    position: fixed;
    bottom: 0;
  }
}
</style>
