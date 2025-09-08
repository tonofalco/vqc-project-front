import { useState } from "react";
import { WhiteCard } from '../../components';
import { useBearStore, usePersonStore, useTaskStore } from '../../stores';

import { IoAccessibilityOutline, IoHeartOutline, IoListOutline, IoLockClosedOutline, IoPawOutline } from 'react-icons/io5';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";

export const Dashboard = () => {

  const totalBears = useBearStore(state => state.totalBears);
  const firstName = usePersonStore(state => state.firstName);
  const tasks = useTaskStore(state => state.tasks);

  const taskCount = Object.keys(tasks).length;

  const [activeTab, setActiveTab] = useState("html")

  const data = [
    {
      label: "General",
      value: "html",
      desc: (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">

        <WhiteCard centered>
          {/* <IoPawOutline size={50} className="text-indigo-600" /> */}
          <h2>Mis registros Terrestres</h2>
          <hr />
          <p>{totalBears()}</p>
        </WhiteCard>


        <WhiteCard centered>
          {/* <IoAccessibilityOutline size={50} className="text-indigo-600" /> */}
          <h2>Mis registros Aéreos</h2>
          <hr  className="bg-black"/>
          <p>{firstName}</p>
        </WhiteCard>
      </div>
      </>
      ),
    },
    {
      label: "Viajes Terrestres",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Viajes Aéreos",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
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
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-gray-900" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
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