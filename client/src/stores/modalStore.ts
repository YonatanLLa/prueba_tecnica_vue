import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createModalConfig,
  defaultModalConfig,
} from "../services/modalService";
import type { ModalConfig } from "../models/modalModel";

export const useModalStore = defineStore("modal", () => {
  const isVisible = ref(false);
  const modalConfig = ref<ModalConfig>(defaultModalConfig);

  const showModal = (config: Partial<ModalConfig>) => {
    modalConfig.value = createModalConfig(config);
    isVisible.value = true;
  };

  const hideModal = () => {
    isVisible.value = false;
    modalConfig.value = defaultModalConfig;
  };

  const triggerNext = () => {
    if (modalConfig.value.onNext) modalConfig.value.onNext(); // Llama a la acción dinámica
  };

  return {
    isVisible,
    modalConfig,
    showModal,
    hideModal,
    triggerNext,
  };
});
