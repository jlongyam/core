import { text, select, groupMultiselect, isCancel } from '@jlbyte/dialog';

async function collectUserData() {
  const name = await text({
    message: 'Full name:',
    validate: (value) => {
      if (!value || value.length < 2) return 'Name must be at least 2 characters';
      if (!/^[a-zA-Z\s]*$/.test(value)) return 'Name can only contain letters and spaces';
      return undefined;
    },
  });

  if (isCancel(name)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const email = await text({
    message: 'Email address:',
    validate: (value) => {
      if (!value) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return undefined;
    },
  });

  if (isCancel(email)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const ageInput = await text({
    message: 'Age:',
    validate: (value) => {
      if (!value) return 'Age is required';
      const num = parseInt(value);
      if (isNaN(num)) return 'Please enter a valid number';
      if (num < 18 || num > 100) return 'Age must be between 18 and 100';
      return undefined;
    },
  });

  if (isCancel(ageInput)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const role = await select({
    message: 'Select role:',
    options: [
      { value: 'admin', label: 'Administrator', hint: 'Full system access' },
      { value: 'user', label: 'User', hint: 'Standard user access' },
      { value: 'guest', label: 'Guest', hint: 'Limited access' },
    ],
  });

  if (isCancel(role)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const skills = await groupMultiselect({
    message: 'Select skills:',
    options: {
      'Frontend': [
        { value: 'react', label: 'React', hint: 'UI library' },
        { value: 'vue', label: 'Vue', hint: 'Progressive framework' },
        { value: 'angular', label: 'Angular', hint: 'Platform' },
      ],
      'Backend': [
        { value: 'node', label: 'Node.js', hint: 'Runtime' },
        { value: 'python', label: 'Python', hint: 'Language' },
        { value: 'java', label: 'Java', hint: 'Language' },
      ],
      'Database': [
        { value: 'sql', label: 'SQL', hint: 'Query language' },
        { value: 'mongodb', label: 'MongoDB', hint: 'NoSQL database' },
        { value: 'redis', label: 'Redis', hint: 'Cache' },
      ],
    },
  });

  if (isCancel(skills)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const theme = await select({
    message: 'Select theme:',
    options: [
      { value: 'light', label: 'Light', hint: 'Light mode' },
      { value: 'dark', label: 'Dark', hint: 'Dark mode' },
      { value: 'system', label: 'System', hint: 'Follow system preference' },
    ],
  });

  if (isCancel(theme)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const notifications = await select({
    message: 'Enable notifications?',
    options: [
      { value: true, label: 'Yes', hint: 'Receive notifications' },
      { value: false, label: 'No', hint: 'No notifications' },
    ],
  });

  if (isCancel(notifications)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  const language = await select({
    message: 'Select language:',
    options: [
      { value: 'en', label: 'English', hint: 'English' },
      { value: 'es', label: 'Spanish', hint: 'Español' },
      { value: 'fr', label: 'French', hint: 'Français' },
      { value: 'de', label: 'German', hint: 'Deutsch' },
    ],
  });

  if (isCancel(language)) {
    console.log('Operation cancelled');
    process.exit(0);
    return null;
  }

  return {
    name,
    email,
    age: parseInt(ageInput),
    role,
    skills,
    preferences: {
      theme: theme,
      notifications: notifications,
      language,
    },
  };
}

const userData = await collectUserData();
console.log(userData)
