import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import adminInstance from "../../../Axios/adminInstance";
import { login, selectAdmin } from "../../../Redux/Slice/adminSlice";
import { ToastContainer } from "react-toastify";
import { FaExclamationCircle } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

export const AdminLogin = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [err, setErr] = useState("");

  const user = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsernameOrEmail = usernameOrEmail.trim();
    const trimmedPassword = adminPassword.trim();

    if (trimmedUsernameOrEmail === "" || trimmedPassword === "") {
      setErr("Please fill in all fields!");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }

    try {
      const response = await adminInstance.post("/login", {
        usernameOrEmail: trimmedUsernameOrEmail,
        password: trimmedPassword,
      });
      console.log(response.data, "admin login response data");
      localStorage.setItem("adminToken", JSON.stringify(response.data.token));

      if(response.data.message === "Not authorized or Invalid token") {
        navigate('/admin/login')
      }

      dispatch(login(response.data));
    } catch (error: any) {
      console.error(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Not authorized or Invalid token"
      ) {
        // Handle token expiration and redirect to the login page
        localStorage.removeItem("adminToken");
        navigate('/admin/login');
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle other error messages from the backend
        setErr(error.response.data.message);
      } else {
        // Handle other errors
        setErr("An error occurred while admin login");
      }
  
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };

  useEffect(() => {
    if(user) {
      navigate("/admin/dashboard")
    }
  }, [navigate, user])

  return (
    <>
      <ToastContainer/>
      <div className="admin flex min-h-full flex-1 flex-col justify-center px-4 sm:px-6 py-12 lg:px-8 items-center h-screen">
        <div className="w-full max-w-sm sm:w-full sm:max-w-sm">
          <div className="bg-white shadow-xl rounded-lg">
            <div className="pt-7">
              <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
                Log in to your account
              </h2>
            </div>
            {err && (
                  <div className="bg-gradient-to-r from-red-500  to-red-600 flex items-center justify-center px-2 py-4 mt-5">
                  <FaExclamationCircle className="text-white mr-1.5 text-2xl min-w-fit" />
                  <p className="text-white text-base font-semibold ">
                    {err}
                  </p>
                </div>
                )}
            <div className="p-7 px-6 sm:px-12 sm:mx-auto sm:w-full sm:max-w-sm ">
              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Email or username
                  </label>
                  <div className="mt-2">
                    <input
                      id="emailOrUsername"
                      name="emailOrUsername"
                      type="text"
                      autoComplete=""
                      placeholder="email or username"
                      className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm  placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                      onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-black"
                    >
                      Password
                    </label>
                    
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      className="block w-full rounded-xl border py-3 text-gray-900 shadow-sm placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>
                </div>
                

                <div className="pb-7 pt-2">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-xl bg-gradient-to-r from-red-600 via-red-700 to-red-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
