export interface LoginRequest {
  userDetails: {
    email: string;
    firstName: string;
    lastName: string;
    id: number;
    role: string;
    department: Department;
  };
  token: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Document {
  id: number;
  docName: string;
  docType: string;
  uploadDate: string;
  finishDate: string;
  path: string;
  author: Employee;
}

export interface DocumentType {
  id: number;
  name: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  employeeAssigned: Employee;
  author: Employee;
}
export interface TaskDto {
  id: number;
  title: string;
  description: string;
  employeeAssigned: Employee;
  author: Employee;
  relatedDocuments: Document[];
  postDate: string;
}
export interface TaskUpdateDto {
  id: number;
  message: string;
  postDate: string;
  attachedDocument: AttachedDocumentDto;
}
export interface AttachedDocumentDto {
  attachedDocumentId: number;
  docName: string;
  path: string;
}
export interface Department {
  id: number;
  name: string;
}
