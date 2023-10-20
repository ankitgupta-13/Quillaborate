import React, { useRef, useState, useEffect } from "react";
import {
  DocumentEditorContainerComponent,
  WordExport,
  SfdtExport,
  Selection,
  Editor,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import { useNavigate, useParams } from "react-router-dom";
import { getOneDocument } from "../api/document-api";
import { baseURL } from "../api/common-api";
import lockIcon from "../assets/img/lock.svg";
import ModalShare from "../component/modal/ModalShare";
import Header from "../component/Header";
// Inject require module.
DocumentEditorContainerComponent.Inject(
  SfdtExport,
  Selection,
  Editor,
  WordExport,
  Toolbar
);

function DocumentPage() {
  const documentEditorRef = useRef(null);
  const { document_id } = useParams();
  const [filename, setFilename] = useState("");
  const navigate = useNavigate();
  const [modalOut, showModalOut] = useState(false);
  const [creator, setCreator] = useState({});

  const handleSaveDocument = async () => {
    try {
      const docxBlob =
        await documentEditorRef.current.documentEditor.saveAsBlob("Docx");
      const sfdtBlob =
        await documentEditorRef.current.documentEditor.saveAsBlob("Sfdt");
      const docData = await blobToText(sfdtBlob);

      const res = await fetch(`${baseURL}/api/doc/saveDocument`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: filename,
          data: docData,
          creator: localStorage.getItem("userId"),
        }),
      });
      const data = await res.json();
      if (res.status === 201) {
        navigate("/dashboard/document-user");
        if (
          creator !== undefined &&
          creator._id !== localStorage.getItem("userId")
        ) {
          const resp = await fetch(`${baseURL}/api/doc/sendAdmin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              docId: data._id,
              contributorId: localStorage.getItem("userId"),
              creatorId: creator._id,
              creatorEmail: creator.email,
              url: `http://localhost:3000/document/${data._id}`,
            }),
          });
          const data2 = await resp.json();
          console.log("hi from pp");
        }
      }

      const docxBase64 = await blobToBase64(docxBlob);
      // console.log('Docx:', docxBase64);
    } catch (err) {
      console.log("Err:", err);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    showModalOut(false);
  };

  const readBlobAsText = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const blobToText = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  };

  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getOneDocument(document_id);
      console.log(document_id);
      console.log(res);
      const contents = res.data;
      setCreator(res.creator);
      console.log(res.creator);
      documentEditorRef.current.documentEditor.open(contents);
    };

    fetchData();
  }, []);

  return (
    <div>
      <DocumentEditorContainerComponent
        id="container"
        height={"94vh"}
        ref={documentEditorRef}
        enableToolbar={true}
        isReadOnly={false}
        enableSelection={true}
        enableEditor={true}
        enableSfdtExport={true}
        enableWordExport={true}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
      />
      {modalOut && (
        <ModalShare
          message="enter email to share"
          onCancel={() => showModalOut(false)}
          onCopy={() => copyLink()}
        />
      )}
      <div className="flex w-full items-center justify-between bg-red-600 hover:bg-red-650">
        <div></div>
        <div className="flex gap-3 items-center justify-center text-white bg-red-600 hover:bg-red-650 py-2 md:py-2.5 font-medium transition ">
          <input
            placeholder="Enter FileName"
            onChange={(e) => setFilename(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveDocument();
            }}
            value={filename}
            className="outline-none border-1 rounded  w-40 text-black "
            required
          />
          <button
            onClick={handleSaveDocument}
            className="px-3 bg-blue-200 hover:bg-red-800 font-medium transition duration-200 ease-in-out transform hover:scale-105"
          >
            Save
          </button>
        </div>
        <div>
          <button
            on
            className="flex text-black bg-blue-200 hover:bg-red-650 rounded-md w-24 p-1"
            onClick={() => showModalOut(true)}
          >
            <img src={lockIcon} alt="" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentPage;
