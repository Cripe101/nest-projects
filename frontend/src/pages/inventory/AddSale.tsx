import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/ProductApi";
import type { IProductGet } from "../../interfaces/ProductInterface";
import { useState } from "react";
import { createProductSale } from "../../api/ProductSaleApi";
import { toast } from "react-toastify";

const AddSale = () => {
  const productsQuery = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
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
    <div>
      <h1>AddSale</h1>
      <h1 className="text-xs font-bold">Select Product:</h1>
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {productsQuery?.data?.map((product: IProductGet) => (
          <span
            onClick={() => setProductId(product._id)}
            key={product._id}
            className={`${checkProduct(product._id) ? "bg-green-300" : ""} cursor-pointer p-5 rounded-xl shadow active:scale-90 duration-200`}
          >
            <img src={product.imageUrl} className="" />
            <h1>{product.productName}</h1>
          </span>
        ))}
      </section>
      {/* <section className="gap-1 hidden">
        <label className="pl-3 text-xs font-bold">Product:</label>
        <input
          name="product"
          placeholder="Product"
          className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
          type="text"
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value);
          }}
        />
      </section> */}
      <section className="grid gap-1">
        <label className="pl-3 text-xs font-bold">Quantity:</label>
        <input
          name="quantity"
          placeholder="Quantity"
          className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
          type="text"
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
