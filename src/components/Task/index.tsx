import {
  EllipsisHorizontalIcon,
  ArrowPathIcon,
  HandThumbUpIcon,
  ShareIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

import { TaskType, posts } from "./data";
import {
  AttachedDocumentDto,
  Department,
  Document,
  Employee,
} from "../../data/types";
import DownloadDocumentButton from "../DownloadDocumentButton";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { current } from "@reduxjs/toolkit";
import {
  API,
  DEPARTMENTS_LIST_ROUTE,
  EMPLOYEES_BY_DEPARTMENT_ROUTE,
} from "../../data/CONSTANTS";
import axios from "axios";
import avatar from "../../assets/avatar.png";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  author: string;
  postDate?: string;
  documents?: Document[];
  attachedDocument?: AttachedDocumentDto;
  employeeAssigned?: string;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function formatDate(date: string | undefined) {
  if (date === undefined) {
    return "";
  }
  const dateObj = new Date(date);
  const formatDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return formatDate.format(dateObj);
}

export default function Task(props: TaskProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openSelectEmployee, setOpenSelectEmployee] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<number>(1);
  const [departments, setDepartments] = useState<Department[]>([]);
  //get the user from useContext
  const { user } = useContext(UserContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSelectEmployee = () => setOpenSelectEmployee(true);
  const handleCloseSelectEmployee = () => setOpenSelectEmployee(false);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  //function that will handle the submit of the form and will send the data to the backend
  function handleSubmit() {
    handleClose();
    //post request to the backend with departmentId and taskId as parameters
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url:
        API + "/tasks/change_dep=" + selectedDepartment + "&task=" + props.id,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  function handleSubmitAssignEmployee() {
    handleCloseSelectEmployee();
    //post request to the backend with departmentId and taskId as parameters
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url:
        API +
        "/tasks/assign_employee=" +
        selectedEmployee +
        "&task=" +
        props.id,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  //function that will request the departments from backend
  async function getDepartments() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API + DEPARTMENTS_LIST_ROUTE,
    };
    axios
      .request(config)
      .then((response) => {
        //get the data from the body of the response
        setDepartments(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  //function that will request the employees from the user department from backend
  async function getEmployees() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API + EMPLOYEES_BY_DEPARTMENT_ROUTE + user?.department.id,
    };
    axios
      .request(config)
      .then((response) => {
        //get the data from the body of the response
        setEmployees(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  //call the function in useEffect
  useEffect(() => {
    if (user) {
      getDepartments();
      getEmployees();
    }
  }, []);

  return (
    <div className="border-t-[1px] px-4 pt-3 pb-2 hover:bg-neutral-50 transition-colors duration-500 ease-out cursor-pointer">
      <div className="grid grid-cols-[auto,1fr] gap-3">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <img src={avatar} alt="" className="w-full" />
        </div>
        <div>
          <div className="flex gap-1 items-center">
            <h1
              className="font-bold"
              onClick={() => navigate("/task/" + props.id)}
            >
              {props.title}
            </h1>
            <span className="text-neutral-500">•</span>
            <h2 className="text-neutral-500">{formatDate(props.postDate)}</h2>
            <div className="p-2 hover:bg-sky-100 ml-auto rounded-full group cursor-pointer transition-colors duration-500 ease-out">
              <EllipsisHorizontalIcon className="w-4 h-4 text-neutral-400 group-hover:text-sky-500" />
            </div>
          </div>
          <p>{props.description}</p>
          {
            //list documents if any are present
            props.documents &&
              props.documents.map((document) => (
                <DownloadDocumentButton key={document.id} doc={document} />
              ))
          }
          {
            //list documents if any are present
            props.attachedDocument && (
              <DownloadDocumentButton
                key={props.attachedDocument.attachedDocumentId}
                doc={props.attachedDocument}
              />
            )
          }

          {
            /* actions */
            user?.role === "MANAGER" && (
              <div className="flex justify-between mt-3 max-w-md cursor-pointer">
                <div className="flex gap-1 items-center group tabletpx-4">
                  <div className="group-hover:bg-sky-100 w-9 h-9 p-2 rounded-full hover-transition cursor-pointer">
                    <ArrowPathIcon onClick={handleOpenSelectEmployee} />
                    <Modal
                      open={openSelectEmployee}
                      onClose={handleCloseSelectEmployee}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Asigneaza un angajat pentru aceasta sarcina:
                        </Typography>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Angajat
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Departament"
                            value={selectedEmployee}
                            onChange={(event) => {
                              event.preventDefault();
                              setSelectedEmployee(event.target.value as number);
                            }}
                          >
                            {employees &&
                              employees.map((employee) => (
                                <MenuItem value={employee.id}>
                                  {employee.firstName + " " + employee.lastName}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={handleSubmitAssignEmployee}
                            className="mt-2"
                          >
                            Trimite
                          </Button>
                        </FormControl>
                      </Box>
                    </Modal>
                  </div>
                </div>
                <div className="flex gap-1 items-center group tabletpl-4">
                  <div className="group-hover:bg-sky-100 w-9 h-9 p-2 rounded-full hover-transition cursor-pointer">
                    <ShareIcon onClick={handleOpen} />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Selecteaza un departament pentru distribuire:
                        </Typography>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Departament
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Departament"
                            value={selectedDepartment}
                            onChange={(event) => {
                              event.preventDefault();
                              setSelectedDepartment(
                                event.target.value as number
                              );
                            }}
                          >
                            {departments &&
                              departments.map((department) => (
                                <MenuItem value={department.id}>
                                  {department.name}
                                </MenuItem>
                              ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={handleSubmit}
                            className="mt-2"
                          >
                            Trimite
                          </Button>
                        </FormControl>
                      </Box>
                    </Modal>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
