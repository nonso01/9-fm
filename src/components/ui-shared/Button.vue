<script setup>
const props = defineProps({
  text: { type: String, default: "Hello" },
  formType: { type: String },
  handleClick: Function,
});
</script>

<template>
    <button
      class="app-button w-30 h-12 rounded-sm bg-purple-600 flex items-center justify-center text-white cursor-pointer  font-medium"
      :type="formType ? formType : undefined"
      @click="props.handleClick"
    >
      {{ props.text }}
    </button>
</template>
