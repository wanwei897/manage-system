<template>
  <header><v-header /></header>
  <aside><v-sidebar /></aside>
  <main class="content-box" :class="{ 'content-collapse' : sidebar.collapse }">
    <v-tags />
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <keep-alive :include="tags.nameList">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useSidebarStore } from '../store/sidebar';
import vHeader from '../components/header.vue';
import vSidebar from '../components/sidebar.vue';
import vTags from '../components/tags.vue';
import { useTagsStore } from '../store/tags';

const sidebar = useSidebarStore();
const tags = useTagsStore();
</script>
