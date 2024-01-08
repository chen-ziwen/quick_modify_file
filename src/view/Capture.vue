<template>
    <div class="capture">
        <div class="ctrl-btn">
            <a-button @click="getStreamData">重新捕获界面</a-button>
            <a-select v-model:value="checked" style="width: 120px" @change="handleChange">
                <a-select-option v-for="item of sourceList" :value="item.value">{{ item.label }}</a-select-option>
            </a-select>
        </div>
        <div class="video-box">
            <video ref="videodom"></video>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, shallowRef, onMounted, onUnmounted } from "vue";
const { getStream } = window.electronAPI;

interface CustomConstraints extends MediaTrackConstraints {
    mandatory: {
        chromeMediaSource: string,
        chromeMediaSourceId: string,
        minWidth: number,
        maxWidth: number,
        minHeight: number,
        maxHeight: number
    }
}
type Option = { value: string, label: string };
const sourceList = ref<Option[]>([]);
const checked = ref("屏幕 1");
let requestAnimationId: any = null;
async function getStreamData() {
    // sourceList.value.splice(0, sourceList.value.length);
    const keepSource: Option[] = [];
    getStream().then(sources => {
        for (let source of sources) {
            const item = { value: source.id, label: source.name };
            keepSource.push(item);
        }
        // checked.value = keepSource[0].label;
        sourceList.value = keepSource;
        // requestAnimationId = window.requestAnimationFrame(getStreamData); // 不能递归获取
    })
}

onMounted(getStreamData);
onUnmounted(() => {
    requestAnimationId && cancelAnimationFrame(requestAnimationId);
})

const videodom = shallowRef<HTMLVideoElement | null>(null);

async function handleChange(value: string) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: value,
                    minWidth: 640,
                    maxWidth: 640,
                    minHeight: 360,
                    maxHeight: 360
                }
            } as CustomConstraints
        })

        if (videodom.value) {
            videodom.value.srcObject = stream;
            videodom.value.onloadeddata = (e) => videodom.value!.play()
        }
    } catch (e) {
        console.error(e, "获取视频资源失败")
    }
}
</script>

<style lang='scss' scoped>
.capture {
    .ctrl-btn {
        height: 50px;
        width: 100%;
    }

    .video-box {
        width: 640px;
        height: 360px;
        border: 2px solid #000000;
        margin: 0 auto;
    }
}
</style>