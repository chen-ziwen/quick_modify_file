<script setup lang="ts">
import { ref } from 'vue';
import {
  ReloadOutlined,
  FolderOpenOutlined,
  DeleteOutlined,
  CopyOutlined,
}
  from '@ant-design/icons-vue';
defineProps<{ msg: string }>()
const electronAPI = (window as any).electronAPI;
const filePath = ref<string>('文件路径');
const folderPath = ref<string>('文件夹路径');
const fileContent = ref<string>('');
const choices = ref('tree');
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
    <!-- <div class="file-box">
      <p class="file-path-url">{{ filePath }}</p>
      <p class="file-path-url">{{ fileContent }}</p>
      <button @click="openFile">选择文件</button>
      <button @click="readFileContent(filePath)">点击读取文件内容</button>
    </div>
    <div class="file-box">
      <p class="file-path-url">{{ folderPath }}</p>
      <button @click="openFolder">选择文件夹</button>
      <button @click="getFile(folderPath)">生成文件树</button>
    </div> -->
    <header class="header-info">
      <a-input-group compact class="input-group">
        <a-select v-model:value="choices">
          <a-select-option value="tree">树状图</a-select-option>
          <a-select-option value="json">键值对</a-select-option>
        </a-select>
        <a-input v-model:value="filePath" class="input-size" placeholder="请选择文件夹">
          <template #addonAfter>
            <div class="icon-setting">
              <folder-open-outlined class="icon" title="打开文件夹" />
              <reload-outlined class="icon" title="重新加载" />
              <delete-outlined class="icon" title="清空数据" />
              <copy-outlined class="icon" title="复制到剪切板" />
            </div>
          </template>
        </a-input>
      </a-input-group>
    </header>
    <article class="create-txt">
      <section></section>
      <section></section>
    </article>
    <aside>

    </aside>
  </div>
</template>

<style scoped lang="scss">
.file-url {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .file-box {
    button {
      margin: 5px;
    }
  }

  .header-info {
    width: 90%;
    height: 120px;
    box-shadow: 0 0 5px rgb(83, 83, 83);
    margin-top: 20px;

    .input-group {
      display: flex;
      padding: 15px;

      .icon-setting {
        .icon {
          cursor: pointer;
          padding: 0 5px;
          margin: 0 10px;
          color: #9C9FC0;
        }
      }
    }
  }

  .create-txt {
    width: 90%;
    flex-grow: 1;
    margin: 30px 0;
    box-shadow: 0 0 5px rgb(83, 83, 83);
  }
}
</style>
