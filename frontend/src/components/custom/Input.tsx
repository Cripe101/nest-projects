const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  setter,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string | number;
  setter: any;
}) => {
  return (
    <div className="flex flex-col">
      <label className="pl-2 font-medium text-sm">{label}:</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="outline-none px-4 py-2 rounded-xl bg-white shadow-xs"
      />
    </div>
  );
};

export default Input;
