import React, { useRef, useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Input normal reutilizable
export const CustomInput = ({
  label,
  placeholder,
  type = 'text',
  ...props
}: {
  label: string;
  placeholder?: string;
  type?: string;
  [key: string]: any;
}) => (
  <div className="mb-4">
    <label className="block text-mainlight mb-1 form-label-desktop font-bold font-economica">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-mainlight text-mainlight placeholder-mainlight form-label-desktop font-normal font-economica focus:outline-none focus:ring-2 focus:ring-mainlight transition bg-black/30"
      {...props}
    />
  </div>
);

// Input con ícono reutilizable
export const CustomInputWithIcon = ({
  label,
  placeholder,
  type = 'text',
  icon,
  ...props
}: {
  label: string;
  placeholder?: string;
  type?: string;
  icon: React.ReactNode;
  [key: string]: any;
}) => (
  <div className="mb-4">
    <label className="block text-mainlight mb-1 form-label-desktop font-bold font-economica">{label}</label>
    <div className="flex items-center border border-mainlight bg-black/30 px-4 py-3">
      <span className="mr-3 text-mainlight flex-shrink-0">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-mainlight placeholder-mainlight form-label-desktop font-normal font-economica"
        {...props}
      />
    </div>
  </div>
);

// Input de fecha con react-datepicker
const CustomInputField = forwardRef<HTMLInputElement, any>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={
      'w-full bg-transparent outline-none text-mainlight form-label-desktop font-normal font-economica pr-10 ' +
      (props.className || '')
    }
    readOnly
  />
));
CustomInputField.displayName = 'CustomInputField';

export const CustomDatePicker = ({
  label,
  value,
  onChange,
  name,
  error,
  ...props
}: {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  name: string;
  error?: string;
  [key: string]: any;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <label className="block text-mainlight mb-1 form-label-desktop font-bold font-economica">{label}</label>
      <div className="relative border border-mainlight bg-black/30 px-4 py-3 flex items-center">
        <DatePicker
          selected={value}
          onChange={(date) => {
            onChange(date);
            setOpen(false);
          }}
          name={name}
          dateFormat="MM/dd/yyyy"
          calendarClassName="bg-black text-mainlight font-economica"
          popperClassName="z-50"
          customInput={<CustomInputField ref={inputRef} />}
          open={open}
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onClickOutside={() => setOpen(false)}
          onSelect={() => setOpen(false)}
          {...props}
        />
        <span
          className="absolute right-4 top-1/2 -translate-y-1/2 text-mainlight cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
        </span>
      </div>
      {error && <span className="text-red-400 text-xs -mt-3">{error}</span>}
    </div>
  );
}; 