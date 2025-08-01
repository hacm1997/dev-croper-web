import { Button } from "primereact/button";

type Props = {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  onAction?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function PrimaryButton({ label, loading, type, disabled, onAction }: Props) {
  return (
    <Button
      type={type}
      className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      label={label}
      onClick={onAction}
      loading={loading}
      disabled={disabled}
    />
  );
}