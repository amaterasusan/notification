const defaultText = {
  info: {
    defaultTitle: 'Info',
    defaultMessage: 'Default Info Message',
    htmlTitle: '<div class="wrapper-notification"><div class="title-cust title-info">Info</div></div>',
    html: '<div class="wrapper-notification"><div class="icons icon-info"></div><div class="message message-text-info">Please read the description carefully</div></div>',
  },
  success: {
    defaultTitle: 'Success',
    defaultMessage: 'Default Success Message',
    htmlTitle: '<div class="wrapper-notification"><div class="title-cust title-success">OK</div></div>',
    html: '<div class="wrapper-notification"><div class="icons icon-success"></div><div class="message message-text-success">Your message has been sent successfully</div></div>',
  },
  warning: {
    defaultTitle: 'Warning',
    defaultMessage: 'Default Warning Message',
    htmlTitle: '<div class="wrapper-notification"><div class="title-cust title-warning">Warning</div></div>',
    html: `<div class="wrapper-notification"><div class="icons icon-warning"></div><div class="message message-text-warning">Don't forget to save your data, otherwise it may be lost</div></div>`,
  },
  error: {
    defaultTitle: 'Error',
    defaultMessage: 'An error has occurred',
    htmlTitle: '<div class="wrapper-notification"><div class="title-cust title-error">Oops</div></div>',
    html: `<div class="wrapper-notification"><div class="icons icon-error"></div><div class="message message-text-error">The Page you're looking for isn't here</div></div>`,
  },
  dialog: {
    defaultTitle: 'Confirm',
    defaultMessage: 'Default Confirm message',
    htmlTitle:
      '<div class="wrapper-notification"><div class="icons small icon-send"></div><div class="title-cust title-dialog">Send</div></div>',
    html: `<div class="label-message">Your message<span class="asterisk">*</span>:</div><textarea class="popup-textarea" name="your_mess" rows="3"></textarea>`,
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function validTextarea() {
  let valid = true;
  const textarea = document.querySelector('textarea[name="your_mess"]');
  if (!textarea) {
    return valid;
  }
  if (textarea.value.trim() === '') {
    valid = false;
    textarea.focus();
    textarea.classList.add('invalid');
    textarea.placeholder = 'This field cannot be empty!';
    setTimeout(() => {
      textarea.classList.remove('invalid');
    }, 400);
  }
  return valid;
}

window.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const titleEl = form.querySelector('#title');
  const messageEl = form.querySelector('#message');
  const positionEl = form.querySelector('#position');
  const durationEl = form.querySelector('#duration');
  const typeEl = form.querySelector('#type');
  const textOrHtmlEl = form.querySelector('#use-html');
  const hidePrevEl = form.querySelector('#hide-prev');
  const hideTitleEl = form.querySelector('#hide-title');
  const btn = form.querySelector('#show-notification');

  // create popup with default option, now we can set it later
  const popup = Notification();

  typeEl.addEventListener('change', () => {
    titleEl.value = defaultText[typeEl.value].defaultTitle;
    messageEl.value = defaultText[typeEl.value].defaultMessage;
  });

  // show popup
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    btn.disabled = true;
    sleep(500).then(() => (btn.disabled = false));

    // Form values
    let title = titleEl.value;
    let message = messageEl.value;
    const type = typeEl.value;

    // set need property
    popup.setProperty({
      position: positionEl.value,
      duration: durationEl.value,
      isHidePrev: hidePrevEl.checked,
      isHideTitle: hideTitleEl.checked,
      // maxOpened: 3,
    });

    let callback = null;
    let validFunc = null;
    if (textOrHtmlEl.checked) {
      title = defaultText[type].htmlTitle || title;
      message = defaultText[type].html || message;
      if (type === 'dialog') {
        validFunc = validTextarea;
      }
    }

    if (type === 'dialog') {
      callback = (result) => {
        console.log('result = ', result);
      };
    }

    if (!popup[type]) {
      popup.error({
        title: 'Error',
        message: `Notification has no such method "${type}"</div>`,
      });
      return;
    }

    popup[type]({
      title: title,
      message: message,
      callback: callback,
      validFunc: validFunc,
    });
    return false;
  });
});
