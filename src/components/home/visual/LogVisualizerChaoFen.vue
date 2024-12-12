<template>
  <div class="chart-wrapper">
    <h2>{{ logFileName }}</h2>
    <div v-if="showCharts" class="chart-area">
      <canvas :id="`lossChart-${uniqueId}`" class="chart"></canvas>
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
      epochs: [], // 存储 epoch 数据
      contentLoss: [], // 存储内容损失
      adversarialLoss: [], // 存储对抗损失
      discriminatorLoss: [], // 存储判别器损失
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
      this.contentLoss = [];
      this.adversarialLoss = [];
      this.discriminatorLoss = [];

      lines.forEach((line) => {
        if (line.includes('Epoch')) {
          const epochMatch = line.match(/Epoch \[(\d+)\/150\]/);
          const contentLossMatch = line.match(/Content Loss: (\d+\.\d+)/);
          const adversarialLossMatch = line.match(/Adversarial Loss: (\d+\.\d+)/);
          const discriminatorLossMatch = line.match(/Discriminator Loss: (\d+\.\d+)/);

          if (epochMatch && contentLossMatch && adversarialLossMatch && discriminatorLossMatch) {
            const epoch = parseInt(epochMatch[1]);
            const contentLoss = parseFloat(contentLossMatch[1]);
            const adversarialLoss = parseFloat(adversarialLossMatch[1]);
            const discriminatorLoss = parseFloat(discriminatorLossMatch[1]);

            this.epochs.push(epoch);
            this.contentLoss.push(contentLoss);
            this.adversarialLoss.push(adversarialLoss);
            this.discriminatorLoss.push(discriminatorLoss);
          }
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
              label: 'Content Loss',
              data: this.contentLoss,
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: 'Adversarial Loss',
              data: this.adversarialLoss,
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            },
            {
              label: 'Discriminator Loss',
              data: this.discriminatorLoss,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Content Loss, Adversarial Loss, and Discriminator Loss',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Epoch',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Loss',
              },
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
  height: 400px; /* 限制图表高度 */
}
</style>