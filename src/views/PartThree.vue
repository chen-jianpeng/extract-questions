<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Back } from "@element-plus/icons-vue";
import { randomNumbers, generatedRandomNumbers } from "@/utils";
import partIcon from "@/assets/partThree.jpg";

const router = useRouter();

const optionMap = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
};

const types = [
  { label: "10分", value: 0 },
  { label: "20分", value: 1 },
  { label: "30分", value: 2 },
  { label: "40分", value: 3 },
  { label: "50分", value: 4 },
];

const intervals = reactive([]);
const showNumber = reactive([]);
const status = reactive([]);
const selected = reactive([[], [], [], [], []]);
let questions = reactive();

let currentType = ref(0);
let showAnswer = ref(false);

const getQuestions = async () => {
  const response = await fetch("/questions/partThree.json");
  const data = await response.json();

  questions = data;
};

getQuestions();

const reset = () => {
  showAnswer.value = false;
};

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
  reset();

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

const handleChange = (type) => {
  currentType.value = type.value;
};
</script>

<template>
  <main class="main">
    <h1 class="title">
      <el-space>
        <el-icon @click="router.back()" class="back"><Back /></el-icon>
        <img :src="partIcon" style="width: 80px" />
        <span>你来我往</span>
      </el-space>
    </h1>

    <div class="center">
      <div class="center-left">
        <div v-for="(type, index) in types" :key="index">
          <el-button
            @click="handleChange(type)"
            style="margin-bottom: 20px; width: 100%"
            :type="currentType === type.value ? 'primary' : ''"
          >
            {{ type.label }}
          </el-button>
        </div>
      </div>

      <div class="center-right">
        <div class="center-right">
          <el-card class="question">
            <div class="question-title">
              第
              <span class="number">
                {{
                  typeof showNumber[currentType] === "number"
                    ? showNumber[currentType] + 1
                    : "-"
                }}
              </span>
              题
            </div>

            <div
              class="content"
              v-if="
                typeof showNumber[currentType] === 'number' &&
                !status[currentType]
              "
            >
              <div>
                {{
                  questions[currentType]?.[showNumber?.[currentType]]?.question
                }}
              </div>

              <div
                v-if="
                  questions[currentType]?.[showNumber?.[currentType]]?.options
                    ?.length > 0
                "
                class="options"
              >
                <div
                  v-for="(option, index) in questions[currentType]?.[
                    showNumber?.[currentType]
                  ]?.options"
                  :key="index"
                  class="option-item"
                >
                  <span class="option-index">{{ optionMap[index] }}.</span>
                  <span>{{ option }}</span>
                </div>
              </div>

              <div class="answer" v-if="showAnswer">
                <div>正确答案:</div>
                <div>
                  {{
                    questions[currentType]?.[showNumber?.[currentType]]?.answer
                  }}
                </div>
              </div>
            </div>
          </el-card>

          <div class="select">
            <div class="button-wrap" style="margin-right: 10px">
              <el-button
                @click="toggle(currentType)"
                size="large"
                style="width: 100%"
                :type="status[currentType] ? 'danger' : 'success'"
              >
                {{ status[currentType] ? "停止" : "开始" }}
              </el-button>
            </div>
            <div class="button-wrap" style="margin-left: 10px">
              <el-button
                type="primary"
                size="large"
                style="width: 100%"
                @click="showAnswer = !showAnswer"
                :disabled="
                  status[currentType] ||
                  typeof showNumber?.[currentType] !== 'number'
                "
              >
                {{ showAnswer ? "隐藏答案" : "查看答案" }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import "../assets/part.scss";
</style>
