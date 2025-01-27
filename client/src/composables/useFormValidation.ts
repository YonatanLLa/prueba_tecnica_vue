import * as yup from "yup";
import { reactive } from "vue";
import type { FormErrors } from "../models/formModel";

// Esquema de validación con yup
const schema = yup.object({
  password: yup
    .string()
    .required("La contraseña es obligatoria")
    .min(12, "La contraseña debe tener al menos 12 caracteres")
    .matches(
      /[a-z]/,
      "La contraseña debe contener al menos una letra minúscula"
    )
    .matches(
      /[A-Z]/,
      "La contraseña debe contener al menos una letra mayúscula"
    )
    .matches(/\d/, "La contraseña debe contener al menos un número"),

  confirmPassword: yup
    .string()
    .required("Debes confirmar tu contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

// Estado para errores
export const useValidation = (form: any) => {
  const errors = reactive<FormErrors>({});

  // Función de validación
  const validateForm = async () => {
    try {
      await schema.validate(form, { abortEarly: false });
      // Si no hay errores, limpia el estado de errores
      Object.keys(errors).forEach(
        (key) => (errors[key as keyof typeof errors] = undefined)
      );
      return true;
    } catch (validationErrors: any) {
      // Si hay errores, asignarlos al estado reactivo
      validationErrors.inner.forEach((err: yup.ValidationError) => {
        errors[err.path as keyof typeof errors] = err.message;
      });
      return false;
    }
  };

  return {
    errors,
    validateForm,
  };
};
