<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
			<el-icon v-if="1"><Expand /></el-icon>
			<el-icon v-else><Fold /></el-icon>
		</div>
    <div class="logo">后台管理系统</div>
    <div class="header-user-con">
      <!-- 消息中心 -->
      <div class="btn-bell">
        <el-tooltip effect="dark" :content="message ? `有${message}条未读消息` : `消息中心`" placement="bottom">
          <el-icon><Bell /></el-icon>
        </el-tooltip>
        <span class="btn-bell-badge" v-if="message"></span>
      </div>
      <!-- 用户头像 -->
      <el-avatar class="user-avator" :size="30" :src="imgurl"></el-avatar>
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <a href="" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import imgurl from '../assets/img/avatar.jpg';
import router from '../router';
import { useSidebarStore } from '../store/sidebar';

const username: string | null = localStorage.getItem('ms_username');
const message = ref<number>(2);

// 侧边栏折叠
const sidebar = useSidebarStore();
function collapseChage() {
  sidebar.handleCollapse();
};

// 用户名下拉菜单选择事件
function handleCommand(command: string) {
  if(command === 'logout') {
    localStorage.removeItem('ms_username');
    router.push('/login');
  }
  else if(command === 'user') {
    router.push('/user');
  }
}
</script>

<style scoped>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 70px;
	font-size: 22px;
	color: #fff;
}
.collapse-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	float: left;
	padding: 0 21px;
	cursor: pointer;
}
.header .logo {
	float: left;
	width: 250px;
	line-height: 70px;
}

.header-user-con {
  float: right;
  margin-right: 50px;
	display: flex;
	height: 70px;
	align-items: center;
}
.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.btn-bell-badge {
	position: absolute;
	right: 4px;
	top: 0px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}

.user-name {
	margin-left: 10px;
}
.user-avator {
	margin-left: 20px;
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.el-dropdown-link i{
  margin-left: 5px;
}
.el-dropdown-menu__item {
	text-align: center;
}
</style>
