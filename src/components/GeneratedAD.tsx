import { AdTemplate, EAdTemplate } from '../models/AdTemplate';

interface GeneratedADProps {
 parseTemplate: AdTemplate | undefined;
}

export const GeneratedAD = ({ parseTemplate }: GeneratedADProps) => (
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
);
