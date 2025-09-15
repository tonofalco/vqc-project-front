
import { AxiosError } from "axios";
import { vqcBackendApi } from "../api/vqc-backend.api";

export interface EarthEvent {
  id?: string;
  seats: number;
  status: string;
  transport: string;
  transportNumber: string;
  nameClient: string;
  phone: string;
  departure: string;
  destination: string;
  price: number;
  advance: number;
  start: string;
  end: string;
  user: {
    name: string;
  };
  userId: string;
}

export class EarthEventService {
  static getAll = async (): Promise<EarthEvent[]> => {
    try {
      const { data } = await vqcBackendApi.get("/earthEvents");
      return data.eventos || data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al obtener eventos:", error.response?.data);
        throw new Error(error.response?.data?.msg || "Error al obtener eventos");
      }
      throw new Error("Error al obtener eventos");
    }
  };

  static create = async (event: EarthEvent): Promise<EarthEvent> => {
    try {
      const { data } = await vqcBackendApi.post("/earthEvents", event);
      return data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al crear evento:", error.response?.data);
        throw new Error(error.response?.data?.msg || "Error al crear evento");
      }
      throw new Error("Error al crear evento");
    }
  };

  static update = async (id: string, event: Partial<EarthEvent>): Promise<EarthEvent> => {
    try {
      const { data } = await vqcBackendApi.put(`/earthEvents/${id}`, event);
      return data.event;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al actualizar evento:", error.response?.data);
        throw new Error(error.response?.data?.msg || "Error al actualizar evento");
      }
      throw new Error("Error al actualizar evento");
    }
  };

  static delete = async (id: string): Promise<void> => {
    try {
      await vqcBackendApi.delete(`/earthEvents/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al eliminar evento:", error.response?.data);
        throw new Error(error.response?.data?.msg || "Error al eliminar evento");
      }
      throw new Error("Error al eliminar evento");
    }
  };
}
