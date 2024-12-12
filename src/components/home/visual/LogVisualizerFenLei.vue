<template>
  <div class="chart-wrapper">
    <h2>{{ logFileName }}</h2>
    <div v-if="showCharts" class="chart-area">
      <canvas :id="`lossChart-${uniqueId}`" class="chart"></canvas>
      <canvas :id="`accuracyChart-${uniqueId}`" class="chart"></canvas>
      <canvas :id="`f1ScoreChart-${uniqueId}`" class="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    logFilePath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      epochs: [],
      trainingLoss: [],
      validatingLoss: [],
      trainingAccuracy: [],
      validatingAccuracy: [],
      f1Score: [],
      showCharts: false, // 控制图表是否显示
      uniqueId: Math.random().toString(36).substr(2, 9), // 生成唯一的 ID
    };
  },
  computed: {
    // 计算属性：提取文件名（去掉.log后缀）
    logFileName() {
      return this.logFilePath.replace(/^\/logs\//, '').replace(/\.log$/, '');
    },
  },
  mounted() {
    this.loadLogFile();
  },
  methods: {
    async loadLogFile() {
      try {
        // 使用 fetch 从 public 目录加载日志文件
        const response = await fetch(this.logFilePath);
        if (!response.ok) {
          throw new Error(`Failed to load log file: ${this.logFilePath}`);
        }
        const logContent = await response.text();
        this.parseLogFile(logContent);
        this.showCharts = true; // 显示图表
        this.$nextTick(() => {
          this.createCharts();
        });
      } catch (error) {
        console.error('Error loading logs file:', error);
      }
    },
    parseLogFile(logContent) {
      const lines = logContent.split('\n');
      this.epochs = [];
      this.trainingLoss = [];
      this.validatingLoss = [];
      this.trainingAccuracy = [];
      this.validatingAccuracy = [];
      this.f1Score = [];

      lines.forEach((line) => {
        if (line.includes('Epoch:')) {
          const epoch = parseInt(line.match(/Epoch: (\d+)/)[1]);
          const trainingLoss = parseFloat(line.match(/Training loss: ([0-9.]+)/)[1]);
          const validatingLoss = parseFloat(line.match(/Validating loss: ([0-9.]+)/)[1]);
          const trainingAccuracy = parseFloat(line.match(/Training accuracy: ([0-9.]+)/)[1]);
          const validatingAccuracy = parseFloat(line.match(/Validating accuracy: ([0-9.]+)/)[1]);
          const f1Score = parseFloat(line.match(/f1 score: ([0-9.]+)/)[1]);

          this.epochs.push(epoch);
          this.trainingLoss.push(trainingLoss);
          this.validatingLoss.push(validatingLoss);
          this.trainingAccuracy.push(trainingAccuracy);
          this.validatingAccuracy.push(validatingAccuracy);
          this.f1Score.push(f1Score);
        }
      });
    },
    createCharts() {
      // 创建损失图表
      const lossChartCanvas = document.getElementById(`lossChart-${this.uniqueId}`);
      new Chart(lossChartCanvas, {
        type: 'line',
        data: {
          labels: this.epochs,
          datasets: [
            {
              label: 'Training Loss',
              data: this.trainingLoss,
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: 'Validating Loss',
              data: this.validatingLoss,
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Training and Validation Loss',
            },
          },
        },
      });

      // 创建准确率图表
      const accuracyChartCanvas = document.getElementById(`accuracyChart-${this.uniqueId}`);
      new Chart(accuracyChartCanvas, {
        type: 'line',
        data: {
          labels: this.epochs,
          datasets: [
            {
              label: 'Training Accuracy',
              data: this.trainingAccuracy,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'Validating Accuracy',
              data: this.validatingAccuracy,
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Training and Validation Accuracy',
            },
          },
        },
      });

      // 创建F1分数图表
      const f1ScoreChartCanvas = document.getElementById(`f1ScoreChart-${this.uniqueId}`);
      new Chart(f1ScoreChartCanvas, {
        type: 'line',
        data: {
          labels: this.epochs,
          datasets: [
            {
              label: 'F1 Score',
              data: this.f1Score,
              borderColor: 'rgba(255, 206, 86, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'F1 Score',
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  flex: 1 1 30%; /* 每个图表占据 30% 的宽度 */
  box-sizing: border-box;
  margin-bottom: 20px;
}

.chart-area {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 图表之间的间距 */
}

.chart {
  width: 100%; /* 图表宽度占满父容器 */
  height: 300px; /* 限制图表高度 */
}
</style>