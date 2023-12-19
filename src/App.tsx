import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import logo from './atlas-logo-rgb.svg';
import { AdTemplate, EAdTemplate } from './models/AdTemplate';
import { Template } from './components/Template';
import { Form } from './components/Form';
import { IFormInput } from './models/Form';
import { GeneratedAD } from './components/GeneratedAD';
import {
 MAX_DESCRIPTIONS_CHARACTERS,
 MAX_HEADLINE_CHARACTERS,
 MAX_PATH_CHARACTERS,
 curlyBracesContentExtractorRegex,
 removeCharactersSquareBracketsRegex,
} from './utils';

//  I didn't know of I allowed to change the defaultTemplate object.
//  I will change it to be like this:
//    [{
//    name:'Headline1',
//    value:"{airline} deals[. Save Big]",
//    errors:"",
//    type:short_string
//  }]
//  in this way you can track the error and decide the type of field in one place

const defaultTemplate: AdTemplate = {
 Headline1: '{airline} deals[. Save Big]',
 Headline2: 'Book Now & Save',
 Description1: 'Book {airline} to {destination}. Pay Less. Save More!',
 Path1: 'Flights',
 Path2: '[to_]{destination}',
};

function App() {
 const [template, setTemplate] = useState<AdTemplate>(defaultTemplate);
 const [parseWords, setParsWords] = useState<IFormInput>({});
 const [formInputs, setFormInputs] = useState<IFormInput>({});
 const [parseTemplate, setParseTemplate] = useState<AdTemplate>();
 const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

 const getParseParameters = useCallback((template: AdTemplate) => {
  const parsedWordsObj: IFormInput = {};
  const convertTemplateToString = Object.values(template).join(' ');
  let match;
  while ((match = curlyBracesContentExtractorRegex.exec(convertTemplateToString)) !== null) {
   parsedWordsObj[match[1]] = match.index;
  }
  return parsedWordsObj;
 }, []);

 const getParsedTemplate = (template: AdTemplate, formInputs: IFormInput) => {
  let templateString = JSON.stringify(template);
  for (const key in formInputs) {
   const placeholderReplacementRegex = new RegExp(`\\{${key}\\}`, 'g');
   templateString = templateString.replace(
    placeholderReplacementRegex,
    formInputs[key as string].toString()
   );
  }
  return JSON.parse(templateString);
 };

 const getParsedValue = (name: EAdTemplate, value: string) => {
  switch (name) {
   case EAdTemplate.HEADLINE1:
   case EAdTemplate.HEADLINE2:
    if (value.length > MAX_HEADLINE_CHARACTERS) {
     return value.replace(removeCharactersSquareBracketsRegex, '');
    }
    return value;
   case EAdTemplate.PATH1:
   case EAdTemplate.PATH2:
    if (value.length > MAX_PATH_CHARACTERS) {
     return value.replace(removeCharactersSquareBracketsRegex, '');
    }
    return value;
   case EAdTemplate.DESCRIPTION1:
    if (value.length > MAX_DESCRIPTIONS_CHARACTERS) {
     return value.replace(removeCharactersSquareBracketsRegex, '');
    }
    return value;
   default:
    return value;
  }
 };

 const isMaxLengthError = (name: EAdTemplate, value: string) => {
  switch (name) {
   case EAdTemplate.HEADLINE1:
   case EAdTemplate.HEADLINE2:
    if (value.length > MAX_HEADLINE_CHARACTERS) {
     return true;
    }
    return false;
   case EAdTemplate.PATH1:
   case EAdTemplate.PATH2:
    if (value.length > MAX_PATH_CHARACTERS) {
     return true;
    }
    return false;
   case EAdTemplate.DESCRIPTION1:
    if (value.length > MAX_DESCRIPTIONS_CHARACTERS) {
     return true;
    }
    return false;

   default:
    return false;
  }
 };

 const handelFormChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const name = e.target.name;
  setFormInputs({ ...formInputs, [name]: value });
 };

 const handelTemplateChange = (e: ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;
  const name = e.target.name as EAdTemplate;

  value = getParsedValue(name, value);
  const error = isMaxLengthError(name, value);

  setErrors({ ...errors, [name]: error });

  setTemplate({ ...template, [name]: value });
 };

 useEffect(() => {
  const words = getParseParameters(template);

  setParsWords({ ...words });
 }, [getParseParameters, template]);

 useEffect(() => {
  const newTemplate = getParsedTemplate(template, formInputs);
  setParseTemplate(newTemplate);
 }, [template, formInputs]);

 return (
  <div className='app'>
   <img src={logo} className='app-logo' alt='logo' />
   <div className='container'>
    <Template template={template} errors={errors} onChange={handelTemplateChange} />
    <div className='divider'></div>
    <Form onChange={handelFormChange} formInputs={formInputs} parseWords={parseWords} />
    <div className='divider'></div>

    <GeneratedAD parseTemplate={parseTemplate} />
   </div>
  </div>
 );
}

export default App;
