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
You can create complex dashboards, modals, or simple form controls (such as async search, drag & drop or date pickers etc). You can still use css frameworks (such as [bootstrap](https://getbootstrap.com/)) mixed with the power of [React](https://reactjs.org/). More examples will appear in the documentation - soon ...

## Example

```javascript
// some.js
import { ReactSupervisor } from "react-supervisor";
import ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import {
    CallMeModal,
    AdminDashboard,
    ChatBot
} from "./some-react-components"


ReactSupervisor.registerComponent(".admin-dashboard", AdminDashboard);
ReactSupervisor.registerComponent(".chat-bot", ChatBot);
ReactSupervisor.registerComponent(".call-me-modal", CallMeModal);
ReactSupervisor.registerComponent(".awesome-button", Button);
ReactSupervisor.registerComponentWithCustomRender(".really-awesome-button", (el, props) => {
    // do whatever you want with props or any other logic
    ReactDOM.render(<Button {...props} />, el);
});

ReactSupervisor.initialize();
```

```html
<!-- some.html -->
<html lang="en">
    <body>
        <div class="admin-dashboard"></div>
        <div class="chat-bot"></div>
        <div class="call-me-modal"></div>
        
        <div
            class="awesome-button"
            data-children="Awesome button"
            data-color="secondary"
        ></div>
        
        <div
            class="really-awesome-button"
            data-children="Really awesome button"
            data-color="primary"
        ></div>
        
        <script src="index.js"></script>
    </body>
</html>
```

## Contributing
Any help would be much appreciated. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)