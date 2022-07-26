<template>
  <div class="my">
    <van-list
      ref="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in commitList" :key="index">
        <van-row class="row">
          <!-- 头像 -->
          <van-col span="4" class="avator">
            <van-image
              round
              width="1.2rem"
              height="1.2rem"
              :src="item.aut_photo"
            />
          </van-col>
          <van-col span="14" class="name">
            <p class="auth">{{ item.aut_name }}</p>
            <p class="comment">{{ item.content }}</p>
            <div class="data">
              <span class="time">{{ item.pubdate | dateFilter }}</span>
              <van-button class="reply" @click="replyComment(item)">
                回复 {{ item.reply_count }}
              </van-button>
            </div>
          </van-col>
          <van-col span="6" class="follow" @click="isLiking(item)">
            <van-icon
              :name="item.is_liking ? 'good-job' : 'good-job-o'"
              :color="item.is_liking ? 'red' : ''"
            >
              {{ item.is_liking ? item.like_count : "点赞" }}</van-icon
            >
          </van-col>
        </van-row>
      </van-cell>
      <!-- 回复评论弹出层 -->
      <van-popup
        v-model="showReplyComment"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <replyComment
          @hidePop="hidePop"
          :replyConn="commitList[replyCommentIndex]"
          :replyCommentList="replyCommentList"
          :replyendCommentId="replyendCommentId"
        >
        </replyComment>
      </van-popup>
    </van-list>
  </div>
</template>

<script>
import replyComment from "./replyComment.vue";
import { getAllComments, isLikeComment, unLikeComment } from "@/api";
export default {
  data() {
    return {
      // commitList: [], //评论列表
      loading: false,
      finished: false,
      endCommentId: null, //每次传递数据的最后一条评论id
      showReplyComment: false, //展示回复 评论弹窗
      replyCommentIndex: null,
      replyendCommentId: null,
      replyCommentList: [],
    };
  },
  components: {
    replyComment,
  },
  props: {
    //添加的评论内容
    commitList: {
      type: Array,
      // required:true
    },
  },

  created() {},
  methods: {
    //加载更多
    async onLoad() {
      try {
        const {
          data: { data },
        } = await getAllComments({
          type: "a",
          source: this.$store.state.articleId,
          offset: this.endCommentId,
          limit: 5,
        });

        this.commitList.push(...data.results);
        console.log(data);
        if (data.results.length) {
          this.endCommentId = data.last_id;
          console.log(this.endCommentId);
        } else {
          this.finished = true;
        }
        // this.commitList = data.results
      } catch (error) {
      } finally {
        //最后加载结束
        this.loading = false;
      }
    },
    //回复评论弹窗
    async replyComment(com) {
      this.showReplyComment = true;
      // console.log(comId);
      const index = this.commitList.findIndex((item) => {
        return item.com_id === com.com_id;
      });
      // console.log(index);
      this.replyCommentIndex = index;
      // console.log(com);
      // console.log(com.com_id);
      // console.log(commitList[replyCommentIndex]);
      try {
        const {
          data: { data },
        } = await getAllComments({
          type: "c",
          source: com.com_id,
          offset: null,
          limit: 20,
        });
        this.replyendCommentId = data.last_id;
        this.replyCommentList = data.results;
        if (data.results === []) {
          return;
        } else {
        }

        console.log(this.replyCommentList);
        console.log(this.replyendCommentId);
        // this.commitList = data.results
      } catch (error) {
        this.$toast.fail("获取评论回复失败");
      } finally {
        this.loading = false;
      }
      // this.replyendCommentId = null;
    },
    //添加数据
    // addreplyCommentList(data, id) {
    //   console.log(data, id);
    //   this.replyCommentList.push(...data);
    //   this.replyendCommentId = id;
    // },
    //隐藏弹窗
    hidePop() {
      this.showReplyComment = false;
    },
    //点赞评论
    async isLiking(com) {
      if (!com.is_liking) {
        //如果为false 就说明没点赞，可以点赞
        try {
          console.log(com);
          const res = await isLikeComment(com.com_id);
          console.log(res);
          if (res.status === 201) {
            this.$toast.success(`对 ${com.aut_name} 点赞成功`);
            //点赞成功让当前点赞数+1
            com.like_count++;
          }
        } catch (error) {
          this.$toast.fail("点赞失败");
        }
      } else {
        //如果为true，说明 点赞了，就取消
        try {
          await unLikeComment(com.com_id);

          this.$toast.success(`对 ${com.aut_name} 取消点赞`);
          com.like_count--;
        } catch (error) {
          this.$toast.fail("取消点赞失败");
        }
      }
      // 点赞或者取消点赞都改变 他的状态
      com.is_liking = !com.is_liking;
    },
  },
  //格式化时间
  // computed: {
  //   commentDesc() {
  //     const info = this.commentItem;
  //     //格式化相对时间
  //     const relativeTime = dayjs(info.pubdate).fromNow();
  //     return `${relativeTime}`;
  //   },
  // },
};
</script>

<style lang="less" scoped>
.my {
  // margin-bottom: 50px;
  padding: 0 20px;
  // padding-bottom: px;
  height: 100%;
  // overflow-y: scroll; height: 100%;
  .van-list {
    margin-bottom: 50px;
    height: calc(100vh - 100px);
    .van-list__finished-text {
      margin-bottom: 30px;
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
  }
}
</style>
