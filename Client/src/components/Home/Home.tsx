import {
  RichTextEditorComponent,
  Inject,
  Toolbar,
  Link,
  Image,
  HtmlEditor,
  Table,
  QuickToolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import Header from "../Header/Header";

const Home = () => {
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
    <div className="container">
      <Header />
      <div className="editor">
        <RichTextEditorComponent
          toolbarSettings={tools}
          height={"90vh"}
          width={"90vw"}
        >
          <Inject
            services={[Toolbar, Link, Image, HtmlEditor, Table, QuickToolbar]}
          />
        </RichTextEditorComponent>
      </div>
    </div>
  );
};

export default Home;
