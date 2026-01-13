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
    <div className={clsx("tstc-wrapper", className)}>
      <table className="tstc-table">
        <thead>
          <tr className="tstc-thead-row">
            {table.getHeaderGroups()?.map((headerGroup: HeaderGroup<TData>) =>
              headerGroup.headers.map((header, index: number) => (
                <th
                  key={`${header.id}-${index}`}
                  scope="col"
                  className="tstc-th"
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
        <tbody className="tstc-tbody">
          {hasData ? (
            table.getRowModel().rows.map((row: Row<TData>, index: number) => (
              <tr key={index.toString()} className="tstc-tr">
                {row
                  .getVisibleCells()
                  .map((cell: Cell<TData, unknown>, index: number) => (
                    <td
                      key={`${cell.id}-${index}`}
                      className="tstc-td"
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
              <td colSpan={table.getAllColumns().length} className="tstc-empty">
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
