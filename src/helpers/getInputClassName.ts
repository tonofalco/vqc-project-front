import { EarthEventFormData } from "src/interfaces";

/**
 * Retorna las clases CSS para un input basado en si el campo está vacío
 * @param fieldName Nombre del campo
 * @param emptyFields Set de campos vacíos
 * @returns String con clases CSS
 */
export const getInputClassName = (
  fieldName: keyof EarthEventFormData,
  emptyFields: Set<keyof EarthEventFormData>
): string => {
  const baseClass = ""; // Aquí puedes agregar clases base si lo necesitas
  const isFieldEmpty = emptyFields.has(fieldName);
  
  return isFieldEmpty ? "border-2 border-red-500 bg-red-50" : baseClass;
};
