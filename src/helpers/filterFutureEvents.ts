// utils/filterByFutureDate.ts
export const filterFutureEvents = <T extends Record<string, any>>(
  items: T[],
  dateKey: keyof T
): T[] => {
  const today = new Date();
  return items.filter(item => {
    const dateValue = item[dateKey];
    if (!dateValue) return false;
    return new Date(dateValue as string) > today;
  });
};
