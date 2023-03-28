<template>
  <a-layout class="layout">
    <a-layout-content class="msg_content" id="layout_content">
      <div ref="abc"></div>
      <div :style="computedStyle(item)" v-for="item, index in datalist" :key="index">
        <img src="../assets/suny.png" alt="" class="sculpture" v-if="item.type == 'left'">
        <div :class="item.type == 'left' ? 'ai_msg' : 'selft_msg'">
          <div>name</div>
          <div>
            {{ item.msg }}
          </div>
        </div>
        <img src="../assets/tmp.jpg" alt="" class="sculpture" v-if="item.type == 'right'">
      </div>
    </a-layout-content>

    <a-layout-footer class="footer_">
      <a-input-search v-model:value="value1" placeholder="input search text" size="large" @search="handler">
        <template #enterButton>
          <a-button>发送</a-button>
        </template>
      </a-input-search>
    </a-layout-footer>
  </a-layout>

  <!-- <ai-massege></ai-massege> -->
</template>
<script lang="ts" setup>
import { ref, defineEmits, defineProps, nextTick, watch, unref } from 'vue';
import aiMassege from "./Aimassege.vue"
import { message } from 'ant-design-vue';
import { chatBean } from '../model/index'
const emits = defineEmits(['createChatCompletion'])
const props = defineProps({
  datalist: {
    type: Array<chatBean>,
    default: []
  }
})
const computedStyle = ({ type }: chatBean) => {
  let ob = {
    display: 'flex',
    bottom: '10px',
    justifyContent: 'flex-start'
  }
  if (type !== "left") {
    ob.justifyContent = 'flex-end'
  }
  return ob
}
const value1 = ref('')
const chatList = ref()
const abc = ref()
const state1 = ref('')
watch(() => props.datalist, () => {
  nextTick(() => {
    // console.log(document.getElementById('layout_content'))
    document.getElementById('layout_content')?.scrollTo(0, document.getElementById('layout_content')?.scrollHeight as number)
  })
}, { immediate: true, deep: true })

const handler = () => {
  emits('createChatCompletion', unref(value1))
  value1.value = ""
}
</script>

<style scoped lang="less">
.layout {
  padding: 10px 12px;
}

.sculpture {
  width: 24px;
  height: 24px;
  border-radius: 5px;
}

.msg_content {
  height: 400px;
  background-color: white;
  overflow: scroll;
  margin: 5px 0;

  &::-webkit-scrollbar {
    display: none;
  }

  .ai_msg {
    margin-left: 20px;
    margin-bottom: 10px;

    :nth-child(1) {
      vertical-align: top;
      line-height: 1;
      font-size: 15px;
      // height: 40px;
      display: inline-block;
      font-weight: bolder;
    }

    :nth-child(2) {
      width: auto;
      min-height: 20px;
      padding: 3px 5px;
      border-radius: 5px;
      position: relative;
      background-color: greenyellow;

      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        left: 0;
        border: solid 8px greenyellow;
        border-top: transparent solid 8px;
        border-bottom: transparent solid 8px;
        border-left: transparent solid 8px;
        transform: translateX(-97%);
      }
    }
  }

  .selft_msg {
    text-align: right;
    margin-right: 20px;
    margin-bottom: 10px;
    position: relative;

    :nth-child(1) {
      display: inline-block;
      line-height: 1;
      vertical-align: top;
      font-size: 15px;
      font-weight: bolder;
    }

    :nth-child(2) {
      background-color: greenyellow;
      padding: 12px;
      border-radius: 5px;

      &::before {
        position: absolute;
        width: 0;
        height: 0;
        right: 0;
        display: inline-block;
        content: '';
        border: solid 10px greenyellow;
        border-top: solid 10px transparent;
        border-bottom: solid 10px transparent;
        border-right: solid 10px transparent;
        transform: translateX(97%);
      }
    }
  }
}

.footer_ {
  // min-height: 200px;
  // background-color: red;

}
</style>