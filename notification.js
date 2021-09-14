function Notification(opts) {
  const defaultOpts = {
    position: 'position-bottom-right',
    duration: 3000,
    type: 'notification-error'
  };
  opts = Object.assign({}, defaultOpts, opts);
  opts.duration = parseInt(opts.duration);

  const timeouts = [];

  const classMainSelector = 'notification-container';
  const classPopup = 'notification';
  const animationInClass = 'animation-slide-in';
  const animationOutClass = 'animation-slide-out';
  const titleSelector = '.notification-title';
  const descSelector = '.notification-desc';
  const titleByType = {
    'notification-error': 'Error',
    'notification-info': 'Info',
    'notification-success': 'Success',
    'notification-warning': 'Warning'
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
      <span class="notification-button notification-action">Ok</span>
      <span class="notification-button notification-cancel">Cancel</span>
    </div>`
  };

  const createMainContainer = (position) => {
    let container = document.querySelector(`.${classMainSelector}.${position}`);

    if (!container) {
      container = document.createElement('div');
      container.classList = classMainSelector + ' ' + position;
      document.body.appendChild(container);
    }

    return container;
  }

  const createPopup = () => {
    let elPopup = document.createElement('div');
    elPopup.classList = classPopup + ' ' + animationInClass + ` ${opts.type}`;
    elPopup.insertAdjacentHTML('beforeend', tempatePopup());
    return elPopup;
  }

  const hidePopUp = (elPopup) => {
    const selector = `.${classMainSelector}.${opts.position}`;
    const container = document.querySelector(selector);

    const firstTimeout = timeouts.shift();
    clearTimeout(firstTimeout);

    elPopup.classList.remove(animationInClass);
    elPopup.classList.add(animationOutClass);

    // after end of animation - remove element from container
    setTimeout(function() {
      container.removeChild(elPopup);
    }, 500);

    // Remove container if empty
    if (container.querySelectorAll('.notification').length === 0) {
      document.body.removeChild(container);
    }
  }

  return ({ title, message } = {}) => {
    const container = createMainContainer(opts.position);
    const elPopup = createPopup();

    const elTitle = elPopup.querySelector(titleSelector);
    const elText = elPopup.querySelector(descSelector);
    const titlePopup = title || titleByType[opts.type];

    elTitle.innerText = titlePopup;
    elText.innerText = message;

    if (opts.position.includes('bottom')) {
      container.prepend(elPopup);
    } else {
      container.appendChild(elPopup);
    }



    const timeout = setTimeout(() => {
      hidePopUp(elPopup)
    }, opts.duration);
    timeouts.push(timeout);

    elPopup.addEventListener('click', () => clearTimeout(timeout));
  }
};