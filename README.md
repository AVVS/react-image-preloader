# React Image Preloader

Pass image src and fallback src or data uri. Useful when you need to display image preloader
in cases where src image might fail to resolve.

`npm install react-image-preloader -S`

## Usage

React is a devDependency, so make sure you have `react` available in your project

Props:

1. `src`: String (url or data-uri)
2. `fallback`: String (url or data-uri)
3. `anonymous`: Boolean

```jsx

var React = require('react');
var ImagePreloaderComponent = require('react-image-preloader');

React.render(<ImagePreloaderComponent src='http://volatiledomain.com/src.png' fallback='http://example.com/fallback.png' />, document.body);

```
