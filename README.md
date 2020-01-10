# NPM Modules Monorepo Boilerplate
##### A multipackage management system based on *Lerna*, with live examples running over *Express* dev server.

---

# Packages docs
Check packages documentation [here](PACKAGES.md).

# Contribution

## Getting started
This boilerplate allows you to easily manage multiple packages as a monorepo and to facilitate their development by creating examples runnable over a dev server with *[HMR](https://webpack.js.org/concepts/hot-module-replacement/)*, so you can test their implementation and behaviors live.

### Requirements
The boilerplate is based on *Yarn*'s workspaces, so install it globally. Check out the [documentation](https://yarnpkg.com/en/docs/install).

### Workspace initialization
To initialize the workspace, run the following command:

```
yarn run init
```

### Development
To start developing both modules and examples, run the following command:

```
yarn run dev
```

#### Routing
By starting global or examples-only development, a dev server will run on http://localhost:3000 and, for each view defined in *examples/views* folder, a route will be available and it'll correspond to its filename (e.g. http://localhost:3000/my-module).

### Production
To build both packages and examples run the following command:

```
yarn run build
```

You can also compile modules and examples separately, as shown below:

```
yarn run build:packages
```

```
yarn run build:examples
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
  "name": "@my-library/my-module",
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
import MyOtherModule from '@my-library/my-other-module'

const magic = MyOtherModule.awesomeStaticMethod()

console.log(magic)
```

__N.B.:__ The module's name used in import statement above must match with the one defined in module's package.json file.

### Adding examples
To create a new example, move to *examples* folder and add the following files:

- *src/my-module.js*: the logic implementation of the example
- *views/my-module.njk*: the html markup of the example

##### JS
Javascript side, you can import your modules and npm dependencies and freely implement whatever you want. Only don't forget to enable *HMR* for a more comfortable development:

```js
/** examples/src/my-module.js */
import _ from 'lodash'
import MyOtherModule from '@my-library/my-other-module'

// logic here

// hmr support
if (module.hot) {
  module.hot.accept()
}
```

##### NJK
About views, you can create a new one starting from the template below:

```twig
{# examples/views/my-module.njk #}

{% set title = 'My library | My module' %}

{% extends '_default.njk' %}

{% block main %}
  <h1>My module example</h1>
{% endblock %}

{% block scripts %}
  <script src="static/my-module.js"></script>
{% endblock %}
```