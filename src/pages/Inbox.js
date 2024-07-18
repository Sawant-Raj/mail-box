import React, { useState } from "react";
import classes from "./Inbox.module.css";
import InboxEmailList from "../components/Email/InboxEmailList";
import InboxEmailContent from "../components/Email/InboxEmailContent";
import useFetchEmails from "../components/Hook/useFetchEmails";

const Inbox = () => {
  const userEmail = localStorage.getItem("email");
  const userName = userEmail && userEmail.split("@")[0];
  const { emails, isLoading, error, fetchEmails } = useFetchEmails(
    `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/inbox.json`
  );

  const [selectedEmail, setSelectedEmail] = useState(null);

  const emailCheckHandler = async (id) => {
    const selectedEmail = emails.find((email) => email.id === id);
    if (selectedEmail.read) {
      setSelectedEmail(selectedEmail);
      return;
    }

    try {
      const updatedEmail = { ...selectedEmail, read: true };

      await fetch(
        `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/inbox/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ read: true }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetchEmails();
      setSelectedEmail(updatedEmail);
    } catch (error) {
      alert("Failed to update email status.");
    }
  };

  const emailDeleteHandler = async (id) => {
    try {
      await fetch(
        `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/inbox/${id}.json`,
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
      <h1 className={classes.heading}>Inbox</h1>
      {isLoading ? (
        <div className={classes.loader}>Loading...</div>
      ) : error ? (
        <p>{error}</p>
      ) : selectedEmail ? (
        <InboxEmailContent
          email={selectedEmail}
          backClickHandler={backClickHandler}
        />
      ) : (
        <>
          {emails.length === 0 ? (
            <p>No emails found.</p>
          ) : (
            <InboxEmailList
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

export default Inbox;
