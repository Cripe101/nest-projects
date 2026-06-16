import type { IInventoryGet } from "../../interfaces/IInventory";

const DashboardProductCard = ({ data }: { data: IInventoryGet }) => {
  return (
    <h1
      key={data._id}
      className="py-2 grid grid-cols-[4fr_3fr_2fr_2fr_2fr] md:grid-cols-[1fr_4fr_3fr_2fr_2fr_2fr] gap-1"
    >
      <img src={data.productId?.imageUrl} className="h-7 hidden md:block" />
      <p className="text-sm font-medium">{data.productId?.productName}</p>
      <p className="text-sm font-medium">{data.productId?.productCategory}</p>
      <p className="text-sm font-medium">{data?.currentStock}</p>
      <p className="text-sm font-medium">{data.productId?.buyingPrice}</p>
      <p className="text-sm font-medium">{data.productId?.sellingPrice}</p>
    </h1>
  );
};

export default DashboardProductCard;
