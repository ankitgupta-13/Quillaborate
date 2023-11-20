import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { authLogin, baseURL } from "../../api/common-api";
import ErrorField from "../../component/ErrorField";
import Loader from "../../component/modal/Loader";
import { setUserData } from "../../reduxs/action/actions";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = ({ setUserData, prevLocation }) => {
  const [loader, showLoader] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ criteriaMode: "all" });

  const onValidForm = async (dataForm) => {
    showLoader(true);

    const res = await authLogin(dataForm);
    if (res.data) {
      if (res.status === 200) {
        const dataUser = { ...res.data.data };
        setUserData(dataUser);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        prevLocation !== ""
          ? window.location.replace(prevLocation)
          : navigate("/dashboard", { replace: true });
      } else {
        toast.error(res.data.message);
        showLoader(false);
      }
    } else {
      toast.error(res.config.baseURL + " " + res.message);
      showLoader(false);
    }
  };

  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    const { name, picture, sub, email } = decoded;
    const googleUser = {
      name,
      email,
      avatar: picture,
      googleId: sub,
    };

    const result = await fetch(`${baseURL}/api/user/googleLogin`, {
      method: "POST",
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googleUser),
    });
    if (result.status === 200) {
      const data = await result.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("user", JSON.stringify(data.user));
      prevLocation !== ""
        ? window.location.replace(prevLocation)
        : navigate("/dashboard", { replace: true });
      toast("You are successfully logged in!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "colored",
      });
    } else {
      toast("Invalid Credentials!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen bg-soft py-6 flex flex-col justify-center sm:py-12 gap-3">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl md:-rotate-6"></div>
        <form
          onSubmit={handleSubmit(onValidForm)}
          className="relative bg-white shadow-lg sm:rounded-3xl px-4 py-10 md:p-20 md:w-full mx-auto sm:px-12 sm:py-5 sm:w-80"
        >
          <div className="md:max-w-md mx-auto">
            <div className="mb-3">
              <h1 className="text-2xl font-semibold">
                Welcome Back! Sign in to continue
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <div className="leading-6 space-y-4 text-gray-700 md:text-sm sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 font-medium focus:outline-none focus:borer-rose-600"
                    placeholder="Email"
                    {...register("email", { required: "Email is required." })}
                  />
                  <ErrorField errors={errors} name="email" />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 font-medium focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 5,
                        message: "Password must exceed 4 characters.",
                      },
                    })}
                  />
                  <ErrorField errors={errors} name="password" />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="flex justify-end">
                  <Link to="/auth/forgot-password">
                    <span className="text-red-800 hover:text-red-600 font-medium">
                      Forgot Password ?
                    </span>
                  </Link>
                </div>
                <div className="relative flex justify-center">
                  <button className="flex  text-sm bg-gradient-to-r from-red-800 to-black hover:from-transparent hover:to-transparent text-white rounded-md px-5 py-2 mt-1 border-1 border-transparent hover:border-red-800 hover:text-red-800">
                    Submit
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <hr className="h-px bg-gray-200 border-0 w-20 md:w-40 dark:bg-gray-700" />
                <div className="flex justify-center ">or</div>
                <hr className="h-px bg-gray-200 border-0 w-20 md:w-40 dark:bg-gray-700" />
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    createOrGetUser(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center text-sm mt-7">
        <div className="mb-3">
          Don't have an account ?{" "}
          <span className="text-red-800 hover:text-red-600 font-medium">
            <Link to="/auth/sign-up">Sign Up</Link>
          </span>
        </div>
        {/* <p>© {new Date().getFullYear()} CompanyName v1.0</p> */}
      </div>

      {loader && <Loader />}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUserData }, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);
