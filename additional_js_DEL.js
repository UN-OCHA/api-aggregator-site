/**
 * Add visibility togglers for the some elements of the header and footer.
 */
(function () {
  'use strict';

  function updateActiveFragmentLink() {
    var target = document.querySelector('[href="#' + location.hash.substr(1) + '"]');
    var links = document.querySelectorAll('[href^="#"]');
    for (var i = links.length - 1; i >= 0; i--) {
      var link = links[i];
      if (link !== target) {
        link.removeAttribute('data-active');
      }
      else {
        link.setAttribute('data-active', '');
      }
    }
  }

  function toggle(button, collapse) {
    var element = document.getElementById(button.getAttribute('aria-controls'));
    var expanded = collapse || button.getAttribute('aria-expanded') === 'true';

    // Switch the expanded/collapsed states.
    button.setAttribute('aria-expanded', !expanded);
    element.setAttribute('data-hidden', expanded);

    // Change the focus when expanded if a target is specified.
    if (element.hasAttribute('data-focus-target') && !expanded) {
      var target = document.getElementById(element.getAttribute('data-focus-target'));
      if (target) {
        target.focus();
      }
    }
  }

  function collapseAll(exception) {
    var elements = document.querySelectorAll('[aria-expanded="true"]');
    for (var i = 0, l = elements.length; i < l; i++) {
      var element = elements[i];
      if (element !== exception) {
        toggle(elements[i], true);
      }
    }
  }

  function handleToggle(event) {
    var target = event.target;
    while (target && target.nodeName !== 'BUTTON') {
      target = target.parentNode;
    }
    if (target) {
      collapseAll(target);
      toggle(target);
    }
  }

  function handleClick(event) {
    var target = event.target;
    if (target) {
      if (target.nodeName === 'A') {
        collapseAll();
      }
      else if (target.hasAttribute) {
        var body = document.body;
        while (target && target.hasAttribute && !target.hasAttribute('aria-expanded') && !target.hasAttribute('data-hidden') && target !== body) {
          target = target.parentNode;
        }
        if (target && target.hasAttribute && !target.hasAttribute('aria-expanded') && !target.hasAttribute('data-hidden')) {
          collapseAll();
        }
      }
    }
  }

  function setToggler(element) {
    if (!element.hasAttribute('id')) {
      return;
    }

    var id = element.getAttribute('id');
    var label = element.getAttribute('data-toggable');

    // Hide the element.
    element.setAttribute('data-hidden', true);

    // Create the button.
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('id', id + '-toggler');
    button.setAttribute('aria-expanded', false);
    button.setAttribute('aria-controls', id);
    button.setAttribute('value', label);
    button.appendChild(document.createTextNode(label));

    // Add toggling function.
    button.addEventListener('click', handleToggle);

    // Add the button before the toggable element.
    element.parentNode.insertBefore(button, element);
  }

  if (document.documentElement.className === 'js') {
    // Updater the active fragment link when the window hash changes.
    window.addEventListener('hashchange', updateActiveFragmentLink);

    // Collapse popups when clicking outside of the toggable target.
    document.addEventListener('click', handleClick);

    // Add the button to toggle visibility of menus and the like.
    var elements = document.querySelectorAll('[data-toggable]');
    for (var i = 0, l = elements.length; i < l; i++) {
      setToggler(elements[i]);
    }

    // Initial update of the active fragment link.
    updateActiveFragmentLink();
  }
})();
;
