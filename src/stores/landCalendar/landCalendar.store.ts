import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { EarthEventService, EarthEvent } from "../../services/landCalendar.service";

interface EarthEventState {
  events: EarthEvent[];
  loading: boolean;
  error: string | null;


  fetchEvents: () => Promise<void>;
  createEvent: (event: EarthEvent) => Promise<void>;
  updateEvent: (id: string, event: Partial<EarthEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

export const useEarthEventStore = create<EarthEventState>()(
  devtools((set, get) => ({
    events: [],
    loading: false,
    error: null,


    fetchEvents: async () => {
      set({ loading: true, error: null });
      try {
        const events = await EarthEventService.getAll();
        set({ events, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    createEvent: async (event) => {
      set({ loading: true, error: null });
      try {
        const newEvent = await EarthEventService.create(event);
        set({ events: [...get().events, newEvent], loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    updateEvent: async (id, event) => {
      set({ loading: true, error: null });
      try {
        const updatedEvent = await EarthEventService.update(id, event);
        set({
          events: get().events.map((e) => (e.id === id ? updatedEvent : e)),
          loading: false,
        });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    deleteEvent: async (id) => {
      set({ loading: true, error: null });
      try {
        await EarthEventService.delete(id);
        set({ events: get().events.filter((e) => e.id !== id), loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

  }))
);
