import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { EarthEventGetData, EarthEventRequest } from 'src/interfaces';
import { EarthEventsService } from "src/services";

interface EarthEventsState {
  earthEvents: EarthEventGetData[];
  loading: boolean;
  error: string | null;
  activeEarthEvent: EarthEventGetData | null;

  fetchEarthEvents: () => Promise<EarthEventGetData[]>;
  addEarthEvent: (newEarthEvent: EarthEventRequest) => Promise<boolean>;
  updateEarthEvent: (id: number, earthEventData: EarthEventRequest) => Promise<boolean>;
  deleteEarthEvent: (id: number) => Promise<boolean>;
  setActiveEarthEvent: (earthEvent: EarthEventGetData | null) => void;
}

export const useEarthEventsStore = create<EarthEventsState>()(
  devtools((set, get) => ({
    earthEvents: [],
    activeEarthEvent: null,
    loading: false,
    error: null,

    // Función para obtener todos los viajes terrestres
    fetchEarthEvents: async (): Promise<EarthEventGetData[]> => {
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
    addEarthEvent: async (newEarthEvent: EarthEventRequest): Promise<boolean> => {
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
    updateEarthEvent: async (id: number, earthEvent: EarthEventRequest): Promise<boolean> => {
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
    setActiveEarthEvent: (earthEvent: EarthEventGetData | null) => set({ activeEarthEvent: earthEvent }),
  }))
);
