# Aeria Client
##### Aeria Client ecosystem based on *Lerna*, with storybook.

---

# Packages docs
Check packages documentation [here](http://caffeinalab.github.io/aeria-client/).

### Workspace initialization
To initialize the workspace, run the following command:

```
yarn run init
```

### Development
To start developing both modules and storybook, run the following command:

```
yarn run dev
```

### Production
To build both packages and storybook run the following command:

```
yarn run build
```

You can also compile modules and storybook separately, as shown below:

```
yarn run build:packages
```

```
yarn run build:storybook
```

On process complete, you can find the transpiled version of each module at *module-folder/dist*.

### Release
To release your modules, run the following command:

```
yarn run publish
```

### Adding modules
You can write your own modules in *packages* folder as usual with *[Lerna](https://github.com/lerna/lerna)*.
More pratically, follow the structure below:

```
|-- packages
|   |-- my-module
|   |   |-- index.js
|   |   |-- package.json
```

where *index.js* will be your module's entry point and *package.json* will look like follows:

```json
{
  "name": "@aeria/my-module",
  "version": "0.0.1",
  "main": "dist/index.js",
  "module": "index.js",
  "license": "ISC",
  "peerDependencies": {}
}
```

At this point, since modules are part of an unique workspace and they may share dependencies, you can add common dependencies with by running following command from the root directory:

```
yarn add -W <module>
```

where the *-W* flag makes the dependency available in the whole workspace. If you're dealing with devDependency, use *-DW* flag instead of *-W*.

Alternatively, you can add module-specific dependencies by running the command below directly in the module's folder:

```
cd packages/my-module
yarn add [-D] <module>
```

#### Modules resolution
Thanks to *Lerna*, you can simply import one of your modules as a dependency of another module and it will be automatically resolved, like follows:

```js
/** packages/my-module/index.js */
import MyOtherModule from '@aeria/my-other-module'

const magic = MyOtherModule.awesomeStaticMethod()

console.log(magic)
```

__N.B.:__ The module's name used in import statement above must match with the one defined in module's package.json file.

