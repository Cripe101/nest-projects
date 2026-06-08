import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import type { IProductPost } from "../../interfaces/ProductInterface";
import { createProduct } from "../../api/ProductApi";
import { toast } from "react-toastify";

const AddProduct = ({ fetch }: { fetch: any }) => {
  const [productName, setProductName] = useState<string>("");
  const [buyingPrice, setBuyingPrice] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [productCategory, setProductCategory] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const addProductMutation = useMutation({
    mutationKey: ["Product"],
    mutationFn: (data: IProductPost) =>
      createProduct({
        productName: data.productName,
        productCategory: data.productCategory,
        buyingPrice: data.buyingPrice,
        sellingPrice: data.sellingPrice,
        imageUrl: data.imageUrl,
      }),
    onSuccess: () => {
      toast.success("Product added successfully");
      fetch();
      setProductName("");
      setProductCategory("");
      setBuyingPrice(0);
      setSellingPrice(0);
      setImageUrl("");
    },
  });

  const handleSubmit = () => {
    const data: IProductPost = {
      productName: productName,
      productCategory: productCategory,
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
      imageUrl: imageUrl,
    };
    console.log(data);
    addProductMutation.mutate(data);
  };

  return (
    <form className="flex flex-col gap-5 p-5 bg-slate-50 rounded-xl shadow">
      <h1 className="flex items-center gap-1">
        <BiPlus size={26} />
        <p className="font-medium">Add Product</p>
      </h1>

      <section className="grid gap-3">
        <span className="grid md:grid-cols-3 gap-3">
          <section className="grid gap-1">
            <label className="pl-3 text-xs font-bold">Product Name:</label>
            <input
              name="product-name"
              placeholder="Product Name"
              className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </section>
          <section className="grid gap-1">
            <label className="pl-3 text-xs font-bold">Product Category:</label>
            <input
              name="product-category"
              placeholder="Product Category"
              className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
              type="text"
              value={productCategory}
              onChange={(e) => {
                setProductCategory(e.target.value);
              }}
            />
          </section>
          <section className="grid gap-1">
            <label className="pl-3 text-xs font-bold">Image URL:</label>
            <input
              name="image-url"
              placeholder="Image URL"
              className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </section>
        </span>
        <span className="grid md:grid-cols-3 gap-3">
          <section className="grid gap-1">
            <label className="pl-3 text-xs font-bold">Selling Price:</label>
            <input
              name="selling-price"
              className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
              type="number"
              value={sellingPrice}
              onChange={(e) => {
                setSellingPrice(Number(e.target.value));
              }}
            />
          </section>
          <section className="grid gap-1">
            <label className="pl-3 text-xs font-bold">Buying Price:</label>
            <input
              name="buying-price"
              className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
              type="number"
              value={buyingPrice}
              onChange={(e) => {
                setBuyingPrice(Number(e.target.value));
              }}
            />
          </section>
          {/* <section className="grid gap-1">
            <label className="pl-3 text-xs font-bold">Quantity:</label>
            <input
              name="stock"
              className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
              type="number"
              value={stock}
              onChange={(e) => {
                setStock(Number(e.target.value));
              }}
            />
          </section> */}
        </span>
      </section>

      <button
        onClick={handleSubmit}
        type="button"
        className="py-2 rounded-xl bg-[#2191FB] text-white text-lg font-bold cursor-pointer hover:bg-blue-700 active:scale-95 duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProduct;
