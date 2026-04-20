import { AxiosError } from "axios";
import { vqcBackendApi } from "src/api/vqc-backend.api";
import { FirstDay, FirstDayUpdate } from "src/interfaces";


export class FirstDayService {
  // Obtener todos los costos del primer día
  static readonly getAllFirstDayCosts = async (): Promise<FirstDay[]> => {
    try {
      const { data } = await vqcBackendApi.get("/cost/firstDayCosts");
      return data.costesKms;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al obtener costos del primer día en servicio");
      }
      throw new Error("Error al obtener costos del primer día en aplicativo");
    }
  };

  // Actualizar un costo del primer día existente
  static readonly updateFirstDayCost = async (id: number, firstDay: FirstDayUpdate): Promise<FirstDay> => {
    try {
      const { data } = await vqcBackendApi.put(`/cost/firstDayCosts/${id}`, firstDay);
      return data.configuracion;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.msg || "Error al actualizar costo del primer día en servicio");
      }
      throw new Error("Error al actualizar costo del primer día en aplicativo");
    }
  };
}
