import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import widgetRegistry from './components/registry';

// Expose React and ReactDOM to the global scope
window.React = React;
window.ReactDOM = ReactDOM;

// Function to convert HTML attributes to a props object
function getElementProps(element) {
  const props = {};
  Array.from(element.attributes).forEach(attr => {
    props[attr.name] = attr.value;
  });
  return props;
}

// Function to dynamically load components and associated styles
function loadComponent(componentName, container) {
  // Load the component's script
  const script = document.createElement('script');
  script.src = `dist/${componentName}.bundle.js`;
  script.onload = () => {
    let Component = window[componentName];

    if (Component && typeof Component === 'object' && Component.__esModule) {
      Component = Component.default;
    }

    if (typeof Component === 'function') {
      if (container) {
        const props = getElementProps(container); // Get all HTML attributes as props
        const root = createRoot(container);
        root.render(React.createElement(Component, props)); // Pass the props to the component
      } else {
        console.error(`Container for ${componentName} not found.`);
      }
    } else {
      console.error(`Component ${componentName} is not a valid React component.`);
    }
  };
  script.onerror = () => {
    console.error(`Failed to load component ${componentName}`);
  };
  document.body.appendChild(script);

  // Load the component's CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `dist/styles/widgets.css`;
  link.onload = () => {
    console.log(`Stylesheet loaded successfully.`);
  };
  link.onerror = () => {
    console.error(`Failed to load stylesheet`);
  };
  document.head.appendChild(link);
  // const link = document.createElement('link');
  // link.rel = 'stylesheet';
  // link.href = `dist/styles/${componentName}.css`;
  // link.onload = () => {
  //   console.log(`Stylesheet for ${componentName} loaded successfully.`);
  // };
  // link.onerror = () => {
  //   console.error(`Failed to load stylesheet for ${componentName}`);
  // };
  // document.head.appendChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
  widgetRegistry.forEach(widget => {
    const { componentName, elementName } = widget;
    document.querySelectorAll(elementName).forEach((element) => {
      loadComponent(componentName, element);
    });
  });
});