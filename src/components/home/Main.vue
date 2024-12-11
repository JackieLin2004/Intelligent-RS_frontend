<template>
  <div class="container">
    <el-row :gutter="10" class="mt-5">
      <el-col :xs="24" :span="12">
        <el-card style="height: 21vw; width: 100%">
          <template #header>
            <div class="flex-x-between">
              <div class="flex-y-center">
                点击上传文件
                <el-icon class="ml-1"><FolderAdd /></el-icon>
              </div>
            </div>
          </template>
          <el-scrollbar>
            <img
              src="../assets/model.png"
              style="height: 15vw; display: flex; margin: 0 auto;"
              alt="..."
            />
          </el-scrollbar>
        </el-card>
      </el-col>

      <el-col :xs="24" :span="12">
        <el-card style="height: 21vw; width: 100%">
          <template #header>
            <div class="flex-x-between">
              <div class="flex-y-center">
                模型运行结果
                <el-icon class="ml-1"><Notification /></el-icon>
              </div>
            </div>
          </template>
          <el-scrollbar>
            <img
              src="../assets/consequence.png"
              style="height: 15vw; display: flex; margin: 0 auto;"
              alt="..."
            />
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { FolderAdd, Notification } from "@element-plus/icons-vue";
</script>

<style scoped>
.container {
  position: relative;
  padding: 24px;
}
</style>
