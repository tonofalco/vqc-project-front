import { useState } from "react";
import { GeneralDashboard, LandTravelsDashboard, AirTravelsDashboard } from 'src/components';


export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("general");

  const tabs = [
    { 
      id: "general", 
      label: "General", 
      content: <GeneralDashboard /> 
    },
    { 
      id: "terrestre", 
      label: "Viajes Terrestres", 
      content: <LandTravelsDashboard /> 
    },
    { 
      id: "aereo", 
      label: "Viajes Aéreos", 
      content: <AirTravelsDashboard /> 
    },
  ];

  return (
    <div className="w-full h-full">
      <h1>DASHBOARD</h1>
      <p>Información general del sistema</p>
      <hr />

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`header-tab-button ${
              activeTab === tab.id
                ? "text-gray-900 border-blue-800"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`transition-opacity duration-300 ${
              activeTab === tab.id ? "opacity-100 block" : "opacity-0 hidden"
            }`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};