<template>
  <div class="sidebar">
    <el-menu 
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <!-- 一级菜单 -->
        <el-sub-menu v-if="item.subs" :index="item.index">
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <!-- 二级菜单 -->
            <el-sub-menu v-if="subItem.subs" :index="subItem.index">
              <template #title>{{ subItem.title }}</template>
              <!-- 三级菜单 -->
              <el-menu-item v-for="threeItem in subItem.subs" :index="threeItem.index">
                {{ threeItem.title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="subItem.index">{{ subItem.title }}</el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="item.index">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSidebarStore } from '../store/sidebar';

interface MenuItem {
  icon?: string,
  index: string,
  title: string,
  permiss: string,
  subs?: MenuItem[]
}

const route = useRoute();
const onRoutes = computed(() => route.path);

const sidebar = useSidebarStore();
const items: MenuItem[] = [
  {
    icon: 'Odometer',
    index: '/dashboard',
    title: '系统首页',
    permiss: '1'
  },
  {
    icon: 'Calendar',
    index: '1',
    title: '表格相关',
    permiss: '2',
    subs: [
      {
        index: '/table',
        title: '常用表格',
        permiss: '2',
      },
      {
        index: '/import',
        title: '导入Excel',
        permiss: '2',
      },
      {
        index: '/export',
        title: '导出Excel',
        permiss: '2',
      },
    ]
  },
  {
    icon: 'DocumentCopy',
    index: '/tabs',
    title: 'tab选项卡',
    permiss: '3',
  },
  {
    icon: 'Edit',
    index: '3',
    title: '表单相关',
    permiss: '4',
    subs: [
      {
        index: '/form',
        title: '基本表单',
        permiss: '5',
      },
      {
        index: '/upload',
        title: '文件上传',
        permiss: '6',
      },
      {
        index: '4',
        title: '编辑器',
        permiss: '7',
        subs: [
          {
            index: '/editor',
            title: '富文本编辑器',
            permiss: '8',
          },
          {
            index: '/markdown',
            title: 'markdown编辑器',
            permiss: '9',
          },
        ],
      },
    ],
  },
  {
    icon: 'Warning',
    index: '/permission',
    title: '权限管理',
    permiss: '13',
  },
];
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
