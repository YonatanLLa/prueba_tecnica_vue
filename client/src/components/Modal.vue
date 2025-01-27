<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useModalStore } from "../stores/modalStore";
import { useSteps } from "../composables/useSteps"; // Importamos el composable
import FormPassword from "./FormPassword.vue";
import { useRouter } from 'vue-router';
import GetFromPassword from "./GetFromPassword.vue";
import {  ref, watch } from "vue";

// Referencia al formulario
const formRef = ref();
const router = useRouter();

const informationEdit = ref({
  title: 'Edit current password',
  titlePassword: "Password",
  subtTitlePassword: 'Repeat password'
});

const isEdit = ref(true);
const secondModal = ref("SECOND_MODAL");
const isVisibleSecondModal = ref(false);

// Referencias al store
const modalStore = useModalStore();
const { isVisible, modalConfig } = storeToRefs(modalStore);
const { hideModal, triggerNext } = modalStore;

const tiggerNextStepFinaly = () => {
  router.push('/island');
  triggerNext();
}

const tiggerNextStep = async () => {
  if (modalConfig.value.isActionFromModal) {
    const isFormValid = await formRef.value?.triggerSubmit();
    if (isFormValid) {
      triggerNext();
      nextStep();
    }
  } else {
    triggerNext();
    nextStep();
  }
};

const handleFormSubmit = (isValid: boolean) => {
  if (isValid) {
    console.log('Formulario enviado correctamente');
    triggerNext();
    nextStep(); 
  } else {
    console.log('Formulario no válido');
  }
};

const hideModalRestSteps = () => {
  if (modalConfig.value.isSecondModal) {
    localStorage.setItem('secondModal', secondModal.value);
    hideModal();
    resetSteps();
    isVisibleSecondModal.value = true;
  } else {
    hideModal();
  }
}
watch(isVisible, (newValue) => {
  const isVisibleSecondModal = localStorage.getItem('secondModal');
  if (isVisibleSecondModal === 'SECOND_MODAL' && newValue) {
    resetSteps();
  }
})

// Usar el composable
const { currentStep, computedSteps, nextStep, resetSteps } = useSteps();
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-[#5B1DAA] rounded-lg shadow-xl w-[452px] h-[560px] flex items-center flex-col justify-center"> 
      <div :class="modalConfig.isVisibleNavegation ? 'flex flex-col items-center gap-9 p-[16px] pt-[20px]' : 'flex flex-col items-center gap-[24px] p-[16px] pt-[20px]'">
        <!-- Indicadores de pasos -->
        <div v-if="!modalConfig.isVisibleNavegation" class="flex gap-[8px]">
          <div
            v-for="(step, index) in computedSteps"
            :key="step.id"
            class="flex justify-center items-center gap-1"
          >
            <!-- Círculo con el color correspondiente -->
            <div
              :style="{ backgroundColor: step.color }"
              class="h-[40px] w-[40px] rounded-full text-[20.87px] flex justify-center items-center"
            >
              <p class="font-bold text-center text-white">
                {{ step.id }}
              </p>
            </div>
            <!-- Línea entre los círculos -->
            <div
              v-if="index < computedSteps.length - 1"
              :class="{
                'bg-[#019E11]': index + 1 < currentStep,
                'bg-[#BABABA]': index + 1 >= currentStep,
              }"
              class="h-[2px] w-[16px] rounded-full"
            ></div>
          </div>
        </div>

        <!-- Contenido -->
        <div :class="modalConfig.isVisibleNavegation ? 'flex flex-col items-center gap-4': 'flex flex-col items-center gap-[8px]'">
          <h2 class="text-white text-[24px] font-bold" v-if="!modalConfig.isVisibleNavegation">{{ modalConfig.title }}</h2>
          <div :class="modalConfig.isVisibleNavegation ? 'flex justify-between items-center w-full' : ''" v-if="modalConfig.isVisibleNavegation">
            <h2 class="text-white text-[24px] font-bold">{{ modalConfig.title }}</h2>
            <button class=" cursor-pointer">
              <svg @click="hideModal"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
          </div>
          <p class="text-[18px] text-white">{{ modalConfig.content }}</p>
        </div>
        <div class="w-[420px] h-[240px] flex items-center justify-center overflow-hidden relative">
          <div v-if="modalConfig.isVisibleImage" class=" w-full h-full">
            <img
              :src="modalConfig.image"
              alt=""
              class="w-[800px] h-full absolute inset-0 object-cover rounded-lg"
            />
            <div class="absolute inset-0 bg-[#5B1DAA]/70 bg-opacity-50 rounded-lg flex flex-col justify-center items-center">
              <img class="w-[100px]" src="/images/money.png" alt="">
              <p class=" text-white text-[22px] font-bold">1400 Legends</p>
            </div>  
          </div>
          <div v-if="modalConfig.isVisibleModal === false && modalConfig.isVisibleImage === false">
            <img
              :src="modalConfig.image"
              alt=""
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div v-if="modalConfig.isVisibleModal" class="relative w-full h-full flex flex-col items-center justify-center">
            <div 
                class="absolute inset-0 w-full h-full bg-cover bg-center rounded-lg" 
                :style="{ backgroundImage: `url(${modalConfig.image})` }"
              >
              <!-- Agrega un overlay opcional si necesitas oscurecer el fondo -->
              <div class="absolute inset-0 bg-[#5B1DAA]/90 bg-opacity-50 rounded-lg"></div>
            </div>
            <div v-if="!modalConfig.isVisibleFromModal && !modalConfig.isVisibleBottomEdit" class="relative z-10 p-8 bg-opacity-90 rounded-lg">
              <FormPassword ref="formRef"  @formSubmitted="handleFormSubmit" />
            </div>
            <div v-if="modalConfig.isVisibleBottomEdit" class="relative z-10 bg-opacity-90 rounded-lg">
              <FormPassword ref="formRef"  :informationEdit="informationEdit"  
              :isEdit="isEdit"
              @formSubmitted="handleFormSubmit" />
            </div>
            <div v-if="modalConfig.isVisibleFromModal" class="relative z-10 bg-opacity-90 rounded-lg">
              <GetFromPassword  />
            </div>
            
            
          </div>
        </div>

      

        <!-- Botones -->
        <div class="w-full mt-4 flex justify-center items-center gap-6">
          <button
            v-if="modalConfig.cancelText !== ''"
            @click="hideModalRestSteps"
            class="px-4 py-1 cursor-pointer bg-gray-300 rounded-[50px] hover:bg-gray-400 w-full"
          >
            {{ modalConfig.cancelText }}
          </button>
          <button
            v-if="!modalConfig.isValidationIsland"
            @click="tiggerNextStep"
            class="px-4 py-1 cursor-pointer bg-white text-[#431680] rounded-[50px] hover:bg-white/80 w-full"
          >
            {{ modalConfig.buttonText }}
          </button>
          <button
            @click="tiggerNextStepFinaly"
            v-if="modalConfig.isValidationIsland"
            class="px-4 py-1 cursor-pointer bg-white text-[#431680] rounded-[50px] hover:bg-white/80 w-full"
          >
            {{ modalConfig.buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos opcionales */
</style>