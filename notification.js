function Notification(opts) {
  const defaultOpts = {
    position: 'top-right',
    duration: 4000,
  };
  opts = Object.assign({}, defaultOpts, opts);
  opts.duration = parseInt(opts.duration);

  const timeouts = [];

  // selectors
  const classMainSelector = 'notification-container';
  const classPopup = 'notification';
  const animationInClass = 'animation-slide-in';
  const animationOutClass = 'animation-slide-out';
  const animationFadeInClass = 'animation-fade-in';
  const animationFadeOutClass = 'animation-fade-out';
  const titleSelector = '.notification-title';
  const descSelector = '.notification-desc';
  const closeSelector = '.notification-close';
  const actionButSelector = '.notification-action';
  const cancelButSelector = '.notification-cancel';
  const overlaySelector = '.overlay';

  // class, defaultTitle and defaultMessage
  const dataByType = {
    dialog: {
      classType: 'notification-default',
      defaultTitle: 'Confirm',
      defaultMessage: 'Are you sure you want to do this?',
    },
    info: {
      classType: 'notification-info',
      defaultTitle: 'Info',
      defaultMessage: 'default Info',
    },
    success: {
      classType: 'notification-success',
      defaultTitle: 'Success',
      defaultMessage: 'default Success',
    },
    warning: {
      classType: 'notification-warning',
      defaultTitle: 'Warning',
      defaultMessage: 'default Warning',
    },
    error: {
      classType: 'notification-error',
      defaultTitle: 'Error',
      defaultMessage: 'An error has occurred',
    },
  };

  const setPosition = (newPosition) => {
    opts.position = newPosition;
  };

  const tempatePopup = () => {
    return `
    <a class="notification-close">
      <svg viewbox="0 0 50 50">
        <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
      </svg>
    </a>
    <div class="notification-body">
      <div class="notification-icon"></div>
      <div class="notification-content">
        <div class="notification-title"></div>
        <div class="notification-desc"></div>
      </div>
    </div>`;
  };

  const dialogButtons = () => {
    return `<div class="notification-buttons">
    <span class="notification-button notification-cancel"></span>
    <span class="notification-button notification-action"></span>
    </div>`;
  };

  const createMainContainer = (position) => {
    let container = document.querySelector(`.${classMainSelector}.${position}`);

    if (!container) {
      container = document.createElement('div');
      container.classList = classMainSelector + ' ' + position;
      document.body.appendChild(container);
    }

    return container;
  };

  const createPopup = (type) => {
    const container = createMainContainer(opts.position);

    const elPopup = document.createElement('div');

    // add classes
    elPopup.classList.add(classPopup);
    elPopup.classList.add(
      opts.position === 'center' ? animationFadeInClass : animationInClass
    );
    elPopup.classList.add(dataByType[type].classType);

    // insert template in element
    elPopup.insertAdjacentHTML('beforeend', tempatePopup());

    // add buttons if confirm dialog
    if (type === 'dialog') {
      elPopup.insertAdjacentHTML('beforeend', dialogButtons());
      document.querySelector(overlaySelector).style.display = 'block';
    }

    // add element to container in the required sequence
    if (opts.position.includes('bottom')) {
      container.prepend(elPopup);
    } else {
      container.appendChild(elPopup);
    }

    return elPopup;
  };

  const setButtonsEvent = (elPopup, callback = null) => {
    const elAction = elPopup.querySelector(actionButSelector);
    elAction.addEventListener(
      'click',
      function handlerAction(event) {
        event.stopPropagation();
        event.preventDefault();
        hidePopUp(elPopup);

        elAction.removeEventListener('click', handlerAction, false);
        if (callback) {
          return callback('ok');
        }
        return false;
      },
      false
    );

    const elCancel = elPopup.querySelector(cancelButSelector);
    elCancel.addEventListener(
      'click',
      function handlerCancel(event) {
        event.stopPropagation();
        event.preventDefault();
        hidePopUp(elPopup);

        elCancel.removeEventListener('click', handlerCancel, false);
        if (callback) {
          return callback('cancel');
        }
        return false;
      },
      false
    );
  };

  const hidePopUp = (elPopup) => {
    const container = document.querySelector(
      `.${classMainSelector}.${opts.position}`
    );

    const firstTimeout = timeouts.shift();
    clearTimeout(firstTimeout);

    // change animation class
    elPopup.classList.remove(
      opts.position === 'center' ? animationFadeInClass : animationInClass
    );

    elPopup.classList.add(
      opts.position === 'center' ? animationFadeOutClass : animationOutClass
    );

    setTimeout(function () {
      if (elPopup.parentNode == container) {
        container.removeChild(elPopup);

        if (opts.type === 'dialog') {
          document.querySelector(overlaySelector).style.display = 'none';
        }
      }

      // Remove container if it empty
      if (!container.hasChildNodes()) {
        document.body.removeChild(container);
      }
    }, 500);
  };

  const showPopup = ({ type, title, message, callback = null } = {}) => {
    opts.type = type;
    const elPopup = createPopup(type);

    // set title and message to created element
    const elTitle = elPopup.querySelector(titleSelector);
    const elText = elPopup.querySelector(descSelector);

    const titlePopup = title || dataByType[type].defaultTitle;
    const messagePopup = message || dataByType[type].defaultMessage;

    elTitle.innerText = titlePopup;
    elText.innerText = messagePopup;

    // click event
    if (type === 'dialog') {
      // set buttons click event
      setButtonsEvent(elPopup, callback);
    } else {
      // push new timeout to timeouts array if type is not dialog
      const timeout = setTimeout(() => hidePopUp(elPopup), opts.duration);
      timeouts.push(timeout);
    }

    // add click event to close element
    const elClose = elPopup.querySelector(closeSelector);
    elClose.addEventListener(
      'click',
      function handlerClose(event) {
        hidePopUp(elPopup);
        elClose.removeEventListener('click', handlerClose, false);
      },
      false
    );
  };

  const dialog = ({ title, message, callback = null }) =>
    showPopup({ type: 'dialog', title, message, callback });
  const info = ({ title, message }) =>
    showPopup({ type: 'info', title, message });
  const success = ({ title, message }) =>
    showPopup({ type: 'success', title, message });
  const warning = ({ title, message }) =>
    showPopup({ type: 'warning', title, message });
  const error = ({ title, message }) =>
    showPopup({ type: 'error', title, message });
  return { dialog, info, success, warning, error, setPosition };
}
