import { ChangeEvent } from 'react';
import { AdTemplate, EAdTemplate } from '../models/AdTemplate';
import { Input } from './Input';
interface ITemplate {
 onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 errors: { [key: string]: string | boolean };
 template: AdTemplate;
}
export const Template = ({ onChange, errors, template }: ITemplate) => (
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
        onChange={onChange}
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
     onChange={onChange}
     errors={errors}
     className='form-field'
    />
    <div className='slash'></div>
    <Input
     label={EAdTemplate.PATH2}
     name={EAdTemplate.PATH2}
     value={template[EAdTemplate.PATH2 as keyof AdTemplate]}
     onChange={onChange}
     errors={errors}
     className='form-field'
    />
   </div>
  </form>
 </div>
);
