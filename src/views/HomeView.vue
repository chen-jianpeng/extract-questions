<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { randomNumbers, generatedRandomNumbers } from "@/utils";

const types = ["填空题", "选择题", "判断题"];
const intervals = reactive([]);
const showNumber = reactive([]);
const status = reactive([]);
const selected = reactive([[], [], []]);
const questions = reactive([
  [
    { question: "1撒撒旦发射点发射点发", answer: "1大大实打实", options: [] },
    { question: "2撒撒旦发射点发射点发", answer: "2大大实打实", options: [] },
    { question: "3撒撒旦发射点发射点发", answer: "3大大实打实", options: [] },
    { question: "4撒撒旦发射点发射点发", answer: "4大大实打实", options: [] },
    { question: "5撒撒旦发射点发射点发", answer: "5大大实打实", options: [] },
    { question: "6撒撒旦发射点发射点发", answer: "6大大实打实", options: [] },
    { question: "7撒撒旦发射点发射点发", answer: "7大大实打实", options: [] },
    { question: "8撒撒旦发射点发射点发", answer: "8大大实打实", options: [] },
    { question: "9撒撒旦发射点发射点发", answer: "9大大实打实", options: [] },
    { question: "10撒撒旦发射点发射点发", answer: "10大大实打实", options: [] },
  ],
  [
    {
      question: "1撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "2撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "3撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "4撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "5撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "6撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "7撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "8撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "9撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
    {
      question: "10撒撒旦发射点发射点发",
      answer: "A",
      options: [
        "是打发士大夫打撒",
        "烦烦烦撒的撒发生",
        "让人头疼问请问",
        "尴尬收费的方式",
      ],
    },
  ],
  [
    { question: "1撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "2撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "3撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "4撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "5撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "6撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "7撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "8撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "9撒撒旦发射点发射点发", answer: "正确", options: [] },
    { question: "10撒撒旦发射点发射点发", answer: "正确", options: [] },
  ],
]);

let currentType = ref(0);

const handleSelect = (index) => {
  const randomNumber = generatedRandomNumbers(selected[index], [
    0,
    questions[index].length - 1,
  ]);
  if (typeof randomNumber === "number") {
    selected[index].push(randomNumber);
    return randomNumber;
  }
};

const start = (index) => {
  intervals[index] = setInterval(() => {
    showNumber[index] = randomNumbers([0, questions[index].length - 1]);
  }, 50);
};

const stop = (index) => {
  clearInterval(intervals[index]);
  const res = handleSelect(index);
  showNumber[index] = res;
};

const toggle = (index) => {
  if (status[index]) {
    stop(index);
    status[index] = false;
  } else {
    if (questions[index].length === selected[index].length) {
      ElMessage.warning("所有题目均以抽完！");
      return;
    }
    start(index);
    status[index] = true;
  }
};
</script>

<template>
  <main class="main">
    <h1 class="title">步步为赢</h1>

    <el-card class="question">
      <template #header>
        <div class="number">
          第{{ showNumber[currentType] ? showNumber[currentType] + 1 : "-" }}题
        </div>
      </template>
      <div class="content">
        {{
          typeof showNumber[currentType] === "number" && !status[currentType]
            ? questions[currentType]?.[showNumber]?.question
            : ""
        }}
      </div>
    </el-card>

    <div class="select">
      <el-row :gutter="20">
        <el-col :span="8" v-for="(type, index) in types" :key="index">
          <el-card class="item" :header="type">
            <el-button @click="toggle(index)">
              {{ status[index] ? "停止" : "开始" }}
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  padding: 40px;
}
.title {
  text-align: center;
}
.item {
  text-align: center;
}
</style>
