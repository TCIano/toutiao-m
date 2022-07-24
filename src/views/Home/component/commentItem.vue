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
              <van-button class="reply" @click="replyComment">回复 {{ item.reply_count }}</van-button>
              <!-- 回复评论弹出层 -->
              <van-popup v-model="showReplyComment" position="bottom" :style="{ height: '100%' }">
                    <replyComment></replyComment>
              </van-popup>
            </div>
          </van-col>
          <van-col span="6" class="follow">
            <van-icon name="good-job-o">
              {{ item.like_count || "点赞" }}</van-icon
            >
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import replyComment from '../component/replyComment.vue'
import { getAllComments } from "@/api";
export default {
  data() {
    return {
      // commitList: [], //评论列表
      loading: false,
      finished: false,
      endCommentId: null, //每次传递数据的最后一条评论id
      showReplyComment:false//展示回复 评论弹窗
    };
  },
  components:{
    replyComment
  },
  props:{
    //添加的评论内容
    commitList:{
      type:Array,
      // required:true
    }
  },
  // watch:{
  //   //监听comitlist
  //   commitList:{
  //     deep:true,
  //     immediate:true,
  //     handler(n,o){
  //       this.commitList = n
  //       console.log(this.commitList);
  //       console.log(n);
  //       // console.log(this.commitList);
  //     }
  //   }
  // },
  created() {
    // this.getAllComments();
    //如果添加的有新内容 那就先把新加的评论 加到评论列表前面
        // if(this.newAddComment.new_obj !== ''){
        //   console.log(this.newAddComment.new_obj);
        //   this.commitList.unshift(this.newAddComment.new_obj)
        // }
  },
  methods: {
    // async getAllComments() {
    //   try {
    //     const {
    //       data: { data },
    //     } = await getAllComments(
    //       "a",
    //       this.$store.state.articleId,
    //       this.endCommentId,
    //       10
    //     );
    //     this.commitList = data.results;
    //     this.endCommentId = data.last_id;
    //   } catch (error) {
    //     this.$toast.fail("获取评论失败");
    //   }
    // },
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
    replyComment(){
      this.showReplyComment = true
    }
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
