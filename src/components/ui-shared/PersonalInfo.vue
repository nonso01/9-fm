<script setup>
import Button from "./Button.vue";
import {
  validatePhoneNumber,
  validateUserEmail,
  validateUserName,
  log,
} from "../lib";
import { onMounted, ref } from "vue";

const props = defineProps({
  formActionURL: String,
});

const form = ref(null);
const submitter = ref(null);

const userNameInput = ref(null);
const userEmailInput = ref(null);
const userPhoneInput = ref(null);

const inputValues = ref({
  name: "",
  email: "",
  phone: "",
});

const validationErrors = ref({
  name: false,
  email: false,
  phone: false,
});

// see: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
function handleFormSubmit(e) {
  e.preventDefault();
  const report = form.value.reportValidity();
  log("form DATAAAAAAAAAAAAA");

  // let confirmUserName = validateUserName(userNameInput?.value);
  // let confirmUserEmail = validateUserEmail(userEmailInput?.value);
  // let confirmUserPhone = validatePhoneNumber(userPhoneInput?.value);

  // const isAllValid = form.reportValidity();

  // // log(userNameInput?.validity);
  // log(confirmUserName);

  // Collect the data
  // const formData = new FormData(form, submitter);
  // let postData = JSON.stringify(Object.fromEntries(formData));

  // const req = new Request(formActionURL, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: postData,
  // });

  // fetch(req)
  //   .then((res) => res.json())
  //   .then((data) => log(data))
  //   .catch((error) => console.error(error));
}

onMounted(() => {
  // update states on input
  userNameInput.value.oninput = (e) => {
    inputValues.value.name = e?.target.value ?? "";
    log(inputValues.value.name);
  };

  userEmailInput.value.oninput = (e) => {
    inputValues.value.email = e?.target.value ?? "";
    log(inputValues.value.email);
  };

  userPhoneInput.value.oninput = (e) => {
    inputValues.value.phone = e?.target.value ?? "";
    log(inputValues.value.phone);
  };
});
</script>

<template>
  <div class="app-personal-info h-full flex flex-col gap-10">
    <div class="h-[13%] flex flex-col justify-between">
      <h1 class="text-4xl text-blue-950 font-semibold">Personal Info</h1>
      <p class="text-grey-500 lg:text-lg">
        Please provide your name, email address and phone number
      </p>
    </div>
    <form
      method="post"
      :action="formActionURL"
      id="app-form"
      ref="form"
      class="h-[50%] flex flex-col justify-around"
    >
      <div class="app-input-group">
        <label for="name">
          <span class="text-blue-950 font-medium">Name</span>
          <span class="text-red-500" v-if="validationErrors?.name"
            >Error Message</span
          >
        </label>
        <input
          ref="userNameInput"
          id="name"
          type="text"
          name="username"
          autocomplete="username"
          placeholder="e.g. Nonso Martin"
          required
          minlength="2"
          maxlength="50"
        />
      </div>
      <div class="app-input-group">
        <label for="email">
          <span class="text-blue-950 font-medium">Email Address</span>
          <span class="text-red-500" v-if="validationErrors?.email"
            >Error Message</span
          >
        </label>
        <input
          ref="userEmailInput"
          type="email"
          name="useremail"
          id="email"
          autocomplete="email"
          placeholder="e.g. your@email.com"
          required
          minlength="5"
          maxlength="254"
        />
      </div>
      <div class="app-input-group">
        <label for="phone">
          <span class="text-blue-950 font-medium">Phone Number</span>
          <span class="text-red-500" v-if="validationErrors?.phone"
            >Error Message</span
          >
        </label>
        <input
          ref="userPhoneInput"
          type="tel"
          name="userphone"
          id="phone"
          autocomplete="cc-number"
          placeholder="e.g. +234 700 000 900"
          required
          minlength="7"
          maxlength="15"
        />
      </div>
    </form>

    <div class="app-buttom-button flex justify-end mt-[min(100px,15%)]">
      <slot></slot>
      <Button
        ref="submitter"
        text="Next Step"
        formType="submit"
        :handleClick="handleFormSubmit"
        class=""
      />
    </div>
  </div>
</template>

<style>
.debbug {
  border: 2px solid red;
}

.app-input-group {
  /* border: 2px solid green; */
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 0.3rem;
}

input {
  border: 2px solid var(--color-grey-500);
  height: max(60px, 55%);
  border-radius: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2.5);
  &::placeholder {
    color: var(--color-grey-500);
    font-weight: var(--font-weight-medium);
  }
}
</style>
