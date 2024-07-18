import React, { useState } from "react";
import classes from "./Inbox.module.css";
import SentEmailList from "../components/Email/SentEmailList";
import SentEmailContent from "../components/Email/SentEmailContent";
import useFetchEmails from "../components/Hook/useFetchEmails";

const Sent = () => {
  const userEmail = localStorage.getItem("email");
  const userName = userEmail && userEmail.split("@")[0];
  const { emails, isLoading, error, fetchEmails } = useFetchEmails(
    `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/sentbox.json`
  );

  const [selectedEmail, setSelectedEmail] = useState(null);

  const emailCheckHandler = (id) => {
    const selectedEmail = emails.find((email) => email.id === id);
    setSelectedEmail(selectedEmail);
  };

  const emailDeleteHandler = async (id) => {
    try {
      await fetch(
        `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/sentbox/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchEmails();
    } catch (error) {
      alert("Failed to delete email.");
    }
  };

  const backClickHandler = () => {
    setSelectedEmail(null);
  };

  return (
    <div className={classes["inbox-container"]}>
      <h1 className={classes.heading}>Sentbox</h1>
      {isLoading ? (
        <div className={classes.loader}>Loading...</div>
      ) : error ? (
        <p>{error}</p>
      ) : selectedEmail ? (
        <SentEmailContent
          email={selectedEmail}
          backClickHandler={backClickHandler}
        />
      ) : (
        <>
          {emails.length === 0 ? (
            <p>No emails found.</p>
          ) : (
            <SentEmailList
              emails={emails}
              emailCheckHandler={emailCheckHandler}
              emailDeleteHandler={emailDeleteHandler}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Sent;
