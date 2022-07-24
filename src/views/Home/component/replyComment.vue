<template>
  <div class="reply">
    <van-nav-bar  left-arrow @click-left="$emit('hidePop')" >
      <template #title>
        {{replyConn.reply_count}} 回复
      </template>
    </van-nav-bar>
    <!-- 回复区域  -->
    <main>
      <div class="my">
        
          <van-cell>
            <van-row class="row">
              <!-- 头像 -->
              <van-col span="4" class="avator">
                <van-image round width="1.2rem" height="1.2rem" :src="replyConn.aut_photo" />
              </van-col>
              <van-col span="14" class="name">
                <p class="auth">{{replyConn.aut_name}}</p>
                <p class="comment">{{replyConn.content}}</p>
                <div class="data">
                  <span class="time">{{replyConn.pubdate | dateFilter}}</span>
                  <van-button class="reply">回复 {{replyConn.reply_count}}</van-button>
                </div>
              </van-col>
              <van-col span="6" class="follow">
                <van-icon :name="replyConn.is_liking ? 'good-job' : 'good-job-o'"
              :color="replyConn.is_liking ? 'red' : ''"> {{replyConn.like_count ||"点赞" }}</van-icon>
              </van-col>
            </van-row>
          </van-cell>
      </div>
      <van-cell title="全部回复"></van-cell>
      
      <!-- 回复评论列表 -->
      <!-- <commentItemVue :commitList="[1]"> </commentItemVue> -->
      <van-list
      ref="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="1"
    >
      <van-cell v-for="(item, index) in replyCommentList" :key="index">
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
              <van-button class="reply" >回复 {{ item.reply_count }}</van-button>
            </div>
          </van-col>
          <van-col span="6" class="follow" @click="isLiking(item)">
            <van-icon :name="item.is_liking ? 'good-job' : 'good-job-o'"
              :color="item.is_liking ? 'red' : ''">
              {{ item.like_count || "点赞" }}</van-icon
            >
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
    </main>
    <!-- 底部按钮 -->
    <footer>
      <van-button size="large" @click="addReply" class="comm">评论</van-button>
       <van-popup v-model="showAddCommentPop"  position="bottom">
          <!-- 发送评论 -->
          <addComment @closeCommentPop="closeCommentPop" :replyId="replyConn.com_id"></addComment>
        </van-popup>
    </footer>
  </div>
</template>

<script>
import commentItemVue from './commentItem.vue';
import { getAllComments, isLikeComment,unLikeComment } from "@/api";
import addComment from './addReply.vue'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      commitList:[],
      // replyendCommentId:'',
      showAddCommentPop:false,
      
    };
  },
  props:{
    replyConn:{
      type:Object,
      required:true
    },
    replyCommentList:{
      type:Array
    },
    replyendCommentId:{
      type:String
    }
  },
    components:{
      commentItemVue,
      addComment
    },
  methods: {
   async onLoad() {
    console.log(1111);
      try {
        const {
          data: { data },
        } = await getAllComments({
          type: "c",
          source: this.replyConn.com_id ,
          offset: this.replyendCommentId,
          limit:20
        });
        console.log(data.results.length);
        // console.log(data);
        if (data.end_id !== data.last_id && data.results.length !== 0) {
          // this.replyCommentList.push(...data.results);
          // this.replyendCommentId = data.last_id;
          // console.log(this.replyendCommentId);

          this.$emit('addreplyCommentList',data.results,data.last_id)
        } else {
          return this.finished = true;
        }
      } catch (error) {
        this.$toast.fail('获取评论回复失败')
      }finally {
        this.loading = false
      }
    },
    //添加评论回复
    addReply(){
      this.showAddCommentPop = true

    },
    //关闭遮罩
    closeCommentPop(val){
      this.showAddCommentPop = false
      //拿到添加的评论内容
      console.log(val);
      //当成数据传递给评论子组件
      this.replyCommentList.unshift(val.new_obj)
      this.replyConn.reply_count++
    },
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
            com.like_count++

          }
        } catch (error) {
          this.$toast.fail("点赞失败");
        }
      }else {
        //如果为true，说明 点赞了，就取消
          try {
             await unLikeComment(com.com_id)
            
              this.$toast.success(`对 ${com.aut_name} 取消点赞`);
            com.like_count--

          } catch (error) {
            this.$toast.fail('取消点赞失败')
          }

      }
      // 点赞或者取消点赞都改变 他的状态
      com.is_liking = !com.is_liking
    },
  },
  created(){
    // console.log(this.replyConn);
  }
};
</script>

<style scoped lang="less">
.reply {
  margin-bottom: 60px;
  padding-bottom: 30px;
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
        .reply {
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

  footer {
    .van-button {
    position: fixed;
    bottom: 0;
  }
  }
  
  mian {
    margin-bottom: 50px;
  }
}
</style>
