<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div>
    <div class="content-search-container">
      <!-- 页面内容 -->
      <div class="search">
        <img src="../assets/images/search.png">
        <input type="text" placeholder="搜索">
      </div>
    </div>
    <div class="content-user-container">
      <div class="download-bg" @click="router.push('/ContainerTemplate');">
        <img src="../assets/images/download.png">
      </div>
      <div class="username-bg" @click="centerDialogVisible = true">
        <p>{{tokenStore.username}}</p>
      </div>
    </div>
  </div>
  <el-dialog v-model="centerDialogVisible" title="密码更改" width="25%" top="30vh" center>
    <div class="input-wrapper">
      <div class="input-item-wrapper">
        <p>修改密码</p>
        <input type="password">
      </div>
      <div class="input-item-wrapper">
        <p>确认密码</p>
        <input type="password">
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
@font-face {
    font-family: 'HarmonyOS_Sans_SC_Regular';
    src: url('../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf') format('truetype');
}
/* 内容容器 */
.content-search-container {
  margin-left: 250px; 
}

.search {
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  font-size: 16px;
  color: #7D8592;
  width: 412px;
  height: 48px;
  background-color: #FFFFFF;
  position: fixed; 
  top: 20px;
  border-radius: 15px;
}

.search img{
  width: 20px;
  height: 20px;
}

.search input{
  border: none;
  outline: none;
  margin-left: 10px;
}

.content-user-container{
  position: fixed; 
  top: 20px;
  right: 40px;
  display: flex;
}

.download-bg{
  width: 48px;
  height: 48px;
  background-color: #FFFFFF;
  border-radius: 10px;
}

.download-bg img{
  width: 40px;
  height: 40px;
  margin-left: 3px;
  margin-top: 3px;
  cursor: pointer;
}

.username-bg{
  width: 194px;
  height: 48px;
  background-color: #FFFFFF;
  border-radius: 10px;
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  font-size: 16px;
  color: #0A1629;
  font-weight: 600;
  margin-left: 20px;
  text-align: center;
}

.username-bg p{
  transform: translateY(-10%);
  cursor: pointer;
}

.input-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -20px;
  margin-bottom: -20px;
}

.input-item-wrapper{
  display: flex;
  align-items: center;
  margin-bottom: -10px;
}

.input-item-wrapper p{
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  font-size: 14px;
  color: #0A1629;
  margin-right: 20px;
}

.input-item-wrapper input{
  border-style: solid;
  border-color: #7D8592;
  border-radius: 10px;
}
</style>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue"
import { useTokenStore } from '../stores/useTokenStore.js'

const router = useRouter();
const tokenStore = useTokenStore();
const centerDialogVisible = ref(false)
</script>