# react-supervisor

**react-supervisor** is a very simple npm library (<= **4kb**) for dealing with react components in templates (standard MVC way). If you ever worked with mid/big enterprise software with multiple technologies you probably know how difficult it is to maintain various technologies in one or multiple projects. You will find it very useful to create new components with React and append them in your website in organised way. Hope it will help you!  

>**Warning**: This tool is not designed for React apps created via create-react-app or common SPA development. However, if you want to embed multiple SPA apps (like microfrontends or so on) your welcome to use it!


## Installation

```bash
npm install react-supervisor
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

## What it does?
* scans the DOM and renders registered components
* takes all **data** attributes from container and passes them as props to component
* watches for changes to the DOM and renders new components into selectors that match
* the parent of a correctly rendered component will be marked with the **rendered** class

## What it doesn't do?
* doesn't affect your css styles
* doesn't share state - it means that all components are independent

## What I can do with it?
You can create complex dashboards, modals, or simple form controls (such as async search, drag & drop or date pickers etc). You can still use your favorite CSS frameworks (such as [bootstrap](https://getbootstrap.com/)), React UI frameworks (eg [Fluent UI](https://developer.microsoft.com/en-us/fluentui), [Material-UI](https://material-ui.com/), etc) or any other React standalone components (eg [react-select](https://react-select.com/)). More examples will appear in the documentation soon.

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

ReactSupervisor.registerComponentWithCustomRender(".call-me-modal", CallMeModalComponent);
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

ReactSupervisor.registerComponentWithCustomRender(".fluent-ui-textarea", TextField);
``` 

```html
<!-- ./page.html -->
<div class="fluent-ui-textarea" data-label="Description" data-name="description" data-rows="3"></div>
```

## Contributing
Any help would be much appreciated. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)