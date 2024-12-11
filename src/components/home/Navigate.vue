<template>
  <div class="navbar-container">
    <!-- 导航栏左侧 -->
    <p>首页</p>
    <!-- 导航栏右侧 -->
    <!-- 用户头像 -->
    <div class="navbar">
      <el-dropdown class="nav-action-item" trigger="click">
        <div class="person">
          <FontAwesomeIcon :icon="faUser" style="margin-right: 5px;"/>
          <span>{{ username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userLogout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {ElDropdown, ElDropdownItem, ElDropdownMenu} from 'element-plus'
import router from "@/router/index.ts";
import {logout} from "@/net/index.js";

let isDarkTheme = false;
let isWatermarkEnabled = false;

const toggleTheme = () => {
  isDarkTheme = !isDarkTheme;
  if (isDarkTheme) {
    document.documentElement.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
  }
};

const toggleWatermark = () => {
  isWatermarkEnabled = !isWatermarkEnabled;
  if (isWatermarkEnabled) {
    const watermark = document.createElement('div');
    watermark.textContent = 'Intelligent-RS';
    watermark.style.position = 'fixed';
    watermark.style.bottom = '10px';
    watermark.style.right = '10px';
    watermark.style.color = 'rgba(0, 0, 0, 0.5)';
    watermark.setAttribute('data-watermark', '');
    document.body.appendChild(watermark);
  } else {
    const watermarkElement = document.querySelector('[data-watermark]');
    if (watermarkElement) {
      watermarkElement.remove();
    }
  }
};

const userLogout = () => {
  logout(() => router.push('/login'))
};

const username = ref<string>('');

const getUsernameFromStorage = (): string => {
  const authStr = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (authStr) {
    try {
      const authObj = JSON.parse(authStr);
      return authObj.username || '未知用户';
    } catch (e) {
      console.error('无法解析认证信息:', e);
      return '未知用户';
    }
  }
  return '未登录';
};

onMounted(() => {
  const storedUsername = getUsernameFromStorage();
  username.value = storedUsername !== '未登录' ? storedUsername : '';
});
</script>

<style scoped>
.navbar-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 10px;
  height: 50px;
}

.navbar-container p {
  font-size: 14px;
  color: #cccccc;
  flex: 16;
}

.navbar-container .navbar {
  display: flex;
  flex: 1;
}

.nav-action-item {
  cursor: pointer;
  margin: 0 1vw;
  flex: 2;
}

.nav-action-item .person {
  width: 100%;
  display: flex;
  align-content: center;
}

/* 暗黑主题样式 */
.dark-theme {
  background-color: #333;
  color: #fff;
}
</style>
