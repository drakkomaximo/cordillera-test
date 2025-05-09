import React, { useRef, useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subYears } from 'date-fns';

const errorSpan = 'block text-error text-form-label-desktop mt-1 font-economica'; 

// Input normal reutilizable
export const CustomInput = ({
  label,
  placeholder,
  type = 'text',
  error,
  ...props
}: {
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  [key: string]: unknown;
}) => (
  <div className="mb-4">
    <label className="block text-mainlight mb-1 form-label-desktop font-bold font-economica">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border ${error ? 'border-error' : 'border-mainlight'} text-mainlight placeholder-mainlight form-label-desktop font-normal font-economica focus:outline-none focus:ring-2 ${error ? 'focus:ring-error' : 'focus:ring-mainlight'} transition bg-black/30`}
      {...props}
    />
    {error && <span className={errorSpan}>{error}</span>}
  </div>
);

// Input con ícono reutilizable
export const CustomInputWithIcon = ({
  label,
  placeholder,
  type = 'text',
  icon,
  error,
  ...props
}: {
  label: string;
  placeholder?: string;
  type?: string;
  icon: React.ReactNode;
  error?: string;
  [key: string]: unknown;
}) => (
  <div className="mb-4">
    <label className="block text-mainlight mb-1 form-label-desktop font-bold font-economica">{label}</label>
    <div className={`flex items-center border ${error ? 'border-error' : 'border-mainlight'} bg-black/30 px-4 py-3`}>
      <span className={`mr-3 ${error ? 'text-error' : 'text-mainlight'} flex-shrink-0`}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-mainlight placeholder-mainlight form-label-desktop font-normal font-economica"
        {...props}
      />
    </div>
    {error && <span className={errorSpan}>{error}</span>}
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
      <div className={`relative border ${error ? 'border-error' : 'border-mainlight'} bg-black/30 px-4 py-3 flex items-center`}>
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
          maxDate={subYears(new Date(), 18)}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onClickOutside={() => setOpen(false)}
          onSelect={() => setOpen(false)}
          {...props}
        />
        <span
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${error ? 'text-error' : 'text-mainlight'} cursor-pointer`}
          onClick={() => setOpen(true)}
        >
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 9H6V11H4V9ZM4 13H6V15H4V13ZM8 9H10V11H8V9ZM8 13H10V15H8V13ZM12 9H14V11H12V9ZM12 13H14V15H12V13Z" fill={error ? '#FF5555' : '#E9DDB5'}/>
            <path d="M2 20H16C17.103 20 18 19.103 18 18V4C18 2.897 17.103 2 16 2H14V0H12V2H6V0H4V2H2C0.897 2 0 2.897 0 4V18C0 19.103 0.897 20 2 20ZM16 6L16.001 18H2V6H16Z" fill={error ? '#FF5555' : '#E9DDB5'}/>
          </svg>
        </span>
      </div>
      {error && <span className={errorSpan}>{error}</span>}
    </div>
  );
};

