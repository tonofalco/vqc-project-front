import { AxiosError } from "axios";
import { vqcBackendApi } from "src/api/vqc-backend.api";
import { ExtraDay, ExtraDayCreate, ExtraDayUpdate } from "src/interfaces";


export class ExtraDayService {
  // Obtener todos los costos de día extra
  static readonly getAllExtraDays = async (): Promise<ExtraDay[]> => {
    try {
      const { data } = await vqcBackendApi.get("/cost/extraDay");
      return data.costosDiaExtra;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al obtener costos de día extra en servicio");
      }
      throw new Error("Error al obtener costos de día extra en aplicativo");
    }
  };

  // Crear un nuevo costo de día extra
  static readonly createExtraDay = async (extraDay: ExtraDayCreate): Promise<ExtraDay> => {
    try {
      const { data } = await vqcBackendApi.post("/cost/extraDay/new", extraDay);
      return data.costoDiaExtra;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al crear costo de día extra en servicio");
      }
      throw new Error("Error al crear costo de día extra en aplicativo");
    }
  };

  // Actualizar un costo de día extra existente
  static readonly updateExtraDay = async (id: number, extraDay: ExtraDayUpdate): Promise<ExtraDay> => {
    try {
      const { data } = await vqcBackendApi.put(`/cost/extraDay/${id}`, extraDay);
      return data.costoDiaExtra;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al actualizar costo de día extra en servicio");
      }
      throw new Error("Error al actualizar costo de día extra en aplicativo");
    }
  };

  // Eliminar un costo de día extra por ID
  static readonly deleteExtraDay = async (id: number): Promise<void> => {
    try {
      await vqcBackendApi.delete(`/cost/extraDay/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al eliminar costo de día extra en servicio");
      }
      throw new Error("Error al eliminar costo de día extra en aplicativo");
    }
  };
}

