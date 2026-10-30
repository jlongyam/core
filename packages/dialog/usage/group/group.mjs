import { group, text, password } from '@jlbyte/dialog';

const account = await group({
  email: () => text({
    message: 'What is your email address?',
    validate: (value) => {
      if (!value || !/^[a-z0-9_.-]+@[a-z0-9_.-]+\.[a-z]{2,}$/i.test(value)) return 'Please enter a valid email'
    }
  }),
  username: ({ results }) => text({
    message: 'What is your username?',
    placeholder: results.email?.replace(/@.+$/, '').toLowerCase() ?? '',
    validate: (value) => {
      // FOR DEMO PURPOSES ONLY! Use a robust validation library in production
      if (!value || value.length < 2) return 'Please enter at least 2 characters'
    }
  }),
  password: () => password({
    message: 'Define your password'
  }),
});
