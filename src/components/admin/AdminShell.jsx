import { useState } from "react";
import { ADMIN_EVENTS_SEED } from "../../data/index.js";
import { CARDINAL } from "../../styles/tokens.js";
import { RoleHeader } from "../layout/RoleHeader.jsx";
import { AdminDashboardScreen } from "./AdminDashboardScreen.jsx";
import { AdminRegisterScreen } from "./AdminRegisterScreen.jsx";
import { AdminSecretWordScreen } from "./AdminSecretWordScreen.jsx";

const TABS = [
  { id: "register", label: "Register Event" },
  { id: "dashboard", label: "Dashboard" },
  { id: "secret", label: "Secret Word" },
];

const POST_PUBLISH_REDIRECT_MS = 1800;

export function AdminShell({ onExit }) {
  const [adminTab, setAdminTab] = useState("register");
  const [events, setEvents] = useState(ADMIN_EVENTS_SEED);

  const handlePublish = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setTimeout(() => setAdminTab("dashboard"), POST_PUBLISH_REDIRECT_MS);
  };

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
        background="#1A1A1A"
        statusColor={CARDINAL}
        accentColor={CARDINAL}
        label="DAPER Admin"
        title="Event Manager"
        exitLabel="Exit Admin"
        onExit={onExit}
        tabs={TABS}
        activeTab={adminTab}
        setActiveTab={setAdminTab}
        inactiveTabColor="rgba(255,255,255,0.45)"
      />

      {adminTab === "register" && (
        <AdminRegisterScreen onPublish={handlePublish} />
      )}
      {adminTab === "dashboard" && <AdminDashboardScreen events={events} />}
      {adminTab === "secret" && <AdminSecretWordScreen events={events} />}
    </div>
  );
}
