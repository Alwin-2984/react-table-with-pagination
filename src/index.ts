export { default as TableComponent } from "./components/TableComponent";
export { default as Pagination } from "./components/Pagination";

// Export component prop types
export type { TableComponentProps } from "./components/TableComponent";

// Re-export useful TanStack Table types
export type {
  Table as RTable,
  Cell,
  HeaderGroup,
  Row,
  Header,
} from "@tanstack/react-table";
