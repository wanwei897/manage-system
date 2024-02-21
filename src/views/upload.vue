<template>
  <div class="container">
    <div class="content-title">支持拖拽</div>
    <div class="plugins-tips">
      Element Plus自带上传组件。访问地址：
      <a href="https://element-plus.org/zh-CN/component/upload.html" target="_blank">Element Plus Upload</a>
    </div>
    <el-upload
      class="upload-demo"
      drag
      action="#"
      multiple
      :limit="3"
      :auto-upload="false"
      accept=".jpg, .png, .txt"
      :on-change="handleChange"
      :before-remove="handleBeforeRemove"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或&nbsp;<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">（只能上传 jpg / png / txt 文件）</div>
      </template>
    </el-upload>

    <div class="content-title">支持裁剪图片</div>
    <div class="plugins-tips">
      vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。 访问地址：
      <a href="https://github.com/Agontuk/vue-cropperjs" target="_blank">vue-cropperjs</a>。 示例请查看
      <router-link to="/user">个人中心</router-link>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
]);

// 文件状态改变
function handleChange(file: any, _fileList: any) {
  console.log(file, _fileList, fileList);
}
// 移除文件之前
function handleBeforeRemove(file: any) {
  return ElMessageBox.confirm(`确定移除 ${file.name}？`);
};
// 移除文件
function handleRemove(file: any, _fileList: any) {
  console.log(file, _fileList, fileList);
};
// 文件超出个数限制
function handleExceed(files: any, _fileList: any) {
  ElMessage(
    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
      files.length + _fileList.length
    } 个文件`
  )
};
</script>

<style>
.content-title {
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
.upload-demo {
  width: 360px;
}
</style>
