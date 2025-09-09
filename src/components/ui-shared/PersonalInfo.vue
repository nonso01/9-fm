<script setup>
import { ref } from "vue";
const props = defineProps({
  formDataHandler: Function,
  formActionURL: String,
  validationErrors: Object,
});
</script>

<template>
  <div class="app-personal-info">
    <div>
      <h1 class="text-4xl text-blue-950 font-semibold">Personal Info</h1>
      <p class="text-grey-500">
        Please provide your name, email and phone number
      </p>
    </div>
    <form method="post" :action="formActionURL" id="app-form">
      <div class="app-input-group">
        <label for="name">
          <span class="text-blue-950">Name</span>
          <span class="text-red-500" v-if="validationErrors?.name"
            >Error Message</span
          >
        </label>
        <input
          id="name"
          type="text"
          name="name"
          autocomplete="username"
          placeholder="Your Name"
          required
          minlength="2"
          maxlength="50"
        />
      </div>
      <div class="app-input-group">
        <label for="email">
          <span class="text-blue-950">Email Address</span>
          <span class="text-red-500" v-if="validationErrors?.email"
            >Error Message</span
          >
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autocomplete="email"
          placeholder="your@email.com"
          required
          maxlength="254"
        />
      </div>
      <div class="app-input-group">
        <label for="number">
          <span class="text-blue-950">Phone Number</span>
          <span class="text-red-500" v-if="validationErrors?.number"
            >Error Message</span
          >
        </label>
        <input
          type="number"
          name="number"
          id="number"
          autocomplete="cc-number"
          placeholder="+234 700 000 900"
          required
          minlength="7"
          maxlength="15"
        />
      </div>
    </form>

    <div class="app-buttom-button"><slot></slot></div>
  </div>
</template>

<style>
input {
  border: 2px solid var(--color-grey-500);
  &::placeholder {
    color: var(--color-grey-500);
  }
}
</style>
