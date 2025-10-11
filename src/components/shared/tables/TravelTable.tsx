import { Card, Typography } from "@material-tailwind/react";
import { formatDate, formatCurrencyMXN, filterFutureEvents } from "../../../helpers";

const TABLE_HEAD = ["Fecha salida", "Fecha regreso", "Cliente", "Destino", "Precio total", "Anticipo", "Deuda", "Vendedor", ""];

interface TravelTableProps {
  currentPage: number;
  itemsPerPage: number;
  setPage: (page: number) => void;
  events: Array<any>;
}

export const TravelTable = ({currentPage, itemsPerPage, setPage, events}: TravelTableProps) => {

  // filtrar usando el campo "start"
  const futureEvents = filterFutureEvents(events, "start");

  // calcular rango de eventos para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = futureEvents.slice(startIndex, endIndex);
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
            paginatedEvents.map(({ id, start, end, nameClient, destination, price, advance, user }, index) => {
              const due = price - advance;
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
                      {formatDate(start)}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatDate(end)}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {nameClient}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {destination}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatCurrencyMXN(price)}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatCurrencyMXN(advance)}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatCurrencyMXN(due)}
                    </Typography>
                  </td>
                  <td className={`${classes} ${tdClasses}`}>
                    <Typography {...({} as any)}
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user?.name || "Sin usuario"}
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

      <div className="flex justify-start lg:justify-center gap-2 my-4">
        {Array.from({ length: Math.ceil(futureEvents.length / itemsPerPage) }, (_, i) => (
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
