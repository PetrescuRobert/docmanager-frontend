//function component - Upload that i will use to upload documents to the database
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  API,
  DOCUMENT_TYPES_ROUTE,
  DOCUMENT_UPLOAD_ROUTE,
} from '../../data/CONSTANTS';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

export default function Upload() {
  //state to save the file that the user will upload
  const [file, setFile] = useState<File | null>(null);
  //state to save the document type that the user will select on the dropdown
  const [docTypeSelected, setDocTypeSelected] = useState<string>(
    'Select a document type'
  );
  //list with document types fetched from the backend
  const [docTypes, setDocTypes] = useState<string[]>([]);
  //user from userContext
  const userContext = useContext(UserContext);
  //function that will request the document types from the backend in useEffect
  useEffect(() => {
    //get the document types from the backend and store them in state
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: API + DOCUMENT_TYPES_ROUTE,
    };
    axios.request(config).then((response) => {
      setDocTypes(response.data);
    });
  }, []);
  //function that will handle the submit of the form and will send the data to the backend
  function handleSubmit(file: File | null, docTypeSelected: string) {
    //create a form data object
    let data = new FormData();
    //append the file to the form data object
    data.append('file', file as Blob);
    //append the document type to the form data object
    data.append('documentType', docTypeSelected);
    //create the config object for the request
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API + DOCUMENT_UPLOAD_ROUTE,
      headers: {
        Authorization: 'Bearer ' + userContext.user?.jwtToken,
      },
      data: data,
    };
    //send the request to the backend
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(config);
  }
  //function that will handle the change of the file input
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    //get the file from the input if not null
    const file = e.target.files?.[0];
    //save the file in state if not null
    file && setFile(file);
  }
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form
            className="py-6 px-9"
            onSubmit={(e) => {
              handleSubmit(file, docTypeSelected);
            }}
          >
            <div className="mb-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Document type
              </label>
              <select
                name="docType"
                id="docType"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                onChange={(e) => {
                  setDocTypeSelected(e.target.value);
                }}
                defaultValue={'Select a document type'}
              >
                <option value="Select a document type" disabled>
                  Select a document type
                </option>
                {docTypes.map((docType, index) => {
                  return (
                    <option value={docType} key={index}>
                      {docType}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-6 pt-4">
              <div className="mb-8">
                <label
                  htmlFor="file"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Upload file
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none "
                  onChange={handleFileChange}
                />
              </div>

              <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    banner-design.png
                  </span>
                  <button className="text-[#07074D]">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
                <div className="flex items-center justify-between">
                  <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                    banner-design.png
                  </span>
                  <button className="text-[#07074D]">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                        fill="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                  <div className="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"></div>
                </div>
              </div> */}
            </div>

            <div>
              <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Send File
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
