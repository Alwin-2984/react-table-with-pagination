# TanStack Table Components

A React component library built on top of [@tanstack/react-table](https://tanstack.com/table/v8) with built-in pagination support and beautiful styling using Tailwind CSS.

## Features

- 🎨 Beautiful, modern table design with dark mode support
- 📱 Responsive and mobile-friendly
- 🔄 Built-in pagination component
- 🎯 Full TypeScript support
- 🚀 Built on TanStack Table v8
- ⚛️ React 18 & 19 compatible
- 🎨 Styled with Tailwind CSS

## Installation

```bash
npm install @alwinkc/tanstack-table-components
# or
yarn add @alwinkc/tanstack-table-components
# or
pnpm add @alwinkc/tanstack-table-components
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

### Tailwind CSS Setup

This library uses Tailwind CSS classes. Make sure you have Tailwind CSS installed and configured in your project:

1. Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Configure your `tailwind.config.js` to include the library's components:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@alwinkc/tanstack-table-components/dist/**/*.{js,mjs}",
  ],
  darkMode: "class", // or 'media'
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. Add Tailwind directives to your CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage

### Basic Example

```tsx
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

The main table component that renders your data.

#### Props

| Prop        | Type           | Required | Description                                |
| ----------- | -------------- | -------- | ------------------------------------------ |
| `table`     | `Table<TData>` | Yes      | TanStack Table instance                    |
| `className` | `string`       | No       | Additional CSS classes for the wrapper div |

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

## License

MIT

## Credits

Built with:

- [TanStack Table](https://tanstack.com/table/v8)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [clsx](https://github.com/lukeed/clsx)
