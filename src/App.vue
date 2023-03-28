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
// import { Configuration, OpenAIApi } from "openai";
import { message } from 'ant-design-vue';
import { chatList, type chatBean } from './model/index'
import axios from 'axios'
const dataList = ref(chatList)

// const configuration = new Configuration({
//   apiKey: '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',
//   basePath: '/api',
// });
// const openai = new OpenAIApi(configuration);
// https://express-ten-iota.vercel.app
const senMsg = async (data: string) => {
  axios.post('/api').then((data) => {
    console.log(data)
  })
  if (!data) {
    message.error('不能为空')
    return
  }

  // console.log(unref(dataList))
  unref(dataList).push({ type: 'right', msg: data })
  // const completion = await openai.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     { role: "system", content: data },
  //   ],

  // });

  // unref(dataList).push({ type: 'left', msg: completion.data.choices[0].message?.content as string })
  // console.log(completion.data.choices[0].message?.content);
}








</script>

<style scoped>
.app-container {
  width: 100%;
  overflow: hidden;
}
</style>
