<!-- eslint-disable vue/attributes-order -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="wrapper">
    <img src="../../assets/images/bg.png" class="login-bg" />
    <div v-if="isLogin" class="login-wrapper">
      <p class="login-title">欢迎回来</p>
      <div class="login-input">
        <p>用户</p>
        <input type="text" v-model="loginFormData.username" />
        <p>密码</p>
        <input type="password" v-model="loginFormData.password" />
      </div>
      <div class="login-register" @click="toggleLoginStatus">注册</div>
      <button class="login-btn" @click="login">立即登录</button>
    </div>
    <div v-else class="login-wrapper-register">
      <div class="login-input">
        <p>用户</p>
        <input type="text" placeholder="6至20个字符之间，仅数字和字母" v-model="registerFormData.username"/>
        <p>密码</p>
        <input type="password" placeholder="8至20个字符之间，仅数字和字母" v-model="registerFormData.password"/>
        <p>确认密码</p>
        <input type="password" placeholder="" v-model="registerFormData.confirmPassword"/>
        <p>邮箱</p>
        <input type="text" placeholder="" v-model="registerFormData.mail"/>
      </div>
      <div class="login-register" @click="toggleLoginStatus">返回</div>
      <button class="login-btn" @click="checkRegistration">立即注册</button>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "HarmonyOS_Sans_SC_Regular";
  src: url("../../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf")
    format("truetype");
}

@font-face {
  font-family: "HarmonyOS_Sans_SC_Bold";
  src: url("../../assets/fonts/HarmonyOS_Sans_SC_Bold.ttf") format("truetype");
}

.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-bg {
  width: 65%;
  height: 100%;
}

.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin-left: 30%;
  margin-top: -5%;
}

.login-wrapper-register {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin-left: 30%;
  margin-top: -1%;
}

.login-title {
  font-family: "HarmonyOS_Sans_SC_Bold", sans-serif;
  color: #0a1629;
  font-size: 20px;
}

.login-register {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  color: #7d8592;
  width: 100%;
  margin-left: 240%;
  margin-top: 1vh;
}

.login-input {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  color: #7d8592;
  font-size: 15px;
  width: 180%;
}

.login-input input {
  border-style: solid;
  border-color: #d8e0f0;
  width: 100%;
  height: 5vh;
  border-radius: 10px;
  margin-top: -2vh;
}

.login-input input:focus {
  border-color: #3f8cff; /* 设置获取焦点时的边框颜色 */
  box-shadow: 0 0 5px rgba(63, 140, 255, 0.5); /* 设置获取焦点时的阴影效果 */
  outline: none;
}

.login-btn {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  color: #ffffff;
  background-color: #3f8cff;
  border-color: #3f8cff;
  border-style: solid;
  border-radius: 10px;
  width: 180%;
  height: 5vh;
  margin-top: 4vh;
}
</style>

<script setup>
import { ref, reactive } from "vue";
import { ElNotification } from 'element-plus'
// import { notification } from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

const isLogin = ref(true);

const loginFormData = reactive({
  username: "",
  password: "",
});

const registerFormData = reactive({
    username: "",
    password: "",
    confirmPassword: "",
    mail: ""
})

const loginErrorNoUserOrPasswd =  () => {
    ElNotification({
      title: '登录失败',
      message: '请输入用户名或密码',
      type: 'error',
    })
};

const toggleLoginStatus = () => {
  isLogin.value = !isLogin.value;
};

const login = () => {
    if(loginFormData.username==""||loginFormData.password==""){
        loginErrorNoUserOrPasswd();
    }
};

const registerErrorUsername =  () => {
    ElNotification({
      title: '注册失败',
      message: '用户名格式不正确！',
      type: 'error',
    })
};

const registerErrorPassword =  () => {
    ElNotification({
      title: '注册失败',
      message: '密码格式不正确！',
      type: 'error',
    })
};

const registerErrorConfirmPassword =  () => {
    ElNotification({
      title: '注册失败',
      message: '两次输入的密码不一致！',
      type: 'error',
    })
};

const registerErrorMail =  () => {
    ElNotification({
      title: '注册失败',
      message: '邮箱格式不正确！',
      type: 'error',
    })
};

const checkRegistration = () => {
    const usernameRegex = /^[a-zA-Z0-9]{6,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!usernameRegex.test(registerFormData.username)) {
        registerErrorUsername();
    }

    if (!passwordRegex.test(registerFormData.password)) {
        registerErrorPassword();
    }

    if (registerFormData.password !== registerFormData.confirmPassword) {
        registerErrorConfirmPassword();
    }

    if (!emailRegex.test(registerFormData.mail)) {
        registerErrorMail();
    }
};
</script>
