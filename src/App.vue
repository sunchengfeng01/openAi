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
const senMsg = async (data: string) => {
  if (!data) {
    message.error('不能为空')
    return
  }
  // console.log(unref(dataList))
  unref(dataList).push({ type: 'right', msg: data })
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: data },
    ],
  });
  unref(dataList).push({ type: 'left', msg: completion.data.choices[0].message?.content as string })
  console.log(completion.data.choices[0].message?.content);
}








</script>

<style scoped>
.app-container {
  width: 100%;
  overflow: hidden;
}
</style>
