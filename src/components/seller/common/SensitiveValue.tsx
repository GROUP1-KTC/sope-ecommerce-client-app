import { useState, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SensitiveValueProps {
  value?: string;
  hiddenMask?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function SensitiveValue({
  value,
  hiddenMask = "********",
  children,
  className = "",
}: SensitiveValueProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`flex items-center ${className}`}>
      <div className="mr-2">{visible ? children ?? value : hiddenMask}</div>
      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="text-red-600 hover:text-red-800"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
