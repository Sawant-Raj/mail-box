import React, { useEffect, useState } from "react";
import classes from "./Inbox.module.css";
import SentEmailList from "../components/Email/SentEmailList";
import SentEmailContent from "../components/Email/SentEmailContent";

const Sent = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = localStorage.getItem("email");
  const userName = userEmail && userEmail.split("@")[0];

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/sentbox.json`
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
      <h1 className={classes.heading}>Sentbox</h1>
      {isLoading ? (
        <div className={classes.loader}>Loading...</div>
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
