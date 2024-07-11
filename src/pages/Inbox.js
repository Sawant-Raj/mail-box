import React, { useEffect, useState } from "react";
import classes from "./Inbox.module.css";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
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
      }
    };

    fetchEmails();
  }, [userName]);

  return (
    <div className={classes["inbox-container"]}>
      <h1 className="heading">Inbox</h1>
      {emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <ul className={classes["email-list"]}>
          {emails.map((email) => (
            <li key={email.id} className={classes["email-item"]}>
              <h2>{email.subject}</h2>
              <p>From: {email.sender}</p>
              <p>{email.message}</p>
              <p>{new Date(email.sentAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;
