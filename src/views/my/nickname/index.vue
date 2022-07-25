<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      @click-left="hideNickPop"
      @click-right="saveNick"
      left-arro
      right-text="保存"
    />
    <van-field
      v-model.trim="nickNamemessage"
      rows="2"
      autosize
      type="textarea"
      maxlength="10"
      placeholder="请输入要修改的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserInfo } from "@/api";
export default {
  data() {
    return {
      nickNamemessage: this.nickN,
    };
  },
  props: {
    nickN: {
      type: String,
      required: true,
    },
  },
  methods: {
    //隐藏弹出层
    hideNickPop() {
      this.$emit("closeNickPop", false);
      //   this.$router.go(-1);
    },
    //修改昵称
    async saveNick() {
      try {
        if (!this.nickNamemessage) {
          this.$toast.fail("请输入内容");
        } else {
          const { data } = await editUserInfo({
            name: this.nickNamemessage,
          });
          console.log(data);
          //传递数据更新视图
          this.$emit("newNick", this.nickNamemessage);
          this.$emit("closeNickPop", false);
        }
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
:deep(.van-nav-bar__title) {
  //   color: #3296fa;
}
:deep(.van-nav-bar__text) {
  //   color: #3296fa;
  color: #fff;
}
</style>
