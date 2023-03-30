<template>
  <div class="app-container">
    <open-ai @createChatCompletion="senMsg" :datalist="dataList">
      <template v-slot:ahai="{ state1 }">
        <div>
          {{ state1 }}
          9445
        </div>
      </template>
    </open-ai>
  </div>
</template >
<script lang="ts" setup>
import OpenAi from './components/OpenAi.vue'
import { ref, unref } from 'vue';
import { message } from 'ant-design-vue';
import { chatList, type chatBean } from './model/index'
const dataList = ref(chatList)
import axios from 'axios'

const senMsg = async (data: string) => {
  if (!data) {
    message.error('不能为空')
    return
  }
  unref(dataList).push({ type: 'right', msg: data })
  try {
    message.loading('模型思考中请耐心等待', 0)
    // express-cnw9gt339-sunchengfeng01.vercel.app
    const res: any = await axios.post('https://express-cnw9gt339-sunchengfeng01.vercel.app', {
      body: JSON.stringify({ data: data }),
    }, {
      header: {
        "access-control-allow-origin": '*'
      }
    })
    message.destroy()
    let { data: { code } } = res
    console.log('code ', code)
    if (code == 400) return message.warn('发送失败')
    unref(dataList).push({ type: 'left', msg: res.data.data })
  } catch (e) {
    message.error('请求错误')
  }
}
</script>

<style scoped>
.app-container {
  width: 100%;
  overflow: hidden;
}
</style>
