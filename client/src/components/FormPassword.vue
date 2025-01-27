<script lang="ts" setup>
import { reactive, defineEmits, ref, onMounted } from "vue";
import { useValidation } from "../composables/useFormValidation";
import type { FormData } from "../models/formModel";
import axios from "axios";

const userId = ref("");
const emit = defineEmits(['formSubmitted']);
const titleFrom = ref({
  title: 'Create your Gaming Passport',
  titlePassword: "New password",
  subtTitlePassword: 'Repeat password'
})
const form = reactive<FormData>({
  password: "",
  confirmPassword: "",
});

const {  isEdit } = defineProps({
  informationEdit: {
    type: Object,
  },
  isEdit: {
    type: Boolean,
  },
});


const { errors, validateForm } = useValidation(form);

const onSutmitGeneral = () => {
  if (isEdit) {
    onSubmitEdit();
  } else {
    onSubmit();
  }
  
}

// Función de envío del formulario
const onSubmit = async () => {
  const isValid = await validateForm();
  if (isValid) {
    try {
      // Enviar el formulario a la API o realizar otras acciones
      
      const response = await axios.post("http://localhost:3000/api/users", {
        password: form.password,
      });
      const userId = response.data.id; // Asegúrate de que la API devuelva el ID como `id`
      localStorage.setItem('userId', userId); 
      emit('formSubmitted', true);  
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }

  } else {
    emit('formSubmitted', false);
  }
};

const onSubmitEdit = async () => {
  const isValid = await validateForm();
  if (isValid) {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${Number(userId.value)}`, {
        password: form.password,
      })
      // Enviar el formulario a la API o realizar otras acciones
      emit('formSubmitted', true);  
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }
}

defineExpose({
  triggerSubmit: onSutmitGeneral, // Permite que el componente padre llame a esta función
});


onMounted(() => {
  userId.value = localStorage.getItem('userId') || '';
})

</script>
<template>
  <div class="flex items-center justify-center h-[240px]">
    <form @submit.prevent="onSutmitGeneral" class=" w-[276px] flex flex-col gap-4">
      <h2 class=" text-[18px]  text-white">{{titleFrom.title  }}</h2>
      
      <!-- Campo de Contraseña -->
      <div class="">
        <label for="password" class="block text-white text-[14px]">{{ titleFrom.titlePassword }}</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="h-8 mt-1 pl-4 font-bold text-sm block w-full border-gray-300 rounded-md bg-white  password-style"
        />
        <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
      </div>

      <!-- Campo de Confirmar Contraseña -->
      <div class="">
        <label for="confirmPassword" class="block text-[14px] text-white">{{ titleFrom.subtTitlePassword }}</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          id="confirmPassword"
          class="mt-1 h-8 pl-4 font-bold block text-sm w-full border-gray-300 rounded-md bg-white password-style"
        />
        <p v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.password-style {
  letter-spacing: 3px;
}
</style>
