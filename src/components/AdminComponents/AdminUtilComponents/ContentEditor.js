import { forwardRef, useState } from "react";
import { EDITOR_API_KEY } from "../../../utils/Constants";
import { Editor } from "@tinymce/tinymce-react";
import style from "./ContentEditor.module.css";
import ContentLoading from "../../../UI/ContentLoading";

const ContentEditor = forwardRef(function (props, ref) {
  const { initialValue, isLoading, onInit } = props;

  return (
    <>
      {isLoading ? <ContentLoading /> : ""}
      <div className={isLoading ? style.invisible : style.visible}>
        <Editor
          apiKey={EDITOR_API_KEY}
          initialValue={initialValue}
          onInit={(event, editor) => {
            if (onInit) {
              onInit();
            }
            ref.current = editor;
          }}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "preview",
              "searchreplace",
              "visualblocks",
              "insertdatetime",
              "media",
              "table",
              "code",
            ],
            toolbar: [
              "undo redo | styles fontfamily fontsize | " +
                "bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify" +
                "bullist numlist outdent indent | " +
                "link image media | preview code",
            ],
          }}
        />
      </div>
    </>
  );
});

export default ContentEditor;
