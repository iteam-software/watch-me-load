# Watch Me Load
Provides a client side navigation loading indicator similar to the Github indicator.

## Usage
### Install with NPM
```sh
$ npm install watch-me-load --save
```
### Instantiate a ```WatchMeLoad``` object globally on the client side.
```javascript
const loader = new WatchMeLoad(document.getElementById('loaderContainer'));
```
### Activate and deactivate the loading states
```javascript
loader.startLoading('#2a9aee');

// some long lived global action occurs

loader.stopLoading();
```

## Contribute
TODO: write some contribution instructions.

## Author
[iTEAM Consulting](https://github.com/iteam-consulting) Software Development Team

## Support
Please submit an issue in this repo for support.