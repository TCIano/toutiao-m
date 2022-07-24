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
          <p class="date">{{ articleDesc }}</p>
        </van-col>
        <van-col span="7" class="follow">
          <van-button
            v-if="!followState"
            class="confirm"
            round
            type="info"
            :loading="isLoad"
            @click="follow"
          >
            <van-icon name="plus" /><span> 关注 </span></van-button
          >
          <van-button
            class="cancel"
            v-else
            round
            :loading="isLoad"
            @click="unfollow"
          >
            取消关注
          </van-button>
          <!-- <van-popup v-model="isShowPop">是否要取消关注</van-popup> -->
        </van-col>
      </van-row>
    </header>
    <!-- 内容 -->
    <main v-html="articleDetail.content" class="content markdown-body"></main>
    <!-- 正文 结束 -->
    <van-divider :style="{ color: '#aaa' }">正文结束</van-divider>

    <!-- 评论 -->

    <commentItem :commitList="commitList"></commentItem>

    <!-- 底部 -->
    <footer>
      <div class="comment">
        <van-button size="normal" @click="addComment">写评论</van-button>
        <van-popup v-model="showAddCommentPop"  position="bottom">
          <!-- 发送评论 -->
          <addComment @closeCommentPop="closeCommentPop"></addComment>
        </van-popup>
      </div>
      <div class="icon">
        <van-badge :content="articleDetail.comm_count">
          <van-icon name="comment-o" />
        </van-badge>
        <van-icon name="star-o" @click="collectArticle" v-if="!isCollect" />
        <van-icon
          name="star"
          @click="uncollectArticle"
          v-else
          color="#1989fa"
        />
        <van-icon name="good-job-o" @click="likeArticle" v-if="isLike === -1" />
        <van-icon name="good-job" color="#1989fa" @click="unLikeArticle" v-else />

        <van-icon name="share" />
      </div>
    </footer>
  </div>
</template>

<script>
import dayjs from "@/utils/dayjs";
import addComment from './component/addComment.vue'
import commentItem from "./component/commentItem.vue";
import {
  getArticleDetail,
  following,
  unFollowing,
  newsCollect,
  unNewsCollect,
  unLikeArticle,
  likeArticle,
} from "@/api";
export default {
  data() {
    return {
      showAddCommentPop:false,//展示评论弹出层
      articleDetail: {}, //文章详情
      isShowPop: false,
      authorId: "", //作者id
      //关注按钮加载
      isCollect: "",
      isLoad: false,
      isLike:-1,
      followState:false,
      commitList:[],
    };
  },
  components: {
    commentItem,
    addComment
  },
  created() {
    this.getArticleDetail();
    // this.getAllComments();
  },
  methods: {
    //获取文章详情
    async getArticleDetail() {
      const {
        data: { data },
      } = await getArticleDetail(this.$store.state.articleId);
      console.log(data);
      this.articleDetail = data;
      this.authorId = data.aut_id;
      //保存关注状态
      this.followState = data.is_followed
      //保存文章收藏状态
      this.isCollect = data.is_collected;
      this.isLike = data.attitude;
    },
    //  async getAllComments() {
    //   try {
    //     const {
    //       data: { data },
    //     } = await getAllComments(
    //       "a",
    //       this.$store.state.articleId,
    //       null,
    //       10
    //     );
    //     this.commitList = data.results;
    //   } catch (error) {
    //     this.$toast.fail("获取评论失败");
    //   }
    // },
    //点击改变加载状态
    async follow() {
      this.isLoad = true;
        //点击关注
        const { data } = await following(this.authorId);
        console.log(data);
        //把关注作者的id存到本地
        this.$store.commit("setfollowedId", data.data.target);
        // this.followState = data.message;
        console.log(data.message);
        this.followState = true
        this.isLoad = false;
        this.$toast.success('关注成功')
    },
    //取消关注
    async unfollow() {
        this.isLoad = true

        //点击取消关注
        //  取消关注，返回数据为空
        await unFollowing(this.authorId);
        this.$store.commit("removefollowedID", this.authorId);
        this.isLoad = false;
        this.followState = false
        this.$toast.success('取消关注')

    },
    //收藏文章
    async collectArticle() {
      try {
        const res = await newsCollect(this.articleDetail.art_id);
        console.log(res);
        this.$toast.success("收藏文章成功");
        this.isCollect = true;
      } catch (error) {}
    },
    //取消收藏文章
    async uncollectArticle() {
      await unNewsCollect(this.articleDetail.art_id);
      this.$toast.success("取消收藏成功");
      this.isCollect = false;
    },
    //喜欢文章
   async likeArticle() {
      await likeArticle(this.articleDetail.art_id)
      this.$toast.success('喜欢成功')
      this.isLike = 1
    },
    // 取消喜欢
    async  unLikeArticle(){
      await unLikeArticle(this.articleDetail.art_id)
      this.$toast.success('取消喜欢')
      this.isLike = -1
    },
    //添加评论
    addComment(){
      this.showAddCommentPop = true
    },
    //关闭遮罩
    closeCommentPop(val){
      this.showAddCommentPop = false
      //拿到添加的评论内容
      console.log(val);
      //当成数据传递给评论子组件
      this.commitList.unshift(val.new_obj)
    }
  },
  //格式化时间
  computed: {
    // followState() {
    //   return this.$store.state.followedId.includes(this.articleDetail.aut_id);
    // },
    articleDesc() {
      const info = this.articleDetail;
      //格式化相对时间
      const relativeTime = dayjs(info.pubdate).fromNow();
      return `${relativeTime}`;
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.my {
  .blue {
    background-color: #3296fa;
  }
  //  height: calc(100vh - 100px);
  // padding-bottom: 200px;
  padding-top: 60px;
  :deep(.navbar) {
    position: fixed;
    top: 0;
    width: 100%;
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
        .confirm {
          border: #ccc;
          // line-height: 70px;
          margin-top: 15px;
          width: 200px;
          height: 70px;
        }
        .cancel {
          border: #ccc;
          // line-height: 70px;
          margin-top: 15px;
          width: 200px;
          height: 70px;
          color: black;
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
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 90px;
    line-height: 80px;
    bottom: 0;
    background-color: #fff;
    .comment {
      text-align: center;
      line-height: 50px;
      margin-bottom: 25px;
      flex: 4;
      .van-button {
        border-radius: 20px;
        height: 50px;
        width: 200px;
      }
    }
    .van-badge__wrapper {
      margin-right: 55px;
      margin-top: 5px;

      :deep(.van-badge) {
        position: absolute;
        top: 20px;
        right: 1px;
      }

      .van-icon {
        margin-top: -1px;
      }
    }

    .icon {
      flex: 5;
      .van-icon {
        // width: 25%;
        margin-left: 15px;
        margin-right: 10px;

        // color: #ccc;
      }
    }
  }
}
</style>
