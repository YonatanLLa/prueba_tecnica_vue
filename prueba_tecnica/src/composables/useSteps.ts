// composables/useSteps.ts
import { ref, computed } from "vue";

export function useSteps() {
  // Estado reactivo para el paso actual
  const currentStep = ref(1);

  // Lista de pasos
  const steps = ref([
    { id: 1, color: "#BABABA" },
    { id: 2, color: "#BABABA" },
    { id: 3, color: "#BABABA" },
  ]);

  // Método para obtener el color de cada paso dinámicamente
  const getStepColor = (stepId: number) => {
    return stepId <= currentStep.value ? "#019E11" : "#BABABA";
  };

  // Computado para actualizar los pasos con los colores correspondientes
  const computedSteps = computed(() =>
    steps.value.map((step) => ({
      ...step,
      color: getStepColor(step.id),
    }))
  );

  // Método para avanzar al siguiente paso
  const nextStep = () => {
    if (currentStep.value < steps.value.length) {
      currentStep.value++;
    }
  };

  const resetSteps = () => {
    currentStep.value = 2; // Reinicia al primer paso
    steps.value = steps.value.map((step) => ({
      ...step,
      color: "#BABABA", // Restaura el color inicial
    }));
  };

  return {
    currentStep,
    computedSteps,
    nextStep,
    resetSteps,
  };
}
