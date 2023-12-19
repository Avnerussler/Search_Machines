import { ChangeEvent } from 'react';
import { IFormInput } from '../models/Form';
import { Input } from './Input';

interface FromProps {
 parseWords: IFormInput;
 formInputs: IFormInput;
 onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Form = ({ parseWords, formInputs, onChange }: FromProps) => (
 <div className='inputs'>
  {Object.keys(parseWords).map((parseWordsKey: string) => (
   <Input
    value={formInputs[parseWordsKey]}
    name={parseWordsKey}
    htmlFor={parseWordsKey}
    id={parseWordsKey}
    label={parseWordsKey}
    key={parseWordsKey}
    onChange={onChange}
    className='form-field'
   />
  ))}
 </div>
);
