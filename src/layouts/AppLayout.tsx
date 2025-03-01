import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '@/components/common/Sidebar/Sidebar'
import Header from '@/components/common/Header/Header'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/hooks/auth/useAuth';
import Footer from '@/components/common/Footer/Footer';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ label: string; path?: string }[]>([]);

  /*const { data, isError , isLoading } = useAuth();

  if(isLoading) return 'Cargando...';
  if(isError) {
    return <Navigate to='/auth/signin'/>
  }*/

  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} breadcrumbItems={breadcrumbItems} />
            <main className="flex-grow">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 ">
                <Outlet context={{ setBreadcrumbItems }} />
              </div>
            </main>  
            <Footer/>
          </div>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  )
}