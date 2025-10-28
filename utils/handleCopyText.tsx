import { toast } from "react-toastify";

export const handleCopyText = (e : React.MouseEvent<HTMLInputElement>, color) => {
  e.stopPropagation();
    navigator.clipboard.writeText(color);
    toast(`Color copied! ${color}`);
  };
