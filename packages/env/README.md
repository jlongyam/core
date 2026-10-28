# Env

Basic environment detector and manipulator

## Usage

Starting point

```js
import env from '@jlbyte/env'
console.log(env);
```

```js
{ browser: false, worker: false, cli: true }
```

## Extension

Optional and lazy

### `env.global`

```js
import '@jlbyte/env/global';
console.log('env.global === globalThis', env.global === globalThis);
console.log('env.global === global', env.global === global)
```

```js
env.global === globalThis true
env.global === global true
```

### `env.runtime`

```js
import '@jlbyte/env/runtime';

console.log(env.runtime);
```

```js
node
```

See **usage/** folder for more examples.

## License

License [MIT](LICENSE)
