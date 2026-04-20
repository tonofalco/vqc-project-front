import { EarthEventFormData } from "src/interfaces";

/**
 * Valida los campos requeridos y retorna cuáles están vacíos
 * @param formData Datos del formulario a validar
 * @returns Conjunto de nombres de campos que están vacíos
 */
export const getEmptyRequiredFields = (formData: EarthEventFormData): Set<keyof EarthEventFormData> => {
  const requiredFields: (keyof EarthEventFormData)[] = [
    'transportNumber', 'transport', 'seats', 'nameClient', 'phone',
    'departure', 'destination', 'price', 'advance', 'start', 'end'
  ];

  return new Set(requiredFields.filter(field => !formData[field]));
};

/**
 * Valida si un campo específico está vacío
 * @param fieldName Nombre del campo
 * @param fieldValue Valor del campo
 * @returns true si el campo está vacío
 */
export const isFieldEmpty = (fieldName: keyof EarthEventFormData, fieldValue: string | number): boolean => {
  const requiredFields: (keyof EarthEventFormData)[] = [
    'transportNumber', 'transport', 'seats', 'nameClient', 'phone',
    'departure', 'destination', 'price', 'advance', 'start', 'end'
  ];

  if (!requiredFields.includes(fieldName)) {
    return false; // Campo no es requerido
  }

  return !fieldValue || fieldValue === "" || fieldValue === 0;
};
