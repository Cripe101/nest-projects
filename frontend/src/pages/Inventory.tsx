import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/ProductApi";
import type { IProductGet } from "../interfaces/ProductInterface";
import ProductCard from "../components/cards/ProductCard";
import AddProduct from "./inventory/AddProduct";

const Inventory = () => {
  const { data, refetch } = useQuery<IProductGet[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return (
    <div className="p-5 md:p-10">
      <div className="grid gap-3 md:gap-5">
        <section className="grid gap-3 md:gap-5">
          <AddProduct fetch={refetch} />
        </section>
        <ProductCard data={data ?? []} />
      </div>
    </div>
  );
};

export default Inventory;
