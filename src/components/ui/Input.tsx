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
  [key: string]: unknown;
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
  [key: string]: unknown;
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
const CustomInputField = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
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
  [key: string]: unknown;
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
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 9H6V11H4V9ZM4 13H6V15H4V13ZM8 9H10V11H8V9ZM8 13H10V15H8V13ZM12 9H14V11H12V9ZM12 13H14V15H12V13Z" fill="#E9DDB5"/>
<path d="M2 20H16C17.103 20 18 19.103 18 18V4C18 2.897 17.103 2 16 2H14V0H12V2H6V0H4V2H2C0.897 2 0 2.897 0 4V18C0 19.103 0.897 20 2 20ZM16 6L16.001 18H2V6H16Z" fill="#E9DDB5"/>
</svg>

        </span>
      </div>
      {error && <span className="text-red-400 text-xs -mt-3">{error}</span>}
    </div>
  );
}; 