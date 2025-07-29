import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import BreadcrumbNav from "./components/BreadcrumbNav";
import { Header } from "./components/Header";
import { SidebarNav } from "./components/SidebarNav";
import AppRoutes from "./routes/Router";
import { useThemeStore } from "./stores/ThemeStore";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div className="flex h-full">
      <SidebarNav
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col overflow-auto bg-background">
        <Header />
        <BreadcrumbNav />
        <Card className="flex rounded-lg m-2 mb-20 lg:m-2 md:m-2">
          <CardContent className="h-full overflow-auto">
            <AppRoutes />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
