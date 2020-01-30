# React CSS Theming (with JS objects)

This tiny 500byte (not gzipped) component allows JS theme objects to be passed into your component where they're converted into CSS Variables for internal use.

<h2>Why?</h2>

- Switching CSS Variables for themes is unpleasant for users of your component, JS objects are easier to deal with.

- CSS Variables are light years faster than using JS theme objects passed around via Context like most CSS-in-JS frameworks do because they don't trigger any React re-renders and the browser responding to CSS Variable changes is also faster and more lightweight.

## Install

```
yarn add react-js2css-theme
```

Note this is an ESM module and does not polyfill to be compatible with IE. Screw IE.

## Usage

```js
import JSToCSSTheme from 'react-js2css-theme';

const yourTheme = {
  background: 'black',
  textColor: 'white',
  button: {
    padding: '10px',
  },
};

<JSToCSSTheme namespace="xx" theme={yourTheme}>
  <YourComponent />
</JSToCSSTheme>;
```

Your component can now make use of the following CSS Variables:

```css
:root {
  --xx-background: black;
  --xx-text-color: white;
  --xx-button-padding: 10px;
}
```

Now try changing the theme object and watch your component's theme change :)
