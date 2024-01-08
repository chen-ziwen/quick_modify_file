<template>
    <article class="file-message">
        <div class="file-check-info" v-for="item, index of paths" :key="index">
            {{ index + 1 }}. <span :style="{ color: textColor }">{{ item.path }}</span>
            {{ item.text }}
        </div>
    </article>
</template>

<script lang='ts' setup>
import { computed } from "vue";
interface FileMessageProps {
    textColor: string;
    paths: { path: string, text: string }[];
    type: "success" | "fail";
}
const props = defineProps<FileMessageProps>();
</script>

<style lang='scss' scoped>
.file-message {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .file-check-info {
        padding: 3px 6px;
        margin-bottom: 20px;
        border: 1px solid rgba(109, 129, 146, 0.8);
        background: rgba(255, 255, 255, .65);
        word-break: break-all;
    }
}
</style>