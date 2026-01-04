import { Card, Typography } from "@material-tailwind/react";
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import { TooltipCustom } from "../../shared/tooltip/TooltipCustom";
import { useUser } from "../../../hooks";



const TABLE_HEAD = ["Nombre", "Email", "Rol", "Acciones"];

interface TravelTableProps {
  currentPage: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  events: Array<any>;
}

export const UsersTable = ({ currentPage, itemsPerPage, setPage, events }: TravelTableProps) => {

  const { handleSelectUser } = useUser();
  // calcular rango de eventos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = events.slice(startIndex, endIndex);

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
          {events && events.length > 0 ? (
            paginatedEvents.map(({ id, name, email, role }, index) => {

              const isLast = index === events.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {role}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <span>
                        <TooltipCustom content="Editar usuario" placement="top">
                          <button data-tooltip-target="tooltip-default" className="edit-button me-2"  onClick={() => handleSelectUser({ uid: id, name, email, role, ok:true })}><IoPencilSharp /></button>
                        </TooltipCustom>
                        <TooltipCustom content="Eliminar usuario" placement="top">
                          <button className="delete-button"><IoTrashOutline /></button>
                        </TooltipCustom>
                      </span>
                    </Typography>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-start lg:justify-center gap-2 mt-4 mb-4">
        {Array.from({ length: Math.ceil(events.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </Card>
  );
};
