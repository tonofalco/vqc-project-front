/**
 * Convierte un timestamp (string o número) a formato datetime-local (hora local)
 * Compatible con inputs HTML5 datetime-local
 */
export const convertTimestampToDatetimeLocal = (timestamp: string | number): string => {
  try {
    let date: Date;

    if (typeof timestamp === "string" && timestamp.includes('T') && timestamp.includes('Z')) {
      date = new Date(timestamp);
    } else if (typeof timestamp === "string") {
      const ms = Number.parseInt(timestamp, 10);
      if (Number.isNaN(ms)) {
        console.warn("No se pudo parsear el timestamp:", timestamp);
        return "";
      }
      date = ms < 10000000000 ? new Date(ms * 1000) : new Date(ms);
    } else {
      date = timestamp < 10000000000 ? new Date(timestamp * 1000) : new Date(timestamp);
    }

    if (Number.isNaN(date.getTime())) {
      console.warn("Fecha inválida:", timestamp);
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (error) {
    console.error("Error al convertir timestamp:", timestamp, error);
    return "";
  }
};

/**
 * Convierte un valor datetime-local a timestamp (milisegundos)
 * Interpreta la hora como hora local del usuario
 */
export const convertDatetimeLocalToTimestamp = (dateTimeLocal: string): number => {
  const [datePart, timePart] = dateTimeLocal.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return date.getTime();
};

/**
 * Obtiene la fecha y hora actual en formato datetime-local
 * Compatible con inputs HTML5 datetime-local
 */
export const getCurrentDatetimeLocal = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
