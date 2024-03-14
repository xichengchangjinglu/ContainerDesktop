<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="sidebar">
    <div class="sidebar-title-container">
      <img src="../../assets/images/logo.png">
      <p id="sidebar-title">桌面管理系统</p>
    </div>
    <!-- 侧边栏内容 -->
    <div class="sidebar-list-container">
      <ul>
        <li>容器管理</li>
        <li>运维面板</li>
        <li>个人中心</li>
      </ul>
    </div>
    <div class="sidebar-exit-container">
      <img src="../../assets/images/exit.png">
      <p>退出登录</p>
    </div>
  </div>
  <div class="content-search-container">
    <!-- 页面内容 -->
    <div class="search">
      <img src="../../assets/images/search.png">
      <input type="text" placeholder="搜索">
    </div>
  </div>
  <div class="content-user-container">
    <div class="download-bg">
      <img src="../../assets/images/download.png">
    </div>
    <div class="username-bg">
      <p>admin</p>
    </div>
  </div>
  <div class="content-main-container">
    <container-item></container-item>
    <container-item></container-item>
    <container-item></container-item>
    <container-item></container-item>
    <container-item></container-item>
    <container-item></container-item>
  </div>
</template>

<style scoped>
@font-face {
    font-family: 'HarmonyOS_Sans_SC_Regular';
    src: url('../../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf') format('truetype');
}
/* Sidebar container */
.sidebar {
  position: fixed; 
  top: 20px; 
  bottom: 20px; 
  left: 30px; 
  width: 200px; 
  background-color: #FFF; 
  border-radius: 20px;
}

.sidebar-title-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.sidebar-title-container img{
  width: 30.96px;
  height: 32px;
}

#sidebar-title{
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  margin-left: 10px;
}

.sidebar-list-container{
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  font-size: 16px;
  color: #718096;
  margin-top: 40px;
}

.sidebar-list-container ul {
    list-style-type: none;
    margin-left: -10px;
}

.sidebar-list-container ul li {
    margin-bottom: 20px;
    padding-left: 40px;
    background-repeat: no-repeat;
    background-position: 0 50%;
    background-size: 20px 20px;
}

.sidebar-list-container ul li:nth-of-type(1) {
    background-image: url('../../assets/images/icon.png');
}

.sidebar-list-container ul li:nth-of-type(2) {
    background-image: url('../../assets/images/icon1.png');
}

.sidebar-list-container ul li:nth-of-type(3) {
    background-image: url('../../assets/images/icon2.png');
}

.sidebar-exit-container{
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transform: translateY(50%);
  font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
  font-size: 16px;
  color: #718096;
}

.sidebar-exit-container img{
  width: 24px;
  height: 24px;
}
.sidebar-exit-container p{
  margin-left: 10px;
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
  margin-top: 3px
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

.content-main-container{
  margin-left: 250px;
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
}
</style>

<script setup>
// 可以在这里添加组件的逻辑
</script>