export interface TableDocumentsProps {
  columns: string[];
  rows: {
    name: string;
    color: string;
    category: string;
    accesories: string;
    availabe: string;
    price: number;
    weight: number;
  }[];
}

export const testColumns = [
  'Product name',
  'Color',
  'Category',
  'Accesories',
  'Available',
  'Price',
  'Weight',
  'Action',
];

export const testData = [
  {
    name: 'Apple MacBook Pro 17',
    color: 'Silver',
    category: 'Laptop',
    accesories: 'yes',
    availabe: 'yes',
    price: 100,
    weight: 900,
  },
];
