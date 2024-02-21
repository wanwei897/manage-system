<template>
  <div class="container">
    <div class="plugins-tips">通过 v-permiss 自定义指令实现权限管理，使用非 admin 账号登录，可查看效果。</div>
    <div class="mgb20">
			<span class="label">角色：</span>
			<el-select v-model="role" @change="handleChange">
				<el-option label="超级管理员" value="admin"></el-option>
				<el-option label="普通用户" value="user"></el-option>
			</el-select>
		</div>
    <div class="mgb20 tree-wrapper">
      <el-tree
        ref="treeRef"
        :data="data"
        node-key="id" 
        default-expand-all
        show-checkbox
        :default-checked-keys="checkedKeys"
      >
      </el-tree>
      <el-button type="primary" @click="onSubmit">保存权限</el-button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { usePermissStore } from '../store/permiss';

interface Tree {
  id: string,
  label: string,
  children?: Tree[]
}

const role = ref<string>('admin');
function handleChange() {
  treeRef.value!.setCheckedKeys(permiss.defaultList[role.value]);
};

const data: Tree[] = [
	{
		id: '1',
		label: '系统首页'
	},
	{
		id: '2',
		label: '基础表格',
		children: [
			{
				id: '15',
				label: '编辑'
			},
			{
				id: '16',
				label: '删除'
			}
		]
	},
	{
		id: '3',
		label: 'tab选项卡'
	},
	{
		id: '4',
		label: '表单相关',
		children: [
			{
				id: '5',
				label: '基本表单'
			},
			{
				id: '6',
				label: '文件上传'
			},
			{
				id: '7',
				label: '三级菜单',
				children: [
					{
						id: '8',
						label: '富文本编辑器'
					},
					{
						id: '9',
						label: 'markdown编辑器'
					}
				]
			}
		]
	},
	{
		id: '13',
		label: '权限管理'
	}
];

// 获取当前权限
const checkedKeys = ref<string[]>([]);
const permiss = usePermissStore();
function getPremission() {
  checkedKeys.value = permiss.defaultList[role.value];
};
getPremission();

// 保存权限
const treeRef = ref();
function onSubmit() {
  // 获取选中的权限
	console.log(treeRef.value!.getCheckedKeys(false));
};
</script>

<style scoped>
.tree-wrapper {
	max-width: 500px;
}
.label {
	font-size: 14px;
}
.el-select{
  width: 200px;
}
</style>
