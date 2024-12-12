<template>
  <div class="container">
    <el-card>
      <el-row>
        <el-col class="column1">
          <img src="@/assets/logo.svg" alt="图片正在加载中..." class="logo"/>
          <div class="content">
            <h2>Intelligent-RS——基于深度学习的遥感图像智能处理平台</h2>
            <p>
              本项目主要涉及遥感图像的分类、超分辨以及彩色化三个方面，旨在提高遥感图像的质量和可用性，为相关领域的研究和应用提供更有价值的图像数据。
            </p>
          </div>
        </el-col>

        <el-col class="column2">
          <el-dropdown trigger="hover">
            <el-button class="bt" type="primary" plain round>超分</el-button>
            <template v-slot:dropdown>
              <el-dropdown-menu class="custom-dropdown-menu">
                <el-dropdown-item @click="handleClick1('IPV_SRGAN')">
                  IPV_SRGAN
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick1('SRGAN')">
                  SRGAN
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick1('SRResNet')">
                  SRResNet
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick1('ESRGAN')">
                  ESRGAN
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown trigger="hover">
            <el-button class="bt" type="primary" plain round>彩色化</el-button>
            <template v-slot:dropdown>
              <el-dropdown-menu class="custom-dropdown-menu">
                <el-dropdown-item @click="handleClick2('Colorization1')">
                  Colorization1
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick2('Colorization2')">
                  Colorization2
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown trigger="hover">
            <el-button class="bt" type="primary" plain round>分类</el-button>
            <template v-slot:dropdown>
              <el-dropdown-menu class="custom-dropdown-menu">
                <el-dropdown-item @click="handleClick3('GoogleNet')">
                  GoogleNet
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick3('ResNeXt')">
                  ResNeXt
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick3('AlexNet')">
                  AlexNet
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick3('DenseNet')">
                  DenseNet
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick3('VGGNet')">
                  VGGNet
                </el-dropdown-item>
                <el-dropdown-item @click="handleClick3('SwinTransformer')">
                  Swin Transformer
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="10" class="mt-5" style="margin-top: 20px">
      <el-col :xs="24" :span="12">
        <el-card style="height: 30vw; width: 100%">
          <template #header>
            <div class="flex-x-between">
              <div class="flex-y-center" @click="triggerFileInput">
                点击上传文件
                <el-icon class="ml-1"><FolderAdd /></el-icon>
              </div>
            </div>
          </template>
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
              height: 100%;
              width: 100%;
              margin-top: 45px;
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
        </el-card>
      </el-col>

      <el-col :xs="24" :span="12">
        <el-card style="height: 30vw; width: 100%">
          <template #header>
            <div class="flex-x-between" style="display: flex;justify-content: space-between">
              <div class="flex-y-center">
                模型运行结果
                <el-icon class="ml-1"><Notification /></el-icon>
              </div>
              <div class="flex-y-center">选择的模型：{{ selectedModel }}</div>
            </div>
          </template>
          <el-scrollbar
              v-if="resultText && resultImage"
              style="
              height: 100%;
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
        </el-card>
      </el-col>
    </el-row>

  </div>
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
.container {
  position: relative;
  padding: 24px;
}

.column1 {
  display: flex;
  flex: 13;
  align-items: center;
}

.column1 .logo {
  width: 50px;
  height: 50px;
}

.column1 .content {
  margin-left: 10px;
}

.column1 .content h2 {
  font-size: 1.4vw;
  font-weight: bold;
}

.column1 .content p {
  font-size: 0.9vw;
  color: gray;
  margin-top: 7px;
}

.column2 {
  display: flex;
  margin-top: 30px;
  margin-right: 15px;
  flex: 2;
}

.column2 .bt {
  padding: 15px;
  margin-left: 4vw;
  font-size: 18px;
}

.custom-dropdown-menu {
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
}

/* 图片自适应框大小 */
.image-preview {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保持比例，填充容器 */
}
</style>