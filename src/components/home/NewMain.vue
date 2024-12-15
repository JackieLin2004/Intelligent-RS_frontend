<template>
  <!-- 上半部分：按钮部分 -->
  <dv-border-box-1 class="border-box">
    <el-row :gutter="20" class="column2" style="padding: 20px">
      <!-- 第一列：超分模块 -->
      <el-col :span="8">
        <div class="module-header">超分</div>
        <!-- 第一行：两个按钮 -->
        <el-row :gutter="10" class="button-row">
          <el-col :span="12">
            <dv-button @click="handleClick1('IPV_SRGAN')" border="Border5" color="#e18a3b">IPV_SRGAN</dv-button>
          </el-col>
          <el-col :span="12">
            <dv-button @click="handleClick1('SRGAN')" border="Border5" color="#e18a3b">SRGAN</dv-button>
          </el-col>
        </el-row>
        <!-- 第二行：两个按钮 -->
        <el-row :gutter="10" class="button-row">
          <el-col :span="12">
            <dv-button @click="handleClick1('SRResNet')" border="Border5" color="#e18a3b">SRResNet</dv-button>
          </el-col>
          <el-col :span="12">
            <dv-button @click="handleClick1('ESRGAN')" border="Border5" color="#e18a3b">ESRGAN</dv-button>
          </el-col>
        </el-row>
      </el-col>

      <!-- 第二列：彩色化模块 -->
      <el-col :span="8">
        <div class="module-header">彩色化</div>
        <!-- 第一行：一个按钮 -->
        <el-row :gutter="10" class="button-row">
          <el-col :span="24">
            <dv-button @click="handleClick2('Colorization1')" border="Border5" color="#e18a3b">Colorization1</dv-button>
          </el-col>
        </el-row>
        <!-- 第二行：一个按钮 -->
        <el-row :gutter="10" class="button-row">
          <el-col :span="24">
            <dv-button @click="handleClick2('Colorization2')" border="Border5" color="#e18a3b">Colorization2</dv-button>
          </el-col>
        </el-row>
      </el-col>

      <!-- 第三列：分类模块 -->
      <el-col :span="8">
        <div class="module-header">分类</div>
        <!-- 第一行：三个按钮 -->
        <el-row :gutter="10" class="button-row">
          <el-col :span="8">
            <dv-button @click="handleClick3('GoogleNet')" border="Border5" color="#e18a3b">GoogleNet</dv-button>
          </el-col>
          <el-col :span="8">
            <dv-button @click="handleClick3('ResNeXt')" border="Border5" color="#e18a3b">ResNeXt</dv-button>
          </el-col>
          <el-col :span="8">
            <dv-button @click="handleClick3('AlexNet')" border="Border5" color="#e18a3b">AlexNet</dv-button>
          </el-col>
        </el-row>
        <!-- 第二行：三个按钮 -->
        <el-row :gutter="10" class="button-row">
          <el-col :span="8">
            <dv-button @click="handleClick3('DenseNet')" border="Border5" color="#e18a3b">DenseNet</dv-button>
          </el-col>
          <el-col :span="8">
            <dv-button @click="handleClick3('VGGNet')" border="Border5" color="#e18a3b">VGGNet</dv-button>
          </el-col>
          <el-col :span="8">
            <dv-button @click="handleClick3('SwinTransformer')" border="Border5" color="#e18a3b">Swin Transformer</dv-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </dv-border-box-1>

  <!-- 下半部分：上传文件和显示结果 -->
  <el-row :gutter="10" class="mt-5" style="margin-top: 20px">
    <!-- 左侧：文件上传和图片展示 -->
    <el-col :xs="24" :span="12">
      <dv-border-box-8 class="border-box2">
        <div class="card-header">
          <div class="flex-y-center" @click="triggerFileInput">
            点击上传文件
            <el-icon class="ml-1"><FolderAdd /></el-icon>
          </div>
        </div>
        <!-- 隐藏的文件选择框 -->
        <input
            ref="fileInput"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onFileChange"
        />
        <!-- 图片展示部分 -->
        <el-scrollbar
            v-if="imageSrc"
            style="
            height: calc(100% - 45px);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <el-image
              :src="imageSrc"
              class="image-preview"
              alt="Selected Image"
              :preview-src-list="[imageSrc]"
              :initial-index="0"
              fit="contain"
          />
        </el-scrollbar>
      </dv-border-box-8>
    </el-col>

    <!-- 右侧：模型运行结果 -->
    <el-col :xs="24" :span="12">
      <dv-border-box-8 class="border-box2">
        <div class="card-header">
          <div class="flex-x-between">
            <div class="flex-y-center">
              模型运行结果
              <el-icon class="ml-1"><Notification /></el-icon>
            </div>
            <div class="flex-y-center">选择的模型：{{ selectedModel }}</div>
          </div>
        </div>
        <el-scrollbar
            v-if="resultText && resultImage"
            style="
            height: calc(100% - 45px);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <div style="text-align: center">
            <el-image
                :src="resultImage"
                alt="Result Image"
                :preview-src-list="[resultImage]"
                :initial-index="0"
                fit="contain"
                style="max-width: 80%; max-height: 450px"
            />
          </div>
        </el-scrollbar>
      </dv-border-box-8>
    </el-col>
  </el-row>
  <el-row justify="end" style="margin-top: 20px">
    <!-- 将按钮放在一行最右边 -->
    <el-col :span="24">
      <dv-button
          @click="handleViewMetrics"
          border="Border5"
          color="#e18a3b"
          style="width: 200px; text-align: center; display: flex; justify-content: center"
      >
        查看模型指标
      </dv-button>
    </el-col>
  </el-row>
