import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({ collapse: false }),
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse;
    }
  }
});
