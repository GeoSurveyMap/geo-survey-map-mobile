import { formatDate } from 'date-fns';

export const formatDateTime = (date: string) => {
  return formatDate(date, 'HH:mm, dd MM yyyy');
};
