import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import adminInstance from "../../../Axios/adminInstance";
import { login, selectAdmin } from "../../../Redux/Slice/adminSlice";

export const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [err, setErr] = useState("");

  const user = useSelector(selectAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = adminEmail.trim();
    const trimmedPassword = adminPassword.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      setErr("Please fill in all fields!");
      setTimeout(() => {
        setErr("");
      }, 3000);
      return;
    }

    try {
      const response = await adminInstance.post("admin/login", {
        email: trimmedEmail,
        password: trimmedPassword,
      });
      console.log(response.data, "admin login response data");
      localStorage.setItem("adminToken", JSON.stringify(response.data.token));

      dispatch(login(response.data));
    } catch (error: any) {
      console.error(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Handle error message from the backend
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
      <div className="adminLogin flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-slate-700 p-7 pl-12 pr-12 shadow-xl rounded-lg">
            <div>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-600">
                Log in to your account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
              <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setAdminEmail(e.target.value)}
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
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-red-600 hover:text-red-500 "
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
                      placeholder="Password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>
                </div>
                <p className="text-red-500 text-center">{err}</p>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 mt-10 mb-16 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
