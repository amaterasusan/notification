# Notification
![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-green?logo=javascript)\
**Popup notifications** is a lightweight Javascript library for popup messages on a web page. Pure javascript and css, any dependencies. You can use it as toast messages or a single notification.

## Live Demo
[Click here](https://amaterasusan.github.io/notification/)

## Getting Started
### Just include files in the HTML:
`<link href="path/to/notification.css" rel="stylesheet"/>`\
`<script src="path/to/notification.js"></script>`

### Or use it as an ES module in your project:
```javascript
import Notification from 'path/to/notification-es.js';
```

## options
All options are optional
* **position**\
    top-right (default value)\
    bottom-right\
    top-left\
    bottom-left\
    center
* **duration**\
    default 5000\
    time in milliseconds the notification will be displayed\
    if duration is 0 - popup notification will be displayed all the time
* **isHidePrev**\
    default false\
    hide previous popup(s) or not
* **isHideTitle**\
    default false\
    hide title block or not\
    if it is set to true and the duration is 0,\
    an X close button will appear on the right side of the notification body to allow the popup to close.
* **maxOpened**\
    default 5, the maximum value can be set to 10

## Usage
```
const popup = Notification({
  position: 'top-left',
  duration: 4000,
  isHidePrev: false,
  isHideTitle: false,
  maxOpened: 3,
});

// or
const popup = Notification(); // options will be set by default

// then later you can set any options like
popup.setProperty({
  duration: 5000,
  isHidePrev: true,
});
```

### the following popup methods are available:
* error
* warning
* info
* success
* dialog
* setProperty
* hide

```
// error
popup.error({
  title: 'Oops',
  message: `An error has occurred"`,
});

// or even insert HTML
popup.error({
  title: `<div class="title-cust title-error">Oops</div>`,
  message: `<div class="wrapper-notification">
    <div class="icons icon-error"></div>
    <div class="message message-text-error">An error has occurred</div></div>`,
});

// info
popup.info({
  title: 'Info',
  message: 'Info message'
});

// warning
popup.warning({
  title: 'Warning',
  message: 'Warning message'
});

// success
popup.success({
  title: 'Success',
  message: 'Success message'
});
```

### Dialog
If use "Confirmation dialog" two buttons are available [Ok] and [Cancel].\
The popup display time here will not matter even if it has been set,\
callback function is called when any of the buttons is pressed.\
You can also insert HTML.
```
popup.dialog({
  title: 'Confirm',
  message: 'Confirm message',
  callback: (result) => {
    console.log('result = ', result)
  }
});

/*
  Example with HTML
  you can pass a validation function to be able to check the filled fields in the form and
  not to close the popup immediately after clicking [Ok]
*/
const validTextarea = () => {
  let valid = true;
  const textarea = document.querySelector('textarea[name="your_mess"]');
  if (textarea.value.trim() === '') {
    valid = false;
    textarea.focus();
  }
  return valid;
};

popup.dialog({
  title: <div class="title-cust title-dialog">Send</div>',
  message: `<div class="label-message">Your message<span class="asterisk">*</span>:</div>
    <textarea name="your_mess" rows="3"></textarea>`,
  callback:(result) => {
    console.log('result = ', result)
  },
  validFunc: validTextarea,
});
```

## Authors

👤 **Helen Nikitina**

- Twitter: [@twitterhandle](https://twitter.com/@HelenNikit1ina )

## License
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/amaterasusan/notification/blob/master/LICENSE)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/amaterasu.san)
