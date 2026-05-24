import { BiPlus } from "react-icons/bi";
import { CiCalendar, CiMobile1, CiTrash, CiWallet } from "react-icons/ci";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addProfit,
  deleteProfit,
  getGcashTotalProfit,
  getPhoneTotalProfit,
  getProfit,
  getProfitByMonth,
} from "../api/ProfitApi";
import DashboardCard from "../components/cards/DashboardCard";

const Profit = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string | undefined>(
    new Date().toISOString().split("T")[0],
  );

  const addMutation = useMutation({
    mutationKey: ["Phone"],
    mutationFn: (data: {
      date: string | undefined;
      description: string;
      amount: number;
    }) =>
      addProfit({
        date: data.date,
        description: data.description,
        amount: data.amount,
      }),
    onSuccess: () => {
      toast.success("Added Successfully", {
        position: "top-right",
        autoClose: 2000,
        style: {
          width: 300,
          borderRadius: 10,
        },
      });
      refetch();
      phoneTotalProfit.refetch();
      gcashTotalProfit.refetch();
      monthlyQuery.refetch();
      setAmount(0);
      setDescription("");
    },
    onError: (err) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 2000,
        style: {
          width: 300,
          borderRadius: 10,
        },
      });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["Phone"],
    mutationFn: (id: string) => deleteProfit(id),
    onSuccess: () => {
      toast.success("Successfully Deleted", {
        position: "top-right",
        autoClose: 2000,
        style: {
          width: 300,
          borderRadius: 10,
        },
      });
      refetch();
      phoneTotalProfit.refetch();
      gcashTotalProfit.refetch();
      monthlyQuery.refetch();
    },
    onError: (err) => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 2000,
        style: {
          width: 300,
          borderRadius: 10,
        },
      });
    },
  });

  const isoDate =
    date && !isNaN(new Date(date).getTime())
      ? new Date(date).toISOString()
      : undefined;

  const handleSubmit = () => {
    const data = {
      date: isoDate,
      amount: amount,
      description: description,
    };

    addMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const { data, refetch } = useQuery({
    queryKey: ["profits"],
    queryFn: getProfit,
  });

  const phoneTotalProfit = useQuery({
    queryKey: ["phone"],
    queryFn: getPhoneTotalProfit,
  });

  const gcashTotalProfit = useQuery({
    queryKey: ["gcash"],
    queryFn: getGcashTotalProfit,
  });

  const monthlyQuery = useQuery({
    queryKey: ["month"],
    queryFn: getProfitByMonth,
  });

  return (
    <div className="p-5 md:p-10 grid gap-5">
      <h1 className="flex items-center gap-1.5">
        <CiMobile1 size={26} />
        <p className="text-lg">Phone</p>
      </h1>
      <section className="grid md:grid-cols-4 gap-5">
        <form className="flex flex-col gap-5 p-5 bg-slate-50 rounded-xl shadow">
          <h1 className="flex items-center gap-1">
            <BiPlus size={26} />
            <p className="font-medium">Add Transaction</p>
          </h1>

          <datalist id="phone-options">
            <option value="Phone" />
            <option value="G-cash" />
          </datalist>

          <section className="grid gap-3">
            <span className="grid grid-cols-2 gap-3">
              <input
                className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
                placeholder="Label"
                type="select"
                list="phone-options"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <input
                className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
                placeholder="Profit Amount"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                }}
              />
            </span>
            <input
              className="outline-none w-full border border-slate-400 p-2 px-4 rounded-xl"
              placeholder="Date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </section>

          <button
            type="button"
            onClick={handleSubmit}
            className="py-2 rounded-xl bg-[#2191FB] text-white text-lg font-bold cursor-pointer hover:bg-blue-700 active:scale-95 duration-200"
          >
            Submit
          </button>
        </form>
        <DashboardCard
          label="Monthly Profit"
          icon={CiCalendar}
          data={monthlyQuery?.data?.totalProfit ?? 0}
          text="text-white"
          bgColor="bg-blue-600"
        />
        <DashboardCard
          label="Phone Total Profit"
          icon={CiMobile1}
          data={phoneTotalProfit?.data?.totalProfit ?? 0}
          text="text-white"
          bgColor="bg-[#2191FB]"
        />
        <DashboardCard
          label="G-cash Total Profit"
          icon={CiWallet}
          data={gcashTotalProfit?.data?.totalProfit ?? 0}
          text="text-white"
          bgColor="bg-blue-400"
        />
      </section>
      <section className="grid gap-5">
        <div className="bg-slate-50 p-5 rounded-xl">
          <h1 className="text-lg font-sans">Transaction List</h1>
          <span className="grid gap-3">
            {data
              ?.sort((a: any, b: any) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
              .slice(0, 5)
              .map((tran: any) => (
                <section key={tran._id} className="flex justify-between">
                  <span className="flex gap-1 items-center justify-center">
                    <p className="">
                      <CiMobile1 size={26} />
                    </p>
                    <h3>
                      <p className="font-medium">{tran?.description}</p>
                      <p className="text-xs">{formatDate(tran?.date)}</p>
                    </h3>
                  </span>
                  <span className="flex items-center gap-3">
                    <p className="">₱ {tran?.amount}.00</p>
                    <button
                      onClick={() => handleDelete(tran._id)}
                      type="button"
                      className="cursor-pointer text-[#BA274A]"
                    >
                      <CiTrash size={24} />
                    </button>
                  </span>
                </section>
              ))}
          </span>
        </div>
      </section>
    </div>
  );
};

export default Profit;
