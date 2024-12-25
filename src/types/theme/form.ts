import { UseFormReturn as HookFormReturn } from 'react-hook-form';
import { ThemeBase } from '@/types';

export type UseFormReturn<T = ThemeBase> = Omit<HookFormReturn<T>, 'watch'> & {
  watch: <TFieldName extends keyof T>(
    name?: TFieldName | Array<TFieldName>
  ) => TFieldName extends keyof T ? T[TFieldName] : T;
};