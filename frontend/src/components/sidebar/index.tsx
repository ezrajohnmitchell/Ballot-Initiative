import { FileCheck, Home, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Accordion } from "@/components/ui/accordion";
import { useSidebar } from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import InstructionStep from "./instruction-step";
import { instructionStepsContent } from "./instruction-steps-content";
import { useAppStateStore } from "@/stores/app-state-store";
// Menu items.
export const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Petition Validation",
    url: "/petition",
    icon: FileCheck,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarGroupLabel>Ballot Initiative</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="[overflow:overlay]  [&::-webkit-scrollbar-thumb]:bg-sidebar-ring [&::-webkit-scrollbar]:w-2 h-full">
        <SidebarGroup className="border-b border-foreground">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`${location.pathname === item.url ? "bg-sidebar-accent text-sidebar-accent-foreground rounded-sm" : ""}`}
                >
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="text-left p-5">
          {state === "expanded" && location.pathname === "/petition" && (
            <Accordion type="single" collapsible>
              <h1 className="mb-5">📝 Instructions</h1>
              { instructionStepsContent.map( instructionStep => (
                  <InstructionStep
                    key={instructionStep.key}
                    title={instructionStep.key}
                    isComplete={useAppStateStore(instructionStep.selector)}
                  >
                    {instructionStep.content}
                  </InstructionStep>
                ) ) }
            </Accordion>
          )}
          {state === "expanded" && location.pathname === "/" && (
            <div className="p-5 bg-sidebar-primary text-sidebar-primary-foreground rounded-sm">
              👆Visit the Petition Validation page to get started.
            </div>
          )}
        </SidebarGroup>
        {}
      </SidebarContent>
      <SidebarFooter className="flex flex-row">
        <SidebarMenuItem key="Settings">
          <SidebarMenuButton asChild>
            <a href="/settings">
              <Settings />
              <span>{"Settings"}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
