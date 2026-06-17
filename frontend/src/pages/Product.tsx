import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOneProduct, getAllProducts } from "../api/ProductApi";
import type { IProductGet } from "../interfaces/ProductInterface";
import ProductCard from "../components/cards/ProductCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const deleteMutation = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: (id: string) => deleteOneProduct(id),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="">
      <section className="p-5.5 shadow">
        <h1 className="text-xl font-bold">Products</h1>
      </section>
      <div className="px-10 py-5">
        <section className="flex items-center justify-between mb-5">
          <h1 className="font-medium">Products</h1>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-blue-600 p-1.5 px-3 text-white rounded-xl font-bold cursor-pointer active:scale-90 duration-200"
          >
            Add Product
          </button>
        </section>
        <section className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {data?.map((product: IProductGet) => (
            <ProductCard
              product={product}
              key={product._id}
              handleUpdate={() => navigate("/update-product/" + product._id)}
              handleDelete={() => deleteMutation.mutate(product._id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Product;
