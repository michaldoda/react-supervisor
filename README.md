<h1 align="center">
react-supervisor
</h1>

<p align="center">
 <img width="" src="https://github.com/michaldoda/react-supervisor/blob/main/docs/image2.png?raw=true" alt="react-supervisor example">
</p>


<p>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/michaldoda/react-supervisor/actions/workflows/release.yml/badge.svg"><img src="https://github.com/michaldoda/react-supervisor/actions/workflows/release.yml/badge.svg" alt="release workflow result" style="max-width:100%;"></a>
    <a target="_blank" href="https://www.npmjs.com/package/react-supervisor"><img src="https://flat.badgen.net/npm/dt/react-supervisor" alt="react-supervisor total downloads" /></a>
    <a target="_blank" href="https://www.npmjs.com/package/react-supervisor"><img src="https://flat.badgen.net/npm/v/react-supervisor" alt="react-supervisor version" /></a>
    <a target="_blank" href="https://www.npmjs.com/package/react-supervisor"><img src="https://flat.badgen.net/npm/license/react-supervisor" alt="react-supervisor license" /></a>
</p>

**react-supervisor** is a very simple npm library (<= **4kb**) for dealing with react components in templates (standard MVC way). If you ever worked with mid/big enterprise software with multiple technologies you probably know how difficult it is to maintain various technologies in one or multiple projects. You will find it very useful to create new components with React and append them in your website in organised way. Hope it will help you!  

>**Warning**: This tool is not designed for React apps created via create-react-app or common SPA development. However, if you want to embed multiple SPA apps (like microfrontends or so on) your welcome to use it!


## Installation

```bash
npm i react-supervisor
# or 
yarn add react-supervisor
```

## Usage
```javascript
import { ReactSupervisor } from "react-supervisor";

// register components

ReactSupervisor.initialize();

// optional
window["ReactSupervisor"] = ReactSupervisor;
ReactSupervisor.info(); // generates stats in console
ReactSupervisor.forceRender(); // will force a DOM scan, it's helpful with dynamically created nodes

````

## Versions

| react   | react-supervisor | 
|:--------|:-----------------|
| `^18.0.0` | `^4.0.1`         |
| `^17.0.0` | `^3.0.0`         |
| `^16.0.0` | `^2.0.0`         |

## What it does?
* scans the DOM and renders registered components
* takes all **data-** attributes from container and passes them as props to component
* watches for changes to the DOM and renders new components into selectors that match
* the parent of a correctly rendered component will be marked with the **rendered** class
* convert, parse all castable **data-** attributes with specified type.
* supported types for castable attributes (*string* as a default):
    * **number** - `data-cast-number-field-name="123"`
    * **float** - `data-cast-float-field-name="3.14"`
    * **json** - `data-cast-number-field-name='{ "first_name": "Joe", "last_name": "Doe" }'`
    * **boolean** - `data-cast-float-field-name="true"`
    * **string** - `data-cast-float-field-name="3.14"`
    

## What it doesn't do?
* doesn't affect your css styles
* doesn't share state - it means that all components are independent

## What I can do with it?
You can create complex dashboards, modals, or simple form controls (such as async search, drag & drop or date pickers etc). You can still use your favorite CSS frameworks (such as [bootstrap](https://getbootstrap.com/)), React UI frameworks (eg [Fluent UI](https://developer.microsoft.com/en-us/fluentui), [Material-UI](https://material-ui.com/), etc) or any other React standalone components (eg [react-select](https://react-select.com/)). More examples will appear in the documentation soon.

## Castable data attributes table

| attribute | key in props | value |
| :---                                      |     :---  |          ---:       |
| `data-cast-number-age="3.14"`             | `age`     | `3`                 |
| `data-cast-float-pi-value="3.14"`         | `piValue` | `3.14`              |
| `data-cast-json-data='{"piValue": 3.14}'` | `data`    | `{ piValue: 3.14 }` |
| `data-cast-boolean-is-active="true"`      | `isActive`| `true`              |
| `data-cast-boolean-is-active="0"`         | `isActive`| `false`             |
| `data-cast-string-index="0001"`           | `index`   |  `"0001"`           |

*In js/html logic the default type is **string**, if that works for you then there is no need to use `data-cast-type` convention, but its really helpful if you have to pass json objects into components* 

## Examples

#### # Register once and use multiple times
```javascript
// ./some/path.js
import { ReactSupervisor } from "react-supervisor";
import Button from '@material-ui/core/Button';

ReactSupervisor.registerComponent(".material-ui-button", Button);
ReactSupervisor.initialize();
``` 

```html
<!-- ./some/page.html -->
<div class="material-ui-button" data-children="Click me!" data-color="primary"></div>
<div class="material-ui-button" data-children="And me!" data-color="secondary"></div>
```

#### # If you need to render a more complicated component you can use custom render
```javascript
// ./path.js
import { ReactSupervisor } from "react-supervisor";
import Button from '@material-ui/core/Button';

ReactSupervisor.registerComponentWithCustomRender(".awesome-button", (el, props) => {
    // do whatever you want with props or any other logic
    ReactDOM.render(<Button {...props} />, el);
});
``` 

```html
<!-- ./some/page.html -->
<div class="awesome-button" data-children="Awesome click!" data-color="primary"></div>
```

#### # You can register component directly within file
```javascript
// ./some/path.js
import { ReactSupervisor } from "react-supervisor";
import React, { useState } from "react";

const CallMeModalComponent = () => {
    const [state, setState] = useState(0);
    return (<>Call me</>);
};

ReactSupervisor.registerComponent(".call-me-modal", CallMeModalComponent);
// no export needed, but you have to import that file in your entrypoint
``` 

```html
<!-- ./page.html -->
<div class="call-me-modal"></div>
```


#### # Pass props via data attributes
```javascript
// ./path.js
import { ReactSupervisor } from "react-supervisor";
import React, { useState } from "react";
import { TextField } from '@fluentui/react/lib/TextField';

ReactSupervisor.registerComponent(".fluent-ui-textarea", TextField);
``` 

```html
<!-- ./page.html -->
<div class="fluent-ui-textarea" data-label="Description" data-name="description" data-rows="3"></div>
```

#### # Use castable data attributes to pass any data type you want, e.g. json object

```html
<div class="user-details" data-cast-json-user-details='{ "first_name": "Joe", "age": 256 }'></div>
```
This syntax will inject a `userDetails` object in component's `props`. 
```javascript
const UserDetailsComponent = (props) => {
    return (<>${props.userDetails?.first_name}</>); // Joe
}
```


## Contributing
Any help would be much appreciated. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)