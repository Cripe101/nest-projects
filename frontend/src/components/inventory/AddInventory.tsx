import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/ProductApi";
import type { IProductGet } from "../../interfaces/ProductInterface";
import { createInventory } from "../../api/InventoryApi";
import { useState } from "react";
import Input from "../custom/Input";
import { toast } from "react-toastify";
import type { IInventoryPost } from "../../interfaces/IInventory";
import { useNavigate } from "react-router-dom";

const AddInventory = () => {
  const [productId, setProductId] = useState<string>("");
  const [currentStock, setCurrentStock] = useState<string>("");
  const [minimumStock, setMinimuStock] = useState<string>("");

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["Product"],
    queryFn: getAllProducts,
  });

  const addInventoryMutation = useMutation({
    mutationKey: ["add-inventory"],
    mutationFn: (data: IInventoryPost) => createInventory(data),
    onSuccess: () => {
      toast.success("Product added to inventory successfully");
      navigate("/inventory");
    },
    onError: (err) => {
      const checkMessage =
        err.message === "Request failed with status code 406";

      const message = checkMessage
        ? "Product already added to inventory"
        : "Something went wrong try again";
      toast.error(message);
    },
  });

  const handleSubmit = () => {
    const data: IInventoryPost = {
      productId: productId,
      currentStock: Number(currentStock),
      minimumStock: Number(minimumStock),
    };

    addInventoryMutation.mutate(data);
  };

  //   useEffect(() => {
  //     localStorage.clear();
  //   }, []);

  return (
    <div className="flex justify-center items-center">
      <section className="mt-20 flex flex-col gap-3 p-5 m-2">
        <h1 className="text-center font-bold">Add to Inventory</h1>

        <h1 className="text-sm pl-2 font-medium">Select product:</h1>
        <span className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {data?.map((product: IProductGet) => (
            <section
              key={product._id}
              className={`${product._id === productId ? "bg-green-200" : ""} bg-blue-100 p-3 flex flex-col items-center shadow-sm gap-2 rounded-xl cursor-pointer duration-200`}
              onClick={() => {
                setProductId(product._id);
              }}
            >
              <img src={product.imageUrl} className="h-10" />
              <h1 className="text-xs font-bold">{product.productName}</h1>
            </section>
          ))}
        </span>

        <span className="grid gap-3">
          <Input
            label="Current stock"
            placeholder="Current stock"
            value={currentStock}
            setter={setCurrentStock}
            type="number"
          />

          <Input
            label="Minimum stock"
            placeholder="Minimum stock"
            value={minimumStock}
            setter={setMinimuStock}
            type="number"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-3 py-2 text-white font-bold rounded-xl cursor-pointer active:scale-90 duration-200"
          >
            Submit
          </button>
        </span>
      </section>
    </div>
  );
};

export default AddInventory;
