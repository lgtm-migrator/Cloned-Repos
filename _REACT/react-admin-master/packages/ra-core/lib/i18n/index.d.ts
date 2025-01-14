/// <reference types="react" />
import translate from './translate';
import { TranslationContext } from './TranslationContext';
import TranslationProvider from './TranslationProvider';
import TestTranslationProvider from './TestTranslationProvider';
import useLocale from './useLocale';
import useSetLocale from './useSetLocale';
import useTranslate from './useTranslate';
declare const withTranslate: (BaseComponent: import("react").ComponentType<{}>) => import("react").ComponentType<{}>;
export { translate, // deprecated
withTranslate, // deprecated
TranslationContext, TranslationProvider, TestTranslationProvider, useLocale, useSetLocale, useTranslate, };
export declare const DEFAULT_LOCALE = "en";
export * from './TranslationUtils';
export * from './TranslationContext';
export * from './TranslationMessages';
export * from './TranslatableContext';
export * from './TranslatableContextProvider';
export * from './useTranslatable';
export * from './useTranslatableContext';
