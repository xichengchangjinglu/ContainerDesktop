<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div class="container-name">
      <img src="../../../assets/images/ubuntu.png" />
      <div class="container-name-info">
        <p class="image-name">{{ containerInfo.name }}</p>
        <p class="image-id">{{ containerInfo.vmid }}</p>
      </div>
      <!-- <div class="toggle" :class="{ 'active': isActive }" @click="toggleSwitch">
        <div class="handle" />
      </div> -->
    </div>
    <div class="container-description">
      <div class="firstline">
        <p>占用：{{ Math.floor(containerInfo.mem / (1024 * 1024)) }}MB</p>
        <p>
          上限：{{ Math.floor(containerInfo.maxmem / (1024 * 1024 * 1024)) }}GB
        </p>
        <p>状态：{{ containerInfo.status }}</p>
      </div>
      <p v-if="des ==''">备注：无</p>
      <p v-else>备注：{{des}}</p>
    </div>
    <div class="container-button">
      <button @click="stopContainer(nodeStore.nodeName, containerInfo.vmid)">
        关闭
      </button>
      <button @click="startContainer(nodeStore.nodeName, containerInfo.vmid)">
        启动
      </button>
      <button @click="isConfigActive = true">更多</button>
    </div>
  </div>
  <el-dialog v-model="isConfigActive" :title="containerInfo.name" width="60%">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="快照管理" name="first">
        <el-table :key="isUpdate" :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column prop="description" label="描述" />
          <el-table-column align="right">
            <template #header>
              <el-button type="primary" plain @click="dialogFormVisible = true">+ 创建快照</el-button>
            </template>
            <template #default="scope">
              <el-button size="small" @click="handleRollBack(scope.row)">回滚</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="容器设置" name="second">
        <el-descriptions title="容器信息" border>
          <el-descriptions-item label="主机名">kylin-mini-demo</el-descriptions-item>
          <el-descriptions-item label="内存">4096</el-descriptions-item>
          <el-descriptions-item label="架构">amd64</el-descriptions-item>
          <el-descriptions-item label="系统类型">
            <el-tag size="small">ubuntu</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="数据卷">local-lvm:vm-1001-disk-0,size=8G</el-descriptions-item>
          <el-descriptions-item label="核心数">4</el-descriptions-item>
        </el-descriptions>
        <el-popconfirm title="删除后无法恢复" @confirm="deleteContainer()">
          <template #reference>
            <button class="container-delete-btn">删除</button>
          </template>
        </el-popconfirm>
      </el-tab-pane>
      <el-tab-pane label="远程桌面连接设置" name="third">
        <p class="connect-status-title">当前Vnc服务状态：正常</p>
        <div class="connect-status-container">
          <div class="connect-status-item-short">
            <el-tooltip content="指示是否应该阻止将任何事件（例如按键或鼠标移动）发送到服务器">
              <p>只读</p>
            </el-tooltip>
            <el-switch v-model="vncConnectConfig.viewOnlyValue" class="el-switch-wrapper"/>
          </div>
          <div class="connect-status-item">
            <el-tooltip content="是否应将远程会话剪切到其容器，禁用时，将显示滚动条以处理产生的溢出">
              <p>画面裁剪</p>
            </el-tooltip>
            <el-switch v-model="vncConnectConfig.clipViewportValue" class="el-switch-wrapper"/>
          </div>
          <div class="connect-status-item">
            <el-tooltip content="指示远程会话是否应在本地扩展，以便它适合其容器。禁用时，如果远程会话小于其容器，则它将居中，或者如果它更大，则根据容器处理">
              <p>画面适应</p>
            </el-tooltip>
            <el-switch v-model="vncConnectConfig.resizeSessionValue" class="el-switch-wrapper"/>
          </div>
          <div class="connect-status-item">
            <el-tooltip content="若当前网络延迟较高，请调整连接质量，越低则画面压缩越强">
              <p>连接质量</p>
            </el-tooltip>
            <div class="num-choose">
              <el-input-number v-model="vncConnectConfig.qualityLevelValue" :min="0" :max="9" size="small"/>
            </div>
          </div>
          <!-- <div class="connect-config-btn">
            <button>更改设置</button>
          </div> -->
        </div>
        <div class="connect-status-password">
          <p>连接密码</p>
          <input type="password" v-model="vncConnectConfig.vncPasswd">
          <div class="connect-vnc-btn">
            <button @click="connectToVnc()">连接</button>
          </div>
          <!-- <div class="connect-vnc-btn">
            <button @click="disconnectToVnc()">断开</button>
          </div> -->
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
  <el-dialog
    v-model="dialogFormVisible"
    title="创建快照"
    width="40%"
    top="30vh"
  >
    <el-form :model="form">
      <el-form-item label="快照名称">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="快照备注">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click=" dialogFormVisible = false;createSnapshot();">创建</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
