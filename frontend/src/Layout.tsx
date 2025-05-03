import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, items } from "@/components/sidebar";
import { ModeToggle } from "./components/theme-provider/mode-toggle";
import { useLocation } from "@tanstack/react-router";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <header className="text-left flex">
          <SidebarTrigger /> | {""}
          {items.find((item) => item.url === location.pathname)?.title}
        </header>
        {children}
        <ModeToggle />
        <footer className="text-center text-gray-500">
          © 2024 Ballot Initiative Project |
          {" "}
          <a href="#" className="text-blue-400 underline"> Privacy Policy.</a> |
          {" "}
          <a href="#" className="text-blue-400 underline"> Terms of Use.</a>
        </footer>
      </main>
    </SidebarProvider>
  );
}