</template>


<script>
import { FolderAdd, Notification } from "@element-plus/icons-vue";
import {
  ElIcon,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElButton,
  ElImage,
} from "element-plus";
import axios from "axios";
import * as echarts from "echarts";

export default {
  components: {
    ElIcon,
    FolderAdd,
    Notification,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElButton,
    ElImage,
  },
  data() {
    return {
      imageSrc: null, // 存储选中的图片源
      selectedFile: null, // 存储上传的文件
      resultText: "",
      resultImage: "",
      selectedModel: "",
    };
  },
  methods: {
    handleViewMetrics() {
      // 点击按钮后跳转到其他页面
      this.$router.push({ path: '/visual' }); // 替换为你要跳转的路径
    },
    // 触发文件上传框
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    // 处理文件选择
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        // 如果是图像文件
        this.imageSrc = URL.createObjectURL(file); // 生成图片的 URL
        this.selectedFile = file; // 存储文件以备上传
      } else {
        this.$message.error("请选择一张有效的图片文件");
      }
    },
    // 上传选中的图片
    async uploadImage(selectedModel, type) {
      if (this.selectedFile) {
        const formData = new FormData();
        let t_name = "";
        formData.append("file", this.selectedFile);

        try {
          // 清除旧图片
          this.resultImage = "";

          // 延迟0.5秒以显示清除效果
          setTimeout(async () => {
            // 上传图片并接收后端返回的结果
            if (type == "1") {
              t_name = "chaofen";
            } else if (type == "2") {
              // 使用括号包裹条件判断
              t_name = "color";
            } else {
              t_name = "fenlei";
            }

            const response = await axios.post(
                `http://127.0.0.1:5000/${t_name}_${selectedModel}`, // 传递 selectedModel
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
            );

            // 从后端响应中获取返回的文本和图像路径
            const {result_text, result_image} = response.data;

            // 更新界面上的文本
            this.resultText = result_text;

            // 图像获取功能部分
            const imageResponse = await axios.get(
                `http://127.0.0.1:5000/${result_image}`,
                {
                  responseType: "blob", // 确保接收的是二进制数据
                }
            );
            const imageBlob = new Blob([imageResponse.data], {
              type: "image/jpeg",
            }); // 根据图片类型调整 MIME
            this.resultImage = URL.createObjectURL(imageBlob); // 创建 Blob URL

            // 提示上传和预测成功
            this.$message.success("图片上传并预测成功");
          }, 50); // 延迟0.5秒
        } catch (error) {
          this.$message.error("图片上传失败");
          console.error(error);
        }
      } else {
        this.$message.warning("请先选择图片");
      }
    },
    handleClick1(model) {
      this.selectedModel = model;
      if (this.selectedFile) {
        this.uploadImage(model, 1); // 传递 model 参数
      } else {
        this.$message.error("请先选择图片");
      }
    },
    handleClick2(model) {
      this.selectedModel = model;
      if (this.selectedFile) {
        this.uploadImage(model, 2); // 传递 model 参数
      } else {
        this.$message.error("请先选择图片");
      }
    },
    // 选择 ” 分类 “ 模型后上传图片
    handleClick3(model) {
      this.selectedModel = model;
      if (this.selectedFile) {
        this.uploadImage(model, 3); // 传递 model 参数
      } else {
        this.$message.error("请先选择图片");
      }
    },
  },
};
</script>

<style scoped>


.column2 {
  display: flex;
  justify-content: space-between;
}

.el-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.module-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  border: 2px solid #1625c8;
  color: white;
  padding: 10px;
  background-color: rgba(22, 112, 185, 0.3);
  border-radius: 5px;
  text-align: center;
}

.button-row {
  width: 100%;
}

.dv-button {
  margin: 5px 0;
  width: 100%;
  text-align: center;
}

.mt-5 {
  margin-top: 20px;
}

.border-box2 {
  height:25vw; /* 设置框框的高度为视口宽度的30% */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  justify-content: space-between;
  align-items: center;
}

.flex-y-center {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #e3e4f9;
}

.flex-x-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-preview {
  max-width: 100%;
  max-height: 100%;
}
</style>