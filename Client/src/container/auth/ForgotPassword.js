import { useState } from "react";
import OtpInput from "react-otp-input";
import { baseURL } from "../../api/common-api";
import { toast } from "react-toastify";
import ModalFormChangePassword from "../../component/modal/ModalFormChangePassword";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [correctOtp, setCorrectOtp] = useState("");
  const [modalPassword, showModalPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setShowOtp(true);
    try {
      const response = await fetch(`${baseURL}/api/user/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      console.log(data);
      setCorrectOtp(data.otp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      toast.error("Please enter 6-digit OTP");
    } else if (parseInt(otp) === correctOtp) {
      showModalPassword(true);
    } else {
      toast.error("Please enter correct OTP");
    }
  };

  const handleSubmitChangePassword = async (password) => {
    try {
      const response = await fetch(`${baseURL}/api/user/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: password.e_password,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Password changed successfully");
        showModalPassword(false);
        navigate("/auth/sign-in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-soft py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-black shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <form
          onSubmit={handleSendOtp}
          className="relative bg-white shadow-lg sm:rounded-3xl px-4 py-10 md:p-20"
        >
          <div className="md:max-w-md mx-auto flex flex-col gap-5">
            <div className="py-2">
              <h1 className="text-2xl font-semibold flex justify-center">
                Reset Password
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 font-medium focus:outline-none focus:borer-rose-600"
                    placeholder="Enter email"
                    // {...register("email", { required: "Email is required." })}
                  />
                  {/* <ErrorField errors={errors} name="email" /> */}
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Enter email
                  </label>
                </div>
                <div className="relative flex justify-center">
                  <button
                    type="submit"
                    className="flex  text-sm bg-gradient-to-r from-red-800 to-black hover:from-transparent hover:to-transparent text-white rounded-md px-5 py-2 mt-1 border-1 border-transparent hover:border-red-800 hover:text-red-800"
                  >
                    Send Otp
                  </button>
                </div>
              </div>
            </div>
            <div>
              {showOtp && (
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="text-sm">Enter OTP sent to {email}</div>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                      containerStyle="flex gap-3 justify-center"
                      inputStyle="text-3xl md:text-4xl border-2 border-red-800 bg-transparent radius-10"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={handleVerifyOtp}
                      className="flex text-sm bg-gradient-to-r from-red-800 to-black hover:from-transparent hover:to-transparent text-white rounded-md px-5 py-2 mt-1 border-1 border-transparent hover:border-red-800 hover:text-red-800"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      {/* {loader && <Loader />} */}
      {modalPassword && (
        <ModalFormChangePassword
          onCancel={() => showModalPassword(false)}
          onSubmit={handleSubmitChangePassword}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
