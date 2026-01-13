# Styling Guide

## Overview

This package comes with **pre-compiled, scoped CSS** - no Tailwind configuration needed!

## Important Features

✅ **Non-invasive** - Only component styles, no global CSS reset  
✅ **Scoped classes** - All classes use `tstc-` prefix to avoid conflicts  
✅ **No side effects** - Won't affect your existing styles  
✅ **Small bundle** - Only 6KB of CSS  

## Setup

Simply import the CSS file in your app:

```tsx
// In your main entry file (e.g., src/index.tsx or src/App.tsx)
import '@alwinkc/tanstack-table-components/styles.css';
```

That's it! The table will be styled automatically without affecting your other components.

## Dark Mode

The components support dark mode out of the box. To enable it, add the `dark` class to your root HTML element:

```html
<html class="dark">
  <body>
    <div id="root"></div>
  </body>
</html>
```

### Dynamic Dark Mode Toggle

```tsx
// Toggle dark mode dynamically
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <button onClick={toggleDarkMode}>
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

## Customization

### Method 1: CSS Variables (Recommended)

Override the styles using CSS variables:

```css
/* Your app's CSS file */
:root {
  --table-bg: white;
  --table-text: #111827;
  --table-header-bg: #eff6ff;
  --table-border: #f3f4f6;
}

.dark {
  --table-bg: #111827;
  --table-text: #f9fafb;
  --table-header-bg: #1f2937;
  --table-border: #374151;
}
```

### Method 2: Override Classes

Override specific classes in your own CSS:

```css
/* Your app's CSS */
.tstc-th {
  background-color: #your-color !important;
  color: #your-text-color !important;
}

.tstc-pagination {
  background-color: #your-pagination-bg !important;
}
```

### Method 3: className Prop

Pass custom classes via the `className` prop:

```tsx
<TableComponent 
  table={table} 
  className="shadow-2xl rounded-xl border-2 border-gray-300"
/>
```

## Available CSS Classes

All component styles use the `tstc-` prefix:

**Table:**
- `.tstc-wrapper` - Main container
- `.tstc-table` - Table element
- `.tstc-thead-row` - Header row
- `.tstc-th` - Header cell
- `.tstc-tbody` - Table body
- `.tstc-tr` - Body row
- `.tstc-td` - Body cell
- `.tstc-empty` - Empty state

**Pagination:**
- `.tstc-pagination` - Main pagination container
- `.tstc-pagination-controls` - Left side controls
- `.tstc-pagination-label` - Text labels
- `.tstc-pagination-select` - Rows per page dropdown
- `.tstc-pagination-info` - Right side info
- `.tstc-pagination-nav` - Navigation buttons container
- `.tstc-pagination-button` - Navigation buttons
- `.tstc-pagination-icon` - Button icons
- `.tstc-pagination-page` - Page number button
- `.tstc-pagination-page-active` - Active page
- `.tstc-pagination-page-inactive` - Inactive pages
- `.tstc-pagination-page-ellipsis` - Ellipsis

## Framework-Specific Setup

### Next.js 15 (App Router)

```tsx
// app/layout.tsx
import '@alwinkc/tanstack-table-components/styles.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Next.js 15 (Pages Router)

```tsx
// pages/_app.tsx
import '@alwinkc/tanstack-table-components/styles.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Vite + React

```tsx
// src/main.tsx or src/index.tsx
import '@alwinkc/tanstack-table-components/styles.css';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

### Create React App

```tsx
// src/index.tsx or src/App.tsx
import '@alwinkc/tanstack-table-components/styles.css';
```

## Troubleshooting

### Styles Not Loading

1. **Make sure you imported the CSS:**
   ```tsx
   import '@alwinkc/tanstack-table-components/styles.css';
   ```

2. **Check your bundler supports CSS imports:**
   - Vite: ✅ Works out of the box
   - Next.js: ✅ Works out of the box
   - Webpack: ✅ Make sure `css-loader` is configured
   - esbuild: ✅ Works with default config

3. **Import order matters:**
   Import the component styles **before** your own styles if you want to override them.

### Dark Mode Not Working

1. Make sure the `dark` class is on your root HTML element:
   ```tsx
   document.documentElement.classList.add('dark');
   ```

2. Check your HTML structure:
   ```html
   <html class="dark">  <!-- ✅ Correct -->
     <body>
       <div class="dark">  <!-- ❌ Wrong -->
   ```

## No Tailwind? No Problem!

This package **does not require Tailwind CSS**. The styles are pre-compiled and ready to use in any React project.

If you want to use Tailwind in your own app, that's fine - the component styles won't conflict with your Tailwind setup.
