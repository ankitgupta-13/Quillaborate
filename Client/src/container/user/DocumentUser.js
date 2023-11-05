import { LazyLoadImage } from "react-lazy-load-image-component";
import docIcon from "../../assets/img/doc_icon.png";
import downloadIcon from "../../assets/img/download.png";
import deleteIcon from "../../assets/img/delete.png";
import threeDots from "../../assets/img/three-dots.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/modal/Loader";
import emptyDoc from "../../assets/img/error-img.png";
import Sidebar from "../../component/Sidebar";
import Header from "../../component/Header";
import { baseURL } from "../../api/common-api";

const DocumentUser = () => {
  const [loader, showLoader] = useState(false);
  const [listDocument, setListDocument] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  async function fetchAllDocs() {
    const res = await fetch(`${baseURL}/api/doc/getAllDocs`, {
      method: "GET",
      headers: {
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

  const handleDeleteDocument = async (docId) => {
    await fetch(`${baseURL}/api/doc/deleteDocument`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ docId: docId }),
    });
    fetchAllDocs();
  };
  const handleDownloadDocument = async (docxBase64) => {
    const link = document.createElement("a");
    link.href = docxBase64;
    link.setAttribute("download", "document.docx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
      className="flex flex-col md:flex-row w-full h-screen overflow-hidden font-poppins bg-soft text-sm font-medium"
    >
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
                className="flex justify-center bg-white rounded-lg shadow-lg w-40 h-70 md:w-52 text-center md:m-5 relative"
                key={key}
              >
                <div className="absolute top-2 right-1">
                  <img
                    src={threeDots}
                    alt="Three Dots"
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                </div>
                <div className="flex flex-col items-center bg-red-400 justify-around h-full">
                  <h1 className="font-bold md:text-base-lg text-3xl mt-2">
                    {data.title.toUpperCase()}
                  </h1>
                  <div>
                    <LazyLoadImage
                      src={docIcon}
                      alt="Document Icon"
                      width="90%"
                      className="w-100 border-10 p-1"
                    />
                  </div>
                  <div className="flex justify-between items-center text-white bg-red-500 hover:bg-red-900 rounded-lg md:py-2.5 w-full font-medium transition duration-200 ease-in-out transform hover:scale-105">
                    <button
                      style={{ width: "100%" }}
                      onClick={() => handleOpenDocument(data._id)}
                    >
                      Open Document
                    </button>
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="origin-top-right z-10 absolute top-10 right-0 w-max bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1">
                    <div
                      onClick={() => handleDownloadDocument(data.docxBase64)}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={downloadIcon}
                        alt="Download Icon"
                        className="h-5 w-5"
                      />
                      <p className="text-sm">Download</p>
                    </div>
                    <div
                      onClick={() => handleDeleteDocument(data._id)}
                      className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete Icon"
                        className="h-5 w-5"
                      />
                      <p className="text-sm">Delete</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="h-60vh w-full flex flex-col justify-center items-center font-medium text-center">
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
