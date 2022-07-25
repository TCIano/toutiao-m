<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="saveBirth"
      @cancel="hideBirthPop"
    />
  </div>
</template>

<script>
import { editUserInfo } from "@/api";
import dayjs from "dayjs";
export default {
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: "",
    };
  },
  methods: {
    hideBirthPop() {
      this.$emit("hideBirthPop");
    },
    async saveBirth() {
      try {
        //格式化选择的日期
        const date = dayjs(this.currentDate).format("YYYY-MM-DD");
        console.log(date);
        await editUserInfo({
          birthday: date,
        });
        this.$toast.success("修改日期成功");
        //更新视图
        this.$emit("newbirth", date);
        // 关闭弹窗
        this.$emit("hideBirthPop");
      } catch (error) {
        this.$toast.fail("修改日期失败");
      }
    },
  },
};
</script>

<style></style>
