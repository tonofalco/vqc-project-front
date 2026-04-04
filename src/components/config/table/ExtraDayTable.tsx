
import { Card, Typography } from "@material-tailwind/react";
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import { TooltipCustom } from "src/components/shared/tooltip/TooltipCustom.tsx";
import { useExtraDay } from "src/hooks";
import { TableProps } from "src/interfaces";


const TABLE_HEAD = ["Costo", "Entre semana", "Fin semana", "Acciones"];


export const ExtraDayTable = ({ currentPage, itemsPerPage, setPage, events }: TableProps) => {

  const { handleUpdateExtraDayModal, handleDelete, loading } = useExtraDay();
  // calcular rango de eventos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = (events || []).slice(startIndex, endIndex);

  const tdClasses = "p-4 border-b border-blue-gray-50 max-w-[250px] break-words";


  return (
    <Card className="h-full w-full overflow-auto" {...({} as any)}>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography {...({} as any)}
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((extraDay, index) => {
              // 🛡️ VALIDACIÓN CRÍTICA: Si 'extraDay' es undefined, no renderizamos nada para esa fila
              if (!extraDay) return null;

              // Desestructuramos con valores por defecto y manejando posibles nombres de ID
              const { id, _id, cost, valueEs, valueFs } = extraDay;
              const extraDayId = id || _id || `temp-${index}`; // Fallback para el ID

              const isLast = index === paginatedEvents.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={extraDayId}>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      {cost || 'Sin costo'}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      ${valueEs || 0}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      ${valueFs || 0}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <div className="flex gap-2">
                      <TooltipCustom content="Editar costo" placement="top">
                        <button
                          className="edit-button"
                          onClick={() => handleUpdateExtraDayModal({ id: extraDayId, cost, valueEs, valueFs })}
                        >
                          <IoPencilSharp />
                        </button>
                      </TooltipCustom>
                      <TooltipCustom content="Eliminar costo" placement="top">
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(extraDayId, cost)}
                          disabled={loading}><IoTrashOutline /></button>
                      </TooltipCustom>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No hay costos de día extra registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-start gap-2 mt-4 mb-4 ms-4 lg:ms-0 lg:justify-center">
        {Array.from({ length: Math.ceil(events.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 hover:bg-blue-400 text-white" : "bg-gray-200"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </Card>
  );
};
