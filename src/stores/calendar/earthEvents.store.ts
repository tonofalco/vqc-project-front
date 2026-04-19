import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { EarthEvent, EarthEventCreate, EarthEventUpdate } from 'src/interfaces';
import { EarthEventsService } from "src/services";

interface EarthEventsState {
  earthEvents: EarthEvent[];
  loading: boolean;
  error: string | null;
  activeEarthEvent: EarthEvent | null;

  fetchEarthEvents: () => Promise<EarthEvent[]>;
  addEarthEvent: (newEarthEvent: EarthEventCreate) => Promise<boolean>;
  updateEarthEvent: (id: number, earthEventData: EarthEventUpdate) => Promise<boolean>;
  deleteEarthEvent: (id: number) => Promise<boolean>;
  setActiveEarthEvent: (earthEvent: EarthEvent | null) => void;
}

export const useEarthEventsStore = create<EarthEventsState>()(
  devtools((set, get) => ({
    earthEvents: [],
    activeEarthEvent: null,
    loading: false,
    error: null,

    // Función para obtener todos los viajes terrestres
    fetchEarthEvents: async (): Promise<EarthEvent[]> => {
      set({ loading: true, error: null });
      try {
        const earthEvents = await EarthEventsService.getAllEarthEvents();
        set({ earthEvents, loading: false });
        return earthEvents;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        throw error;
      }
    },

    // Función para agregar un nuevo viaje terrestre
    addEarthEvent: async (newEarthEvent: EarthEventCreate): Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        const createdEarthEvent = await EarthEventsService.createEarthEvent(newEarthEvent);
        await get().fetchEarthEvents();
        // Actualizamos la lista local añadiendo el nuevo viaje
        set((state) => ({
          earthEvents: [...state.earthEvents, createdEarthEvent],
          loading: false
        }));
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Actualización de viaje terrestre, recibe el ID y los datos a actualizar
    updateEarthEvent: async (id: number, earthEvent: EarthEventUpdate): Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        await EarthEventsService.updateEarthEvent(id, earthEvent);
        await get().fetchEarthEvents(); // Refrescar la tabla automáticamente
        set({ loading: false });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Función para eliminar un viaje terrestre por ID
    deleteEarthEvent: async (id: number): Promise<boolean> => {
      set({ loading: true, error: null });
      try {
        await EarthEventsService.deleteEarthEvent(id);

        // Refrescamos la lista completa para que la tabla se actualice
        await get().fetchEarthEvents();

        set({ loading: false });
        return true;
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        set({ error: message, loading: false });
        return false;
      }
    },

    // Función para establecer el viaje activo (para edición)
    setActiveEarthEvent: (earthEvent: EarthEvent | null) => set({ activeEarthEvent: earthEvent }),
  }))
);