@font-face {
  font-family: "HarmonyOS_Sans_SC_Regular";
  src: url("../../../assets/fonts/HarmonyOS_Sans_SC_Regular.ttf") format("truetype");
}

.container {
  width: 366px;
  height: 236px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-right: 20px;
  margin-top: 20px;
}

.container-name img {
  width: 46px;
  height: 46px;
  border: 2px solid #718096;
  border-radius: 10px;
}

.container-name {
  display: flex;
  align-items: center;
  margin-left: 25px;
}

.container-name-info {
  margin-left: 10px;
  flex-direction: column;
}

.image-name {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 16px;
  color: #111827;
  margin-bottom: -10px;
}

.image-id {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
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
  background-color: #2196f3; /* Blue color when active */
}

.active .handle {
  transform: translateX(20px);
  background-color: white; /* White color when active */
}

.container-description {
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 14px;
  color: #718096;
  margin-left: 25px;
}

.firstline {
  display: flex;
  margin-bottom: -20px;
}

.firstline p {
  margin-right: 10px;
}

.container-button {
  margin-left: 25px;
  margin-top: 30px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 14px;
}

.container-button button {
  background-color: #ffffff;
  width: 82px;
  height: 48px;
  border-radius: 10px;
  border-style: solid;
}

.container-button button:nth-of-type(1) {
  border-color: #ff5733;
  color: #ff5733;
}

.container-button button:nth-of-type(2) {
  border-color: #00baad;
  color: #00baad;
}

.container-button button:nth-of-type(3) {
  border-color: #808080;
  color: #808080;
}
.demo-tabs {
  margin-top: -30px;
  height: 60vh;
  font-family: "HarmonyOS_Sans_SC_Regular", sans-serif;
  font-size: 16px;
  color: #718096;
}

.demo-tabs .el-tab-pane {
  margin-right: 50px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
}

.connect-status-title{
  color: #161c2b;
}

.connect-status-container{
  color: #161c2b;
  display: flex;
}

.connect-status-item-short{
  width: 100px;
  display: flex;
  align-items: center;
}

.connect-status-item{
  width: 130px;
  display: flex;
  align-items: center;
}

.el-switch-wrapper{
  margin-left: 10px;
}

.num-choose{
  margin-left: 15px;
  width: 20px;
}

.connect-status-password{
  color: #161c2b;
  display: flex;
  align-items: center;
}

.connect-status-password input{
  margin-left: 15px;
  border-radius: 10px;
  border-style: solid;
}

.connect-config-btn{
  margin-left: 90px;
  margin-top: 13px;
}

.connect-config-btn button{
  background-color: #ffffff;
  border-style: solid;
  border-radius: 10px;
  border-color: #808080;
}

.connect-vnc-btn{
  margin-left: 20px;
}

.connect-vnc-btn button{
  background-color: #ffffff;
  border-style: solid;
  border-radius: 10px;
  border-color: #808080;
}

