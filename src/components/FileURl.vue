<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ msg: string }>()
const electronAPI = (window as any).electronAPI;
const filePath = ref<string>('暂无路径');
async function openFile() {
  const url = await electronAPI.openFile();
  filePath.value = url;
  console.log(url);
}

</script>

<template>
  <div class="file-url">
    <p class="file-path-url">{{ filePath }}</p>
    <button @click="openFile">选择文件夹</button>
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
  background-color: lightblue;
}
</style>
