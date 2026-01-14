# TableComponent Examples

This document provides comprehensive examples of using the `TableComponent` with various props and configurations.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Visual Styling](#visual-styling)
- [Row Selection](#row-selection)
- [Loading States](#loading-states)
- [Event Handlers](#event-handlers)
- [Advanced Customization](#advanced-customization)
- [Real-World Examples](#real-world-examples)

## Basic Usage

### Minimal Setup

```tsx
import { TableComponent } from "@alwinkc/tanstack-table-components";

<TableComponent table={table} />;
```

### With Simple Styling

```tsx
<TableComponent
  table={table}
  striped // Alternating row colors
  hoverable // Hover effect on rows
  bordered // Add borders
/>
```

## Visual Styling

### Size Variants

```tsx
// Small - compact for dense data
<TableComponent table={table} size="sm" />

// Medium - default comfortable size
<TableComponent table={table} size="md" />

// Large - spacious for better readability
<TableComponent table={table} size="lg" />
```

### Striped Rows

```tsx
<TableComponent
  table={table}
  striped // Alternating gray/white rows
  hoverable // Blue highlight on hover
/>
```

### Bordered Table

```tsx
<TableComponent
  table={table}
  bordered // Adds border around table and between cells
  className="shadow-lg" // Can combine with custom classes
/>
```

### Sticky Header

```tsx
<TableComponent
  table={table}
  stickyHeader // Header stays fixed while scrolling
  className="max-h-96 overflow-y-auto"
/>
```

### Compact Table

```tsx
<TableComponent
  table={table}
  compact // Reduced padding for more data in less space
/>
```

## Row Selection

### Single Row Selection

```tsx
function SelectableTable() {
  const [selectedId, setSelectedId] = useState<number>();

  return (
    <TableComponent
      table={table}
      selectedRowId={selectedId}
      getRowId={(row) => row.original.id}
      onRowClick={(row) => {
        setSelectedId(row.original.id);
      }}
      hoverable
    />
  );
}
```

### Multi-Row Selection

```tsx
function MultiSelectTable() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  return (
    <TableComponent
      table={table}
      getRowId={(row) => row.original.id}
      trClassName={(row) =>
        selectedIds.has(row.original.id)
          ? "bg-blue-100 dark:bg-blue-900/40"
          : ""
      }
      onRowClick={(row) => {
        const id = row.original.id;
        setSelectedIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      }}
    />
  );
}
```

### Row Selection with Ctrl/Cmd Click

```tsx
function AdvancedSelectTable() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  return (
    <TableComponent
      table={table}
      getRowId={(row) => row.original.id}
      trClassName={(row) =>
        selectedIds.has(row.original.id) ? "bg-blue-100" : ""
      }
      onRowClick={(row) => {
        const id = row.original.id;
        setSelectedIds((prev) => {
          const next = new Set(prev);
          // Toggle selection
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      }}
    />
  );
}
```

## Loading States

### Simple Loading

```tsx
function LoadingTable() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);

  return (
    <TableComponent
      table={table}
      loading={loading}
      loadingMessage="Loading data..."
    />
  );
}
```

### Custom Loading Component

```tsx
<TableComponent
  table={table}
  loading={isLoading}
  loadingMessage={() => (
    <div className="flex items-center justify-center gap-2">
      <Spinner />
      <span>Fetching your data...</span>
    </div>
  )}
/>
```

### Empty State

```tsx
<TableComponent
  table={table}
  emptyStateMessage="No users found. Try adjusting your filters."
  emptyStateClassName="py-20"
/>
```

### Custom Empty State Component

```tsx
<TableComponent
  table={table}
  emptyStateMessage={() => (
    <div className="py-12 text-center">
      <EmptyIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold">No results</h3>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or filters
      </p>
      <button className="mt-4 btn-primary">Clear Filters</button>
    </div>
  )}
/>
```

## Event Handlers

### Row Click Events

```tsx
<TableComponent
  table={table}
  onRowClick={(row) => {
    console.log("Row clicked:", row.original);
  }}
  onRowDoubleClick={(row) => {
    navigate(`/details/${row.original.id}`);
  }}
  onRowMouseEnter={(row) => {
    console.log("Mouse entered:", row.original);
  }}
  onRowMouseLeave={(row) => {
    console.log("Mouse left:", row.original);
  }}
/>
```

### Cell Click Events

```tsx
<TableComponent
  table={table}
  onCellClick={(cell) => {
    console.log("Cell clicked:", {
      column: cell.column.id,
      value: cell.getValue(),
      row: cell.row.original,
    });
  }}
  // Cell clicks don't trigger row clicks (event.stopPropagation)
  onRowClick={(row) => {
    console.log("This won't fire when clicking a cell");
  }}
/>
```

### Header Click for Sorting

```tsx
<TableComponent
  table={table}
  onHeaderClick={(header) => {
    if (header.column.getCanSort()) {
      header.column.toggleSorting();
    }
  }}
  thClassName={(header) =>
    header.column.getCanSort() ? "cursor-pointer select-none" : ""
  }
/>
```

## Advanced Customization

### Conditional Row Styling

```tsx
interface User {
  id: number;
  name: string;
  status: "active" | "inactive" | "pending";
  isPremium: boolean;
}

<TableComponent
  table={table}
  trClassName={(row) => {
    const user = row.original;
    if (user.status === "inactive") return "opacity-50";
    if (user.isPremium) return "bg-yellow-50 dark:bg-yellow-900/20";
    return "";
  }}
  trStyle={(row) => ({
    borderLeft: row.original.isPremium ? "4px solid gold" : undefined,
  })}
/>;
```

### Conditional Cell Styling

```tsx
<TableComponent
  table={table}
  tdClassName={(cell) => {
    // Right-align number columns
    if (cell.column.id === "amount" || cell.column.id === "quantity") {
      return "text-right font-mono";
    }

    // Color-code status
    if (cell.column.id === "status") {
      const value = cell.getValue() as string;
      if (value === "completed") return "text-green-600 font-semibold";
      if (value === "pending") return "text-yellow-600";
      if (value === "failed") return "text-red-600";
    }

    return "";
  }}
/>
```

### Custom Header Styling

```tsx
<TableComponent
  table={table}
  theadClassName="bg-gradient-to-r from-blue-600 to-purple-600"
  thClassName="text-white font-bold uppercase tracking-wider"
  theadRowClassName="shadow-lg"
/>
```

### Combining Simple and Advanced Props

```tsx
<TableComponent
  table={table}
  // Simple props for baseline styling
  striped
  hoverable
  size="md"
  // Advanced props for specific customization
  trClassName={(row, index) => {
    if (row.original.isHighlighted) return "border-l-4 border-l-blue-500";
    return "";
  }}
  tdClassName={(cell) => {
    if (cell.column.id === "actions") return "text-right";
    return "";
  }}
/>
```

## Real-World Examples

### E-commerce Orders Table

```tsx
interface Order {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  date: string;
}

function OrdersTable() {
  const [selectedOrder, setSelectedOrder] = useState<string>();
  const [loading, setLoading] = useState(false);

  return (
    <TableComponent<Order>
      table={table}
      striped
      hoverable
      size="md"
      bordered
      loading={loading}
      loadingMessage="Loading orders..."
      selectedRowId={selectedOrder}
      getRowId={(row) => row.original.id}
      onRowClick={(row) => setSelectedOrder(row.original.id)}
      onRowDoubleClick={(row) => navigate(`/orders/${row.original.id}`)}
      trClassName={(row) => {
        const status = row.original.status;
        if (status === "cancelled") return "opacity-60 line-through";
        return "";
      }}
      tdClassName={(cell) => {
        if (cell.column.id === "total") return "text-right font-semibold";
        if (cell.column.id === "status") {
          const status = cell.getValue() as string;
          const colors = {
            pending: "text-yellow-600",
            shipped: "text-blue-600",
            delivered: "text-green-600",
            cancelled: "text-red-600",
          };
          return colors[status] || "";
        }
        return "";
      }}
    />
  );
}
```

### User Management Table

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  isActive: boolean;
}

function UsersTable() {
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  return (
    <TableComponent<User>
      table={table}
      size="lg"
      stickyHeader
      className="max-h-[600px]"
      getRowId={(row) => row.original.id}
      trClassName={(row) => {
        const isSelected = selectedUsers.has(row.original.id);
        const isActive = row.original.isActive;

        if (isSelected) return "bg-blue-100 dark:bg-blue-900/40";
        if (!isActive) return "opacity-50";
        return "";
      }}
      tdClassName={(cell) => {
        if (cell.column.id === "role") {
          const role = cell.getValue() as string;
          if (role === "admin") return "font-bold text-purple-600";
        }
        return "";
      }}
      onRowClick={(row) => {
        const id = row.original.id;
        setSelectedUsers((prev) => {
          const next = new Set(prev);
          next.has(id) ? next.delete(id) : next.add(id);
          return next;
        });
      }}
      onHeaderClick={(header) => {
        if (header.column.getCanSort()) {
          header.column.toggleSorting();
        }
      }}
    />
  );
}
```

### Financial Data Table

```tsx
interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

function TransactionsTable() {
  return (
    <TableComponent<Transaction>
      table={table}
      striped
      compact
      bordered
      trClassName={(row) => {
        const isIncome = row.original.type === "income";
        return isIncome
          ? "border-l-4 border-l-green-500"
          : "border-l-4 border-l-red-500";
      }}
      tdClassName={(cell) => {
        if (cell.column.id === "amount") {
          const amount = cell.getValue() as number;
          const type = cell.row.original.type;
          return clsx(
            "text-right font-mono font-semibold",
            type === "income" ? "text-green-600" : "text-red-600"
          );
        }
        return "";
      }}
      tdStyle={(cell) => {
        if (cell.column.id === "amount") {
          return { fontVariantNumeric: "tabular-nums" };
        }
        return {};
      }}
    />
  );
}
```

### Inventory Management

```tsx
interface Product {
  id: string;
  sku: string;
  name: string;
  stock: number;
  reorderLevel: number;
  price: number;
}

function InventoryTable() {
  return (
    <TableComponent<Product>
      table={table}
      hoverable
      size="md"
      trClassName={(row) => {
        const { stock, reorderLevel } = row.original;
        if (stock === 0) return "bg-red-50 dark:bg-red-900/20";
        if (stock <= reorderLevel) return "bg-yellow-50 dark:bg-yellow-900/20";
        return "";
      }}
      tdClassName={(cell) => {
        if (cell.column.id === "stock") {
          const stock = cell.getValue() as number;
          const reorderLevel = cell.row.original.reorderLevel;

          if (stock === 0) return "text-red-600 font-bold";
          if (stock <= reorderLevel) return "text-yellow-600 font-semibold";
          return "text-green-600";
        }

        if (cell.column.id === "price") {
          return "text-right font-mono";
        }

        return "";
      }}
      onRowClick={(row) => {
        if (row.original.stock <= row.original.reorderLevel) {
          openReorderDialog(row.original);
        }
      }}
    />
  );
}
```

## Tips and Best Practices

### Performance

1. **Use simple props when possible**: Boolean flags like `striped` and `hoverable` are more performant than function-based `trClassName`.

2. **Memoize functions**: If you must use function-based props, memoize them:

```tsx
const getTrClassName = useCallback((row: Row<User>) => {
  return row.original.isActive ? "bg-green-50" : "";
}, []);

<TableComponent table={table} trClassName={getTrClassName} />;
```

3. **Limit event handlers**: Only add handlers you actually need.

### Accessibility

The component automatically handles accessibility:

- Adds `role="button"` when clickable
- Adds `tabIndex` for keyboard navigation
- Uses semantic HTML (`scope="col"`)

### Combining with TanStack Features

```tsx
// Sorting + Custom styling
<TableComponent
  table={table}
  onHeaderClick={(header) => header.column.toggleSorting()}
  thClassName={(header) =>
    header.column.getCanSort() ? 'cursor-pointer hover:bg-blue-100' : ''
  }
/>

// Filtering + Visual feedback
<TableComponent
  table={table}
  thClassName={(header) =>
    header.column.getIsFiltered() ? 'bg-blue-100 font-bold' : ''
  }
/>
```
