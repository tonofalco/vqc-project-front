import { APIProvider, Map } from "@vis.gl/react-google-maps";

export const CotizacionPage = () => {
  return (

    <>
    <h1>COTIZACION</h1>
      <p>Calcular rutas para viajes terrestres</p>
      <hr />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">

      <div className="text">
        <h1>Informacion</h1>
      </div>

      <div style={{ height: "88vh", width: "100%" }} className="rounded-[20px] shadow-3xl shadow-shadow-500 overflow-hidden">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
          <Map
            defaultZoom={12}
            defaultCenter={{ lat: 19.4326, lng: -99.1332 }} // CDMX
            />
        </APIProvider>
      </div>

      

    </div>
            </>
  )
}

