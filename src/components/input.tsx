import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="text-gray-700">{label}</label>
        <input
          ref={ref} // حتماً باید اینجا ref رو استفاده کنی
          className={`border border-gray-300 rounded-lg w-full px-3 py-2 text-sm ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

// این خط لازمه تا اسم کامپوننت موقع دیباگینگ درست نمایش داده شه
Input.displayName = "Input";
