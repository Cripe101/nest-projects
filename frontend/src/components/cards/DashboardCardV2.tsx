import type { IconType } from "react-icons";

const DashboardCardV2 = ({
  label,
  data,
  bgColor = "bg-slate-50",
  textColor = "text-black",
  iconColor,
  Icon,
  money = false,
}: {
  label: string;
  data: number;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
  Icon?: IconType;
  money?: boolean;
}) => {
  return (
    <div
      className={`${bgColor} p-5 py-7 grid gap-2 items-center rounded-2xl shadow ${textColor}`}
    >
      <section className="flex justify-between">
        <p className="font-medium text-lg">{label}</p>
        <p className={`p-2  rounded-xl ${iconColor}`}>
          {Icon && <Icon size={24} />}
        </p>
      </section>
      <p className={`font-bold text-5xl`}>{money ? `₱${data}` : data}</p>
    </div>
  );
};

export default DashboardCardV2;