.container-delete-btn{
  background-color: #ffffff;
  border-style: solid;
  margin-top: 15px;
  width: 70px;
  border-radius: 10px;
  border-color: #ff5733;
  color: #ff5733;
}
</style>

<script setup>
import { defineProps, ref, onMounted, reactive } from "vue";
import { ElNotification } from "element-plus";
import { useNodeStore } from "../../../stores/useNodeStore.js";
import { useTokenStore } from "../../../stores/useTokenStore.js";
import { useVncStore } from "../../../stores/useVncStore.js"
import { useRouter } from "vue-router";
import axios from "axios";

const props = defineProps(["containerInfo", "index"]);
const nodeStore = useNodeStore();
const tokenStore = useTokenStore();
const vncStore = useVncStore();

const router = useRouter();

const isConfigActive = ref(false);
const activeName = ref("first");
const dialogFormVisible = ref(false);

const isUpdate = ref(Math.random());
const snapshotList = ref([]);
const des = ref("")
let tableData = [];
const form = reactive({
  name: "",
  description: "",
});
const vncConnectConfig = reactive({
  vncIp: "",
  viewOnlyValue: false,
  clipViewportValue: true,
  resizeSessionValue: true,
  qualityLevelValue: 0,
  vncPasswd: ""
})

onMounted(() => {
  getContainerDescription();
  getSnapshot();
  getContainerIp();
});

// const handleClick = (tab, event) => {
//   console.log(tab, event);
// };

// 获取描述信息
async function getContainerDescription(){
  let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc/${props.containerInfo.vmid}/config`;
  let descriptionResponse = await axios.get(url);
  let data = descriptionResponse.data.data;
  if('description' in data){
    des.value = data['description'];
  }
}

// 删除容器
async function deleteContainer(){
  if(props.containerInfo.status=="running"){
    ElNotification({
      title: "Error",
      message: "请先停止容器运行",
      type: "error",
    });
    return;
  }
  let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc/${props.containerInfo.vmid}`;
  let header = {
    headers: {
      CSRFPreventionToken: tokenStore.CSRFPreventionToken,
    },
  };
  let deleteContainerResponse = await axios.delete(url,header);
  ElNotification({
      title: "Warning",
      message: "正在删除中",
      type: "warning",
  });
  sleep(2000);
  nodeStore.containerList = nodeStore.containerList.filter(item=>{
    item.vmid != props.containerInfo.vmid;
  })
  isConfigActive.value = true
  ElNotification({
      title: "Success",
      message: "删除成功",
      type: "success",
  });
  location.reload(true);
}

// 连接到远程桌面服务
function connectToVnc(){
  if(props.containerInfo.status=="stopped"){
    ElNotification({
        title: "Error",
        message: "请先启动容器",
        type: "error",
    });
    return;
  }
  if(vncConnectConfig.vncPasswd == ""){
    ElNotification({
        title: "Error",
        message: "请填写密码",
        type: "error",
    });
    return;
  }
  let nextRouter = "/NovncConnect/" + vncConnectConfig.vncIp;
  vncStore.vncConnectConfig = vncConnectConfig;
  router.push(nextRouter);
}

// 获取容器ip用来连接vnc服务
async function getContainerIp(){
  let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc/${props.containerInfo.vmid}/interfaces`;
  let interfacesResponse = await axios.get(url,{
    headers: {
      CSRFPreventionToken: tokenStore.CSRFPreventionToken,
    },
  });
  let data = interfacesResponse.data.data;
  if(data!=null){
    data.forEach(item => {
      if( 'inet' in item && item['inet'].startsWith("172.18")){
        vncConnectConfig.vncIp = item['inet'].split('/')[0];
      }
    });
  }
}

async function handleRollBack(row) {
  // console.log(row.name, row.description);
  let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc/${props.containerInfo.vmid}/snapshot/${row.name}/rollback`;
  let snapshotRollBackResponse = await axios.post(url, 
    {
        start: true,
    },
    {
        headers: {
            CSRFPreventionToken: tokenStore.CSRFPreventionToken,
        }
    }
  );
  sleep(2000);
  ElNotification({
    title: "Success",
    message: "快照回滚成功",
    type: "success",
  });
}

