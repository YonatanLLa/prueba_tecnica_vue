<script lang="ts" setup>
import Modal from "../components/Modal.vue";
import { useModal } from "../composables/useModal";
import { useSteps } from "../composables/useSteps";

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


</script>
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Ejemplo de Modal Dinámico</h1>

    <button
      @click="openModalGeneral"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Abrir Modal
    </button>

    <button
      @click="openConfigModal"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Config
    </button>

    <Modal />
  </div>
</template>

