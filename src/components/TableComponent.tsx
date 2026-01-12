import { memo } from "react";
import {
  flexRender,
  Table as RTable,
  Cell,
  HeaderGroup,
  Row,
} from "@tanstack/react-table";
import clsx from "clsx";

type TableComponentProps<TData> = {
  table: RTable<TData>;
  className?: string;
};

function TableComponentInner<TData>({
  table,
  className = "",
}: TableComponentProps<TData>) {
  const hasData = table.getRowModel().rows.length > 0;

  return (
    <div
      className={clsx(
        "relative overflow-x-auto  bg-white dark:bg-gray-900",
        "scrollbar-thin scrollbar-track-gray-200 dark:scrollbar-track-gray-700 scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600",
        "hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500",
        className
      )}
    >
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-700">
            {table.getHeaderGroups()?.map((headerGroup: HeaderGroup<TData>) =>
              headerGroup.headers.map((header, index: number) => (
                <th
                  key={`${header.id}-${index}`}
                  scope="col"
                  className={clsx(
                    "px-3 py-2 text-left text-sm font-normal tracking-wide text-gray-500 dark:text-gray-400",
                    "bg-blue-50 dark:bg-gray-800"
                  )}
                  style={{
                    width:
                      header.getSize() !== 150
                        ? `${header.getSize()}px`
                        : undefined,
                    minWidth:
                      header.getSize() !== 150
                        ? `${header.getSize()}px`
                        : undefined,
                  }}
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
        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          {hasData ? (
            table.getRowModel().rows.map((row: Row<TData>, index: number) => (
              <tr
                key={index.toString()}
                className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {row
                  .getVisibleCells()
                  .map((cell: Cell<TData, unknown>, index: number) => (
                    <td
                      key={`${cell.id}-${index}`}
                      className="px-3 py-2 text-sm font-light text-gray-900 dark:text-gray-100"
                      style={{
                        width:
                          cell.column.getSize() !== 150
                            ? `${cell.column.getSize()}px`
                            : undefined,
                        minWidth:
                          cell.column.getSize() !== 150
                            ? `${cell.column.getSize()}px`
                            : undefined,
                      }}
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
                className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No data available
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
