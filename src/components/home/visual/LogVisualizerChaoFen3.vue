<template>
  <div class="chart-wrapper">
    <h2>{{ logFileName }}</h2>
    <div v-if="showCharts" class="chart-area">
      <canvas :id="`psnrChart-${uniqueId}`" class="chart"></canvas>
      <canvas :id="`pixelChart-${uniqueId}`" class="chart"></canvas>
    </div>
    <div v-else>
      <p>No data available. Please check the log file path.</p>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      logFilePath: 'ESRGAN.logs', // 日志文件路径
      showCharts: false, // 是否显示图表
      uniqueId: Math.random().toString(36).substr(2, 9), // 唯一ID用于区分图表
      logData: [], // 日志数据
      psnrData: [], // PSNR 数据
      pixelData: [], // G Pixel 数据
    };
  },
  computed: {
    // 计算属性：提取文件名（去掉.log后缀）
    logFileName() {
      return this.logFilePath.replace(/^\/logs\//, '').replace(/\.log$/, '');
    },
  },
  mounted() {
    this.loadLogFile(); // 加载日志文件
  },
  methods: {
    // 加载日志文件
    async loadLogFile() {
      try {
        const response = await fetch(this.logFilePath); // 使用 fetch 读取文件
        if (!response.ok) {
          throw new Error('Failed to load logs file');
        }
        const content = await response.text(); // 获取文件内容
        this.parseLogFile(content); // 解析文件内容
      } catch (error) {
        console.error('Error loading logs file:', error);
        this.showCharts = false; // 如果加载失败，不显示图表
      }
    },
    // 解析日志文件内容
    parseLogFile(content) {
      const lines = content.split('\n');
      this.logData = lines
          .map((line) => {
            const match = line.match(/Epoch (\d+)\/\d+\s+\[Batch (\d+)\/\d+\]\s+\[G pixel: ([\d.]+)\].*Average PSNR: ([\d.]+)/);
            if (match) {
              return {
                epoch: parseInt(match[1]),
                batch: parseInt(match[2]),
                gPixel: parseFloat(match[3]),
                psnr: parseFloat(match[4]),
              };
            }
            return null;
          })
          .filter((entry) => entry !== null); // 过滤掉无效数据

      // 解析数据
      this.parseLogData();
    },
    // 解析日志数据
    parseLogData() {
      this.psnrData = this.logData.map(entry => ({
        x: entry.epoch + entry.batch / 39,
        y: entry.psnr,
      }));
      this.pixelData = this.logData.map(entry => ({
        x: entry.epoch + entry.batch / 39,
        y: entry.gPixel,
      }));

      // 显示图表
      this.showCharts = true;
      this.$nextTick(() => {
        this.renderPSNRChart();
        this.renderPixelChart();
      });
    },
    // 渲染 PSNR 图表
    renderPSNRChart() {
      const ctx = document.getElementById(`psnrChart-${this.uniqueId}`).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.psnrData.map(entry => entry.x),
          datasets: [
            {
              label: 'Average PSNR',
              backgroundColor: '#f87979',
              borderColor: '#f87979',
              data: this.psnrData,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              title: {
                display: true,
                text: 'Epoch + Batch',
              },
            },
            y: {
              title: {
                display: true,
                text: 'PSNR',
              },
            },
          },
        },
      });
    },
    // 渲染 G Pixel 图表
    renderPixelChart() {
      const ctx = document.getElementById(`pixelChart-${this.uniqueId}`).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.pixelData.map(entry => entry.x),
          datasets: [
            {
              label: 'G Pixel',
              backgroundColor: '#79f879',
              borderColor: '#79f879',
              data: this.pixelData,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              title: {
                display: true,
                text: 'Epoch + Batch',
              },
            },
            y: {
              title: {
                display: true,
                text: 'G Pixel',
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
  text-align: center;
  margin: 20px auto;
  max-width: 800px;
}

.chart-area {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chart {
  width: 100%;
  height: 300px;
}
</style>