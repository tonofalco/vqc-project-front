import { Card, Typography } from "@material-tailwind/react";
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import { TooltipCustom } from "src/components/shared/tooltip/TooltipCustom.tsx";
import { useUser } from "src/hooks";


const TABLE_HEAD = ["Nombre", "Email", "Rol", "Acciones"];


export const UsersTable = ({ currentPage, itemsPerPage, setPage, events }: TableProps) => {

  const { handleUpdateUserModal, handleDelete, loading } = useUser();
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
            paginatedEvents.map((user, index) => {
              // 🛡️ VALIDACIÓN CRÍTICA: Si 'user' es undefined, no renderizamos nada para esa fila
              if (!user) return null;

              // Desestructuramos con valores por defecto y manejando posibles nombres de ID
              const { id, _id, name, email, role } = user;
              const userId = id || _id || `temp-${index}`; // Fallback para el ID

              const isLast = index === paginatedEvents.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={userId}>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      {name || 'Sin nombre'}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      {email || 'Sin email'}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)} variant="small" color="blue-gray" className="font-normal">
                      {role || 'user'}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <div className="flex gap-2">
                      <TooltipCustom content="Editar usuario" placement="top">
                        <button
                          className="edit-button"
                          onClick={() => handleUpdateUserModal({ uid: userId, name, email, role, ok: true })}
                        >
                          <IoPencilSharp />
                        </button>
                      </TooltipCustom>
                      <TooltipCustom content="Eliminar usuario" placement="top">
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(userId, name)}
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
