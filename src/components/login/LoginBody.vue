<template>
    <div class="wrapper-home">
        <div class="swiper-outer">
          <swiper-container class="swiper" scrollbar="true" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }">
            <swiper-slide><img src="../assets/pag4.png" alt="" style="width: 100%;" ></swiper-slide>
            <swiper-slide><img src="../assets/pag2.png" alt="" style="width: 100%;"></swiper-slide>
            <swiper-slide><img src="../assets/pag3.png" alt="" style="width: 100%;"></swiper-slide>
          </swiper-container>
        </div>
      <div class="bottom">
        <div class="up-title">
<!--          <img src="../assets/logo.jpg" alt="Logo" width="70" height="70">-->
          基于深度学习的遥感图像智能处理平台
        </div>
        <div class="pages">
          <div class="item">
            图像超分
          </div>
          <div class="item">
            图像彩色化
          </div>
          <div class="item">
            图像分类
          </div>
        </div>
        <div class="bottom-content">

        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { register } from 'swiper/element/bundle';
register();
</script>
<style scoped>
.wrapper-home{
    width: 100%;
}
.bottom {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
}

.up-title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6em;
  font-size: 2em;
}

.pages {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10em;
}

.item {
  border: 1px solid #24292f;
  border-radius: 3em;
  height: 5em;
  width: 15em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
}
.swiper{
  height: 37em;

}
</style>
