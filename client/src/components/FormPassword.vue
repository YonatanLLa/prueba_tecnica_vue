<script lang="ts" setup>
import { reactive, defineEmits, ref, onMounted } from "vue";
import { useValidation } from "../composables/useFormValidation";
import type { FormData } from "../models/formModel";
import axios from "axios";

const userId = ref("");
const showPassword = ref(false);

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

const {  isEdit, informationEdit } = defineProps({
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

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};


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
        await axios.put(`http://localhost:3000/api/users/${Number(userId.value)}`, {
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
        <h2 class=" text-[18px] text-center text-white">{{ isEdit ? informationEdit?.title: titleFrom.title  }}</h2>
        
      
      <!-- Campo de Contraseña -->
      <div class="">
        <label for="password" class="block text-white text-[14px] pl-2">{{ isEdit ? informationEdit?.titlePassword: titleFrom.titlePassword }}</label>
        <div :class="isEdit ? 'flex items-center justify-center gap-3 w-[308px]' : 'lex items-center justify-center gap-3 w-full'" >
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            id="password"
            class="h-8 mt-1 pl-4 font-bold text-sm block w-full border-gray-300 rounded-md bg-white  password-style"
          />
        <button
          type="button"
          v-if="isEdit"
          @click="togglePasswordVisibility"
          class=" right-2 top-2 text-gray-600"
        >
    
          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
         </svg>


      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
        </button>
        </div>
        <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
      </div>

      <!-- Campo de Confirmar Contraseña -->
      <div class="">
        <label for="confirmPassword" class="block text-[14px] text-white pl-2">{{ isEdit ? informationEdit?.subtTitlePassword: titleFrom.subtTitlePassword }}</label>
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
