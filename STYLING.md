# Styling Guide

This package uses **Tailwind CSS** classes for styling. The components do not bundle CSS files, so you need to have Tailwind CSS configured in your project.

## Setup Instructions

### 1. Install Tailwind CSS

If you haven't already, install Tailwind CSS in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind

Update your `tailwind.config.js` to include this library's components:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add this line to include the library components
    "./node_modules/@your-scope/tanstack-table-components/dist/**/*.{js,mjs}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {},
  },
  plugins: [
    // Optional: Add scrollbar plugin for better scrollbar styling
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
```

### 3. Import Tailwind CSS

Add Tailwind directives to your main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Dark Mode

The components support dark mode out of the box. To enable dark mode:

### Using Class Strategy (Recommended)

```tsx
// Add 'dark' class to your root element
<html className="dark">
  <body>
    <App />
  </body>
</html>
```

### Using Media Query Strategy

Set `darkMode: 'media'` in your `tailwind.config.js` to use system preferences.

## Custom Scrollbar Styling

The table uses custom scrollbar classes. To enable them, install the Tailwind scrollbar plugin:

```bash
npm install -D tailwind-scrollbar
```

Then add it to your `tailwind.config.js` plugins array as shown above.

## Customization

### Override Default Styles

You can override the default styles by passing a `className` prop:

```tsx
<TableComponent 
  table={table} 
  className="shadow-lg rounded-lg border border-gray-300"
/>
```

### Customize Colors

Extend Tailwind's color palette in your config:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Override blue colors used in the components
        blue: {
          50: '#your-color',
          500: '#your-color',
          600: '#your-color',
        },
      },
    },
  },
}
```

## Without Tailwind CSS

If you prefer not to use Tailwind CSS, you'll need to provide your own styles. The components use standard HTML elements (`<table>`, `<th>`, `<td>`, etc.) that you can style with regular CSS.





