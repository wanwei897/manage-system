import { defineStore } from 'pinia';

interface TagsItem {
  name: string,
  path: string,
  title: string
}

export const useTagsStore = defineStore('tags', {
  state: () => ({ list: <TagsItem[]>[] }),
  getters: {
    show: state => state.list.length > 0,
    nameList: state => state.list.map(item => item.name)
  },
  actions: {
    delTagsItem(index: number) {
      this.list.splice(index, 1);
    },
    setTagsItem(data: TagsItem) {
      this.list.push(data);
    },
    clearTags() {
      this.list = []
    },
    closeTagsOther(data: TagsItem[]) {
      this.list = data;
    }
  }
});
