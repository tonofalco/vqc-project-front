import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ExtraDay, ExtraDayCreate, ExtraDayUpdate } from 'src/interfaces';
import { ExtraDayService } from "src/services";

interface ExtraDayState {
  extraDays: ExtraDay[];
  loading: boolean;
  error: string | null;
  activeExtraDay: ExtraDay | null;

  fetchExtraDays: () => Promise<ExtraDay[]>;
  addExtraDay: (newExtraDay: ExtraDayCreate) => Promise<boolean>;
  updateExtraDay: (id: number, extraDayData: ExtraDayUpdate) => Promise<boolean>;
  deleteExtraDay: (id: number) => Promise<boolean>;
  setActiveExtraDay: (extraDay: ExtraDay | null) => void;
}

export const useExtraDayStore = create<ExtraDayState>()(
  devtools((set, get) => ({
    extraDays: [],
    activeExtraDay: null,
    loading: false,
    error: null,

    // Función para obtener todos los costos de día extra
    fetchExtraDays: async (): Promise<ExtraDay[]> => {
      set({ loading: true, error: null });
      try {
        const extraDays = await ExtraDayService.getAllExtraDays();
        set({ extraDays, loading: false });
        return extraDays;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        throw error;
      }
    },

    // Función para agregar un nuevo costo de día extra
    addExtraDay: async (newExtraDay: ExtraDayCreate): Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        const createdExtraDay = await ExtraDayService.createExtraDay(newExtraDay);
        await get().fetchExtraDays();
        // Actualizamos la lista local añadiendo el nuevo costo
        set((state) => ({
          extraDays: [...state.extraDays, createdExtraDay],
          loading: false
        }));
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Actualización de costo de día extra, recibe el ID y los datos a actualizar
    updateExtraDay: async (id: number, extraDay: ExtraDayUpdate): Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        await ExtraDayService.updateExtraDay(id, extraDay);
        await get().fetchExtraDays(); // Refrescar la tabla automáticamente
        set({ loading: false });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Función para eliminar un costo de día extra por ID
    deleteExtraDay: async (id: number): Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        await ExtraDayService.deleteExtraDay(id);

        // Refrescamos la lista completa para que la tabla se actualice
        await get().fetchExtraDays();

        set({ loading: false });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Función para establecer el costo activo (para edición)
    setActiveExtraDay: (extraDay: ExtraDay | null) => set({ activeExtraDay: extraDay }),
  }))
);