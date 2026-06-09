import { useMutation, useQuery } from "@tanstack/react-query";
import { getOneInventory, updateOneInventory } from "../../api/InventoryApi";
import { useEffect, useState } from "react";
import Input from "../custom/Input";
import { toast } from "react-toastify";
import type {
  IInventoryGet,
  IInventoryPost,
} from "../../interfaces/IInventory";
import { useNavigate, useParams } from "react-router-dom";

const UpdateInventory = () => {
  const [productId, setProductId] = useState<string>("");
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [minimumStock, setMinimuStock] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery<IInventoryGet>({
    queryKey: ["inventories", id],
    queryFn: () => getOneInventory(id!),
    enabled: !!id,
  });

  const updateInventoryMutation = useMutation({
    mutationKey: ["update-inventory"],
    mutationFn: ({ id, data }: { id: string; data: IInventoryPost }) =>
      updateOneInventory({ id, data }),
    onSuccess: () => {
      toast.success("Inventory updated successfully");
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
      currentStock: currentStock,
      minimumStock: minimumStock,
    };

    updateInventoryMutation.mutate({ id: id!, data: data });
  };

  useEffect(() => {
    if (!data) return;

    setProductId(data?.productId?._id);
    setCurrentStock(data?.currentStock ?? 0);
    setMinimuStock(data?.minimumStock ?? 0);
  }, [data]);

  return (
    <div className="flex justify-center p-5">
      <section className="mt-20 p-5 flex flex-col gap-3">
        <h1 className="text-center">Update Inventory</h1>

        {/* <h1 className="text-sm pl-2 font-medium">Select product:</h1>
        <span className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {productQuery.data?.map((product: IProductGet) => (
            <section
              key={product._id}
              className={`${product._id === productId ? "bg-green-200" : ""} bg-blue-100 p-3 flex flex-col items-center gap-2 rounded-xl cursor-pointer duration-200`}
              onClick={() => {
                setProductId(product._id);
              }}
            >
              <img src={product.imageUrl} className="h-10" />
              <h1 className="text-xs font-bold">{product.productName}</h1>
            </section>
          ))}
        </span> */}

        <span className="grid gap-3">
          <h1 className="font-bold">{data?.productId?.productName}</h1>
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

export default UpdateInventory;
