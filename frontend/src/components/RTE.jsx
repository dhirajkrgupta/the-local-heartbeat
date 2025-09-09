
import { Editor } from "@tinymce/tinymce-react";


const setupHeadingButton = (editor) => {
  editor.ui.registry.addToggleButton("heading", {
    text: "T",
    tooltip: "Heading",
    onAction: () => {
      editor.execCommand("FormatBlock", false, "h1");
    },
    onSetup: (buttonApi) => {
      const handler = () => {
        const isHeading =
          editor.queryCommandValue("FormatBlock")?.toLowerCase() === "h1";
        buttonApi.setActive(isHeading);
      };
      editor.on("NodeChange", handler);
      return () => editor.off("NodeChange", handler);
    },
  });
};

const TinyMCEEditor = ({apiKey,initialValue = "",height = 300,onInit,setup = () => {}}) => {

  return (
    <Editor
      apiKey={apiKey}
      onInit={onInit}
      initialValue={initialValue}
      init={{
        height,
        menubar: false,
        branding: false,
        plugins: ["link", "lists", "preview"],
        toolbar:
          "undo redo | heading | bold italic superscript strikethrough | " +
          "| link bullist numlist | preview",
        setup: (editor) => {
          setupHeadingButton(editor);
          setup(editor);
        },
        content_style: `
          body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }
          h1 { font-size: 1.5em; font-weight: bold; margin: 0.6em 0; }
        `,
      }}
    />
  );
};

export default TinyMCEEditor;