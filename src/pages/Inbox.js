import React, { useEffect, useState } from "react";
import classes from "./Inbox.module.css";
import EmailList from "../components/Email/EmailList";
import EmailContent from "../components/Email/EmailContent";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = localStorage.getItem("email");
  const userName = userEmail && userEmail.split("@")[0];

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/inbox.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch emails.");
        }

        const data = await response.json();

        const loadedEmails = [];
        for (const key in data) {
          loadedEmails.push({
            id: key,
            ...data[key],
          });
        }

        setEmails(loadedEmails);
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, [userName]);

  const emailCheckHandler = async (id) => {
    const selectedEmail = emails.find((email) => email.id === id);
    if (selectedEmail.read) {
      setSelectedEmail(selectedEmail);
      return;
    }

    try {
      const updatedEmail = { ...selectedEmail, read: true };

      // Update the email status in Firebase
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

      // Update the email status in state
      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email.id === id ? { ...email, read: true } : email
        )
      );
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

      setEmails((prevEmails) => prevEmails.filter((email) => email.id !== id));
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
      ) : selectedEmail ? (
        <EmailContent
          email={selectedEmail}
          backClickHandler={backClickHandler}
        />
      ) : (
        <>
          {emails.length === 0 ? (
            <p>No emails found.</p>
          ) : (
            <EmailList
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
