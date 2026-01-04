import { Card, Typography } from "@material-tailwind/react";
import { formatDate, filterPastEvents } from "src/helpers/index";

const TABLE_HEAD = ["Fecha salida", "Cliente", "Destino", "Acciones"];

interface TravelTableProps {
  currentPage: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  events: Array<any>;
}

export const MyTravelsTable = ({ currentPage, itemsPerPage, setPage, events }: TravelTableProps) => {

  // filtrar usando el campo "start"
  const pastEvents = filterPastEvents(events, "start");

  // calcular rango de eventos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = pastEvents.slice(startIndex, endIndex);
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
                <Typography  {...({} as any)}
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
            paginatedEvents.map(({ id, start, nameClient, destination }, index) => {

              const isLast = index === events.length - 1;
              const borderStyle = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={`${borderStyle} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatDate(start)}
                    </Typography>
                  </td>
                  <td className={`${borderStyle} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {nameClient}
                    </Typography>
                  </td>
                  <td className={`${borderStyle} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {destination}
                    </Typography>
                  </td>
                  <td className={`${borderStyle} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <button>X</button>
                    </Typography>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                No hay viajes registrados proximos
              </td>
            </tr>
          )}
        </tbody>

      </table>

      <div className="flex justify-start lg:justify-center gap-2 mx-4 sm:my-2">
        {Array.from({ length: Math.ceil(pastEvents.length / itemsPerPage) }, (_, i) => (
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
