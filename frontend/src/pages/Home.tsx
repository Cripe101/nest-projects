import { CiGrid31, CiMobile1, CiMoneyBill, CiWallet } from "react-icons/ci";
import DashboardCard from "../components/cards/DashboardCard";

const Home = () => {
  return (
    <div className="p-5 grid gap-5">
      <h1 className="flex gap-2 items-center">
        <CiGrid31 size={26} />
        <p className="text-lg">Dashboard</p>
      </h1>
      <section className="text-white grid grid-cols-3 gap-5">
        <DashboardCard
          label="Total Profit"
          icon={CiMoneyBill}
          data={60}
          count={7}
          text="text-white"
          bgColor="bg-[#2191FB]"
        />
        <DashboardCard
          label="Phone"
          icon={CiMobile1}
          data={10}
          count={2}
          text="text-black"
          bgColor="bg-[#B2ECE1]"
        />
        <DashboardCard
          label="G-cash"
          icon={CiWallet}
          data={50}
          count={5}
          text="text-black"
          bgColor="bg-[#8CDEDC]"
        />
      </section>
      <section className="bg-slate-50 p-5 shadow rounded-xl">{Date()}</section>
    </div>
  );
};

export default Home;
