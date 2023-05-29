import NavBar from '../NavBar';
import DocumentsTable from '../Tables/DocumentsTable';
import Task from '../Task';
import UploadDocumentForm from '../UploadDocumentForm';
import { testColumns, testData } from '../Tables/DocumentsTable/data';

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-[auto,1fr]  lg:max-w-7xl  mx-auto">
      <NavBar />
      {children}
    </div>
  );
}
