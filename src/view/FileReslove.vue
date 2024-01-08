<template>
  <div class="file-reslove">
    <div class="file-message-show">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="执行成功">
          <FileMessage v-if="checkPath.suc.length > 0" :paths="checkPath.suc" type="success" text-color="green">
          </FileMessage>
          <span v-else>暂无 成功信息</span>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="执行失败">
          <FileMessage v-if="checkPath.err.length > 0" :paths="checkPath.err" type="fail" text-color="red"></FileMessage>
          <span v-else>暂无 失败信息</span>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <aside class="file-side">
      <a-form v-bind="layout">
        <a-form-item label="资源路径">
          <a-input-group compact>
            <a-input v-model:value="form.remote" style="width: calc(100% - 90px)" placeholder="新主题的图片路径" />
            <a-button type="primary" @click="useOpenRemoteFolder">打开</a-button>
            <a-button type="primary" ghost @click="useCheckFolderName">检测</a-button>
          </a-input-group>
        </a-form-item>
        <a-form-item label="主题名称">
          <a-input v-model:value="form.theme" placeholder="新主题的键名(英文名)" />
        </a-form-item>
        <a-form-item label="项目路径">
          <a-input-group compact>
            <a-input v-model:value="form.local" style="width: calc(100% - 90px)" placeholder="咩播项目路径" />
            <a-button type="primary" @click="useOpenLocalFolder">打开</a-button>
            <a-button type="primary" ghost :disabled="checkPath.disabled" @click="useCopyFileResource">复制</a-button>
          </a-input-group>
        </a-form-item>
      </a-form>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import FileMessage from './FileMessage.vue';
defineProps<{ msg: string }>()
const { openFolder, checkFolderName, copyFileResource } = window.electronAPI;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const activeKey = ref<string[]>([]);
const form = reactive({
  theme: "",
  remote: "",
  local: "",
});

const checkPath = reactive({
  suc: [] as { path: string, text: string }[],
  err: [] as { path: string, text: string }[],
  disabled: true,
});

watch(() => form.remote, () => {
  checkPath.disabled = true;
})

async function useOpenFolder(text: string, callback: (path: string) => void) {
  const info = await openFolder();
  if (info.status) {
    callback(info.path);
  } else {
    message.error(text);;
  }
}

function useOpenLocalFolder() {
  useOpenFolder("取消选择项目文件夹", (path: string) => {
    form.local = path;
  })
}

function useOpenRemoteFolder() {
  useOpenFolder("取消选择资源文件夹", (path: string) => {
    form.remote = path;
  })
}

async function useCheckFolderName() {
  if (form.remote == "") {
    message.error("资源路径不能为空");
    return;
  }
  try {
    const { suc, err, disabled } = await checkFolderName(form.remote);
    checkPath.suc = suc;
    checkPath.err = err;
    checkPath.disabled = disabled;
    activeKey.value.splice(0, activeKey.value.length, "1", "2");
    message.success("检测成功!");
  } catch (err) {
    message.error("资源路径不存在！");
  }
}

async function useCopyFileResource() {
  if (form.theme == "" || form.local == "" || form.remote == "") {
    message.error("资源路径，主题名称，项目路径都不能为空！！！");
    return;
  }
  try {
    const { suc, err, disabled } = await copyFileResource({
      theme: form.theme,
      src: form.local,
      destPath: form.remote
    });
    checkPath.suc = suc;
    checkPath.err = err;
    checkPath.disabled = disabled;
    activeKey.value.splice(0, activeKey.value.length, "1", "2");
    message.success("复制成功！");
  } catch (e) {
    message.error("复制失败！");
  }
}


</script>


<style scoped lang="scss">
.file-reslove {
  display: flex;
  width: 100%;
  height: 100%;

  .file-message-show {
    flex: 3;
    padding: 15px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .file-side {
    flex: 2;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.2);
    border-left: 3px solid rgba(109, 129, 146, 0.8);
  }

  :deep(.ant-btn) {
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>
