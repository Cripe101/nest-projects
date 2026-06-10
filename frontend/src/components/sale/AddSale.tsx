import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createProductSale } from "../../api/ProductSaleApi";
import { toast } from "react-toastify";
import { getAllInventory } from "../../api/InventoryApi";
import type { IInventoryGet } from "../../interfaces/IInventory";

const AddSale = ({ refetch }: { refetch: any }) => {
  const productsQuery = useQuery({
    queryKey: ["inventory-products"],
    queryFn: getAllInventory,
  });

  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const checkProduct = (product_id: string) => {
    if (productId === product_id) {
      return true;
    }

    return false;
  };

  const addProductSaleMutation = useMutation({
    mutationKey: ["product-sale"],
    mutationFn: (data: { productId: string; quantity: number }) =>
      createProductSale(data),
    onSuccess: () => {
      toast.success("Sale Added");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = () => {
    const data = {
      productId: productId,
      quantity: quantity,
    };

    addProductSaleMutation.mutate(data);
  };

  return (
    <div className="grid gap-5">
      <h1>AddSale</h1>
      <span className="grid gap-2">
        <h1 className="lp-3 text-xs font-bold">Select Product:</h1>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 justify-center">
          {productsQuery?.data?.map((product: IInventoryGet) => (
            <span
              onClick={() => setProductId(product.productId._id)}
              key={product._id}
              className={`${checkProduct(product.productId._id) ? "bg-green-200" : "bg-blue-50"} flex flex-col items-center justify-center gap-1 cursor-pointer py-3 px-2 rounded-xl shadow active:scale-90 duration-200`}
            >
              <img src={product.productId.imageUrl} className="h-12" />
              <h1 className="text-xs font-bold">
                {product.productId.productName}
              </h1>
              <h1 className="text-xs font-medium">
                Stock: {product.currentStock}
              </h1>
            </span>
          ))}
        </section>
      </span>
      <section className="grid gap-1">
        <label className="pl-3 text-xs font-bold">Quantity:</label>
        <input
          name="quantity"
          placeholder="Quantity"
          className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
        />
      </section>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 py-2 px-3 text-white rounded-xl font-bold cursor-pointer active:scale-90 duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default AddSale;
