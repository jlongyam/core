import { text } from '@clack/prompts';


function validateAge(value = string || undefined) {
  if (!value) return 'Please enter a value';
  const num = parseInt(value);
  if (isNaN(num)) return 'Please enter a valid number';
  if (num < 0 || num > 120) return 'Age must be between 0 and 120';
  return undefined;
}

const age = await text({
  message: 'Enter your age:',
  validate: validateAge,
});


console.log(age)