import { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout";
import {
  API,
  CREATE_TASK_ROUTE,
  DOCUMENTS_LIST_ROUTE,
  EMPLOYEES_ROUTE,
} from "../../data/CONSTANTS";
import axios from "axios";
import { Document, Employee } from "../../data/types";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

//function component for creating a task if the user is a manager
export default function CreateTask() {
  const navigator = useNavigate();
  //get the user from userContext
  const { user } = useContext(UserContext);
  //states for the form inputs
  const [doc, setDoc] = useState<Document>({} as Document);
  const [employeeAssigned, setEmployeeAssigned] = useState<Employee>(
    {} as Employee
  );
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //states for the form data from backend: document and employee lists
  const [docList, setDocList] = useState<Document[]>([]);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  //function that will request the documents list from the backend in useEffect
  async function getDocuments() {
    //get the document list from the backend and store them in state
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API + DOCUMENTS_LIST_ROUTE,
    };
    axios.request(config).then((response) => {
      setDocList(response.data);
    });
  }

  async function getEmployees() {
    //get the employee list from the backend and store them in state
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API + EMPLOYEES_ROUTE + user?.id,
    };
    axios.request(config).then((response) => {
      setEmployeeList(response.data);
    });
  }
  console.log(employeeList);

  //function that will handle the document selection in form and save in ste doc state
  function handleDocumentSelection(docId: string) {
    //find the document in the list of documents by id (convert to number) and save it in state
    let doc = docList.find((doc) => doc.id === Number(docId));

    if (doc) {
      setDoc(doc);
    }
  }
  //function that will handle the employee selection in form and save in ste employee state
  function handleEmployeeSelection(employeeId: string) {
    //find the employee in the list of employees by id (convert to number) and save it in state
    let employee = employeeList.find(
      (employee) => employee.id === Number(employeeId)
    );
    if (employee) {
      setEmployeeAssigned(employee);
    }
  }
  console.log(employeeAssigned);
  //function that will handle the form submission
  //will take the data saved in the state, make an object of type CreateTaskDto and send it to the backend
  function handleSubmit() {
    //create Employee object from the user if exists
    let author = user
      ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        }
      : null;
    let createTaskDto = {
      title: title,
      description: description,
      relatedDocuments: [doc],
      employeeAssigned: employeeAssigned,
      author: author,
    };
    console.log(createTaskDto);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API + CREATE_TASK_ROUTE,
      header: {
        Authorization: "Bearer " + user?.jwtToken,
      },
      data: createTaskDto,
    };
    console.log(createTaskDto);
    axios.request(config).then((response) => {
      //if the response is ok, redirect to the home page
      if (response.status === 200) {
        navigator("/home");
      }
    });
  }

  useEffect(() => {
    getDocuments();
    getEmployees();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col divide-y m-8 border-solid border-2 rounded-lg h-fit">
        <div className="mx-auto my-2">
          <span>Create task</span>
        </div>
        <div className="p-4">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex w-full">
              <label htmlFor="doc" className="me-2">
                Document:
              </label>
              <select
                name="doc"
                id="doc"
                onChange={(e) => handleDocumentSelection(e.target.value)}
              >
                <option value="Select a document type">
                  Select a document
                </option>
                {docList.map((doc, index) => {
                  return (
                    <option key={index} value={doc.id}>
                      {doc.docName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex w-full my-2">
              <label htmlFor="doc_type" className="me-2">
                Employee assigned:
              </label>
              <select
                name="doc_type"
                id="type"
                onChange={(e) => handleEmployeeSelection(e.target.value)}
              >
                <option value="Select a document type" disabled>
                  Select an employee
                </option>
                {employeeList.map((employee, index) => {
                  return (
                    <option key={index} value={employee.id}>
                      {employee.firstName + " " + employee.lastName}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="my-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm  text-gray-900"
              >
                Task Title
              </label>
              <input
                className="w-full text-sm border border-300 rounded-sm cursor-pointer focus:outline-none"
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm  text-gray-900"
              >
                Task Description
              </label>
              <textarea
                className="w-full text-sm border border-300 rounded-sm cursor-pointer focus:outline-none"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex w-1/2 mx-auto justify-center place-self-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create task
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
