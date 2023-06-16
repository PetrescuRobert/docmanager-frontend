import Pagination from "../../Pagination";
import Search from "../../Search";
import { Document } from "../../../data/types";

export default function DocumentsTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Document[];
}) {
  function formatDate(date: string) {
    const dateObj = new Date(date);
    const formatDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    return formatDate.format(dateObj);
  }
  return (
    <div className="relative overflow-x-auto mx-2">
      <Search />
      <table className="w-full text-sm text-left text-gray-500 shadow-md sm:rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            {columns.map((col) => (
              <th scope="col" className="px-6 py-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={row.id}>
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {row.docName}
              </th>
              <td className="px-6 py-4">{formatDate(row.uploadDate)}</td>
              <td className="px-6 py-4">
                {row.finishDate ? row.finishDate : "In progress"}
              </td>
              <td className="px-6 py-4">download</td>
              <td className="px-6 py-4">
                {row.author.firstName + " " + row.author.lastName}
              </td>
              <td className="flex items-center px-6 py-4 space-x-3">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 hover:underline"
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
