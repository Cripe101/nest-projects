import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeLayout from "./layouts/HomeLayout";
import Profit from "./pages/Profit";
import Inventory from "./pages/Inventory";
import Sale from "./pages/Sale";
import InventoryLayout from "./layouts/InventoryLayout";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <InventoryLayout />,
    children: [
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/profit",
        element: <Profit />,
      },
      {
        path: "/sale",
        element: <Sale />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
