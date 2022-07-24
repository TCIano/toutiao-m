<template>
  <div class="my">
    <van-field
      v-model.trim="commentContent"
      rows="5"
      autosize
      type="textarea"
      maxlength="30"
      placeholder="请输入留言"
      show-word-limit
      class="textarea"
    >
    </van-field>
    <van-button @click="publishComment" :disabled="!commentContent.length">发布</van-button>
  </div>
</template>

<script>
import { addCommit } from "@/api";
export default {
  data() {
    return {
      commentContent: "", //发布的评论内容
    };
  },
  props:{
    replyId:{
        type:String
    }
  },
  methods: {
    async publishComment() {
      try {
        const res = await addCommit(
          this.replyId,
          this.commentContent,
          this.$store.state.articleId,
        );
        console.log(res);
        if (res.status === 201) {
          this.$toast.loading({
            message: "发布中...",
            forbidClick: true,
          });
          this.$toast.success("发布成功");
        }
        
            //清空内容
        this.commentContent = "";

        //关闭遮罩层
        //重新加载评论列表,传递给父组件所要添加的内容
        this.$emit("closeCommentPop",res.data.data);
        
      } catch (error) {
        this.$toast.fail('发布失败');
      }
      //
    },
  },
};
</script>

<style scoped lang="less">
.my {
  display: flex;
  justify-content: center;
  align-items: center;
  .textarea {
    background-color: #eee;
    // padding: 30px;
    // margin: 20px;
    margin-top: 5px;
    margin-bottom: 50px;
    width: 550px;
    height: 200px;
    border-radius: 20px;
  }
  .van-button {
    border: #fff;
  }
}
</style>
