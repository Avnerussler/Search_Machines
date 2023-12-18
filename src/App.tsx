import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import logo from './atlas-logo-rgb.svg';
import { AdTemplate, EAdTemplate } from './models/AdTemplate';
import { Input } from './components/Input';

const defaultTemplate: AdTemplate = {
 Headline1: '{airline} deals[. Save Big]',
 Headline2: 'Book Now & Save',
 Description1: 'Book {airline} to {destination}. Pay Less. Save More!',
 Path1: 'Flights',
 Path2: '[to_]{destination}',
};

interface IFormInput {
 [key: string]: string | number;
}

const curlyBracesContentExtractorRegex = /(?:\{([^{}]+)\})/g;
const removeCharactersSquareBracketsRegex = /\[.*?\]/g;
const maxHeadlineCharacters = 30;
const maxPathCharacters = 15;
const maxDescriptionsCharacters = 80;

function App() {
 const [template, setTemplate] = useState<AdTemplate>(defaultTemplate);
 const [parseWords, setParsWords] = useState<IFormInput>({});
 const [formInputs, setFormInputs] = useState<IFormInput>({});
 const [parseTemplate, setParseTemplate] = useState<AdTemplate>();
 const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

 const getParseParameters = useCallback((template: AdTemplate) => {
  const parsedWords: IFormInput = {};
  const convertTemplateToString = Object.values(template).join(' ');
  let match;
  while ((match = curlyBracesContentExtractorRegex.exec(convertTemplateToString)) !== null) {
   parsedWords[match[1]] = match.index;
  }
  return parsedWords;
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

 const getParsedValue = (name: string, value: string) => {
  switch (name) {
   case EAdTemplate.HEADLINE1:
   case EAdTemplate.HEADLINE2:
    if (value.length > maxHeadlineCharacters) {
     return value.replace(removeCharactersSquareBracketsRegex, '');
    }
    return value;
   case EAdTemplate.PATH1:
   case EAdTemplate.PATH2:
    if (value.length > maxPathCharacters) {
     return value.replace(removeCharactersSquareBracketsRegex, '');
    }
    return value;
   case EAdTemplate.DESCRIPTION1:
    if (value.length > maxDescriptionsCharacters) {
     return value.replace(removeCharactersSquareBracketsRegex, '');
    }
    return value;
   default:
    return value;
  }
 };

 const getError = (name: string, value: string) => {
  switch (name) {
   case EAdTemplate.HEADLINE1:
   case EAdTemplate.HEADLINE2:
    if (value.length > maxHeadlineCharacters) {
     return true;
    }
    return false;
   case EAdTemplate.PATH1:
   case EAdTemplate.PATH2:
    if (value.length > maxPathCharacters) {
     return true;
    }
    return false;
   case EAdTemplate.DESCRIPTION1:
    if (value.length > maxDescriptionsCharacters) {
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
  const name = e.target.name;

  value = getParsedValue(name, value);
  const error = getError(name, value);

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
    <div className='ad-template'>
     <form>
      {Object.keys(template).map(templateKey => {
       return (
        <div key={templateKey}>
         {templateKey !== EAdTemplate.PATH1 && templateKey !== EAdTemplate.PATH2 && (
          <Input
           label={templateKey}
           name={templateKey}
           value={template[templateKey as keyof AdTemplate]}
           onChange={handelTemplateChange}
           errors={errors}
           className='form-field'
          />
         )}
        </div>
       );
      })}
      <div className='paths'>
       <Input
        label={EAdTemplate.PATH1}
        name={EAdTemplate.PATH1}
        value={template[EAdTemplate.PATH1 as keyof AdTemplate]}
        onChange={handelTemplateChange}
        errors={errors}
        className='form-field'
       />
       <div>/</div>
       <Input
        label={EAdTemplate.PATH2}
        name={EAdTemplate.PATH2}
        value={template[EAdTemplate.PATH2 as keyof AdTemplate]}
        onChange={handelTemplateChange}
        errors={errors}
        className='form-field'
       />
      </div>
     </form>
    </div>
    <div className='inputs'>
     {Object.keys(parseWords).map((parseWordsKey: string) => (
      <Input
       value={formInputs[parseWordsKey]}
       name={parseWordsKey}
       htmlFor={parseWordsKey}
       id={parseWordsKey}
       label={parseWordsKey}
       key={parseWordsKey}
       onChange={handelFormChange}
      />
     ))}
    </div>
    <div className='results'>
     <div className='headline1'>{parseTemplate?.[EAdTemplate.HEADLINE1]}</div>
     <div className='headline2'>{parseTemplate?.[EAdTemplate.HEADLINE2]}</div>
     <div className='description'>{parseTemplate?.[EAdTemplate.DESCRIPTION1]}</div>
     <div className='paths'>
      <div className='path1'>{parseTemplate?.[EAdTemplate.PATH1]}</div>
      &nbsp;/ &nbsp;
      <div className='path2'>{parseTemplate?.[EAdTemplate.PATH2]}</div>
     </div>
    </div>
   </div>
  </div>
 );
}

export default App;
