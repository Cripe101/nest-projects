import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeLayout from "./layouts/HomeLayout";
import Profit from "./pages/Profit";
import Inventory from "./pages/Inventory";
import Sale from "./pages/Sale";
import InventoryLayout from "./layouts/InventoryLayout";
import Login from "./pages/Login";
import AddInventory from "./components/inventory/AddInventory";
import AddProduct from "./components/product/AddProduct";
import Product from "./pages/Product";
import UpdateProduct from "./components/product/UpdateProduct";
import UpdateInventory from "./components/inventory/UpdateInventory";
import User from "./pages/User";
import AddInventoryStock from "./components/inventory/AddInventoryStock";
import Dashboard from "./pages/Dashboard";

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
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/profit",
        element: <Profit />,
      },
      {
        path: "/sale",
        element: <Sale />,
      },
      {
        path: "/add-inventory",
        element: <AddInventory />,
      },
      {
        path: "/update-inventory/:id",
        element: <UpdateInventory />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
      },
      {
        path: "/add-stock/:id",
        element: <AddInventoryStock />,
      },
      {
        path: "/update-product/:id",
        element: <UpdateProduct />,
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
