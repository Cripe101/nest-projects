import { useEffect, useMemo, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CiTrash, CiWallet } from "react-icons/ci";
import { addProfit, deleteProfit, getProfit } from "../../api/ProfitApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FiCalendar, FiX } from "react-icons/fi";

const Gcash = () => {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  // Date filter
  const [selectedDate, setSelectedDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const addMutation = useMutation({
    mutationKey: ["Gcash"],
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

      setAmount(0);
      gcashTransac.refetch();
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
    mutationKey: ["Gcash"],
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
      gcashTransac.refetch();
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

  const gcashTransac = useQuery({
    queryKey: ["profits", "gcash"],
    queryFn: getProfit,
    select: (data) =>
      data.filter(
        (transaction: any) =>
          transaction.description?.toLowerCase() === "g-cash",
      ),
  });

  // Filter transactions by selected date
  const filteredTransactions = useMemo(() => {
    if (!gcashTransac.data) return [];

    let transactions = [...gcashTransac.data];

    if (selectedDate) {
      transactions = transactions.filter((transaction: any) => {
        if (!transaction.date) return false;

        const transactionDate = new Date(transaction.date)
          .toISOString()
          .split("T")[0];

        return transactionDate === selectedDate;
      });
    }

    transactions.sort((a: any, b: any) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();

      if (dateDiff !== 0) {
        return dateDiff;
      }

      return b._id.localeCompare(a._id);
    });

    return transactions;
  }, [gcashTransac.data, selectedDate]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate]);

  const isoDate =
    date && !isNaN(new Date(date).getTime())
      ? new Date(date).toISOString()
      : undefined;

  const handleSubmit = () => {
    const data = {
      date: isoDate,
      amount: amount,
      description: "G-cash",
    };

    addMutation.mutate(data);
  };

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-3 md:p-10">
      <h1 className="flex items-center gap-1.5 pb-5">
        <CiWallet size={26} />
        <p className="text-lg font-medium">G-cash</p>
      </h1>

      {/* Add Transaction */}
      <section>
        <form className="flex flex-col gap-5 p-5 rounded-xl">
          <h1 className="flex items-center gap-1">
            <BiPlus size={26} />
            <p className="font-medium">Add Transaction</p>
          </h1>

          <section className="grid gap-3">
            <span className="grid grid-cols-2 gap-3">
              <input
                className="outline-none border border-slate-400 p-2 px-4 rounded-xl"
                placeholder="Label"
                disabled
                value="G-cash"
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
              className="outline-none w-full border border-slate-400 p-2.5 px-4 rounded-xl"
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
      </section>

      {/* Transactions */}
      <section className="mt-3 p-5 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h1 className="font-medium text-lg">Transaction</h1>

          {/* Date Filter */}
          <div className="grid grid-cols-2 items-end gap-2">
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">
                Filter by date
              </label>

              <div className="relative">
                <FiCalendar
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                  className="w-full sm:w-45 h-10 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 outline-none transition-all duration-200 hover:border-slate-300"
                />
              </div>
            </div>

            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate("")}
                className="flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl border border-red-100 bg-red-50 text-sm font-medium text-red-500 hover:bg-red-100 hover:border-red-200 active:scale-95 transition-all duration-200"
              >
                <FiX size={16} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Transaction List */}
        <div className="grid gap-2">
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((phone: any) => (
              <div
                key={phone._id}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 duration-200 hover:border-sky-100 shadow-xs"
              >
                {/* Left Side */}
                <div className="flex min-w-0 items-center gap-3">
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#2191FB]">
                    <CiWallet size={25} />
                  </div>

                  {/* Transaction Info */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {phone?.description}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {formatDate(phone?.date)}
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex shrink-0 items-center gap-3">
                  {/* Amount */}
                  <p className="text-sm font-semibold text-slate-800">
                    ₱{" "}
                    {Number(phone?.amount || 0).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  {/* Delete */}
                  {deleteTarget && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
                        {/* Icon */}
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#BA274A]">
                          <CiTrash size={30} />
                        </div>

                        {/* Content */}
                        <div className="mt-4 text-center">
                          <h2 className="text-lg font-semibold text-slate-800">
                            Delete transaction?
                          </h2>

                          <p className="mt-2 text-sm leading-5 text-slate-500">
                            Are you sure you want to delete this transaction?
                            This action cannot be undone.
                          </p>

                          {/* Transaction Preview */}
                          <div className="mt-4 rounded-xl bg-sky-50 p-3 text-left">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#2191FB]">
                                  <CiWallet size={25} />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-slate-700">
                                    {deleteTarget.description}
                                  </p>

                                  <p className="mt-0.5 text-xs text-slate-400">
                                    {formatDate(deleteTarget.date)}
                                  </p>
                                </div>
                              </div>

                              <p className="text-sm font-semibold text-slate-800">
                                ₱{" "}
                                {Number(
                                  deleteTarget.amount || 0,
                                ).toLocaleString("en-PH", {
                                  minimumFractionDigits: 2,
                                })}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(null)}
                            disabled={deleteMutation.isPending}
                            className="rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Cancel
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              handleDelete(deleteTarget._id);
                              setDeleteTarget(null);
                            }}
                            disabled={deleteMutation.isPending}
                            className="rounded-xl bg-[#BA274A] py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deleteMutation.isPending
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(phone)}
                    disabled={deleteMutation.isPending}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-[#BA274A] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Delete transaction"
                  >
                    <CiTrash size={26} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-10">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <CiWallet size={26} />
              </div>

              <p className="text-sm font-medium text-slate-600">
                No transactions found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Your g-cash transactions will appear here.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-200">
            {/* Results info */}
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium text-slate-700">
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredTransactions.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {filteredTransactions.length}
              </span>
            </p>

            {/* Pagination controls */}
            <div className="flex items-center gap-1.5">
              {/* Previous */}
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                ←
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-[#2191FB] text-white shadow-sm shadow-blue-200"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                →
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Gcash;
