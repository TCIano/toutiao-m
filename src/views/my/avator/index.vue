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
import "cropperjs/dist/cropper.css";
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
      // this.$emit("des", this);
    },
    //初始化裁剪
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: "move",
        aspectRatio: 1,
        // autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
      });
      console.log(this);
    },
    async editUserAvator(blob) {
      try {
        const fm = new FormData();
        fm.append("photo", blob);
        //   调用接口更新数据
        const { data } = await editUserAvator(fm);
        //退出视图
        this.$emit("hidePop");

        //   uploadPhoto(fm);
        //更新视图
        this.$emit("newImg", data.data.photo);
        this.$toast.success("更新成功");
      } catch (error) {
        this.$toast.fail("更新失败");
      }
    },
    cutImg() {
      this.myCropper.getCroppedCanvas().toBlob((blob) => {
        this.editUserAvator(blob);
      });
    },
  },
  created() {
    
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
