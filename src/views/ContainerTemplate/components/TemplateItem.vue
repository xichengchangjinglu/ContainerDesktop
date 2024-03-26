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
    title="容器创建设置"
    width="60%"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
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
</style>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps(["templateInfo"]);
const dialogVisible = ref(false);

</script>
