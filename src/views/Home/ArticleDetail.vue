<template>
  <div class="my">
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 标题 -->
    <h5>{{ articleDetail.title }}</h5>
    <!-- 作者，名字，关注按钮 -->
    <header>
      <van-row class="row">
        <!-- 头像 -->
        <van-col span="4" class="avator">
          <van-image
            round
            width="1.2rem"
            height="1.2rem"
            :src="articleDetail.aut_photo"
          />
        </van-col>
        <van-col span="13" class="name">
          <p class="auth">{{ articleDetail.aut_name }}</p>
          <p class="date">{{ articleDetail.pubdate }}</p>
        </van-col>
        <van-col span="7" class="follow" >
          <van-button round type="info" :loading="isLoad" @click="follow"
            >
            <van-icon name="plus" /><span>关注</span></van-button
          >
        </van-col>
      </van-row>
    </header>
    <!-- 内容 -->
    <main v-html="articleDetail.content" class="content"></main>
    <!-- 底部 -->
    <footer>
      <div class="comment">
        <van-button>写评论</van-button>
      </div>
      <div class="icon">
        <van-icon name="comment-o" />
        <van-icon name="star-o" />
        <van-icon name="good-job-o" />
        <van-icon name="share" />
      </div>
    </footer>
  </div>
</template>

<script>
import { getArticleDetail } from "@/api";
export default {
  data() {
    return {
      //关注按钮加载
      isLoad:false,
      articleDetail: [], //文章详情
    };
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    //获取文章详情
    async getArticleDetail() {
      const {
        data: { data },
      } = await getArticleDetail(this.$store.state.articleId);
      console.log(data);
      this.articleDetail = data;
    },
    //点击改变加载状态
    follow(){
      this.isLoad = true
    }
  },
};
</script>

<style scoped lang="less">
.my {
 
  :deep(.navbar) {
    background-color: #3296fa;
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
  h5 {
    padding-left: 35px;
    padding-right: 35px;
  }
  // 头部
  header {
    margin-top: -30px;
    padding: 30px;
    .row {
      .avator {
        // padding-left: 20px;
      }
      .name {
        .auth {
          margin-top: 5px;
          font-size: 20px;

        }
        .date {
          font-size: 20px;
          color: #ccc;
          margin-top: 3px;
        }
      }
      .follow {
        padding-right: 30px;
        .van-button {
          // line-height: 70px;
          margin-top: 15px;
          width: 200px;
          height: 70px;
        }
      }
    }
  }
  // 内容
  .content {
     padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
  }
  //底部
  footer {
    z-index: 1000;
    position: fixed;
    display: flex;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    .comment {
      // flex: 2;
    }
    .icon {
      // width: 50%;
      // flex: 1;
    }
  }
}
</style>
