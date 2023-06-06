import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import Task from '../../components/Task';
import { TaskDto } from '../../data/types';
import { useState, useEffect } from 'react';
import { API, TASK_BY_ID_ROUTE } from '../../data/CONSTANTS';
import axios from 'axios';

//page for displaying the task and the updates that users will make
interface TaskDetailsProps {}
export default function TaskDetails() {
  //get the id from the url with useParams
  const { id } = useParams();
  const [task, setTask] = useState<TaskDto>({} as TaskDto);
  //get the task from the backend in useEffect
  //function that will request the tasks from backend
  async function getTask() {
    //get the tasks from the backend and store them in state
    let config = {
      method: 'get',
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
  useEffect(() => {
    console.log(id);
    id && getTask();
  }, []);
  console.log(task);
  return (
    <Layout>
      <div>
        <Task
          id={task.id}
          title={task.title}
          description={task.description}
          author={task.author?.firstName + ' ' + task.author?.lastName}
          postDate={task.postDate}
          documents={task.relatedDocuments}
        />
        <form className="w-full max-w-lg mx-auto">
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
                />
              </div>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3">
              <button
                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Send
              </button>
            </div>
            <div className="md:w-2/3"></div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
