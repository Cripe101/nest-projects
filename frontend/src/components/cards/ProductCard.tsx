import type { IProductGet } from "../../interfaces/ProductInterface";

const ProductCard = ({ data }: { data: IProductGet[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5">
      {data?.map((product: IProductGet) => (
        <section
          key={product._id}
          className="bg-slate-100 p-3 md:p-5 rounded-xl shadow flex flex-col justify-between gap-2"
        >
          <span>
            <img
              src={
                product.imageUrl ??
                "https://cdn-icons-png.freepik.com/256/4020/4020514.png?semt=ais_white_label"
              }
              alt="No Image"
              className="rounded-xl max-h-35"
            />
            <h1 className="text-center text-base md:text-lg font-medium">
              {product.productName}
            </h1>
          </span>
          <section className="flex justify-between">
            <h1 className="flex gap-2 items-center text-sm">
              Price:{" "}
              <p className="font-medium text-sm">{product.sellingPrice}</p>
            </h1>
            <h1 className="flex gap-2 items-center text-sm">
              Stock:{" "}
              <p
                className={`${product.stock === 0 ? "text-red-500" : "text-green-600"} font-bold text-sm`}
              >
                {product.stock}
              </p>
            </h1>
          </section>
        </section>
      ))}
    </div>
  );
};

export default ProductCard;
