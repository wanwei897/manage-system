<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="formRef" :rules="rules" label-width="80px" :model="formData">
        <el-form-item label="表单名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="选择器" prop="region">
          <el-select v-model="formData.region" placeholder="请选择">
              <el-option label="北京" value="北京"></el-option>
              <el-option label="上海" value="上海"></el-option>
              <el-option label="广州" value="广州"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期时间">
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="formData.date" style="width: 100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="time">
              <el-time-picker placeholder="选择时间" v-model="formData.time" style="width: 100%">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="城市级联" prop="options">
          <el-cascader :options="options" v-model="formData.options"></el-cascader>
        </el-form-item>
        <el-form-item label="选择开关" prop="delivery">
          <el-switch v-model="formData.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="多选框" prop="type">
          <el-checkbox-group v-model="formData.checkbox">
            <el-checkbox label="小明" name="type"></el-checkbox>
            <el-checkbox label="小红" name="type"></el-checkbox>
            <el-checkbox label="小白" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="单选框" prop="radio">
          <el-radio-group v-model="formData.radio">
            <el-radio label="小明"></el-radio>
            <el-radio label="小红"></el-radio>
            <el-radio label="小白"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文本框" prop="textArea">
          <el-input type="textarea" rows="5" v-model="formData.textArea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)">表单提交</el-button>
          <el-button @click="onReset(formRef)">重置表单</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

const options = [
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          {
            value: 'tianhe',
            label: '天河区',
          },
          {
            value: 'haizhu',
            label: '海珠区',
          },
        ],
      },
      {
        value: 'dongguan',
        label: '东莞市',
        children: [
          {
            value: 'changan',
            label: '长安镇',
          },
          {
            value: 'humen',
            label: '虎门镇',
          },
        ],
      },
    ],
  },
  {
    value: 'hunan',
    label: '湖南省',
    children: [
      {
        value: 'changsha',
        label: '长沙市',
        children: [
          {
            value: 'yuelu',
            label: '岳麓区',
          },
        ],
      },
    ],
  },
];
const formData = reactive({
  name: '',
  region: '',
  date: '',
  time: '',
  options: [],
  delivery: true,
  checkbox: ['小明'],
  radio: '小红',
  textArea: '',
});
const formRef = ref<FormInstance>();
const rules: FormRules = {
  name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};

// 提交
function onSubmit(formEl: FormInstance | undefined) {
  // 表单校验
  if(!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log(formData);
      ElMessage.success('提交成功！');
    } else {
      return false;
    }
  });
};
// 重置
function onReset(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
