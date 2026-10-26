import { text, select, confirm, tasks, spinner, isCancel } from '@clack/prompts';

async function cliTool() {
  while (true) {
    const action = await select({
      message: 'What would you like to do?',
      options: [
        { value: 'create', label: 'Create new item', hint: 'Create a new resource' },
        { value: 'list', label: 'List items', hint: 'View all resources' },
        { value: 'delete', label: 'Delete item', hint: 'Remove a resource' },
        { value: 'update', label: 'Update item', hint: 'Modify a resource' },
        { value: 'exit', label: 'Exit', hint: 'Close the application' },
      ],
    });

    if (isCancel(action)) {
      console.log('Operation cancelled');
      process.exit(0);
    }

    if (action === 'exit') break;

    switch (action) {
      case 'create': {
        const name = await text({
          message: 'Enter item name:',
          validate: (value) => {
            if (!value) return 'Name is required';
            return undefined;
          },
        });

        if (isCancel(name)) {
          console.log('Operation cancelled');
          break;
        }

        const spin = spinner();
        spin.start('Creating item...');

        await tasks([
          {
            title: 'Validating input',
            task: async () => {
              // Validation logic
              return 'Input validated';
            },
          },
          {
            title: 'Creating resource',
            task: async () => {
              // Creation logic
              return 'Resource created';
            },
          },
          {
            title: 'Setting up permissions',
            task: async () => {
              // Permission setup
              return 'Permissions configured';
            },
          },
        ]);

        spin.stop('Item created successfully');
        break;
      }
      case 'list': {
        const spin = spinner();
        spin.start('Fetching items...');

        await new Promise(resolve => setTimeout(resolve, 1000));

        spin.stop('Items fetched successfully');
        console.log('Listing items...');
        break;
      }
      case 'delete': {
        const item = await text({
          message: 'Enter item to delete:',
          validate: (value) => {
            if (!value) return 'Item name is required';
            return undefined;
          },
        });

        if (isCancel(item)) {
          console.log('Operation cancelled');
          break;
        }

        const shouldDelete = await confirm({
          message: `Are you sure you want to delete ${item}?`,
        });

        if (isCancel(shouldDelete)) {
          console.log('Operation cancelled');
          break;
        }

        if (shouldDelete) {
          const spin = spinner();
          spin.start('Deleting item...');

          await tasks([
            {
              title: 'Checking dependencies',
              task: async () => {
                return 'Dependencies checked';
              },
            },
            {
              title: 'Removing item',
              task: async () => {
                return 'Item removed';
              },
            },
            {
              title: 'Cleaning up',
              task: async () => {
                return 'Cleanup completed';
              },
            },
          ]);

          spin.stop('Item deleted successfully');
        }
        break;
      }
      case 'update': {
        const item = await text({
          message: 'Enter item to update:',
          validate: (value) => {
            if (!value) return 'Item name is required';
            return undefined;
          },
        });

        if (isCancel(item)) {
          console.log('Operation cancelled');
          break;
        }

        const spin = spinner();
        spin.start('Updating item...');

        await tasks([
          {
            title: 'Fetching current state',
            task: async () => {
              return 'Current state fetched';
            },
          },
          {
            title: 'Applying updates',
            task: async () => {
              return 'Updates applied';
            },
          },
          {
            title: 'Verifying changes',
            task: async () => {
              return 'Changes verified';
            },
          },
        ]);

        spin.stop('Item updated successfully');
        break;
      }
    }
  }
}

cliTool();