import type { IconType } from "react-icons";

type DashboardCardProps = {
  bgColor?: string;
  text?: string;
  label: string;
  data: string | number;
  icon: IconType;
  date?: any;
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
      className={`px-5 py-3 rounded-xl ${bgColor} ${text} grid gap-3 shadow`}
    >
      <section className="flex justify-between">
        <h1
          className={`flex ${label === "Phone" ? "gap-0.5" : "gap-1"} items-center`}
        >
          <Icon size={26} />
          <p className="text-sm font-bold">{label}</p>
        </h1>
        <h1 className="text-sm font-medium">{date}</h1>
      </section>

      <section className="flex justify-between text-6xl font-medium">
        <p>₱</p>
        <h1> {data}.00</h1>
      </section>
    </div>
  );
};

export default DashboardCard;
