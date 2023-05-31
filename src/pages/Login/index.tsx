import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API, LOGIN_ROUTE } from "../../data/CONSTANTS";
import UserContext, { UserDetails } from "../../contexts/UserContext";
import { LoginRequest } from "../../data/types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  //i want to acces the context here
  const { setUser } = useContext(UserContext);

  //I want to write a function that will handle the login

  async function handleLogIn(email: string, password: string) {
    let data = JSON.stringify({ email: email, password: password });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API + LOGIN_ROUTE,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios
      .request<LoginRequest>(config)
      .then((response) => {
        let token = response.data.token;
        let user = {
          id: response.data.userDetails.id,
          firstName: response.data.userDetails.firstName,
          lastName: response.data.userDetails.lastName,
          email: response.data.userDetails.email,
          jwtToken: response.data.token,
        };
        //store user in local storage
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      })
      .catch((response) => {
        if (response.response.status === 403) {
          alert("Invalid credentials");
        }
      });
  }

  return (
    <>
      {/*

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account now
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogIn(email, password);
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            &copy; DocManager
          </p>
        </div>
      </div>
    </>
  );
}
