import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addInventoryStock } from "../../api/InventoryApi";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../custom/Input";
import { toast } from "react-toastify";

const AddInventoryStock = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const { id } = useParams();
  const navigate = useNavigate();

  const addStockMutation = useMutation({
    mutationKey: ["add-stock"],
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      addInventoryStock(id, quantity),
    onSuccess: () => {
      toast.success("Stock added successfully");
      navigate("/inventory");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = () => {
    if (quantity <= 0) {
      toast.warn("Enter a valid amount");

      return;
    }

    addStockMutation.mutate({ id: id!, quantity: Number(quantity) });
  };
  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-5">
      <h1 className="font-bold">AddInventoryStock</h1>

      <section className="grid gap-5">
        <Input
          label="Quantity"
          placeholder="Quantity"
          type="number"
          value={quantity}
          setter={setQuantity}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 px-3 py-2 text-white font-bold rounded-xl cursor-pointer active:scale-90 duration-200"
        >
          Submit
        </button>
      </section>
    </div>
  );
};

export default AddInventoryStock;
