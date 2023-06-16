import { useContext, useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Task from "../../components/Task";
import UserContext from "../../contexts/UserContext";
import { TaskDto } from "../../data/types";
import { API, TASKS_LIST_BY_ID_ROUTE } from "../../data/CONSTANTS";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  //get the current user from the userContext
  const { user } = useContext(UserContext);
  //state to store the tasks after the request
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  //function that will request the tasks from backend
  async function getTasks() {
    //get the tasks from the backend and store them in state
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API + TASKS_LIST_BY_ID_ROUTE + user?.id,
    };
    axios.request(config).then((response) => {
      //get the data from the body of the response
      setTasks(response.data);
    });
    console.log(config);
  }
  //call the function in useEffect
  useEffect(() => {
    if (user) {
      getTasks();
    } else {
      navigate("/login");
    }
  }, []);

  console.log(tasks);

  return (
    <Layout>
      <div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            author={task.author.firstName + " " + task.author.lastName}
            postDate={task.postDate}
            documents={task.relatedDocuments}
          />
        ))}
      </div>
    </Layout>
  );
}
