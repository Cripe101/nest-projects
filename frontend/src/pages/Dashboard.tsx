import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/ProductApi";
import DashboardCardV2 from "../components/cards/DashboardCardV2";
import { getAllInventory } from "../api/InventoryApi";

const Dashboard = () => {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const inventoryQuery = useQuery({
    queryKey: ["inventory"],
    queryFn: getAllInventory,
  });
  return (
    <div>
      <div className="p-5">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <DashboardCardV2
            label="Total Products"
            data={productsQuery.data?.length}
            bgColor="bg-blue-200"
          />
          <DashboardCardV2
            label="Inventory Products"
            data={inventoryQuery.data?.length}
          />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
