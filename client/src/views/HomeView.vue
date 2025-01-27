<script lang="ts" setup>
import Modal from "../components/Modal.vue";
import { useModal } from "../composables/useModal";
import { useSteps } from "../composables/useSteps";
import { onMounted } from "vue";

const { openFirstModal, openConfigModal, openSecondModal } = useModal();
const { resetSteps  } = useSteps();


const openModalGeneral = () => {
  if (localStorage.getItem('secondModal') === 'SECOND_MODAL') {
    resetSteps();
    openSecondModal();
  }else{
    openFirstModal();
  }
}
onMounted(() => {
  openModalGeneral();
});


</script>
<template>
  <div class="p-6 flex flex-col items-center space-y-6 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800">Modal Dinámico</h1>
    
    <div class="flex space-x-4">
      <button
        @click="openModalGeneral"
        class="px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        Abrir Modal
      </button>

      <button
        @click="openConfigModal"
        class="px-6 py-3 bg-green-500 text-white font-medium text-lg rounded-lg shadow hover:bg-green-600 transition duration-300"
      >
        Configuración
      </button>
    </div>

    <Modal />
  </div>
</template>


