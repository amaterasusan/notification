# notification
**Pop-up notifications** is a Javascript library for pop-up messages on a web page. Pure javascript and css, any dependencies.

## Installation
Download files, then:
1. Link to notification.css `<link href="path/to/notification.css" rel="stylesheet"/>`

2. Link to notification.js `<script src="path/to/notification.js"></script>`

## Usage
### options
```
position <string> - can have such values :
  top-right //default value
  bottom-right
  top-left
  bottom-left
  center
duration <integer> time in milliseconds the notification will be displayed
  default 4000
  
if duration is 0 - popup notification will be displayed all the time  
```
```
const popup = Notification({
  position: 'top-left',
  duration: 7000
});
```  

### notification type 
```
  info
  success
  warning
  error
  dialog 
```

### Info notification 
```
popup.info({
  title: 'Info',
  message: 'Info message'
});
```  

### Success notification  
```
popup.success({
  title: 'Success',
  message: 'Success message'
});
```  

### Warning notification  
```
popup.warning({
  title: 'Warning',
  message: 'Warning message'
});
```

### Error notification  
```
popup.error({
  title: 'Error',
  message: 'Error message'
});
```

### Confirmation Dialog
If use "Confirmation dialog" two buttons are available [Ok] and [Cancel].
The display time of the notification will not matter here, even if it has been set.
The third parameter is a callback function that is called when any of the buttons is pressed.
```
popup.dialog({
  title: 'Confirm',
  message: 'Confirm message',
  (result) => {
    console.log('result = ', result)
  }
});
```      