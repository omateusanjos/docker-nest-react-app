import React from "react";
import { useTable } from "react-table";
import { formatNumberToCurrency, Totalize } from "../../utils/table";

const Table = ({ columns, data }: { columns: any; data: any }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const isValue = cell.column.Header?.toString() === "Value";

                  return (
                    <td {...cell.getCellProps()}>
                      {isValue
                        ? formatNumberToCurrency(cell.value)
                        : cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>{formatNumberToCurrency(Totalize(data, "value"))}</div>
    </>
  );
};

export { Table };
