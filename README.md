# TanStack Table Components

A React component library built on top of [@tanstack/react-table](https://tanstack.com/table/v8) with built-in pagination support and beautiful pre-compiled styling.

## Features

- 🎨 Beautiful, modern table design with dark mode support
- 📱 Responsive and mobile-friendly
- 🔄 Built-in pagination component
- 🎯 Full TypeScript support
- 🚀 Built on TanStack Table v8
- ⚛️ React 18 & 19 compatible
- ✨ Pre-compiled CSS - works without Tailwind!
- 📦 Tiny bundle size (< 10KB)

## Installation

```bash
npm install @alwinkc/tanstack-table-components @tanstack/react-table
# or
yarn add @alwinkc/tanstack-table-components @tanstack/react-table
# or
pnpm add @alwinkc/tanstack-table-components @tanstack/react-table
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install @tanstack/react-table react react-dom
```

**Supported versions:**

- React: ^18.0.0 or ^19.0.0
- React DOM: ^18.0.0 or ^19.0.0
- TanStack Table: ^8.0.0

### Setup

**Import the CSS** in your app's entry point:

```tsx
// src/index.tsx or src/App.tsx
import "@alwinkc/tanstack-table-components/styles.css";
```

That's it! No Tailwind configuration needed. The styles are pre-compiled and ready to use.

> ✅ **Non-invasive CSS**: The styles are scoped to component classes only and won't affect your existing styles. No CSS reset or global styles are included.

## Usage

### Basic Example

```tsx
import "@alwinkc/tanstack-table-components/styles.css";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { TableComponent, Pagination } from "@alwinkc/tanstack-table-components";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 80,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

function MyTable() {
  const [data, setData] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    // ... more data
  ]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div>
      <TableComponent table={table} />
      <Pagination
        pagination={true}
        totalPages={table.getPageCount()}
        currentPage={pagination.pageIndex + 1}
        handlePageChange={(page) => table.setPageIndex(page - 1)}
        pageSize={pagination.pageSize}
        onPageSizeChange={(size) => table.setPageSize(size)}
      />
    </div>
  );
}
```

## API Reference

### TableComponent

The main table component that renders your data with extensive customization options.

#### Simple/User-Friendly Props

Quick and easy props for common use cases:

| Prop                  | Type                              | Default        | Description                             |
| --------------------- | --------------------------------- | -------------- | --------------------------------------- |
| `table`               | `Table<TData>`                    | **Required**   | TanStack Table instance                 |
| `className`           | `string`                          | `""`           | Additional CSS classes for wrapper      |
| `striped`             | `boolean`                         | `false`        | Alternating row background colors       |
| `hoverable`           | `boolean`                         | `false`        | Row hover effects                       |
| `bordered`            | `boolean`                         | `false`        | Add borders around table                |
| `compact`             | `boolean`                         | `false`        | Reduced padding/spacing                 |
| `stickyHeader`        | `boolean`                         | `false`        | Fixed header on scroll                  |
| `loading`             | `boolean`                         | `false`        | Show loading state                      |
| `loadingMessage`      | `string \| () => React.ReactNode` | `"Loading..."` | Custom loading message                  |
| `highlightOnHover`    | `boolean`                         | `false`        | Highlight row on hover (blue highlight) |
| `selectedRowId`       | `string \| number`                | `undefined`    | ID of selected row to highlight         |
| `getRowId`            | `(row: Row<TData>) => string`     | `undefined`    | Function to get unique row ID           |
| `size`                | `"sm" \| "md" \| "lg"`            | `undefined`    | Predefined size variants (sm/md/lg)     |
| `emptyStateMessage`   | `string \| () => React.ReactNode` | `"No data..."` | Custom empty state message              |
| `emptyStateClassName` | `string`                          | `undefined`    | Custom class for empty state            |

#### Advanced Customization Props

For complex scenarios requiring full control:

**Header Customization:**

| Prop                | Type                                         | Description                                     |
| ------------------- | -------------------------------------------- | ----------------------------------------------- |
| `theadClassName`    | `string`                                     | Custom class for `<thead>`                      |
| `theadRowClassName` | `string`                                     | Custom class for header row                     |
| `thClassName`       | `string \| (header) => string`               | Custom class for header cells (can be function) |
| `thStyle`           | `CSSProperties \| (header) => CSSProperties` | Custom inline styles for header cells           |
| `onHeaderClick`     | `(header: Header<TData>) => void`            | Click handler for header cells                  |

**Body Customization:**

| Prop             | Type                                             | Description                                   |
| ---------------- | ------------------------------------------------ | --------------------------------------------- |
| `tbodyClassName` | `string`                                         | Custom class for `<tbody>`                    |
| `trClassName`    | `string \| (row, index) => string`               | Custom class for body rows (can be function)  |
| `trStyle`        | `CSSProperties \| (row, index) => CSSProperties` | Custom inline styles for body rows            |
| `tdClassName`    | `string \| (cell) => string`                     | Custom class for body cells (can be function) |
| `tdStyle`        | `CSSProperties \| (cell) => CSSProperties`       | Custom inline styles for body cells           |

**Event Handlers:**

| Prop               | Type                          | Description                        |
| ------------------ | ----------------------------- | ---------------------------------- |
| `onRowClick`       | `(row: Row<TData>) => void`   | Click handler for rows             |
| `onRowDoubleClick` | `(row: Row<TData>) => void`   | Double-click handler for rows      |
| `onRowMouseEnter`  | `(row: Row<TData>) => void`   | Mouse enter handler for rows       |
| `onRowMouseLeave`  | `(row: Row<TData>) => void`   | Mouse leave handler for rows       |
| `onCellClick`      | `(cell: Cell<TData>) => void` | Click handler for individual cells |

### Pagination

A pagination component that works seamlessly with TanStack Table.

#### Props

| Prop               | Type                     | Required | Default | Description                     |
| ------------------ | ------------------------ | -------- | ------- | ------------------------------- |
| `pagination`       | `boolean`                | No       | -       | Whether to show pagination      |
| `totalPages`       | `number`                 | No       | `1`     | Total number of pages           |
| `currentPage`      | `number`                 | No       | `1`     | Current active page (1-indexed) |
| `handlePageChange` | `(page: number) => void` | Yes      | -       | Callback when page changes      |
| `pageSize`         | `number`                 | Yes      | -       | Current page size               |
| `onPageSizeChange` | `(size: number) => void` | Yes      | -       | Callback when page size changes |

## Styling

The components use Tailwind CSS classes and support:

- Light and dark mode (using `dark:` variants)
- Responsive design
- Hover states
- Custom scrollbars
- Smooth transitions

You can customize the appearance by:

1. Overriding Tailwind classes in your config
2. Passing custom `className` props to `TableComponent`
3. Using Tailwind's dark mode configuration

## TypeScript Support

This library is written in TypeScript and provides full type definitions. The components are generic and will infer types from your data:

```tsx
interface MyData {
  id: number;
  name: string;
}

// TypeScript will infer the correct types
const table = useReactTable<MyData>({ ... });
<TableComponent<MyData> table={table} />
```

## Examples

### Simple Table with Striped Rows

```tsx
<TableComponent table={table} striped hoverable size="md" />
```

### Table with Row Selection

```tsx
function SelectableTable() {
  const [selectedId, setSelectedId] = useState<number | undefined>();

  return (
    <TableComponent
      table={table}
      hoverable
      selectedRowId={selectedId}
      getRowId={(row) => row.original.id}
      onRowClick={(row) => setSelectedId(row.original.id)}
    />
  );
}
```

### Compact Bordered Table

```tsx
<TableComponent table={table} bordered compact stickyHeader />
```

### Custom Row Styling

```tsx
<TableComponent
  table={table}
  trClassName={(row) =>
    row.original.status === "active" ? "bg-green-50" : "bg-red-50"
  }
  tdClassName={(cell) =>
    cell.column.id === "amount" ? "font-bold text-right" : ""
  }
/>
```

### Loading State

```tsx
function TableWithLoading() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TableComponent
      table={table}
      loading={isLoading}
      loadingMessage="Fetching data..."
    />
  );
}
```

### Interactive Table

```tsx
<TableComponent
  table={table}
  hoverable
  onRowClick={(row) => console.log("Row clicked:", row.original)}
  onRowDoubleClick={(row) => navigate(`/details/${row.original.id}`)}
  onCellClick={(cell) => console.log("Cell clicked:", cell.getValue())}
  onHeaderClick={(header) => header.column.toggleSorting()}
/>
```

### With Server-Side Pagination

```tsx
function ServerPaginatedTable() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    // Fetch data from your API
    fetchData(pagination.pageIndex, pagination.pageSize).then((result) => {
      setData(result.data);
      setTotalRows(result.total);
    });
  }, [pagination]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalRows / pagination.pageSize),
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <TableComponent table={table} />
      <Pagination
        pagination={true}
        totalPages={table.getPageCount()}
        currentPage={pagination.pageIndex + 1}
        handlePageChange={(page) => table.setPageIndex(page - 1)}
        pageSize={pagination.pageSize}
        onPageSizeChange={(size) => table.setPageSize(size)}
      />
    </>
  );
}
```

### Custom Column Sizing

```tsx
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    size: 60, // Fixed width
  },
  {
    accessorKey: "name",
    header: "Name",
    size: 200,
  },
  {
    accessorKey: "email",
    header: "Email",
    // Uses default size (150px) if not specified
  },
];
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

### Styles Not Showing

If your table appears unstyled:

1. **Make sure you imported the CSS:**

   ```tsx
   import "@alwinkc/tanstack-table-components/styles.css";
   ```

2. **Check your bundler is processing CSS:**
   - Vite: Should work out of the box
   - Next.js: Should work out of the box
   - Webpack: Make sure `css-loader` is configured

### Dark Mode Not Working

Add the `dark` class to your root HTML element:

```tsx
<html className="dark">
```

## License

MIT

## Credits

Built with:

- [TanStack Table](https://tanstack.com/table/v8)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [clsx](https://github.com/lukeed/clsx)
