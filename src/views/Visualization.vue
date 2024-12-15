<template>
  <div :style="`width: 100%; height: 100%;`" flex="~ col" justify-center items-center bg-blue>
    <!-- 外部框框 -->
    <Navigate/>
    <dv-border-box9 ref="borderRef" :style="`width: 100%; height: 435vh; position: relative; background: linear-gradient(135deg, #000428, #004e92);`">
      <div :style="`width: 100%;`" color-white flex justify-center items-center>
        <div style="flex: 1; display: flex; justify-content: center; align-items: center; padding-top: 1rem;">
          <div small-bg>
            <dv-decoration5 :dur="2" style="width: 1000px; height: 40px;" />
          </div>
        </div>
        <div class="Intellent-RS">
          模型指标可视化
        </div>
      </div>

      <!-- 嵌入 NewDiagram 组件 -->
      <div class="content" style="margin-top: 40px; padding: 20px; height: 100%; overflow-y: auto;">
        <div style="height: 100%;">
          <NewDiagram />
        </div>
      </div>
    </dv-border-box9>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BorderBox9 as DvBorderBox9 } from '@kjgl77/datav-vue3';
import NewDiagram from "@/components/home/NewDiagram.vue";
import Navigate from "@/components/home/Navigate.vue";

const borderRef = ref<InstanceType<typeof DvBorderBox9>>();
</script>

<style scoped>
.Intellent-RS {
  font-family: 'Roboto', sans-serif; /* 现代字体 */
  font-size: 2rem; /* 调整字体大小 */
  font-weight: bold; /* 粗体 */
  background: linear-gradient(135deg, #39b1b0, #00b7b8); /* 渐变色 */
  -webkit-background-clip: text; /* 使背景渐变只显示在文本区域 */
  color: transparent; /* 让文字本身变透明 */
  text-shadow: 0px 0px 10px rgba(0, 183, 184, 0.6), 0px 0px 20px rgba(0, 183, 184, 0.8), 0px 0px 30px rgba(0, 183, 184, 1); /* 给文字添加光晕效果 */
  letter-spacing: 0.1em; /* 增加字母间距 */
  text-align: center; /* 居中文本 */

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.custom-header {
  border: 2px solid #1625c8; /* 设置边框 */
  color: white; /* 设置字体颜色为白色 */
  font-size: 24px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体加粗 */
  padding: 10px; /* 设置内边距，使边框与文本有间距 */
  background-color: rgba(22, 112, 185, 0.3); /* 设置带透明度的背景色 */
  border-radius: 5px; /* 圆角边框 */
  text-align: center; /* 文本居中 */
}
</style>