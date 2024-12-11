<template>
  <div class="container">
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :span="24">
        <el-card style="height: 20vw; width: 100%">
          <el-scrollbar>
            <div id="consequence" style="width: 100%; height: 18vw" />
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, nextTick } from "vue";

onMounted(() => {
  nextTick(() => {
    const chartDom = document.getElementById("consequence");
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: "模型效果对比",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["模型一", "模型二"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "0",
            "10",
            "20",
            "30",
            "40",
            "50",
            "60",
            "70",
            "80",
            "90",
            "100",
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "模型一",
            type: "line",
            data: [120, 200, 150, 80, 70, 65, 58, 40, 23, 15, 8],
          },
          {
            name: "模型二",
            type: "line",
            data: [80, 130, 110, 140, 90, 75, 62, 43, 25, 10, 3],
          },
        ],
      };
      myChart.setOption(option);
    }
  });
});
</script>

<style scoped>
.container {
  position: relative;
  padding: 24px;
}
</style>
