<template>
  <div class="container">
    <!-- 查询 -->
    <div class="handle-box">
      <el-select v-model="query.address" placeholder="地址" class="handle-select">
        <el-option v-for="item in addressData" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-input v-model="query.name" placeholder="用户名" class="handle-input" />
      <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" :icon="Plus">新增</el-button>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column label="账户余额">
        <template #default="scope">￥{{ scope.row.money }}</template>
      </el-table-column>
      <el-table-column label="头像(查看大图)" align="center">
        <template #default="scope">
          <el-image 
            class="table-td-thumb"
            :src="scope.row.thumb"
            :z-index="10"
            :preview-src-list="[scope.row.thumb]"
            preview-teleported
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="状态" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.state === '成功' 
            ? 'success' 
            : scope.row.state === '失败' ? 'danger' : ''"
          >{{ scope.row.state }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="注册时间"></el-table-column>
      <el-table-column label="操作" width="220" align="center">
        <template #default="scope">
          <el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
            编辑
          </el-button>
          <el-button text :icon="Delete" style="color: #F56C6C;" @click="handleDelete(scope.$index)" v-permiss="16">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        v-model:current-page="query.pageIndex"
        :page-count="query.pageCount"
        @current-change="handlePageChange"
        :total="itemTotal"
      ></el-pagination>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editFormData.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

interface TableItem {
  id: number,
  name: string,
  money: number,
  state: string,
  date: string,
  address: string,
  thumb?: string
}

// 查询
const query = reactive({
  address: '',
  name: '',
  pageIndex: 1,
  pageCount: 10,
});
// 执行查询
function handleSearch() {
  query.pageIndex = 1;
  getTableData();
};
const addressData = [
  { name: '广东省', value: 1 },
  { name: '湖南省', value: 2 },
  { name: '湖北省', value: 3 }
];


// 表格
const tableData = ref<TableItem[]>([
  {
    "id": 1,
    "name": "张三",
    "money": 123,
    "address": "广东省东莞市长安镇",
    "state": "成功",
    "date": "2019-11-1",
    "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
  },
  {
    "id": 2,
    "name": "李四",
    "money": 456,
    "address": "广东省广州市白云区",
    "state": "成功",
    "date": "2019-10-11",
    "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
  },
  {
    "id": 3,
    "name": "王五",
    "money": 789,
    "address": "湖南省长沙市",
    "state": "失败",
    "date": "2019-11-11",
    "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
  },
  {
    "id": 4,
    "name": "赵六",
    "money": 1011,
    "address": "福建省厦门市鼓浪屿",
    "state": "成功",
    "date": "2019-10-20",
    "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
  }
]);
function getTableData() {
};
// 编辑和删除表格项
function handleEdit(index: number, row: any) {
  editIndex = index;
  editFormData.name = row.name;
  editFormData.address = row.address;
  editVisible.value = true;
};
function handleDelete(index: number) {
  ElMessageBox.confirm('确定要删除吗？', '提示', { type: 'warning' })
    .then(() => {
      tableData.value.splice(index, 1);
      ElMessage.success('删除成功');
    })
    .catch(() => {})
};


// 分页
const itemTotal = ref(100); // 总条目数
function handlePageChange() {
  getTableData();
};


// 编辑弹出框
const editVisible = ref(false);
const editFormData = reactive({
  name: '',
  address: ''
});
let editIndex: number = -1; // 当前编辑的表格项索引
function saveEdit() {
  editVisible.value = false;
  tableData.value[editIndex].name = editFormData.name;
	tableData.value[editIndex].address = editFormData.address;
};
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}
.handle-select {
	width: 120px;
  margin-right: 10px;
}
.handle-input {
	width: 300px;
  margin-right: 10px;
}

.table {
	width: 100%;
	font-size: 14px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
