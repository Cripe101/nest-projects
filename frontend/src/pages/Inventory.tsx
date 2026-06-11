import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOneInventory, getAllInventory } from "../api/InventoryApi";
import type { IInventoryGet } from "../interfaces/IInventory";
import ProductCard from "../components/cards/ProductCard";
import { toast } from "react-toastify";

const Inventory = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const inventoryQuery = useQuery({
    queryKey: ["Inventory"],
    queryFn: getAllInventory,
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-inventory"],
    mutationFn: (id: string) => deleteOneInventory(id),
    onSuccess: () => {
      toast.success("Product deleted in inventory successfully");
      inventoryQuery.refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="p-5 md:p-10">
      <section className="flex flex-col">
        <span className="flex gap-5 justify-between items-center mb-5">
          <h1 className="font-medium">Products in your inventory</h1>
          <button
            onClick={() => navigate("/add-inventory")}
            className="bg-blue-600 p-1.5 px-3 text-white rounded-xl font-bold cursor-pointer active:scale-90 duration-200"
          >
            Add Product to Inventory
          </button>
        </span>

        {inventoryQuery.isLoading ? (
          <div className="grid grid-cols-7 gap-5">
            <div className="bg-blue-100 flex flex-col gap-2 p-3 rounded-xl shadow-sm animate-pulse">
              <h1 className="h-20 bg-slate-100 rounded-lg"></h1>
              <h1 className="h-4 bg-slate-100 rounded-lg"></h1>
              <h1 className="grid grid-cols-2 gap-5">
                <p className="h-4 bg-slate-100 rounded-lg"></p>
                <p className="h-4 bg-slate-100 rounded-lg"></p>
              </h1>
            </div>
            <div className="bg-blue-100 flex flex-col gap-2 p-3 rounded-xl shadow-sm animate-pulse">
              <h1 className="h-20 bg-slate-100 rounded-lg"></h1>
              <h1 className="h-4 bg-slate-100 rounded-lg"></h1>
              <h1 className="grid grid-cols-2 gap-5">
                <p className="h-4 bg-slate-100 rounded-lg"></p>
                <p className="h-4 bg-slate-100 rounded-lg"></p>
              </h1>
            </div>
            <div className="bg-blue-100 flex flex-col gap-2 p-3 rounded-xl shadow-sm animate-pulse">
              <h1 className="h-20 bg-slate-100 rounded-lg"></h1>
              <h1 className="h-4 bg-slate-100 rounded-lg"></h1>
              <h1 className="grid grid-cols-2 gap-5">
                <p className="h-4 bg-slate-100 rounded-lg"></p>
                <p className="h-4 bg-slate-100 rounded-lg"></p>
              </h1>
            </div>
          </div>
        ) : inventoryQuery.data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-7 gap-5">
            {inventoryQuery.data?.map((product: IInventoryGet) => (
              <ProductCard
                key={product._id}
                product={product.productId}
                stock={product.currentStock}
                type="inventory"
                handleUpdate={() =>
                  navigate("/update-inventory/" + product?._id)
                }
                handleDelete={() => deleteMutation.mutate(product._id)}
              />
            ))}
          </div>
        ) : (
          <div>
            <h1>No Product in Inventory yet</h1>
            <button
              className="bg-blue-600 px-2 py-3 text-white rounded-xl cursor-pointer active:scale-90 duration-200"
              onClick={() => navigate("/add-inventory")}
            >
              Add Product to Inventory
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Inventory;