async function handleDelete(row){
    let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc/${props.containerInfo.vmid}/snapshot/${row.name}`
    let handelDeleteResponse = await axios.delete(url, {
        headers: {
            CSRFPreventionToken: tokenStore.CSRFPreventionToken,
        }
    })
    tableData = tableData.filter(item=>{
        return item.name != row.name;
    })
    isUpdate.value = Math.random();
    ElNotification({
        title: "Success",
        message: "快照删除",
        type: "success",
    });
}

function getCurrentTime() {
  const currentTime = new Date().toISOString().replace(/[TZ]/g, " ").trim();
  return currentTime;
}

// 读取容器快照
async function getSnapshot() {
  // eslint-disable-next-line no-undef
  let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc/${props.containerInfo.vmid}/snapshot`;
  let snapshotResponse = await axios.get(url, {
    headers: {
      CSRFPreventionToken: tokenStore.CSRFPreventionToken,
    },
  });
  snapshotList.value = snapshotResponse.data.data;
  snapshotList.value.forEach((item) => {
    tableData.push({
      name: item.name,
      description: item.description,
    });
  });
}

// 创建容器快照
async function createSnapshot() {
  snapshotList.value.forEach((element) => {
    if (element.name == form.name) {
      ElNotification({
        title: "Error",
        message: "快照名称已存在",
        type: "error",
      });
    }
  });
  if (form.name == "" || form.description == "") {
    ElNotification({
      title: "Error",
      message: "请输入快照名称和快照描述",
      type: "error",
    });
  }
  let url = `/api2/json/nodes/${nodeStore.nodeName}/lxc/${props.containerInfo.vmid}/snapshot`;
  let snapshotCreateResponse = await axios.post(
    url,
    {
      snapname: form.name,
      description: getCurrentTime() + " " + form.description,
    },
    {
      headers: {
        CSRFPreventionToken: tokenStore.CSRFPreventionToken,
      },
    }
  );
  tableData.push({
    name: form.name,
    description: getCurrentTime() + " " + form.description
  })
  isUpdate.value = Math.random();
  ElNotification({
    title: "Success",
    message: "快照创建成功",
    type: "success",
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function updateItem() {
  ElNotification({
    title: "Warning",
    message: "容器正在操作中",
    type: "warning",
    duration: 6000,
  });
  await sleep(5000);
}

async function startContainer(node, vmid) {
  if (props.containerInfo.status == "running") {
    ElNotification({
      title: "Error",
      message: "容器已经启动，请勿重复启动",
      type: "error",
    });
    return;
  }
  let url = `/api2/json/nodes/${node}/lxc/${vmid}/status/start`;
  let data = {};
  await axios.post(url, data, {
    headers: {
      CSRFPreventionToken: tokenStore.CSRFPreventionToken,
    },
  });
  await updateItem();
  nodeStore.containerList[props.index].status = "running";
  ElNotification({
    title: "Success",
    message: "容器启动成功",
    type: "success",
  });
}

async function stopContainer(node, vmid) {
  if (props.containerInfo.status == "stopped") {
    ElNotification({
      title: "Error",
      message: "容器已经关闭，请勿重复关闭",
      type: "error",
    });
    return;
  }
  let url = `/api2/json/nodes/${node}/lxc/${vmid}/status/shutdown`;
  let data = {};
  await axios.post(url, data, {
    headers: {
      CSRFPreventionToken: tokenStore.CSRFPreventionToken,
    },
  });
  await updateItem();
  nodeStore.containerList[props.index].status = "stopped";
  ElNotification({
    title: "Success",
    message: "容器关闭成功",
    type: "success",
  });
}
</script>
