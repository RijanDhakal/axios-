import axios from "./axios";

interface Student {
  id?: string;
  studentId: number;
  name: string;
  address: string;
  contact: string;
  grade: number;
  section: number;
  stream: string;
  password: string;
}

const api = axios.create({
  baseUrl: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const asyncFunction = async () => {
  // GET
  // const res = await api.get<Student[]>("/students/get");
  // console.log("res :", res);

  // POST
  // const res = await api.post<Student>({
  //   url: "/students/create",
  //   payload: {
  //     studentId: 14,
  //     name: "test",
  //     address: "sunwal",
  //     contact: "6767327832",
  //     grade: 12,
  //     section: 106,
  //     stream: "SCIENCE",
  //     password: "123456",
  //   },
  // });

  // PATCH
  // const res = await api.patch({
  //   url: "/students/update/2",
  //   payload: {
  //     name: "updated params",
  //   },
  // });

  // DELETE
  // const res = await api.delete({
  //   url: "/students/delete",
  //   payload: {
  //     studentId: 4,
  //   },
  // });
  // console.log(res);
};
asyncFunction();
