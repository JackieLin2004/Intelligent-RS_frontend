<template>
  <div class="container">
    <el-card>
      <el-row>
        <el-col class="column1">
          <img src="../assets/logo.jpg" alt="图片正在加载中..." class="logo"/>
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
                <el-dropdown-item>超分模型 1</el-dropdown-item>
                <el-dropdown-item>超分模型 2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown trigger="hover">
            <el-button class="bt" type="primary" plain round>彩色化</el-button>
            <template v-slot:dropdown>
              <el-dropdown-menu class="custom-dropdown-menu">
                <el-dropdown-item>彩色化模型 1</el-dropdown-item>
                <el-dropdown-item>彩色化模型 2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown trigger="hover">
            <el-button class="bt" type="primary" plain round>分类</el-button>
            <template v-slot:dropdown>
              <el-dropdown-menu class="custom-dropdown-menu">
                <el-dropdown-item>分类模型 1</el-dropdown-item>
                <el-dropdown-item>分类模型 2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">

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

</style>
