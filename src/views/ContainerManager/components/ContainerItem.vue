<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div class="container-name">
      <img src="../../../assets/images/ubuntu.png">
      <div class="container-name-info">
        <p class="image-name">{{containerInfo.name}}</p>
        <p class="image-id">{{containerInfo.vmid}}</p>
      </div>
      <!-- <div class="toggle" :class="{ 'active': isActive }" @click="toggleSwitch">
        <div class="handle" />
      </div> -->
    </div>
    <div class="container-description">
      <div class="firstline">
        <p>占用：{{Math.floor(containerInfo.mem/ (1024 * 1024))}}MB</p>
        <p>上限：{{Math.floor(containerInfo.maxmem/ (1024 * 1024 * 1024))}}GB</p>
        <p>状态：{{containerInfo.status}}</p>
      </div>
      <p>备注：上课使用的系统</p>
    </div>
    <div class="container-button">
      <button @click="stopContainer(nodeStore.nodeName,containerInfo.vmid)">关闭</button>
      <button @click="startContainer(nodeStore.nodeName,containerInfo.vmid)">启动</button>
      <button>更多</button>
    </div>
  </div>
</template>

<style scoped>
    @font-face {
        font-family: 'HarmonyOS_Sans_SC_Regular';
        src: url('../../../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf') format('truetype');
    }

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
        border-style: solid;
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
    import { defineProps } from 'vue'
    import { ElNotification } from 'element-plus'
    import { useNodeStore } from '../../../stores/useNodeStore.js'
    import { useTokenStore } from '../../../stores/useTokenStore.js'
    import axios from 'axios'

    const props = defineProps(['containerInfo','index']);
    const nodeStore = useNodeStore();
    const tokenStore = useTokenStore();

    // const isActive = ref(false)
    // const toggleSwitch = () => {
    //     isActive.value = !isActive.value
    // }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function updateItem(){
        ElNotification({
            title: 'Warning',
            message: '容器正在操作中',
            type: 'warning',
            duration: 6000
        })
        await sleep(5000);
    }

    async function startContainer(node,vmid){
        if(props.containerInfo.status=="running"){
            ElNotification({
                title: 'Error',
                message: '容器已经启动，请勿重复启动',
                type: 'error',
            })
            return;
        }
        let url = `/api2/json/nodes/${node}/lxc/${vmid}/status/start`
        let data = {}
        let startContainerResponse = await axios.post(url,data,{
            headers:{
                'CSRFPreventionToken': tokenStore.CSRFPreventionToken
            }
        })
        await updateItem();
        nodeStore.containerList[props.index].status = "running"
        ElNotification({
            title: 'Success',
            message: '容器启动成功',
            type: 'success',
        });
    }

    async function stopContainer(node,vmid){
        if(props.containerInfo.status=="stopped"){
            ElNotification({
                title: 'Error',
                message: '容器已经关闭，请勿重复关闭',
                type: 'error',
            })
            return;
        }
        let url = `/api2/json/nodes/${node}/lxc/${vmid}/status/shutdown`
        let data = {}
        let stopContainerResponse = await axios.post(url,data,{
            headers:{
                'CSRFPreventionToken': tokenStore.CSRFPreventionToken
            }
        })
        await updateItem();
        nodeStore.containerList[props.index].status = "stopped"
        ElNotification({
            title: 'Success',
            message: '容器关闭成功',
            type: 'success',
        });
    }
</script>