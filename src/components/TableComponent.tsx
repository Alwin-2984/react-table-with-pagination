import { memo, CSSProperties } from "react";
import {
  flexRender,
  Table as RTable,
  Cell,
  HeaderGroup,
  Row,
  Header,
} from "@tanstack/react-table";
import clsx from "clsx";

export type TableComponentProps<TData> = {
  table: RTable<TData>;
  className?: string;

  // ========== Simple/User-Friendly Props ==========

  // Visual styling (boolean flags)
  striped?: boolean; // Alternating row background colors
  hoverable?: boolean; // Row hover effects
  bordered?: boolean; // Table borders
  compact?: boolean; // Reduced padding/spacing
  stickyHeader?: boolean; // Fixed header on scroll

  // States
  loading?: boolean; // Show loading state
  loadingMessage?: string | (() => React.ReactNode); // Custom loading message

  // Row highlighting
  highlightOnHover?: boolean; // Highlight row on hover (alternative to hoverable)
  selectedRowId?: string | number; // ID of selected row to highlight
  getRowId?: (row: Row<TData>) => string | number; // Function to get unique row ID

  // Size variants
  size?: "sm" | "md" | "lg"; // Predefined size variants (overrides compact)

  // ========== Advanced Customization Props ==========

  // Header customization
  theadClassName?: string;
  theadStyle?: CSSProperties;
  theadRowClassName?: string;
  theadRowStyle?: CSSProperties;
  thClassName?: string | ((header: Header<TData, unknown>) => string);
  thStyle?: CSSProperties | ((header: Header<TData, unknown>) => CSSProperties);
  onHeaderClick?: (header: Header<TData, unknown>) => void;

  // Body customization
  tbodyClassName?: string;
  tbodyStyle?: CSSProperties;
  trClassName?: string | ((row: Row<TData>, rowIndex: number) => string);
  trStyle?:
    | CSSProperties
    | ((row: Row<TData>, rowIndex: number) => CSSProperties);
  tdClassName?: string | ((cell: Cell<TData, unknown>) => string);
  tdStyle?: CSSProperties | ((cell: Cell<TData, unknown>) => CSSProperties);

  // Row events
  onRowClick?: (row: Row<TData>) => void;
  onRowDoubleClick?: (row: Row<TData>) => void;
  onRowMouseEnter?: (row: Row<TData>) => void;
  onRowMouseLeave?: (row: Row<TData>) => void;

  // Cell events
  onCellClick?: (cell: Cell<TData, unknown>) => void;

  // Empty state customization
  emptyStateClassName?: string;
  emptyStateMessage?: string | (() => React.ReactNode);
};

