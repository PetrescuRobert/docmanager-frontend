import Layout from '../../components/Layout';
import DocumentsTable from '../../components/Tables/DocumentsTable';

import {
  testColumns,
  testData,
} from '../../components/Tables/DocumentsTable/data';

export default function Documents() {
  return (
    <Layout>
      <DocumentsTable rows={testData} columns={testColumns} />
    </Layout>
  );
}
