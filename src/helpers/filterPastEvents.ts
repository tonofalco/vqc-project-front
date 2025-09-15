import { useAuthStore } from "../stores";


export const filterPastEvents = <T extends Record<string, any>>(
  events: T[],
  dateField: keyof T,
  monthsBack: number = 3 // valor por defecto: 3 meses
): T[] => {
  const { user } = useAuthStore.getState(); // obtenemos el usuario autenticado
  const userId = user?.uid; // id del usuario logueado

  const now = new Date();
  const pastDate = new Date();
  pastDate.setMonth(now.getMonth() - monthsBack);

  return events
    .filter(event => {
      const date = new Date(event[dateField] as string);

      // condición: dentro del rango de fechas Y creado por el usuario actual
      return (
        date >= pastDate &&
        date <= now &&
        String(event.userId) === String(userId) // comparación segura
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a[dateField] as string).getTime();
      const dateB = new Date(b[dateField] as string).getTime();
      return dateB - dateA; // descendente
    });
};


