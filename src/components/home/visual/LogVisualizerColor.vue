<template>
  <div class="chart-wrapper">
    <h2 style="color: #e3e4f9">{{ logFileName }}</h2>
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
      trainingLoss: [], // 存储训练损失
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

      lines.forEach((line) => {
        if (line.includes('Epoch')) {
          const epochMatch = line.match(/Epoch: (\d+)/);
          const lossMatch = line.match(/Training loss: (\d+\.\d+)/);

          if (epochMatch && lossMatch) {
            const epoch = parseInt(epochMatch[1]);
            const loss = parseFloat(lossMatch[1]);

            this.epochs.push(epoch);
            this.trainingLoss.push(loss);
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
              label: 'Training Loss',
              data: this.trainingLoss,
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Training Loss Over Epochs',
              color: '#fff', // 标题颜色改为白色
            },
            legend: {
              labels: {
                color: '#fff', // 图例文字颜色改为白色
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Epoch',
                color: '#fff', // 横坐标标题颜色改为白色
              },
              ticks: {
                color: '#fff', // 横坐标刻度文字颜色改为白色
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)', // 横坐标网格线颜色改为半透明白色
              },
            },
            y: {
              title: {
                display: true,
                text: 'Loss',
                color: '#fff', // 纵坐标标题颜色改为白色
              },
              ticks: {
                color: '#fff', // 纵坐标刻度文字颜色改为白色
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)', // 纵坐标网格线颜色改为半透明白色
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