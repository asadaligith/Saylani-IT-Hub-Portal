import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        <div className="relative flex items-center">
          {icon && <span className="absolute left-3 text-text-light">{icon}</span>}
          <input
            ref={ref}
            className={`
              ${icon ? "pl-10" : ""}
              ${error ? "border-error focus:ring-error" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        {helperText && <p className="text-sm text-text-light">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        <textarea
          ref={ref}
          className={`
            ${error ? "border-error focus:ring-error" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-sm text-error">{error}</p>}
        {helperText && <p className="text-sm text-text-light">{helperText}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        <select ref={ref} className={`${error ? "border-error focus:ring-error" : ""} ${className}`} {...props}>
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-error">{error}</p>}
        {helperText && <p className="text-sm text-text-light">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
