//i want to use this file to store all the constants that i will use in the app
//i want constants to store routes, api urls, etc
export const API = 'http://localhost:8080/api';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const HOME_ROUTE = '/';
export const EMPLOYEES_ROUTE = '/employees/emp_id/';
export const DOCUMENTS_ROUTE = '/doc';
export const DOWNLOAD_DOCUMENT_ROUTE = '/doc/download/';
export const DOCUMENT_TYPES_ROUTE = '/doc/types';
export const DOCUMENT_UPLOAD_ROUTE = '/doc/upload-file';
export const DOCUMENTS_LIST_ROUTE = '/doc/list';
export const CREATE_TASK_ROUTE = '/tasks/new-task';
export const TASK_BY_ID_ROUTE = '/tasks/';
export const TASKS_LIST_BY_ID_ROUTE = '/tasks/emp_id=';

export enum Role {
  USER = 'USER',
  MANAGER = 'MANAGER',
}
