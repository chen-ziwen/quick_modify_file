<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ msg: string }>()
const electronAPI = (window as any).electronAPI;
const filePath = ref<string>('文件路径');
const folderPath = ref<string>('文件夹路径');
const fileContent = ref<string>('');
async function openFile() {
  const url = await electronAPI.openFile();
  filePath.value = url;
  console.log(url);
}
async function openFolder() {
  const url = await electronAPI.openFolder();
  folderPath.value = url;
  console.log(url);
}
async function readFileContent(url: string) {
  const content = await electronAPI.readFileContent(url);
  console.log('触发了', content);
  fileContent.value = content;
}
async function getFile(url: string) {
  const result = await electronAPI.getFile(url);
  console.log(result);
}
</script>

<template>
  <div class="file-url">
    <div class="file-box">
      <p class="file-path-url">{{ filePath }}</p>
      <p class="file-path-url">{{ fileContent }}</p>
      <button @click="openFile">选择文件</button>
      <button @click="readFileContent(filePath)">点击读取文件内容</button>
    </div>
    <div class="file-box">
      <p class="file-path-url">{{ folderPath }}</p>
      <button @click="openFolder">选择文件夹</button>
      <button @click="getFile(folderPath)">生成文件树</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-url {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;


  .file-box {
    button {
      margin: 5px;
    }
  }
}
</style>
