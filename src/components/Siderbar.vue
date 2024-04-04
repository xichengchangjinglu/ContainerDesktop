<template>
  <div class="sidebar">
    <div class="sidebar-title-container">
      <img src="../assets/images/logo.png" />
      <p id="sidebar-title">桌面管理系统</p>
    </div>
    <!-- 侧边栏内容 -->
    <div class="sidebar-list-container">
      <ul>
        <ul>
          <li
            :class="{
              'router-active-first': currentRoutePath === '/ContainerManager',
              'router-inactive-first': currentRoutePath !== '/ContainerManager',
            }"
            @click="router.push('/ContainerManager');"
          >
            容器管理
          </li>
          <li
            :class="{
              'router-active-second': currentRoutePath === '/OperationsPanel',
              'router-inactive-second': currentRoutePath !== '/OperationsPanel',
            }"
            @click="router.push('/OperationsPanel');"
          >
            运维面板
          </li>
          <!-- <li
            :class="{
              'router-active-third': currentRoutePath === '/PersonalProfile',
              'router-inactive-third': currentRoutePath !== '/PersonalProfile',
            }"
            @click="router.push('/PersonalProfile');"
          >
            个人中心
          </li> -->
        </ul>
      </ul>
    </div>
    <div class="sidebar-exit-container">
      <img src="../assets/images/exit.png" />
      <p>退出登录</p>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "HarmonyOS_Sans_SC_Regular";
  src: url("../../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf")
    format("truetype");
}
/* Sidebar container */
.sidebar {
  position: fixed;
  top: 20px;
  bottom: 20px;
  left: 30px;
  width: 200px;
  background-color: #fff;
  border-radius: 20px;
}

.sidebar-title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.sidebar-title-container img {
  width: 30.96px;
  height: 32px;
}

#sidebar-title {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #000000;
  margin-left: 10px;
}

.sidebar-list-container {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 16px;
  margin-top: 40px;
}

.sidebar-list-container ul {
  list-style-type: none;
  margin-left: -20px;
}

.sidebar-list-container ul li {
  margin-bottom: 20px;
  padding-left: 40px;
  background-repeat: no-repeat;
  background-position: 0 50%;
  background-size: 20px 20px;
  cursor: pointer;
}

.router-inactive-first {
  background-image: url("../assets/images/icon.png");
  color: #718096;
}

.router-inactive-second {
  background-image: url("../assets/images/icon1.png");
  color: #718096;
}

.router-inactive-third {
  background-image: url("../assets/images/icon2.png");
  color: #718096;
}

.router-active-first {
  background-image: url("../assets/images/icon-active.png");
  color: #3f8cff;
}

.router-active-second {
  background-image: url("../assets/images/icon1-active.png");
  color: #3f8cff;
}

.router-active-third {
  background-image: url("../assets/images/icon2-active.png");
  color: #3f8cff;
}

.sidebar-exit-container {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transform: translateY(50%);
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 16px;
  color: #718096;
  cursor: pointer;
}

.sidebar-exit-container img {
  width: 24px;
  height: 24px;
}
.sidebar-exit-container p {
  margin-left: 10px;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const currentRoutePath = ref("");
const router = useRouter();

onMounted(() => {
  currentRoutePath.value = router.currentRoute.value.fullPath;
});
</script>
