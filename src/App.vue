<script setup>
import ButtonVue from "./components/ui-shared/Button.vue";
import { ref, onMounted } from "vue";

const log = console.log;

// component states
const isMobile = ref(false);

// media queries
const mql = window.matchMedia("(width <= 768px)");
isMobile.value = mql.matches;

// event handlers
function handleNextButton() {}

function handlePrevButton() {}

function handleDefaultClick() {
  log(isMobile.value);
}

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
    class="multi-form bg-white shadow-lg md:rounded-xl md:p-3 w-full min-h-[max(600px,100dvh)] md:w-[90%] md:h-[500px] md:min-h-[700px] lg:w-[85%] 2xl:w-[min(1250px,65%)] md:flex md:justify-between"
  >
    <template v-if="isMobile">
      <!-- mobile -->
      <div>
        <p>Mobile version</p>
        <ButtonVue text="Next Step" :handle-click="handleDefaultClick" />
      </div>
    </template>

    <template v-else>
      <!-- desktop -->
      <div
        class="multi-form-links bg-[url(./assets/images/bg-sidebar-desktop.svg)] bg-no-repeat bg-cover border-2 w-[30%] rounded-xl"
      ></div>
      <div class="multi-form-contents bg-amber-400 w-[60%] p-3">
        <div></div>
        <div>
          <ButtonVue text="Confirm" :handle-click="handleDefaultClick" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
