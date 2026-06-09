import { useQuery } from "@tanstack/react-query";
import { getAllProductSale } from "../api/ProductSaleApi";
import type { IProductSaleGet } from "../interfaces/ProductInterface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddSale from "../components/sale/AddSale";

const Sale = () => {
  const { data, refetch } = useQuery({
    queryKey: ["product-sale"],
    queryFn: getAllProductSale,
  });

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="p-5 md:p-10 grid md:grid-cols-2 gap-5">
      <section className="grid gap-3 md:gap-5 bg-slate-50 p-3 md:p-5 rounded-xl">
        <h1>Sale</h1>
        <AddSale refetch={refetch} />
      </section>
      <section className="flex flex-col gap-3 bg-slate-50 p-3 md:p-5 rounded-xl">
        <span className="grid grid-cols-[3fr_1fr_1fr_1fr] font-bold text-xs">
          <h1>Product</h1>
          <h1 className="text-center">Price</h1>
          <h1 className="text-center">Quantity</h1>
          <h1 className="text-center">Total Price</h1>
        </span>
        {data?.map((productSale: IProductSaleGet) => (
          <span
            key={productSale._id}
            className="grid grid-cols-[3fr_1fr_1fr_1fr] text-sm"
          >
            <h1>{productSale.productId.productName}</h1>
            <h1 className="text-center">₱ {productSale.sellingPrice}</h1>
            <h1 className="text-center">{productSale.quantity}</h1>
            <h1 className="text-center">₱ {productSale.totalPrice}</h1>
          </span>
        ))}
      </section>
    </div>
  );
};

export default Sale;
