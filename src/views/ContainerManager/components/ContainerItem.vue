<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div class="container-name">
      <img src="../../../assets/images/ubuntu.png">
      <div class="container-name-info">
        <p class="image-name">KylinOS</p>
        <p class="image-id">3abf3s324</p>
      </div>
      <div class="toggle" :class="{ 'active': isActive }" @click="toggleSwitch">
        <div class="handle" />
      </div>
    </div>
    <div class="container-description">
      <div class="firstline">
        <p>创建于：2023-2-23</p>
        <p>状态：运行中</p>
        <p>剩余：4GB</p>
      </div>
      <p>备注：上课使用的系统</p>
    </div>
    <div class="container-button">
      <button>删除</button>
      <button>重启</button>
      <button>设置</button>
    </div>
  </div>
</template>

<style scoped>
    .container{
        width: 366px;
        height: 236px;
        background-color: #FFFFFF;
        border-radius: 10px;
        margin-right: 20px;
        margin-top: 20px;
    }

    .container-name img{
        width: 46px;
        height: 46px;
        border: 2px solid #718096;
        border-radius: 10px;
    }

    .container-name{
        display: flex;
        align-items: center;
        margin-left: 25px;
    }

    .container-name-info{
        margin-left: 10px;
        flex-direction: column;
    }

    .image-name{
        font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
        font-size: 16px;
        color: #111827;
        margin-bottom: -10px;
    }

    .image-id{
        font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
        font-size: 14px;
        color: #718096;
    }

    .toggle {
        width: 50px;
        height: 28px;
        border-radius: 15px;
        left: 130px;
        position: relative;
        cursor: pointer;
        background-color: #ccc; /* 默认背景色为灰色 */
    }

    .handle {
        width: 24px;
        height: 24px;
        background-color: #999;
        border-radius: 50%;
        position: absolute;
        top: 1px;
        left: 3px;
        transition: transform 0.3s ease;
    }

    .active {
        background-color: #2196F3; /* Blue color when active */
    }

    .active .handle {
        transform: translateX(20px);
        background-color: white; /* White color when active */
    }

    .container-description{
        font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
        font-size: 14px;
        color: #718096;
        margin-left: 25px;
    }

    .firstline{
        display: flex;
        margin-bottom: -20px;
    }

    .firstline p{
        margin-right: 10px;
    }

    .container-button{
        margin-left: 25px;
        margin-top: 30px;
        width: 300px;
        display: flex;
        justify-content: space-between;
        font-family: 'HarmonyOS_Sans_SC_Regular', sans-serif;
        font-size: 14px;
    }

    .container-button button{
        background-color: #FFFFFF;
        width: 82px;
        height: 48px;
        border-radius: 10px;
    }

    .container-button button:nth-of-type(1){
        border-color: #FF5733;
        color: #FF5733;
    }

    .container-button button:nth-of-type(2){
        border-color: #00BAAD;
        color: #00BAAD;
    }

    .container-button button:nth-of-type(3){
        border-color: #808080;
        color: #808080;
    }
</style>

<script setup>
    import { ref } from 'vue'

    const isActive = ref(false)

    const toggleSwitch = () => {
        isActive.value = !isActive.value
    }
</script>