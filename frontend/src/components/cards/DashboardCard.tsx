import type { IconType } from "react-icons";

type DashboardCardProps = {
  bgColor?: string;
  text?: string;
  label: string;
  data: string | number;
  icon: IconType;
  date?: string;
};

const DashboardCard = ({
  bgColor,
  label,
  text = "text-white",
  data,
  icon: Icon,
  date,
}: DashboardCardProps) => {
  return (
    <div
      className={`px-10 py-5 rounded-xl ${bgColor} ${text} grid gap-3 shadow`}
    >
      <section className="flex justify-between">
        <h1
          className={`flex ${label === "Phone" ? "gap-0.5" : "gap-1"} items-center`}
        >
          <Icon size={30} />
          <p className="text-lg font-medium">{label}</p>
        </h1>
        <h1 className="text-lg font-medium">{date}</h1>
      </section>
      <h1 className="text-5xl">₱ {data}.00</h1>
    </div>
  );
};

export default DashboardCard;
