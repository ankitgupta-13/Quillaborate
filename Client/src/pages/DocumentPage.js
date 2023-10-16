// import * as React from 'react';
// import { DocumentEditorContainerComponent , WordExport, SfdtExport, Selection, Editor, Toolbar } from '@syncfusion/ej2-react-documenteditor';
// import file from './../file';

// //Inject require module.
// DocumentEditorContainerComponent.Inject(SfdtExport, Selection, Editor, WordExport, Toolbar);

// export default class DocumentPage extends React.Component {
// 	state = {
// 		filename: ''
// 	}

//     save() {
//         // this.documenteditor.documentEditor.save(this.state.filename || new Date(), 'Docx');
//         // this.documenteditor.documentEditor.save(this.state.filename || new Date(), 'Sfdt');

// 		this.documenteditor.documentEditor.saveAsBlob('Docx').then((res) => {
// 			let reader = new FileReader();
// 			reader.readAsDataURL(res);			// read as base64
// 			// reader.readAsText(res)				// read as text

// 			reader.onloadend = () => {
// 				let base64data = reader.result;
// 				console.log(base64data.toString())
// 			};

// 		}).catch(err => console.log('Err :', err))

// 		this.documenteditor.documentEditor.saveAsBlob('Sfdt').then((res) => {
// 			let reader = new FileReader();
// 			reader.readAsText(res)				// read as text

// 			reader.onloadend = () => {
// 				let base64data = reader.result;
// 				console.log(base64data.toString())
// 			};

// 		}).catch(err => console.log('Err :', err))
//     }

// 	async componentDidMount(){
// 		let fileReader = new FileReader();

// 		const doc = await this.urltoFile(file.data, 'test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
// 		fileReader.readAsText(doc);

// 		// const doc = await this.urltoFile(docxFile.data, 'test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
// 		// fileReader.readAsDataURL(doc)

// 		fileReader.onload = (e) => {
// 			let contents = e.target.result;
// 			let proxy = this;
// 			//Open the document in Document Editor.
// 			proxy.documenteditor.documentEditor.open(contents);
// 		};
// 	}

// 	urltoFile(url, filename, mimeType){
//         return (fetch(url)
//             .then(function(res){return res.arrayBuffer();})
//             .then(function(buf){return new File([buf], filename,{type:mimeType});})
//         );
//     }

//     render() {
//         return (<div>
//                 <DocumentEditorContainerComponent id="container" height={'94vh'}
// 					ref={(scope) => { this.documenteditor = scope; }}
// 					enableToolbar={true}
// 					isReadOnly={false} enableSelection={true} enableEditor={true} enableSfdtExport={true} enableWordExport={true}
// 					serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
// 				/>
// 				<input onChange={(e)=>this.setState({filename: e.target.value})} value={this.state.filename}  className='outline-none border-1 rounded px-3 py-2' />
//                 <button onClick={this.save.bind(this)}>Save</button>
//             </div>);
//     }
// }

import React, { useRef, useState, useEffect } from "react";
import {
  DocumentEditorContainerComponent,
  WordExport,
  SfdtExport,
  Selection,
  Editor,
  Toolbar,
} from "@syncfusion/ej2-react-documenteditor";
import file from "./../file";

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
  const [filename, setFilename] = useState("");

  const handleSaveDocument = async () => {
    try {
      const docxBlob =
        await documentEditorRef.current.documentEditor.saveAsBlob("Docx");
      const sfdtBlob =
        await documentEditorRef.current.documentEditor.saveAsBlob("Sfdt");
      const docData = await blobToText(sfdtBlob);
      console.log(typeof docData);
      const res = await fetch("http://localhost:8000/api/doc/saveDocument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: filename,
          data: docData,
        }),
      });
      const data = await res.json();
      if (data) alert("Document Saved Successfully!");
      // if (res.status === 201) alert("Document Saved Successfully!");

      const docxBase64 = await blobToBase64(docxBlob);
      // console.log('Docx:', docxBase64);
    } catch (err) {
      console.log("Err:", err);
    }
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
      const docxFile = await urltoFile(
        file.data,
        "test.docx",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      const fileReader = new FileReader();

      fileReader.readAsText(docxFile);

      fileReader.onload = (e) => {
        const contents = e.target.result;
        // console.log(contents)
        documentEditorRef.current.documentEditor.open(contents);
      };
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
      <input
        placeholder="FileName"
        onChange={(e) => setFilename(e.target.value)}
        value={filename}
        className="outline-none border-1 rounded px-3 py-2"
      />
      <button onClick={handleSaveDocument} className="">
        Save
      </button>
    </div>
  );
}

export default DocumentPage;