// Checkbox personalizado
export const CustomCheckbox = ({
  label,
  error,
  checked,
  onChange,
  disabled,
  link,
  linkText,
  ...props
}: {
  label: string;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  link?: string;
  linkText?: string;
  [key: string]: unknown;
}) => (
  <div className="mb-4">
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="absolute opacity-0 w-0 h-0"
        {...props}
      />
      <span
        className={`w-4 h-4 flex items-center justify-center border ${error ? 'border-error' : 'border-mainlight'} rounded transition-colors duration-200 ${
          checked ? "bg-mainlight" : "bg-transparent"
        }`}
        style={{ minWidth: "1rem", minHeight: "1rem" }}
      >
        {checked && (
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M3 6.5L5.5 9L9 4.5' stroke='#191916' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        )}
      </span>
      <span className="text-form-disclaimer-mobile text-mainlight font-bold font-economica">
        {label}
        {link && linkText && (
          <a href={link} target='blank' className="text-mainlight hover:text-accentcyan transition-colors underline">
            {linkText}
          </a>
        )}
      </span>
    </label>
    {error && <span className={errorSpan}>{error}</span>}
  </div>
);

// Lista de indicativos
export const COUNTRY_CODES = [
  { country: 'Colombia', code: '+57' },
  { country: 'Argentina', code: '+54' },
  { country: 'Bolivia', code: '+591' },
  { country: 'Brasil', code: '+55' },
  { country: 'Canadá', code: '+1' },
  { country: 'Chile', code: '+56' },
  { country: 'Costa Rica', code: '+506' },
  { country: 'Cuba', code: '+53' },
  { country: 'Ecuador', code: '+593' },
  { country: 'El Salvador', code: '+503' },
  { country: 'Estados Unidos', code: '+1' },
  { country: 'Guatemala', code: '+502' },
  { country: 'Haití', code: '+509' },
  { country: 'Honduras', code: '+504' },
  { country: 'México', code: '+52' },
  { country: 'Nicaragua', code: '+505' },
  { country: 'Panamá', code: '+507' },
  { country: 'Paraguay', code: '+595' },
  { country: 'Perú', code: '+51' },
  { country: 'República Dominicana', code: '+1' },
  { country: 'Uruguay', code: '+598' },
  { country: 'Venezuela', code: '+58' },
  { country: 'Alemania', code: '+49' },
  { country: 'España', code: '+34' },
  { country: 'Francia', code: '+33' },
  { country: 'Italia', code: '+39' },
  { country: 'Reino Unido', code: '+44' },
  { country: 'Rusia', code: '+7' },
  { country: 'Países Bajos', code: '+31' },
  { country: 'Suiza', code: '+41' },
  { country: 'Suecia', code: '+46' },
  { country: 'Noruega', code: '+47' },
  { country: 'China', code: '+86' },
  { country: 'India', code: '+91' },
  { country: 'Japón', code: '+81' },
  { country: 'Corea del Sur', code: '+82' },
  { country: 'Turquía', code: '+90' },
  { country: 'Israel', code: '+972' },
  { country: 'Indonesia', code: '+62' },
  { country: 'Arabia Saudita', code: '+966' },
  { country: 'Emiratos Árabes Unidos', code: '+971' },
  { country: 'Pakistán', code: '+92' },
  { country: 'Sudáfrica', code: '+27' },
  { country: 'Egipto', code: '+20' },
  { country: 'Nigeria', code: '+234' },
  { country: 'Kenia', code: '+254' },
  { country: 'Argelia', code: '+213' },
  { country: 'Etiopía', code: '+251' },
  { country: 'Marruecos', code: '+212' },
  { country: 'Ghana', code: '+233' },
  { country: 'Tanzania', code: '+255' },
  { country: 'Senegal', code: '+221' },
  { country: 'Australia', code: '+61' },
  { country: 'Nueva Zelanda', code: '+64' },
  { country: 'Papúa Nueva Guinea', code: '+675' },
  { country: 'Fiyi', code: '+679' },
  { country: 'Samoa', code: '+685' },
];

export const PhoneInput = ({
  label,
  value,
  onChangeIndicative,
  onChangeNumber,
  indicative,
  error,
  disabled,
  ...props
}: {
  label: string;
  value: string;
  indicative: string;
  onChangeIndicative: (val: string) => void;
  onChangeNumber: (val: string) => void;
  error?: string;
  disabled?: boolean;
  [key: string]: unknown;
}) => (
  <div className="mb-4">
    <label className="block text-mainlight mb-1 form-label-desktop font-bold font-economica">{label}</label>
    <div className="flex gap-0 items-center border px-4 py-3 rounded transition-colors duration-200 bg-black/30"
      style={{ borderColor: error ? '#FF5555' : '#E9DDB5' }}>
      <span className={`mr-2 flex-shrink-0 ${error ? 'text-error' : 'text-mainlight'}`}>
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M13.535 0.807967C12.779 0.0519668 11.463 0.0519668 10.707 0.807967L0.807999 10.707C0.433301 11.0822 0.222839 11.5907 0.222839 12.121C0.222839 12.6512 0.433301 13.1598 0.807999 13.535L6.465 19.192C6.843 19.57 7.345 19.778 7.879 19.778C8.413 19.778 8.915 19.57 9.293 19.192L19.192 9.29297C19.57 8.91497 19.778 8.41297 19.778 7.87897C19.778 7.34497 19.57 6.84297 19.192 6.46497L13.535 0.807967ZM7.879 17.778L2.222 12.121L12.121 2.22197L17.778 7.87897L7.879 17.778Z' fill='currentColor'/>
          <path d='M7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z' fill='currentColor'/>
          <path d='M13.707 19.707L12.293 18.293L18.293 12.293L19.707 13.708L13.707 19.707ZM6.29303 0.292969L7.70703 1.70697L1.70703 7.70697L0.29303 6.29197L6.29303 0.292969Z' fill='currentColor'/>
        </svg>
      </span>
      <div className="relative flex items-center">
        <select
          className={`px-2 py-1 pr-8 border-none text-mainlight font-economica focus:outline-none focus:ring-2 focus:ring-transparent transition phone-indicative-select appearance-none text-xs md:text-base md:py-2`}
          style={{ 
            background: '#0000004D', 
            border: 'none', 
            borderRight: `2px solid ${error ? '#FF5555' : '#E9DDB5'}` 
          }}
          value={indicative}
          onChange={e => onChangeIndicative(e.target.value)}
          disabled={disabled}
        >
          <option value="">Indicativo</option>
          {COUNTRY_CODES.map(opt => (
            <option key={opt.code + opt.country} value={opt.code}>{opt.country} ({opt.code})</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 pr-2" style={{color: '#E9DDB5'}}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7L9 11L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]{10}"
        maxLength={10}
        minLength={10}
        className={`w-full px-4 py-2 border-none text-mainlight placeholder-mainlight form-label-desktop font-normal font-economica focus:outline-none focus:ring-transparent transition bg-black/30`}
        value={value}
        onChange={e => onChangeNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
        placeholder="Número de celular"
        disabled={disabled}
        {...props}
      />
    </div>
    {error && <span className="block text-error text-form-label-desktop mt-1 font-economica">{error}</span>}
  </div>
); 