import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/ProductApi";
import DashboardCardV2 from "../components/cards/DashboardCardV2";
import { getAllInventory } from "../api/InventoryApi";
import { CiBoxes, CiMoneyBill, CiMoneyCheck1 } from "react-icons/ci";
import DashboardProductCard from "../components/cards/DashboardProductCard";
import type { IInventoryGet } from "../interfaces/IInventory";
import {
  getAllProductSale,
  getTotalSale,
  getTotalSaleProfit,
} from "../api/ProductSaleApi";
import DashboardSaleCard from "../components/cards/DashboardSaleCard";
import type { IProductSaleGet } from "../interfaces/ProductInterface";

const Dashboard = () => {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const inventoryQuery = useQuery({
    queryKey: ["inventory"],
    queryFn: getAllInventory,
  });

  const totalSaleQuery = useQuery({
    queryKey: ["total-sale"],
    queryFn: getTotalSale,
  });

  const totalSaleProfitQuery = useQuery({
    queryKey: ["total-sale-profit"],
    queryFn: getTotalSaleProfit,
  });

  const getSalesQuery = useQuery({
    queryKey: ["get-sales"],
    queryFn: getAllProductSale,
  });

  return (
    <div className="">
      <div className="mb-5">
        <section className="p-5.5 shadow">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </section>
        <section className="grid md:grid-cols-4 gap-3 md:gap-5 p-5">
          <DashboardCardV2
            label="Products"
            data={productsQuery.data?.length}
            Icon={CiBoxes}
            iconColor="bg-blue-100 text-blue-800"
          />
          <DashboardCardV2
            label="Inventory Products"
            data={inventoryQuery.data?.length}
            Icon={CiBoxes}
            iconColor="bg-green-100 text-green-800"
          />
          <DashboardCardV2
            label="Total Sales"
            data={totalSaleQuery.data?.totalSale}
            Icon={CiMoneyBill}
            iconColor="bg-yellow-100 text-yellow-800"
            money={true}
          />
          <DashboardCardV2
            label="Total Profit"
            data={totalSaleProfitQuery.data?.totalProfit}
            Icon={CiMoneyCheck1}
            iconColor="bg-purple-100 text-purple-800"
            money={true}
          />
        </section>
        <section className="px-5 grid md:grid-cols-[3fr_2fr] gap-5">
          <span className="bg-slate-50 rounded-xl shadow p-5">
            <h1 className="text-lg font-bold pb-10">Product Inventory</h1>
            <h1 className="grid grid-cols-[4fr_3fr_2fr_2fr_2fr] md:grid-cols-[1fr_4fr_3fr_2fr_2fr_2fr] pb-5 gap-1">
              <p className="hidden md:block"></p>
              <p className="font-bold">Product Name</p>
              <p className="font-bold">Product Category</p>
              <p className="font-bold">Stock</p>
              <p className="font-bold">Cost</p>
              <p className="font-bold">Price</p>
            </h1>
            {inventoryQuery.data
              ?.slice(0, 6)
              .map((inventory: IInventoryGet) => (
                <DashboardProductCard key={inventory._id} data={inventory} />
              ))}
          </span>
          <span className="bg-slate-50 rounded-xl shadow p-5">
            <h1 className="text-lg font-bold pb-10">Sales</h1>
            <h1 className="grid grid-cols-[4fr_2fr_2fr_2fr] md:grid-cols-[1fr_4fr_2fr_2fr_2fr] pb-5 gap-1">
              <p className="hidden md:block"></p>
              <p className="font-bold">Product Name</p>
              <p className="font-bold">Price</p>
              <p className="font-bold">Quantity</p>
              <p className="font-bold">Total Price</p>
            </h1>
            {getSalesQuery.data?.slice(0, 6).map((sale: IProductSaleGet) => (
              <DashboardSaleCard key={sale._id} data={sale} />
            ))}
          </span>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
