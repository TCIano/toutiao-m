<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="saveGender"
      @cancel="hideGenderPop"
      :default-index="defaultIndex"
    />
  </div>
</template>

<script>
import { editUserInfo } from "@/api";
export default {
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.gender === 0 ? 1 : 2,//数据回显
    };
  },
  props:{
    gender:{
      type:Number
    }
  },
  methods: {
    hideGenderPop() {
      this.$emit("hideGenderPop");
    },
    //修改性别
    async saveGender(val) {
      try {
        console.log(val);
        await editUserInfo({
          gender: val === "男" ? 0 : 1,
        });
        this.$toast.success("修改成功");
        //传递数据更新视图
        console.log(typeof val);
        this.$emit("newGender", val);
        //弹出层
        this.$emit("hideGenderPop");
      } catch (error) {
        this.$toast.fail("修改失败");
      }
    },
  },
};
</script>

<style></style>
