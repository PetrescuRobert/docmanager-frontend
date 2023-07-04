import Layout from "../../components/Layout";
import DocumentsTable from "../../components/Tables/DocumentsTable";
import { DOCUMENTS_ROUTE, API } from "../../data/CONSTANTS";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { Document } from "../../data/types";

async function getDocuments(userId: number) {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: API + DOCUMENTS_ROUTE + "/emp_id=" + userId,
  };
  try {
    const response = await axios.request(config);
    //create an array of documents from the response in state
    const documents: Document[] = response.data.map((document: Document) => {
      return {
        id: document.id,
        docName: document.docName,
        docType: document.docType,
        uploadDate: document.uploadDate,
        finishDate: document.finishDate,
        path: document.path,
        author: document.author,
      };
    });
    return documents;
  } catch (error) {
    return null;
  }
}

export default function Documents() {
  //get the user id from the userContext
  const userContext = useContext(UserContext);
  const [documents, setDocuments] = useState<Document[]>([]);
  const columns = ["Name", "Upload Date", "Finish Date", "Download", "Author"];

  useEffect(() => {
    if (userContext.user !== null) {
      getDocuments(userContext.user.id).then((response) => {
        if (response !== null) {
          setDocuments(response);
        }
      });
    }
  }, [userContext.user]);
  return (
    <Layout>
      <DocumentsTable rows={documents} columns={columns} />
    </Layout>
  );
}
