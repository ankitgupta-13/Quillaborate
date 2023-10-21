import { useState } from "react";
import { baseURL } from "../../api/common-api";
import { toast } from "react-toastify";

const ModalShare = ({ onCancel, onCopy, copy }) => {
  const [email, setEmail] = useState("");

  const handleShareLink = async () => {
    onCancel();
    const res = await fetch(`${baseURL}/api/doc/shareDocument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: window.location.href,
        receiverEmail: email,
        senderEmail: JSON.parse(localStorage.getItem("user")).email,
      }),
    });
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-30 overflow-auto">
      <div
        className="absolute w-full h-full bg-gray-900 opacity-50"
        onClick={onCancel}
      ></div>

      {/* Modal Content */}
      <form
        onSubmit={handleShareLink}
        className="bg-soft w-9/12 md:w-2/5 mx-auto my-auto p-5 rounded-xl shadow-2xl z-50"
      >
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">Share</h1>
          <input
            type="email"
            className="w-80 h-10 border border-blue-500 p-1"
            placeholder="Add people and groups"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="w-full flex item-center justify-center tex-sm md:text-base">
            {copy && <p className="text-green-500 font-medium">Link copied!</p>
              ? ""
              : ""}
            <button
              className="px-4 py-1.5 bg-gray-500 rounded-2xl text-white hover:bg-black mx-1.5 md:mx-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105"
              onClick={onCopy}
            >
              Copy Link
            </button>
            <button
              className="px-8 py-1.5 bg-red-800 rounded-2xl text-white hover:bg-red-600 mx-1.5 md:mx-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105"
              type="submit"
            >
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModalShare;
