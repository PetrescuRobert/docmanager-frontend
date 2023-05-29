import Pagination from '../../Pagination';
import Search from '../../Search';
import { TableDocumentsProps } from './data';

export default function DocumentsTable({ columns, rows }: TableDocumentsProps) {
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
            <tr className="bg-white border-b hover:bg-gray-50">
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
                {row.name}
              </th>
              <td className="px-6 py-4">{row.color}</td>
              <td className="px-6 py-4">{row.category}</td>
              <td className="px-6 py-4">Yes</td>
              <td className="px-6 py-4">Yes</td>
              <td className="px-6 py-4">${row.price}</td>
              <td className="px-6 py-4">3.0 lb.</td>
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
