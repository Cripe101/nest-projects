import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOneSale, getAllProductSale } from "../api/ProductSaleApi";
import type { IProductSaleGet } from "../interfaces/ProductInterface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AddSale from "../components/sale/AddSale";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";

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

  const deleteMutation = useMutation({
    mutationKey: ["delete-sale"],
    mutationFn: (id: string) => deleteOneSale(id),
    onSuccess: () => {
      toast.success("Sale deleted successfully");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="">
      <section className="p-5.5 shadow">
        <h1 className="text-xl font-bold">Sales</h1>
      </section>
      <div className="grid md:grid-cols-[3fr_2fr] gap-5 p-5">
        <section className="grid gap-3 md:gap-5 p-3 md:p-5 rounded-xl">
          <h1>Sale</h1>
          <AddSale refetch={refetch} />
        </section>
        <section className="flex flex-col gap-3 p-3 md:p-5 rounded-xl">
          <span className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] font-bold text-xs">
            <h1>Product</h1>
            <h1 className="text-center">Price</h1>
            <h1 className="text-center">Quantity</h1>
            <h1 className="text-center">Total Price</h1>
            <h1 className="text-center">Action</h1>
          </span>
          {data?.map((productSale: IProductSaleGet) => (
            <span
              key={productSale._id}
              className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] text-sm"
            >
              <h1>{productSale.productId.productName}</h1>
              <h1 className="text-center">₱ {productSale.sellingPrice}</h1>
              <h1 className="text-center">{productSale.quantity}</h1>
              <h1 className="text-center">₱ {productSale.totalPrice}</h1>
              <h1 className="flex justify-center">
                <button
                  onClick={() => {
                    deleteMutation.mutate(productSale._id);
                  }}
                  className="flex items-center bg-red-500 py-1 px-2 text-white rounded-xl cursor-pointer active:scale-90 duration-200"
                >
                  <CiTrash size={20} />
                </button>
              </h1>
            </span>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Sale;
