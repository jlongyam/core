import { date } from '@jlbyte/dialog';

const birthday = await date({
  message: 'Pick your birthday',
  minDate: new Date('1900-01-01'),
  initialValue: new Date(),
  maxDate: new Date(),
});