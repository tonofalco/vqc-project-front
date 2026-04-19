import { AxiosError } from "axios";
import { vqcBackendApi } from "src/api/vqc-backend.api";
import { EarthEvent, EarthEventCreate, EarthEventUpdate } from "src/interfaces";


export class EarthEventsService {
  // Obtener todos los viajes terrestres
  static readonly getAllEarthEvents = async (): Promise<EarthEvent[]> => {
    try {
      const { data } = await vqcBackendApi.get("/earthEvents");
      return data.eventos;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al obtener viajes terrestres en servicio");
      }
      throw new Error("Error al obtener viajes terrestres en aplicativo");
    }
  };

  // Crear un nuevo viaje terrestre
  static readonly createEarthEvent = async (earthEvent: EarthEventCreate): Promise<EarthEvent> => {
    try {
      const { data } = await vqcBackendApi.post("/earthEvents", earthEvent);
      return data.evento;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al crear viaje terrestre en servicio");
      }
      throw new Error("Error al crear viaje terrestre en aplicativo");
    }
  };

  // Actualizar un viaje terrestre existente
  static readonly updateEarthEvent = async (id: number, earthEvent: EarthEventUpdate): Promise<EarthEvent> => {
    try {
      const { data } = await vqcBackendApi.put(`/earthEvents/${id}`, earthEvent);
      return data.evento;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al actualizar viaje terrestre en servicio");
      }
      throw new Error("Error al actualizar viaje terrestre en aplicativo");
    }
  };

  // Eliminar un viaje terrestre por ID
  static readonly deleteEarthEvent = async (id: number): Promise<void> => {
    try {
      await vqcBackendApi.delete(`/earthEvents/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al eliminar viaje terrestre en servicio");
      }
      throw new Error("Error al eliminar viaje terrestre en aplicativo");
    }
  };
}
