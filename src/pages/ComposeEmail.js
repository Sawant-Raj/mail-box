import React, { useState } from "react";
import classes from "./ComposeEmail.module.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeEmail = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const userEmail = localStorage.getItem("email");
  const userName = userEmail && userEmail.split("@")[0];

  const handleSendEmail = async (event) => {
    event.preventDefault();

    const emailContent = {
      recipient,
      subject,
      message: editorState.getCurrentContent().getPlainText(),
      sender: userEmail,
      sentAt: new Date().toISOString(),
    };

    try {
      // Store email in the sender's sentbox
      const senderResponse = await fetch(
        `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/sentbox.json`,
        {
          method: "POST",
          body: JSON.stringify(emailContent),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!senderResponse.ok) {
        throw new Error("Failed to store email in sentbox.");
      }

      // Store email in the recipient's inbox
      const recipientUserName = recipient.split("@")[0];
      const receiverResponse = await fetch(
        `https://mail-box-a4c17-default-rtdb.firebaseio.com/${recipientUserName}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(emailContent),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!receiverResponse.ok) {
        throw new Error("Failed to store email in inbox.");
      }

      console.log("Email successfully sent and stored.");
    } catch (error) {
      alert(error.message);
    }

    // Reset form after sending
    setRecipient("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className={classes["compose-mail-container"]}>
      <h1 className="heading">Compose Mail</h1>
      <form className={classes["compose-mail-form"]} onSubmit={handleSendEmail}>
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className={classes["recipient-input"]}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={classes["subject-input"]}
          required
        />
        <Editor
          editorState={editorState}
          wrapperClassName={classes["text-editor-wrapper"]}
          editorClassName={classes["text-editor"]}
          onEditorStateChange={setEditorState}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "list",
              "textAlign",
              "link",
              "emoji",
              "history",
            ],
            inline: {
              options: ["bold", "italic", "underline", "strikethrough"],
            },
          }}
          placeholder="Compose your mail..."
        />
        <button type="submit" className={classes["send-button"]}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ComposeEmail;
