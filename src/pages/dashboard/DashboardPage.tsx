import { useState } from "react";

import { GeneralDashboard, LandTravelsDashboard, AirTravelsDashboard } from '../../components';

import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";


export const Dashboard = () => {

  const [activeTab, setActiveTab] = useState("general")

  const data = [
    { label: "General", value: "general", desc: <GeneralDashboard /> },
    { label: "Viajes Terrestres", value: "terrestre", desc: <LandTravelsDashboard /> },
    { label: "Viajes Aéreos", value: "aereo", desc: <AirTravelsDashboard /> },
  ];

  return (
    <>
      <h1>DASHBOARD</h1>
      <p>Información general del sistema</p>
      <hr />

      <Tabs value={activeTab}>

        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 mt-10"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-blue-800 shadow-none rounded-none",
          }}
          {...({} as any)}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-gray-900" : ""}
              {...({} as any)}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>

        <TabsBody  {...({} as any)}>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>

      </Tabs>
    </>
  );
};