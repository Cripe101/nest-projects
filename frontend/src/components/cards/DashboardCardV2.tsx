const DashboardCardV2 = ({
  label,
  data,
  bgColor = "bg-blue-50",
}: {
  label: string;
  data: number;
  bgColor?: string;
}) => {
  return (
    <div
      className={`${bgColor} p-5 py-7 grid gap-2 justify-center items-center rounded-2xl shadow`}
    >
      <p className="font-medium text-sm">{label}</p>
      <p className="font-bold text-5xl text-center">{data}</p>
    </div>
  );
};

export default DashboardCardV2;
