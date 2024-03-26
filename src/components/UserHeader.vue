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
      <div class="username-bg">
        <p>admin</p>
      </div>
    </div>
  </div>
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
}
</style>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>