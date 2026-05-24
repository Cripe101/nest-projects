import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/ProductApi";
import type { IProductGet } from "../interfaces/ProductInterface";
import ProductCard from "../components/cards/ProductCard";
import AddProduct from "./inventory/AddProduct";
import AddSale from "./inventory/AddSale";

const Inventory = () => {
  const { data, refetch } = useQuery<IProductGet[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  return (
    <div className="p-5 md:p-10">
      <div className="grid gap-3 md:gap-5">
        <section className="grid md:grid-cols-2 gap-3 md:gap-5">
          <AddProduct fetch={refetch} />
          <AddSale />
        </section>
        <ProductCard data={data ?? []} />
      </div>
    </div>
  );
};

export default Inventory;
