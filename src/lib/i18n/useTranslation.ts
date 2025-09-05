import { useState, useEffect } from 'react';
import compareTranslations from './compare.json';

type Language = 'en' | 'am';
type TranslationKey = string;

/**
 * Simple i18n hook for translations
 * Follows the existing pattern of language switching in the navbar
 */
export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = compareTranslations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      return key; // Return key if translation not found
    }
    
    // Simple parameter replacement
    if (params) {
      return Object.entries(params).reduce(
        (str, [param, val]) => str.replace(`{{${param}}}`, val),
        value
      );
    }
    
    return value;
  };

  return { t, language, setLanguage };
};
