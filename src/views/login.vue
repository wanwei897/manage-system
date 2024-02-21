<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="ruleFormRef" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名">
            <template #prepend>
							<el-button :icon="User"></el-button>
						</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="param.password" placeholder="密码" type="password" @keyup.enter="submitForm(ruleFormRef)">
            <template #prepend>
							<el-button :icon="Lock"></el-button>
						</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
// import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { usePermissStore } from '../store/permiss';
import router from '../router';

interface LoginInfo {
  username: string;
  password: string;
}

// const router = useRouter();
const param = reactive<LoginInfo>({
  username: 'admin',
  password: '123456'
});

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 8, message: 'Length should be 3 to 8', trigger: 'blur' },
  ]
};

const permiss = usePermissStore();
const ruleFormRef = ref<FormInstance>();
function submitForm(formEl: FormInstance | undefined) {
  if(!formEl) return;
  formEl.validate((valid) => {
    if(valid) {
      ElMessage.success('登录成功');
      // 登录成功后设置权限
      localStorage.setItem('ms_username', param.username);
      const keys = permiss.defaultList[param.username === 'admin' ? 'admin' : 'user'];
      permiss.handleSet(keys);
      localStorage.setItem('ms_keys', JSON.stringify(keys));
      router.push('/');
    }
    else {
      ElMessage.error('登录失败');
    }
  });
};
</script>

<style>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/login-bg.jpg);
	background-size: 100%;
}
.ms-title {
	width: 100%;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	border-bottom: 1px solid #ddd;
}
.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 350px;
	margin: -190px 0 0 -175px;
	border-radius: 5px;
	background: rgba(255, 255, 255, 0.3);
	overflow: hidden;
}
.ms-content {
	padding: 30px 30px;
}
.login-btn {
	width: 100%;
	height: 36px;
}
.login-tips {
	font-size: 12px;
	line-height: 20px;
	color: #8a5e5e;
}
</style>
