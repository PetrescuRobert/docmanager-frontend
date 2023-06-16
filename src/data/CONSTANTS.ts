export const API = "http://localhost:8080/api";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const HOME_ROUTE = "/";
export const EMPLOYEES_ROUTE = "/employees/emp_id/";
export const EMPLOYEES_BY_DEPARTMENT_ROUTE = "/employees/dep_id=";
export const DOCUMENTS_ROUTE = "/doc";
export const DOWNLOAD_DOCUMENT_ROUTE = "/doc/download/";
export const DOCUMENT_TYPES_ROUTE = "/doc/types";
export const DOCUMENT_UPLOAD_ROUTE = "/doc/upload-file";
export const DOCUMENTS_LIST_ROUTE = "/doc/list";
export const CREATE_TASK_ROUTE = "/tasks/new-task";
export const TASK_BY_ID_ROUTE = "/tasks/";
export const TASK_UPDATE_ROUTE = "/taskupdate/";
export const TASKS_LIST_BY_ID_ROUTE = "/tasks/emp_id=";
export const DEPARTMENTS_LIST_ROUTE = "/departments/all";

export enum Role {
  USER = "USER",
  MANAGER = "MANAGER",
}
