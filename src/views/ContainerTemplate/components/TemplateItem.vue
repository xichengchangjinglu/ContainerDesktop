<template>
  <div class="template-item">
    <img src="../../../assets/images/template.png">
    <div class="text-wrapper">
      <p>{{props.templateInfo.description}}</p>
    </div>
    <button @click="dialogVisible = true">创建</button>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="`容器创建设置——${props.templateInfo.osname}`"
    width="600px"
    top="30vh"
  >
    <div class="form-wrapper">
      <div class="input-item-wrapper">
        <div class="input-item">
          <p>系统密码</p>
          <input type="password" v-model="templatePassword.osPassword" placeholder="大于6位的任意组合">
        </div>
        <div class="input-item">
          <p>确认系统密码</p>
          <input type="password" v-model="templatePassword.confirmOsPassword">
        </div>        
      </div>
      <div class="input-item-wrapper">
        <div class="input-item">
          <p>桌面密码</p>
          <input type="password" v-model="templatePassword.vncPassword" placeholder="6到8位的数字字母">
        </div>
        <div class="input-item">
          <p>确认桌面密码</p>
          <input type="password" v-model="templatePassword.confirmVncPassword">
        </div>      
      </div>
      <div class="input-item-wrapper">
        <div class="input-item">
          <p>容器名称</p>
          <input type="text" v-model="templatePassword.hostname">
        </div>  
        <div class="input-item">
          <p>系统用途备注</p>
          <input type="text" v-model="templatePassword.description">
        </div>         
      </div>
    </div>
    <div class="template-btn-wrapper">
      <button @click="dialogVisible = false">取消</button>
      <button @click="createContainer()">创建</button>
    </div>
  </el-dialog>
</template>

<style scoped>
@font-face {
    font-family: 'HarmonyOS_Sans_SC_Regular';
    src: url('../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf') format('truetype');
}

.template-item{
  width: 300px;
  height: 400px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin-right: 20px;
}

.text-wrapper{
  text-align: justify;
  width: 80%;
}

.template-item img{
  width: 150px;
  height: 150px;
  margin-top: 20px;
}

.template-item p{
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  font-size: 16px;
  color: #718096;
  margin-top: 35px;
}

.template-item button{
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  font-size: 14px;
  color: #718096;
  margin-top: 10px;
  background-color: #ffffff;
  border-style: solid;
  border-color: #00baad;
  color: #00baad;
  width: 80px;
  height: 35px;
  border-radius: 10px;
}

.input-item-wrapper{
  display: flex;
}

.input-item{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.input-item p{
  margin-right: 10px;
}

.input-item input{
  border-style: solid;
  border-radius: 10px;
}

.template-btn-wrapper{
  margin-top: 10px;
  margin-left: 200px;
}

.template-btn-wrapper button:nth-child(1){
  background-color: #ffffff;
  border-style: solid;
  border-color: #0fc452;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  color: #0fc452;
  margin-right: 10px;
}

.template-btn-wrapper button:nth-child(2){
  background-color: #ffffff;
  border-style: solid;
  border-color: #5969c0;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  color: #5969c0;
}

.form-wrapper{
  margin-top: -20px;
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
}
</style>

<script setup>
import { ref, defineProps, reactive } from 'vue'
import { ElNotification } from "element-plus";
import { useNodeStore } from "../../../stores/useNodeStore.js";
import { useTokenStore } from "../../../stores/useTokenStore.js";
import axios from 'axios';

const props = defineProps(["templateInfo"]);
const dialogVisible = ref(false);
const templatePassword = reactive({
  osPassword:"",
  confirmOsPassword:"",
  vncPassword:"",
  confirmVncPassword:"",
  description:"",
  hostname:""
})
const nodeStore = useNodeStore();
const tokenStore = useTokenStore();

async function createContainer(){
  let osPasswordRegex = /^.{7,}$/;
  let vncPasswordRegex = /^[a-zA-Z0-9]{6,8}$/;
  if(!osPasswordRegex.test(templatePassword.osPassword)){
    ElNotification({
        title: "Error",
        message: "请检查系统密码格式",
        type: "error",
    });
    return;
  }
  if(!vncPasswordRegex.test(templatePassword.vncPassword)){
    ElNotification({
        title: "Error",
        message: "请检查桌面密码格式",
        type: "error",
    });
    return;
  }
  if(templatePassword.osPassword!=templatePassword.confirmOsPassword){
    ElNotification({
        title: "Error",
        message: "两次系统密码不一致",
        type: "error",
    });
    return;
  }
  if(templatePassword.vncPassword!=templatePassword.confirmVncPassword){
    ElNotification({
        title: "Error",
        message: "两次桌面密码不一致",
        type: "error",
    });
    return;
  }
  let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc`;
  let data = {
    ostemplate: props.templateInfo.ostemplate,
    userpasswd: templatePassword.osPassword,
    vncpasswd: templatePassword.vncPassword,
    description: templatePassword.description,
    hostname: templatePassword.hostname
  };
  let header = {
    headers: {
      CSRFPreventionToken: tokenStore.CSRFPreventionToken,
    },
  }
  let createContainerResponse = await axios.post(url,data,header);
  if(createContainerResponse.data.success == 0){
    ElNotification({
        title: "Error",
        message: "创建失败",
        type: "error",
    });
  }else{
    ElNotification({
        title: "Warning",
        message: "创建中请勿操作",
        type: "warning",
        duration: 15000,
    });
    setTimeout(function() {
      ElNotification({
          title: "Success",
          message: "创建成功",
          type: "success",
      });
      dialogVisible.value = false;
      // location.reload(true);
    }, 15000);
  }
}

</script>
