import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import Task from "../../components/Task";
import { TaskDto, TaskUpdateDto } from "../../data/types";
import { useState, useEffect } from "react";
import { API, TASK_BY_ID_ROUTE, TASK_UPDATE_ROUTE } from "../../data/CONSTANTS";
import axios from "axios";

//page for displaying the task and the updates that users will make
interface TaskDetailsProps {}
export default function TaskDetails() {
  //get the id from the url with useParams
  const { id } = useParams();
  const [task, setTask] = useState<TaskDto>({} as TaskDto);
  const [updates, setUpdates] = useState<TaskUpdateDto[]>(
    [] as TaskUpdateDto[]
  );
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  //get the task from the backend in useEffect
  //function that will request the tasks from backend
  async function getTask() {
    //get the tasks from the backend and store them in state
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API + TASK_BY_ID_ROUTE + id,
    };
    axios
      .request(config)
      .then((response) => {
        //get the data from the body of the response
        setTask(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  //function that will request the task updates from backend
  async function getTaskUpdates() {
    //get the tasks from the backend and store them in state
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API + TASK_UPDATE_ROUTE + id,
    };
    axios
      .request(config)
      .then((response) => {
        //get the data from the body of the response
        setUpdates(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  console.log(updates);
  //function that will handle the submit of the form and will send the data to the backend
  function handleSubmit(file: File | null, message: string) {
    //create a form data object
    let data = new FormData();
    //append the file to the form data object
    data.append("file", file as Blob);
    //append the message to the form data object
    data.append("message", message);
    //create the config object for the request
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API + TASK_UPDATE_ROUTE + id,
      data: data,
    };
    console.log(config);
    //send the request to the backend
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    console.log(id);
    id && getTask();
    id && getTaskUpdates();
  }, []);
  console.log(message);
  return (
    <Layout>
      <div>
        <Task
          id={task.id}
          title={task.title}
          description={task.description}
          author={task.author?.firstName + " " + task.author?.lastName}
          postDate={task.postDate}
          documents={task.relatedDocuments}
        />
        {updates.map((update) => {
          return (
            <Task
              id={update.id}
              title={"Task update"}
              description={update.message}
              author={""}
              postDate={update.postDate}
              attachedDocument={update.attachedDocument}
              key={update.id}
            />
          );
        })}
        <form
          className="w-full max-w-lg mx-auto"
          onSubmit={() => {
            handleSubmit(file, message);
          }}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Message
              </label>
              <textarea
                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
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
                  onChange={(e) => {
                    //get the file from the input if not null
                    const selectedFile = e.target.files?.[0];
                    //save the file in state if not null
                    selectedFile && setFile(selectedFile);
                  }}
                />
              </div>
            </div>
          </div>

          <button className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </form>
      </div>
    </Layout>
  );
}
