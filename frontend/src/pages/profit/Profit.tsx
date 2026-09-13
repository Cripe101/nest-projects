import { CiCalendar, CiDatabase, CiMobile1, CiWallet } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import {
  getGcashTotalProfit,
  getPhoneTotalProfit,
  getProfitByMonth,
} from "../../api/ProfitApi";
import DashboardCard from "../../components/cards/DashboardCard";

const Profit = () => {
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);

  //   return date.toLocaleDateString("en-US", {
  //     month: "long",
  //     day: "2-digit",
  //     year: "numeric",
  //   });
  // };

  // const deleteMutation = useMutation({
  //   mutationKey: ["Phone"],
  //   mutationFn: (id: string) => deleteProfit(id),
  //   onSuccess: () => {
  //     toast.success("Successfully Deleted", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       style: {
  //         width: 300,
  //         borderRadius: 10,
  //       },
  //     });
  //     phoneTotalProfit.refetch();
  //     gcashTotalProfit.refetch();
  //     monthlyQuery.refetch();
  //   },
  //   onError: (err) => {
  //     toast.error(err.message, {
  //       position: "top-right",
  //       autoClose: 2000,
  //       style: {
  //         width: 300,
  //         borderRadius: 10,
  //       },
  //     });
  //   },
  // });

  // const handleDelete = (id: string) => {
  //   deleteMutation.mutate(id);
  // };

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
    <div className="grid p-3 px-5">
      <h1 className="flex mb-5">
        <CiDatabase size={26} />
        <p className="text-lg font-medium">Dashboard</p>
      </h1>
      <section className="flex flex-col gap-3">
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
    </div>
  );
};

export default Profit;
