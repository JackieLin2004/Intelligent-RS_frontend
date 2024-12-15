<template>
  <div class="container">
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :span="24">
        <!-- 第一个卡片 -->
        <el-card class="transparent-card">
          <div class="chart-container">
            <LogVisualizerFenLei log-file-path="/logs/AlexNet.log" />
            <LogVisualizerFenLei log-file-path="/logs/DenseNet.log" />
            <LogVisualizerFenLei log-file-path="/logs/VGGNet.log" />
          </div>
          <div class="chart-container">
            <LogVisualizerFenLei log-file-path="/logs/ResNeXt.log" />
            <LogVisualizerFenLei log-file-path="/logs/SwinTransformer.log" />
            <LogVisualizerFenLei log-file-path="/logs/GoogLeNet.log" />
          </div>
        </el-card>

        <!-- 第二个卡片 -->
        <el-card class="transparent-card">
          <div class="chart-container">
            <LogVisualizerColor log-file-path="/logs/Colorization1.log" />
            <LogVisualizerColor2 log-file-path="/logs/Colorization2.log" />
          </div>
        </el-card>

        <!-- 第三个卡片 -->
        <el-card class="transparent-card">
          <div class="chart-container">
            <LogVisualizerChaoFen log-file-path="/logs/ISRGAN.log" />
            <LogVisualizerChaoFen log-file-path="/logs/SRGAN.log" />
          </div>
          <div class="chart-container">
            <LogVisualizerChaoFen2 log-file-path="/logs/SRResNet.log" />
            <LogVisualizerChaoFen3 log-file-path="/logs/ESRGAN.log" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from "element-plus";
import LogVisualizerFenLei from "@/components/home/visual/LogVisualizerFenLei.vue";
import LogVisualizerColor from "@/components/home/visual/LogVisualizerColor.vue";
import LogVisualizerChaoFen from "@/components/home/visual/LogVisualizerChaoFen.vue";
import LogVisualizerChaoFen2 from "@/components/home/visual/LogVisualizerChaoFen2.vue";
import LogVisualizerChaoFen3 from "@/components/home/visual/LogVisualizerChaoFen3.vue";
import LogVisualizerColor2 from "@/components/home/visual/LogVisualizerColor2.vue";
</script>

<style scoped>
.container {
  position: relative;
  padding: 24px;
  height: 100%;
}

.chart-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 20px; /* 图表之间的间距 */
}

/* 透明卡片样式 */
.transparent-card {
  background-color: transparent; /* 背景透明 */
  border: none; /* 移除边框 */
  box-shadow: none; /* 移除阴影 */
}
</style>