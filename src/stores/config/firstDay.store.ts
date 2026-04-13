import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { FirstDay, FirstDayUpdate } from 'src/interfaces';
import { FirstDayService } from "src/services";

interface FirstDayState {
  firstDays: FirstDay[];
  loading: boolean;
  error: string | null;
  activeFirstDay: FirstDay | null;

  fetchFirstDayCosts: () => Promise<FirstDay[]>;
  updateFirstDayCost: (id: number, firstDayData: FirstDayUpdate) => Promise<boolean>;
  setActiveFirstDay: (firstDay: FirstDay | null) => void;
}

export const useFirstDayStore = create<FirstDayState>()(
  devtools((set, get) => ({
    firstDays: [],
    activeFirstDay: null,
    loading: false,
    error: null,

    // Función para obtener todos los costos del primer día
    fetchFirstDayCosts: async (): Promise<FirstDay[]> => {
      set({ loading: true, error: null });
      try {
        const firstDays = await FirstDayService.getAllFirstDayCosts();
        set({ firstDays, loading: false });
        return firstDays;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        throw error;
      }
    },

    // Actualización de costo del primer día, recibe el ID y los datos a actualizar
    updateFirstDayCost: async (id: number, firstDay: FirstDayUpdate): Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        await FirstDayService.updateFirstDayCost(id, firstDay);
        await get().fetchFirstDayCosts(); // Refrescar la tabla automáticamente
        set({ loading: false });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Función para establecer el costo activo (para edición)
    setActiveFirstDay: (firstDay: FirstDay | null) => set({ activeFirstDay: firstDay }),
  }))
);
