<template>
  <div class="my">
    <!-- 裁剪图片区域 -->
    <img :src="img" alt="" ref="image" />
    <footer>
      <span @click="hidePop">取消</span>
      <span @click="cutImg">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import { editUserAvator } from "@/api";
export default {
  data() {
    return {
      myCropper: "",
      imgof: "",
    };
  },
  props: {
    img: {
      required: true,
    },
  },
  methods: {
    hidePop() {
      this.$emit("hidePop");
      this.$emit("des", this);
      this.myCropper.destroy();
    },
    //初始化裁剪
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 3,
        dragMode: "move",
        aspectRatio: 1,
        autoCropArea: 1,
        background: false,
        movable: true,
      });
      console.log(this);
    },
    cutImg() {
      try {
        //拿到裁剪后的base64的图片
        this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
          const fm = new FormData();
          fm.append("photo", blob);

          //   uploadPhoto(fm);
          //   调用接口更新数据
          const { data } = await editUserAvator(fm);
          this.imgof = data.data.photo;
          //更新视图
          this.$emit("newImg", data.data.photo, this.myCropper);
          //销毁
        });
        //退出视图
        this.$emit("hidePop");
        this.$toast.success("更新成功");
        this.$refs.image.value = "";
        this.myCropper.destroy();
        this.$emit("des", this);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (!this.myCropper) {
      console.log(111);
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {},
};
</script>

<style scoped lang="less">
.my {
  background: #000;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  footer {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
