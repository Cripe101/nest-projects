import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeLayout from "./layouts/HomeLayout";
import Profit from "./pages/Profit";
import Inventory from "./pages/Inventory";
import AddProduct from "./pages/inventory/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/profit",
        element: <Profit />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
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
