import "./App.css";
import {
  RichTextEditorComponent,
  Toolbar,
  Link,
  Image,
  HtmlEditor,
  QuickToolbar,
  Table,
  Inject,
} from "@syncfusion/ej2-react-richtexteditor";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/Header/Header";

function App() {
  const tools: object = {
    items: [
      "Undo",
      "Redo",
      "|",
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "|",
      "FontName",
      "FontSize",
      "FontColor",
      "BackgroundColor",
      "|",
      "SubScript",
      "SuperScript",
      "|",
      "Formats",
      "Alignments",
      "OrderedList",
      "UnorderedList",
      "Indent",
      "Outdent",
      "|",
      "Image",
      "CreateLink",
      "|",
      "ClearFormat",
      "Print",
      "SourceCode",
      "|",
      "FullScreen",
    ],
  };
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="container">
        <Header />
        <RichTextEditorComponent
          toolbarSettings={tools}
          height={"90vh"}
          width={"90vw"}
        >
          {/* <p>RichTextEditor</p> */}
          <Inject
            services={[Toolbar, Link, Image, HtmlEditor, Table, QuickToolbar]}
          />
        </RichTextEditorComponent>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
