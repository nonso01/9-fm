<script setup>
const props = defineProps({
  text: { type: String, default: "Hello" },
  handleClick: Function,
});
</script>

<template>
  <div
    class="app-button w-25 h-12 rounded-sm bg-purple-600 flex items-center justify-center"
  >
    <button @click="props.handleClick">{{ props.text }}</button>
  </div>
</template>
