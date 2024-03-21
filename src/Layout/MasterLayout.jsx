import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import ProgressLoading from "../components/Loading/ProgressLoading";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
// import Loading from "../components/Loading/Loading";

const MasterLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <ProgressLoading />;
  }

  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 bg-gray-100">
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />
          {/* Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
        <Toaster position="bottom-center" />
      </div>
    </>
  );
};

export default MasterLayout;
