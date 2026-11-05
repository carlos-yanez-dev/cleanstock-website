import type { ReactNode } from "react";

type Column = { key: string; label: string; numeric?: boolean };
type Row = { id: string; cells: Readonly<Record<string, ReactNode>> };

export function DataTable({ caption, columns, rows }: { caption: string; columns: readonly Column[]; rows: readonly Row[] }) {
  return (
    <div className="table-scroll" role="region" aria-label={caption} tabIndex={0}>
      <table className="data-table">
        <caption>{caption}</caption>
        <thead><tr>{columns.map((column) => <th key={column.key} scope="col" className={column.numeric ? "numeric" : undefined}>{column.label}</th>)}</tr></thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={columns.length}>No items to display.</td></tr>
            : rows.map((row) => <tr key={row.id}>{columns.map((column, index) => index === 0
              ? <th key={column.key} scope="row">{row.cells[column.key]}</th>
              : <td key={column.key} className={column.numeric ? "numeric" : undefined}>{row.cells[column.key]}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}
