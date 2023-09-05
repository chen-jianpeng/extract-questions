<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Back } from "@element-plus/icons-vue";
import { randomNumbers, generatedRandomNumbers } from "@/utils";

const router = useRouter();

const optionMap = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
};

const types = [
  { label: "多选题", value: 0 },
  { label: "解答题", value: 1 },
];

const intervals = reactive([]);
const showNumber = reactive([]);
const status = reactive([]);
const selected = reactive([[], [], []]);
let questions = reactive([]);
let currentType = ref(0);
let showAnswer = ref(false);

const getQuestions = async () => {
  const response = await fetch("/questions/partTwo.json");
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
</script>

<template>
  <main class="main">
    <h1 class="title">
      <el-space>
        <el-icon @click="router.back()" class="back"><Back /></el-icon>
        <span>争分夺秒</span>
      </el-space>
    </h1>

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
          typeof showNumber[currentType] === 'number' && !status[currentType]
        "
      >
        <div>
          {{ questions[currentType]?.[showNumber?.[currentType]]?.question }}
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
            {{ questions[currentType]?.[showNumber?.[currentType]]?.answer }}
          </div>
        </div>
      </div>
    </el-card>

    <div class="select">
      <div class="left">
        <el-radio-group
          v-model="currentType"
          size="large"
          style="margin-bottom: 10px"
        >
          <el-radio-button
            v-for="(type, index) in types"
            :key="index"
            :label="type.value"
          >
            {{ type.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="center">
        <el-button
          @click="toggle(currentType)"
          size="large"
          style="width: 100%"
          :type="status[currentType] ? 'danger' : 'success'"
        >
          {{ status[currentType] ? "停止" : "开始" }}
        </el-button>
      </div>
      <div class="right">
        <el-button
          type="primary"
          size="large"
          @click="showAnswer = !showAnswer"
          :disabled="
            status[currentType] || typeof showNumber?.[currentType] !== 'number'
          "
        >
          {{ showAnswer ? "隐藏答案" : "查看答案" }}
        </el-button>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
}
.title {
  text-align: center;
  padding: 40px 0;
  font-weight: bold;
  .back {
    cursor: pointer;
  }
}

.question {
  flex: 1;
  overflow-y: auto;
  .question-title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
    .number {
      display: inline-block;
      text-align: center;
      min-width: 100px;
      font-size: 48px;
      font-weight: bold;
    }
  }
  .content {
    font-size: 24px;
    text-indent: 48px;
  }
  .options {
    margin-top: 10px;
    .option-index {
      margin-right: 8px;
    }
  }

  .answer {
    margin-top: 40px;
  }
}

.select {
  padding: 40px 0;
  display: flex;
  .center {
    margin: 0 20px;
    flex: 1;
  }
}
</style>
