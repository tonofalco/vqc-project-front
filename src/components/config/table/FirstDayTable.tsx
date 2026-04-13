
import { Card, Typography } from "@material-tailwind/react";
import { IoPencilSharp } from "react-icons/io5";
import { TooltipCustom } from "src/components/shared/tooltip/TooltipCustom.tsx";
import { useFirstDay } from "src/hooks";
import { TableProps } from "src/interfaces";


const TABLE_HEAD = ["ID", "Gasolina", "Salario", "Casetas", "Mantenimiento", "Servicios", "Suplemento", "Acciones"];


export const FirstDayTable = ({ currentPage, itemsPerPage, setPage, events }: TableProps) => {

  const { handleUpdateFirstDayModal, loading } = useFirstDay();
  // calcular rango de eventos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = (events || []).slice(startIndex, endIndex);

  const tdClasses = "p-4 border-b border-blue-gray-50 max-w-[100px] break-words";


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
            paginatedEvents.map((firstDay, index) => {
              // 🛡️ VALIDACIÓN CRÍTICA: Si 'firstDay' es undefined, no renderizamos nada para esa fila
              if (!firstDay) return null;

              // Desestructuramos con valores por defecto
              const { id, _id, gasoline, salary, booths, maintenance, utility, supplement } = firstDay;
              const firstDayId = id || _id || `temp-${index}`; // Fallback para el ID

              const isLast = index === paginatedEvents.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={firstDayId}>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      {firstDayId}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      ${gasoline || 0}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      ${salary || 0}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      ${booths || 0}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      ${maintenance || 0}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      ${utility || 0}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      ${supplement || 0}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <div className="flex gap-2">
                      <TooltipCustom content="Editar costos" placement="top">
                        <button
                          className="edit-button"
                          onClick={() => handleUpdateFirstDayModal({ id: firstDayId, gasoline, salary, booths, maintenance, utility, supplement })}
                        >
                          <IoPencilSharp />
                        </button>
                      </TooltipCustom>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No hay costos del primer día registrados
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
