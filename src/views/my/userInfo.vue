<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.go(-1)" />
    <!-- 头像 -->
    <div class="avator">
      <input
        type="file"
        name=""
        id=""
        hidden
        ref="iptAva"
      />
      <van-cell title="头像" is-link @click="selectAvator">
        <van-image round width="0.9rem" height="0.9rem" :src="userInfo.photo" />
      </van-cell>
      <!-- 弹出层 -->
      <van-popup v-model="showPop" style="height: 100%" position="bottom">
        <!-- 裁剪图片区域 -->
        <!-- v-if用来控制头像组件的销毁的隐藏 -->
        <avator
        v-if="showPop"
          :img="img"
          @hidePop="hidePop"
          @newImg="newImg"
        ></avator>
      </van-popup>
    </div>
    <!-- 昵称 -->
    <div class="nickname">
      <van-cell is-link title="昵称" @click="showNickPop">
        <span>{{ userInfo.name }}</span>
      </van-cell>
      <van-popup
        v-model="showNickEdit"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <nickName
          @closeNickPop="closeNickPop"
          @newNick="newNick"
          :nickN="userInfo.name"
        ></nickName>
      </van-popup>
    </div>
    <!-- 昵称 -->

    <!-- 性别 -->
    <div class="gender">
      <van-cell is-link title="性别" @click="showGenderPop">
        <span>{{ userInfo.gender ? "女" : "男" }}</span>
      </van-cell>
      <van-popup
        v-model="showGenderEdit"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <gender @hideGenderPop="hideGenderPop" @newGender="newGender" :gender="userInfo.gender"></gender>
      </van-popup>
    </div>
    <!-- 性别 -->

    <!-- 生日 -->
    <div class="birth">
      <van-cell is-link title="生日" @click="showBirthPop">
        <span>{{ userInfo.birthday }}</span>
      </van-cell>
      <van-popup
        v-model="showBirthEdit"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <birth @hideBirthPop="hideBirthPop" @newbirth="newbirth" :time="userInfo.birthday"></birth>
      </van-popup>
    </div>
    <!-- 生日 -->
  </div>
</template>

<script>
import { getProfileInfo } from "@/api";
import nickName from "./nickname";
import gender from "./gender";
import birth from "./birth";
import avator from "./avator";
export default {
  data() {
    return {
      showNickEdit: false, //修改昵称弹出层
      showGenderEdit: false, //修改性别弹出层
      showBirthEdit: false, //修改生日弹出层
      userInfo: {},
      showPop: false,
      // newNick: "",
      img: null, //点击的图图片
    };
  },

  components: {
    nickName,
    gender,
    birth,
    avator,
  },
  created() {
    this.getProfileInfo();
  },
  mounted(){
    this.$refs.iptAva.addEventListener('change',(e) =>{
       // console.log(this);

      const  file = e.target.files[0];
      // 转化图片格式
      const fr = new FileReader();
      // 读取二进制数据，并将其编码为 base64 的 data url。
      fr.readAsDataURL(file);
      //  读取完成，没有 error。
      fr.onload = (e) => {
        this.img = e.target.result;
        this.showPop = true;
        // e.target.value = "";
      };
      console.log(file);
      // this.img = window.URL.createObjectURL(file);
      // console.log(this.img);
      // //传递给子组件
      // this.$refs.iptAva.value = ''
      e.target.value = "";

    })
  },
  destroyed(){
    this.$refs.iptAva
  },
  methods: {
    //显示昵称弹出层
    showNickPop() {
      this.showNickEdit = true;
    },
    //关闭昵称弹出层
    closeNickPop(val) {
      this.showNickEdit = val;
    },
    // 获取用户个人资料
    async getProfileInfo() {
      const {
        data: { data },
      } = await getProfileInfo();
      console.log(data);
      this.userInfo = data;
    },
    //更新昵称
    newNick(val) {
      console.log(val);
      this.userInfo.name = val;
    },
    //显示性别弹出层
    showGenderPop() {
      this.showGenderEdit = true;
    },
    //隐藏性别弹出层
    hideGenderPop() {
      this.showGenderEdit = false;
    },
    //更新性别内容
    newGender(val) {
      console.log(val);
      const newgender = val === "男" ? 0 : 1;
      this.userInfo.gender = newgender;
    },
    //显示生日弹窗
    showBirthPop() {
      this.showBirthEdit = true;
    },
    //关闭生日弹出
    hideBirthPop() {
      this.showBirthEdit = false;
    },
    //更新日期
    newbirth(val) {
      this.userInfo.birthday = val;
    },
    //点击头像区域触发点击事件
    selectAvator() {
      this.$refs.iptAva.click();
      console.log(this.$refs.iptAva);
    },
    //监听输入框change事件
    
    //隐藏头像弹出层
    hidePop() {
      this.showPop = false;
      // this.img = "";
    },
    //更新头像
    newImg(val) {
      console.log(val);
      this.userInfo.photo = val;
      console.log(this.$refs.iptAva.value);
    },
    
  },
};
</script>

<style scoped lang="less">
:deep(.van-nav-bar__content) {
  background-color: #3296fa;
  color: #fff;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
:deep(.van-icon-arrow-left) {
  color: #fff;
}
.van-cell__value {
  line-height: 45px;
}
</style>
