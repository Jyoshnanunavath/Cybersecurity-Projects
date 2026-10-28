import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import AccessDenied from "./AccessDenied.jsx";

export default function AppLayout({ title, feature, children }) {
  const { session, can } = useAuth();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const authorized = feature ? can(feature) : true;

  return (
    <div className="flex h-screen bg-base">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          {authorized ? children : <AccessDenied />}
        </main>
      </div>
    </div>
  );
}
