"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import PlansModal from "../components/PlansModal";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenPlans={() => setIsModalOpen(true)} />
      <main className="flex-grow">{children}</main>
      {isModalOpen && (
        <PlansModal onCloseAction={() => setIsModalOpen(false)} />
      )}
    </>
  );
}