import type { IProductSaleGet } from "../../interfaces/ProductInterface";

const DashboardSaleCard = ({ data }: { data: IProductSaleGet }) => {
  return (
    <h1 className="grid grid-cols-[4fr_2fr_2fr_2fr] md:grid-cols-[1fr_4fr_2fr_2fr_2fr] pb-3 items-center gap-1">
      <img className="hidden md:block" src={data.productId?.imageUrl} />
      <p className="text-sm font-medium">{data.productId?.productName}</p>
      <p className="text-sm font-medium">{data?.sellingPrice}</p>
      <p className="text-sm font-medium">{data?.quantity}</p>
      <p className="text-sm font-medium">{data?.totalPrice}</p>
    </h1>
  );
};

export default DashboardSaleCard;
