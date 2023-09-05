<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const menus = [
  { title: "步步为赢", path: "/partOne" },
  { title: "争分夺秒", path: "/partTwo" },
  { title: "你来我往", path: "/partThree" },
  { title: "尖峰对决", path: "/partFour" },
];
</script>

<template>
  <main class="main">
    <div class="button-wrap">
      <div class="button-item" v-for="menu in menus" :key="menu.path">
        <el-button
          type="primary"
          size="large"
          class="button"
          @click="router.push(menu.path)"
          >{{ menu.title }}</el-button
        >
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  height: 100%;
  width: 100%;
  padding: 0 40px;
  display: flex;
  align-items: center;

  .button-wrap {
    width: 100%;
    .button-item {
      display: block;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      .button {
        width: 100%;
      }
    }
  }
}
</style>
