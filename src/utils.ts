const curlyBracesContentExtractorRegex = /(?:\{([^{}]+)\})/g;
const removeCharactersSquareBracketsRegex = /\[.*?\]/g;

const MAX_HEADLINE_CHARACTERS = 30;
const MAX_PATH_CHARACTERS = 15;
const MAX_DESCRIPTIONS_CHARACTERS = 80;
export {
 curlyBracesContentExtractorRegex,
 removeCharactersSquareBracketsRegex,
 MAX_DESCRIPTIONS_CHARACTERS,
 MAX_HEADLINE_CHARACTERS,
 MAX_PATH_CHARACTERS,
};
