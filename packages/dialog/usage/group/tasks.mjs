import { tasks } from "@jlbyte/dialog";

await tasks([{
  title: 'Downloading package',
  task: async () => {
    // Do a fetch
    return 'Download completed';
  }
}, {
  title: "Un-archiving",
  task: async (message) => {
    const parts = [];
    for (let index = 0; index < parts.length; index++) {
      const type = parts[index];
      // Update the message to indicate what is done
      message(`Un-archiving ${type} (${index + 1}/${parts.length})`);
      // Do the un-archiving task
    }
    return 'Un-archiving completed';
  }
}, {
  title: 'Linking',
  task: async () => {
    // Do work
    return 'Package linked';
  }
}]);
