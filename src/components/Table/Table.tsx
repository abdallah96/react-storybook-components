import { FC, useState, useMemo } from 'react';

export interface Column {
  name: string;
  accessor: string;
  sortable?: boolean;
}

export interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
}

export const Table: FC<TableProps> = ({ columns, data, className = '' }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (accessor: string, sortable?: boolean) => {
    if (!sortable) return;
    
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === accessor) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    
    setSortConfig({ key: accessor, direction });
  };

  const getSortIcon = (accessor: string, sortable?: boolean) => {
    if (!sortable) return null;
    
    if (sortConfig && sortConfig.key === accessor) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    
    return '↕';
  };

  if (data.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-8 text-center ${className}`}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 bg-white ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                  transition-colors duration-150
                `}
                onClick={() => handleSort(column.accessor, column.sortable)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.name}</span>
                  {column.sortable && (
                    <span className="text-xs">
                      {getSortIcon(column.accessor, column.sortable)}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-colors duration-150 hover:bg-gray-50"
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[column.accessor] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
