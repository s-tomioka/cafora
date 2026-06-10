"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";

export function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group/accordion py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between text-sm font-medium sm:text-base"
      >
        <span className="text-left transition-opacity duration-100 group-hover/accordion:opacity-50">
          {title}
        </span>
        <span className="shrink-0 text-muted-foreground">
          <span className={open ? "hidden" : "block"}>
            <MaterialIcon
              icon="add"
              className="transition-transform duration-300 group-hover/accordion:rotate-90"
            />
          </span>
          <span className={open ? "block" : "hidden"}>
            <MaterialIcon icon="remove" />
          </span>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-3 pb-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
