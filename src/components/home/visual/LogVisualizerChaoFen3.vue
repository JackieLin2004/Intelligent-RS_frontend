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
      dLoss: [], // 存储判别器损失
      gLoss: [], // 存储生成器损失
      contentLoss: [], // 存储内容损失
      ganLoss: [], // 存储 GAN 损失
      pixelLoss: [], // 存储像素损失
      psnr: [], // 存储 PSNR
      ssim: [], // 存储 SSIM
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
      this.dLoss = [];
      this.gLoss = [];
      this.contentLoss = [];
      this.ganLoss = [];
      this.pixelLoss = [];
      this.psnr = [];
      this.ssim = [];

      lines.forEach((line) => {
        if (line.includes('Epoch')) {
          const epochMatch = line.match(/Epoch (\d+)\/200/);
          const dLossMatch = line.match(/Average D loss: ([\d.]+)/);
          const gLossMatch = line.match(/Average G loss: ([\d.]+)/);
          const contentLossMatch = line.match(/Average content loss: ([\d.]+)/);
          const ganLossMatch = line.match(/Average GAN loss: ([\d.]+)/);
          const pixelLossMatch = line.match(/Average pixel loss: ([\d.]+)/);
          const psnrMatch = line.match(/Average PSNR: ([\d.]+)/);
          const ssimMatch = line.match(/Average SSIM: ([\d.]+)/);

          if (
              epochMatch &&
              dLossMatch &&
              gLossMatch &&
              contentLossMatch &&
              ganLossMatch &&
              pixelLossMatch &&
              psnrMatch &&
              ssimMatch
          ) {
            const epoch = parseInt(epochMatch[1]);
            const dLoss = parseFloat(dLossMatch[1]);
            const gLoss = parseFloat(gLossMatch[1]);
            const contentLoss = parseFloat(contentLossMatch[1]);
            const ganLoss = parseFloat(ganLossMatch[1]);
            const pixelLoss = parseFloat(pixelLossMatch[1]);
            const psnr = parseFloat(psnrMatch[1]);
            const ssim = parseFloat(ssimMatch[1]);

            this.epochs.push(epoch);
            this.dLoss.push(dLoss);
            this.gLoss.push(gLoss);
            this.contentLoss.push(contentLoss);
            this.ganLoss.push(ganLoss);
            this.pixelLoss.push(pixelLoss);
            this.psnr.push(psnr);
            this.ssim.push(ssim);
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
              label: 'Average D Loss',
              data: this.dLoss,
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: 'Average G Loss',
              data: this.gLoss,
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            },
            {
              label: 'Average Content Loss',
              data: this.contentLoss,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'Average GAN Loss',
              data: this.ganLoss,
              borderColor: 'rgba(255, 206, 86, 1)',
              fill: false,
            },
            {
              label: 'Average Pixel Loss',
              data: this.pixelLoss,
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
            // {
            //   label: 'Average PSNR',
            //   data: this.psnr,
            //   borderColor: 'rgba(255, 159, 64, 1)',
            //   fill: false,
            // },
            {
              label: 'Average SSIM',
              data: this.ssim,
              borderColor: 'rgba(102, 204, 102, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Loss and Metrics Over Epochs',
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
                text: 'Value',
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