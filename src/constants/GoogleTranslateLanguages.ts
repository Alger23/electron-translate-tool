import {ITranslateLanguage} from "./ITranslateLanguage";

const translate = require('@vitalets/google-translate-api');

export const GoogleTranslateLanguages:Array<ITranslateLanguage> = Object.getOwnPropertyNames(translate.languages)
  .filter(key => typeof translate.languages[key] !== 'function')
  .map(key => ({cultureName: key, displayName: translate.languages[key]}));
