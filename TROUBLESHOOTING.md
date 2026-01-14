# Troubleshooting Custom Classes

## Issue: Custom classes not working (striped, bordered, hoverable, etc.)

### 1. **Ensure CSS is imported**

Make sure you're importing the compiled CSS in your app:

```tsx
import "@alwinkc/tanstack-table-components/styles.css";
```

This should be in your main entry file (e.g., `src/main.tsx`, `src/index.tsx`, or `src/App.tsx`).

### 2. **Clear cache and rebuild**

If testing locally:

```bash
# In the library directory
npm run build

# In your consuming app directory
rm -rf node_modules/.vite  # or .cache
npm install
npm run dev
```

### 3. **Check CSS specificity**

If you have global styles that might override the component styles, you may need to increase specificity or ensure the component CSS is loaded after your global styles.

### 4. **Verify the classes are being applied**

Open your browser DevTools and inspect the table elements:

- The wrapper `<div>` should have classes like `tstc-wrapper tstc-bordered` (if `bordered={true}`)
- Rows `<tr>` should have classes like `tstc-tr tstc-striped-even tstc-hoverable` (if `striped={true}` and `hoverable={true}`)

### 5. **Test with a simple example**

```tsx
import "@alwinkc/tanstack-table-components/styles.css";
import { TableComponent } from "@alwinkc/tanstack-table-components";
import { useReactTable, getCoreRowModel, ColumnDef } from "@tanstack/react-table";

interface Person {
  id: number;
  name: string;
}

const columns: ColumnDef<Person>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
];

const data: Person[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
];

function TestTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableComponent
      table={table}
      striped
      hoverable
      bordered
      size="md"
    />
  );
}
```

### 6. **Dark mode not showing**

If using dark mode, ensure your HTML has the `dark` class:

```html
<html class="dark">
  <!-- or -->
  <html className="dark">
```

### 7. **Inspect the compiled CSS**

Check if the CSS file at `dist/styles.css` contains the custom classes:

```bash
grep "tstc-striped" dist/styles.css
grep "tstc-bordered" dist/styles.css
grep "tstc-hoverable" dist/styles.css
```

You should see minified CSS with these classes.

### 8. **Version mismatch**

If you published an older version, make sure you're using the latest:

```bash
# In consuming app
npm update @alwinkc/tanstack-table-components
# or
npm install @alwinkc/tanstack-table-components@latest
```

### 9. **Local development with npm link**

If you're using `npm link` for local development:

```bash
# In library directory
npm run build
npm link

# In your app directory
npm link @alwinkc/tanstack-table-components

# After changes, always rebuild:
cd /path/to/library
npm run build
```

### 10. **Check browser console for errors**

Look for CSS loading errors or warnings in the browser console.

## Expected Behavior

### `striped={true}`
- Even rows: Light gray background (`bg-gray-50`)
- Odd rows: White background

### `hoverable={true}`
- On hover: Light blue background (`bg-blue-50`)

### `bordered={true}`
- Border around entire table
- Borders between cells

### `size="sm|md|lg"`
- `sm`: Smaller padding, smaller text
- `md`: Default comfortable size
- `lg`: Larger padding, larger text

### `selectedRowId={id}`
- Selected row: Blue background (`bg-blue-100`)
- Selected row on hover: Darker blue (`bg-blue-200`)

## Still Not Working?

If none of these help, please provide:

1. Screenshot of the DevTools showing the element with classes
2. Console errors (if any)
3. Your component code
4. How you're importing the library (npm, local link, etc.)
