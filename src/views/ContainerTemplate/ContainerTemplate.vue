<template>
  <siderbar></siderbar>
  <user-header></user-header>
  <div class="content-container">
    <template-item v-for="item in templateList" :key="item" :templateInfo="item"></template-item>
  </div>
</template>

<style scoped>
@font-face {
    font-family: 'HarmonyOS_Sans_SC_Regular';
    src: url('../..//assets/fonts/HarmonyOS_Sans_SC_Regular.ttf') format('truetype');
}

.content-container{
  position: fixed;
  top: 90px;
  left: 250px;
  width: calc(100vw - 290px);
  bottom: 20px;
  overflow: auto;
  display: flex;
}
</style>

<script setup>
import { ref } from 'vue'

const templateList = ref([
  {
    imageUrl: "../../../assets/images/template.png",
    description: "银河麒麟建设自主的开源供应链，发起中国首个开源桌面操作系统根社区openKylin，银河麒麟操作系统以openKylin等自主根社区为依托，发布最新版本"
  }
])
</script>