import { Button } from "primereact/button";

type Props = {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  onAction?: () => void;
};

export default function DissmindButton({ label, type, onAction }: Props) {
  return (
    <Button
      type={type}
      className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
      label={label}
      onClick={onAction}
    />
  );
}