<script setup>
// import Loader from "./components/ui-shared/Loader.vue";
import Button from "./components/ui-shared/Button.vue";
import PersonalInfo from "./components/ui-shared/PersonalInfo.vue";
import { ref, onMounted } from "vue";

import { formActionURL, componentList } from "./components/lib";

const log = console.log;

// component states
const isMobile = ref(false);
const confirmFormData = ref({});

const pages = ref({});

const validRequiredFields = ref({
  name: { valid: false, message: "name required" },
  email: { value: false, message: "email required" },
  phone: { value: false, message: "phone number required" },
});

// media queries
const mql = window.matchMedia("(width <= 768px)");
isMobile.value = mql.matches;

// event handlers
function handleNextButton() {}

function handlePrevButton() {}

function handleDefaultClick() {
  log(isMobile.value);
}

// Post Personal Info
// function handlePostPersonalInfo() {}

// When mounted
onMounted(() => {
  mql.onchange = (e) => {
    // log(e?.matches);
    isMobile.value = e?.matches;
  };

  // fetch and open connection to the server
  const req = new Request("http://127.0.0.1:3000", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  fetch(req)
    .then((res) => res.json())
    .then((data) => log(data))
    .catch((error) => console.error(error));
});
</script>

<template>
  <div
    class="multi-form bg-white shadow-lg md:rounded-3xl md:p-3 w-full min-h-[max(600px,100dvh)] md:w-[90%] md:h-[500px] md:min-h-[700px] lg:w-[85%] 2xl:w-[min(1250px,65%)] md:flex md:justify-between"
  >
    <template v-if="isMobile">
      <!-- mobile -->

      <div>
        <p>Mobile version</p>
        <Button text="Next Step" :handle-click="handleDefaultClick" />
      </div>
    </template>

    <template v-else>
      <!-- desktop -->
      <div
        class="multi-form-links bg-[url(./assets/images/bg-sidebar-desktop.svg)] bg-no-repeat bg-cover w-[30%] rounded-xl flex flex-col gap-2.5 pt-10 px-5"
      >
        <div
          v-for="(item, index) in componentList"
          class=" h-20 flex items-center gap-x-4"
        >
          <div
            class="h-12.5 w-12.5 text-blue-50 text-lg font-medium border-2 border-blue-50 rounded-full flex justify-center align-center items-center"
          >
            {{ index + 1 }}
          </div>
          <div class="flex flex-col justify-evenly gap-y-1">
            <span class="text-grey-500">STEP {{ index + 1 }}</span>
            <span class="text-blue-50 font-semibold">{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="multi-form-contents bg-amb w-[60%] p-3 pt-10 pr-[10%]">
        <PersonalInfo :formActionURL="formActionURL"> </PersonalInfo>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
