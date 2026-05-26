import { useState } from "react";
import { RoleHeader } from "../layout/RoleHeader.jsx";
import { RADormDashboard } from "./RADormDashboard.jsx";
import { RAResidentBreakdown } from "./RAResidentBreakdown.jsx";
import { RARallyScreen } from "./RARallyScreen.jsx";

const TABS = [
  { id: "dashboard", label: "Dorm Dashboard" },
  { id: "residents", label: "Residents" },
  { id: "rally", label: "Rally Floor" },
];

export function RAShell({ onExit, tweaks }) {
  const [raTab, setRaTab] = useState("dashboard");

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#FAFAFA",
      }}
    >
      <RoleHeader
        background="#0F2A1A"
        statusColor="#4ADE80"
        accentColor="#4ADE80"
        label="RA Dashboard"
        title={tweaks.dormName}
        exitLabel="Exit"
        onExit={onExit}
        tabs={TABS}
        activeTab={raTab}
        setActiveTab={setRaTab}
        bottomSpacer
      />

      {raTab === "dashboard" && <RADormDashboard tweaks={tweaks} />}
      {raTab === "residents" && <RAResidentBreakdown />}
      {raTab === "rally" && <RARallyScreen tweaks={tweaks} />}
    </div>
  );
}