function TableComponentInner<TData>({
  table,
  className = "",
  // Simple props
  striped = false,
  hoverable = false,
  bordered = false,
  compact = false,
  stickyHeader = false,
  loading = false,
  loadingMessage = "Loading...",
  highlightOnHover = false,
  selectedRowId,
  getRowId,
  size,
  // Advanced props
  theadClassName,
  theadStyle,
  theadRowClassName,
  theadRowStyle,
  thClassName,
  thStyle,
  onHeaderClick,
  tbodyClassName,
  tbodyStyle,
  trClassName,
  trStyle,
  tdClassName,
  tdStyle,
  onRowClick,
  onRowDoubleClick,
  onRowMouseEnter,
  onRowMouseLeave,
  onCellClick,
  emptyStateClassName,
  emptyStateMessage = "No data available",
}: TableComponentProps<TData>) {
  const hasData = table.getRowModel().rows.length > 0;

  // Determine effective hoverable state
  const isHoverable = hoverable || highlightOnHover;

  // Helper functions to resolve className and style
  const getWrapperClassName = () => {
    return clsx(
      "tstc-wrapper",
      {
        "tstc-bordered": bordered,
        "tstc-compact": compact && !size,
        "tstc-sticky-header": stickyHeader,
        [`tstc-size-${size}`]: size,
      },
      className
    );
  };

  const getThClassName = (header: Header<TData, unknown>) => {
    const customClass =
      typeof thClassName === "function" ? thClassName(header) : thClassName;
    // Put custom class last so it can override base styles
    return clsx("tstc-th-base", customClass);
  };

  const getThStyle = (header: Header<TData, unknown>): CSSProperties => {
    const defaultStyle: CSSProperties = {
      width: header.getSize() !== 150 ? `${header.getSize()}px` : undefined,
      minWidth: header.getSize() !== 150 ? `${header.getSize()}px` : undefined,
    };
    const customStyle =
      typeof thStyle === "function" ? thStyle(header) : thStyle;
    return { ...defaultStyle, ...customStyle };
  };

  const getTrClassName = (row: Row<TData>, rowIndex: number) => {
    const rowId = getRowId ? getRowId(row) : row.id;
    const isSelected = selectedRowId !== undefined && rowId === selectedRowId;
    const isEven = rowIndex % 2 === 0;

    const customClass =
      typeof trClassName === "function"
        ? trClassName(row, rowIndex)
        : trClassName;

    return clsx(
      "tstc-tr",
      {
        "tstc-striped-even": striped && isEven,
        "tstc-striped-odd": striped && !isEven,
        "tstc-hoverable": isHoverable,
        "tstc-selected": isSelected,
        "tstc-clickable": onRowClick || onRowDoubleClick,
      },
      customClass
    );
  };

  const getTrStyle = (
    row: Row<TData>,
    rowIndex: number
  ): CSSProperties | undefined => {
    return typeof trStyle === "function" ? trStyle(row, rowIndex) : trStyle;
  };

  const getTdClassName = (cell: Cell<TData, unknown>) => {
    const customClass =
      typeof tdClassName === "function" ? tdClassName(cell) : tdClassName;
    // Put custom class last so it can override base styles
    return clsx("tstc-td-base", customClass);
  };

  const getTdStyle = (cell: Cell<TData, unknown>): CSSProperties => {
    const defaultStyle: CSSProperties = {
      width:
        cell.column.getSize() !== 150
          ? `${cell.column.getSize()}px`
          : undefined,
      minWidth:
        cell.column.getSize() !== 150
          ? `${cell.column.getSize()}px`
          : undefined,
    };
    const customStyle = typeof tdStyle === "function" ? tdStyle(cell) : tdStyle;
    return { ...defaultStyle, ...customStyle };
  };

  return (
    <div className={getWrapperClassName()}>
      <table className="tstc-table">
        <thead className={theadClassName} style={theadStyle}>
          <tr
            className={clsx("tstc-thead-row-base", theadRowClassName)}
            style={theadRowStyle}
          >
            {table.getHeaderGroups()?.map((headerGroup: HeaderGroup<TData>) =>
              headerGroup.headers.map((header, index: number) => (
                <th
                  key={`${header.id}-${index}`}
                  scope="col"
                  className={getThClassName(header)}
                  style={getThStyle(header)}
                  onClick={() => onHeaderClick?.(header)}
                  role={onHeaderClick ? "button" : undefined}
                  tabIndex={onHeaderClick ? 0 : undefined}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody
          className={clsx("tstc-tbody-base", tbodyClassName)}
          style={tbodyStyle}
        >
          {loading ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="tstc-loading"
              >
                {typeof loadingMessage === "function"
                  ? loadingMessage()
                  : loadingMessage}
              </td>
            </tr>
          ) : hasData ? (
            table.getRowModel().rows.map((row: Row<TData>, index: number) => (
              <tr
                key={index.toString()}
                className={getTrClassName(row, index)}
                style={getTrStyle(row, index)}
                onClick={() => onRowClick?.(row)}
                onDoubleClick={() => onRowDoubleClick?.(row)}
                onMouseEnter={() => onRowMouseEnter?.(row)}
                onMouseLeave={() => onRowMouseLeave?.(row)}
                role={onRowClick || onRowDoubleClick ? "button" : undefined}
                tabIndex={onRowClick || onRowDoubleClick ? 0 : undefined}
              >
                {row
                  .getVisibleCells()
                  .map((cell: Cell<TData, unknown>, index: number) => (
                    <td
                      key={`${cell.id}-${index}`}
                      className={getTdClassName(cell)}
                      style={getTdStyle(cell)}
                      onClick={(e) => {
                        if (onCellClick) {
                          e.stopPropagation();
                          onCellClick(cell);
                        }
                      }}
                      role={onCellClick ? "button" : undefined}
                      tabIndex={onCellClick ? 0 : undefined}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className={clsx("tstc-empty", emptyStateClassName)}
              >
                {typeof emptyStateMessage === "function"
                  ? emptyStateMessage()
                  : emptyStateMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
const TableComponent = memo(TableComponentInner) as typeof TableComponentInner;

export default TableComponent;
