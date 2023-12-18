export enum EAdTemplate {
 HEADLINE1 = 'Headline1',
 HEADLINE2 = 'Headline2',
 DESCRIPTION1 = 'Description1',
 PATH1 = 'Path1',
 PATH2 = 'Path2',
}
export interface AdTemplate {
 [EAdTemplate.HEADLINE1]: string;
 [EAdTemplate.HEADLINE2]: string;
 [EAdTemplate.DESCRIPTION1]: string;
 [EAdTemplate.PATH1]: string;
 [EAdTemplate.PATH2]: string;
}
