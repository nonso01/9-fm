<script setup>
const props = defineProps({
  text: { type: String, default: "Hello" },
  formType: { type: String },
  handleClick: Function,
});
</script>

<template>
    <button
      class="app-button w-35 h-13 rounded-sm bg-blue-950 flex items-center justify-center text-white cursor-pointer  font-medium"
      :type="formType ? formType : undefined"
      @click="props.handleClick"
    >
      {{ props.text }}
    </button>
</template>
