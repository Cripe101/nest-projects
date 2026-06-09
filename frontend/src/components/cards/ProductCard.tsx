import { CiEdit, CiTrash } from "react-icons/ci";
import type { IProductGet } from "../../interfaces/ProductInterface";

const ProductCard = ({
  product,
  type = "product",
  stock,
  size,
  handleUpdate,
  handleDelete,
}: {
  product: IProductGet;
  type?: string;
  stock?: number;
  size?: string;
  handleUpdate?: any;
  handleDelete?: any;
}) => {
  return (
    <section
      key={product._id}
      className="bg-blue-50 py-2 rounded-xl shadow flex flex-col justify-center gap-2 items-center relative group"
    >
      <span className="absolute w-full top-1 justify-between px-2 hidden group-hover:flex duration-200">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 rounded-lg p-1 font-bold text-white cursor-pointer active:scale-90 duration-200"
        >
          <CiEdit size={20} />
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 rounded-lg p-1 font-bold text-white  cursor-pointer active:scale-90 duration-200"
        >
          <CiTrash size={20} />
        </button>
      </span>
      <span className="flex flex-col items-center gap-2">
        <img
          src={
            product.imageUrl ??
            "https://cdn-icons-png.freepik.com/256/4020/4020514.png?semt=ais_white_label"
          }
          className={`max-h-20 ${size}`}
        />
        <h1 className="text-xs font-bold">{product.productName}</h1>
      </span>
      <section className="flex justify-between gap-5">
        <h1 className="flex gap-1 items-center text-xs">
          Price:
          <p className="font-bold text-xs">₱{product.sellingPrice}</p>
        </h1>
        <h1
          className={`${type === "product" ? "flex" : "hidden"} gap-1 items-center text-xs`}
        >
          Cost: <p className={`font-bold text-xs`}>₱{product.buyingPrice}</p>
        </h1>
        <h1
          className={`${type === "product" ? "hidden" : "flex"} gap-1 items-center text-xs`}
        >
          Stock:{" "}
          <p
            className={`font-bold text-xs ${stock! > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {stock}
          </p>
        </h1>
      </section>
    </section>
  );
};

export default ProductCard;
