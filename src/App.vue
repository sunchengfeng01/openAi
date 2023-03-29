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
import { Configuration, OpenAIApi } from "openai";
import { message } from 'ant-design-vue';
import { chatList, type chatBean } from './model/index'
const dataList = ref(chatList)

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
// https://express-ten-iota.vercel.app
const senMsg = async (data: string) => {
  if (!data) {
    message.error('不能为空')
    return
  }
  unref(dataList).push({ type: 'right', msg: data })
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: data },
    ],

  });

  unref(dataList).push({ type: 'left', msg: completion.data.choices[0].message?.content as string })

}








</script>

<style scoped>
.app-container {
  width: 100%;
  overflow: hidden;
}
</style>
