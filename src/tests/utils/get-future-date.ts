//vai retornar sempre uma data no futuro
 import {setYear, parseISO} from 'date-fns';

// O parseIso converte uma data em string para um objeto date


 export function getFutureDate(date: string): Date {
    return setYear(parseISO(date), new Date().getFullYear() + 1);
 } 