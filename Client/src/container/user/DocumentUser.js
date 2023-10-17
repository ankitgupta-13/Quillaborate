import { LazyLoadImage } from "react-lazy-load-image-component";
import docIcon from "../../assets/img/document.jpg";
import { useState, useEffect } from "react";
import { getDocumentByUser } from "../../api/document-api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../component/modal/Loader";
import emptyDoc from "../../assets/img/error-img.png";
import deleteIcon from "../../assets/img/delete.png";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";

const DocumentUser = () => {
  const [loader, showLoader] = useState(false);
  const [listDocument, setListDocument] = useState([]);

  const navigate = useNavigate();
  async function fetchAllDocs() {
    const res = await fetch("http://localhost:8000/api/doc/getAllDocs", {
      method: "GET",
      headers: {
        // Authorization: `${localStorage.getItem("token")}`,
        Authorization: `${localStorage.getItem("userId")}`,
      },
    });
    const data = await res.json();
    setListDocument(data.docs);
    console.log(data.docs);
  }
  useEffect(() => {
    fetchAllDocs();
  }, []);

  const handleOpenDocument = (docID) => {
    showLoader(true);
    navigate("/document/" + docID);
  };

  const handleDeleteDocumnet = async (docId) => {
    await fetch("http://localhost:8000/api/doc/deleteDocument", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ docId: docId }),
    });
    fetchAllDocs();
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden font-poppins bg-soft text-sm font-medium">
      <Sidebar />
      <div className="w-full overflow-y-auto overflow-x-hidden h-screen flex flex-col">
        {/* HEADER */}
        <div className="hidden md:block h-12 bg-white py-8 px-4 sm:px-6 lg:px-8 shadow sticky top-0 z-10">
          <Header />
        </div>
        <button
          className="text-white bg-red-600 hover:bg-red-800 rounded-lg w-60 m-3 py-2 md:py-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105"
          onClick={() => navigate(`/document-example`)}
        >
          Create Document
        </button>
        <div className="flex flex-wrap">
          {listDocument.length > 0 ? (
            listDocument.map((data, key) => (
              <div
                className="bg-white rounded-lg shadow-lg w-40 md:w-56 flex flex-col justify-center items-center text-center p-4 md:p-6 m-2 md:m-5"
                key={key}
              >
                <h1 className="font-bold text-sm md:text-base mt-3">
                  {data.title.toUpperCase()}
                </h1>
                <LazyLoadImage
                  src={docIcon}
                  alt=""
                  width="90%"
                  className="w-100 border-10 p-1"
                />
                <div className="flex justify-between items-center text-white bg-red-500 hover:bg-red-900 rounded-lg w-full py-2 md:py-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105">
                  <button
                    // className="text-white bg-red-600 hover:bg-red-800 rounded-lg w-full py-2 md:py-2.5 font-medium transition duration-200 ease-in-out transform hover:scale-105"
                    style={{ width: "90%" }}
                    onClick={() => handleOpenDocument(data._id)}
                  >
                    Open Document
                  </button>
                  <img
                    src={deleteIcon}
                    alt="deleteIcon"
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => handleDeleteDocumnet(data._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="h-60vh w-full flex flex-col justify-center items-center font-medium text-center p-5">
              <LazyLoadImage
                effect="blur"
                src={emptyDoc}
                className="md:w-100"
              />
              <p className="text-base text-gray-700 mt-8">
                You don't have any documents to sign at this time!
              </p>
            </div>
          )}
        </div>
        {loader && <Loader />}
      </div>
    </div>
  );
};

export default DocumentUser;
