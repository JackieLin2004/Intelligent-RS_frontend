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
      lossG: [], // 存储生成器总损失
      lossGL1: [], // 存储生成器的 L1 损失
      lossGGAN: [], // 存储生成器的对抗损失
      lossD: [], // 存储判别器总损失
      lossDFake: [], // 存储判别器的假样本损失
      lossDReal: [], // 存储判别器的真实样本损失
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
      this.lossG = [];
      this.lossGL1 = [];
      this.lossGGAN = [];
      this.lossD = [];
      this.lossDFake = [];
      this.lossDReal = [];

      lines.forEach((line) => {
        if (line.includes('Epoch')) {
          const epochMatch = line.match(/Epoch (\d+)/);
          const lossDFakeMatch = line.match(/loss_D_fake: (\d+\.\d+)/);
          const lossDRealMatch = line.match(/loss_D_real: (\d+\.\d+)/);
          const lossDMatch = line.match(/loss_D: (\d+\.\d+)/);
          const lossGGANMatch = line.match(/loss_G_GAN: (\d+\.\d+)/);
          const lossGL1Match = line.match(/loss_G_L1: (\d+\.\d+)/);
          const lossGMatch = line.match(/loss_G: (\d+\.\d+)/);

          if (epochMatch && lossDFakeMatch && lossDRealMatch && lossDMatch && lossGGANMatch && lossGL1Match && lossGMatch) {
            const epoch = parseInt(epochMatch[1]);
            const lossDFake = parseFloat(lossDFakeMatch[1]);
            const lossDReal = parseFloat(lossDRealMatch[1]);
            const lossD = parseFloat(lossDMatch[1]);
            const lossGGAN = parseFloat(lossGGANMatch[1]);
            const lossGL1 = parseFloat(lossGL1Match[1]);
            const lossG = parseFloat(lossGMatch[1]);

            this.epochs.push(epoch);
            this.lossDFake.push(lossDFake);
            this.lossDReal.push(lossDReal);
            this.lossD.push(lossD);
            this.lossGGAN.push(lossGGAN);
            this.lossGL1.push(lossGL1);
            this.lossG.push(lossG);
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
              label: 'Generator Loss (G)',
              data: this.lossG,
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: 'Generator L1 Loss (G_L1)',
              data: this.lossGL1,
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            },
            {
              label: 'Generator GAN Loss (G_GAN)',
              data: this.lossGGAN,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'Discriminator Loss (D)',
              data: this.lossD,
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
            {
              label: 'Discriminator Fake Loss (D_fake)',
              data: this.lossDFake,
              borderColor: 'rgba(255, 159, 64, 1)',
              fill: false,
            },
            {
              label: 'Discriminator Real Loss (D_real)',
              data: this.lossDReal,
              borderColor: 'rgba(201, 203, 207, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Generator and Discriminator Losses',
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