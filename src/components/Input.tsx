import { ChangeEvent } from 'react';

interface InputProps {
 name: string;
 id?: string;
 htmlFor?: string;
 onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 label: string;
 value: string | number;
 errors?: { [key: string]: string | boolean };
 className?: string;
}
export const Input = ({
 name,
 onChange,
 htmlFor,
 id,
 label,
 value,
 errors,
 className,
}: InputProps) => {
 return (
  <div className={className}>
   <label htmlFor={htmlFor}>{label}</label>
   <input value={value} name={name} id={id} onChange={onChange} />
   {errors && errors[name] && <div className='error'>Value length is to long</div>}
  </div>
 );
};
