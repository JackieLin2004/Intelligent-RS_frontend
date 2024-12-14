<template>
  <div class="container">
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :span="24">
        <el-card style="width: 100%">
          <div class="chart-container">
            <LogVisualizerFenLei log-file-path="/logs/AlexNet.log" />
            <LogVisualizerFenLei log-file-path="/logs/DenseNet.log" />
            <LogVisualizerFenLei log-file-path="/logs/VGGNet.log" />
          </div>
          <div class="chart-container">
            <LogVisualizerFenLei log-file-path="/logs/ResNeXt.log" />
            <LogVisualizerFenLei log-file-path="/logs/SwinTransformer.log" />
            <LogVisualizerFenLei log-file-path="/logs/GoogleNet.log" />
          </div>
        </el-card>
        <el-card style="width: 100%">
          <div class="chart-container">
            <LogVisualizerColor log-file-path="/logs/Colorization2.log" />
            <LogVisualizerColor2 log-file-path="/logs/Colorization2.log" />
          </div>
        </el-card>
        <el-card style="width: 100%">
          <div class="chart-container">
            <LogVisualizerChaoFen log-file-path="/logs/ISRGAN.log" />
            <LogVisualizerChaoFen log-file-path="/logs/SRGAN.log" />
          </div>
          <div class="chart-container">
            <LogVisualizerChaoFen2 log-file-path="/logs/SRResNet.log" />
            <LogVisualizerChaoFen2 log-file-path="/logs/SRResNet.log" />
          </div>
<!--          <div class="chart-container">-->
<!--            <LogVisualizerChaoFen3 log-file-path="/logs/ESRGAN.log" />-->
<!--            <LogVisualizerChaoFen3 log-file-path="/logs/ESRGAN.log" />-->
<!--          </div>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import LogVisualizerFenLei from "@/components/home/visual/LogVisualizerFenLei.vue";
import LogVisualizerColor from "@/components/home/visual/LogVisualizerColor.vue";
import LogVisualizerChaoFen from "@/components/home/visual/LogVisualizerChaoFen.vue";
import LogVisualizerChaoFen2 from "@/components/home/visual/LogVisualizerChaoFen2.vue";
import LogVisualizerChaoFen3 from "@/components/home/visual/LogVisualizerChaoFen3.vue";
import LogVisualizerColor2 from "@/components/home/visual/LogVisualizerColor2.vue";
import {ElCard} from "element-plus";
</script>

<style scoped>
.container {
  position: relative;
  padding: 24px;
}

.chart-container {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 20px; /* 图表之间的间距 */
}
</style>