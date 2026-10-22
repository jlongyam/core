import sade from 'sade';

class Cmd {
  constructor(name = 'cli', single = false) {
    return sade(name, single)
  }
}
export default Cmd