import React, { useEffect, useState } from "react";
import classes from "./Inbox.module.css";
import InboxEmailList from "../components/Email/InboxEmailList";
import InboxEmailContent from "../components/Email/InboxEmailContent";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userEmail = localStorage.getItem("email");
  const userName = userEmail && userEmail.split("@")[0];

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

  useEffect(() => {
    fetchEmails();

    const intervalId = setInterval(fetchEmails, 2000); //  it returns an interval ID (intervalId) which uniquely identifies the interval created.

    return () => clearInterval(intervalId); //  it is used to stop the interval identified by intervalId. This effectively cancels any further executions of the function passed to setInterval.
  }, []);

  // The return statement inside useEffect allows you to specify a cleanup function. This function is executed when the component unmounts or when the dependencies change and the effect needs to run again.
  //  When the component unmounts (or if the dependency array changes and the effect needs to run again), React will call the cleanup function returned by useEffect.

  // useEffect(() => {
  //   const fetchEmails = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/inbox.json`
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch emails.");
  //       }

  //       const data = await response.json();

  //       const loadedEmails = [];
  //       for (const key in data) {
  //         loadedEmails.push({
  //           id: key,
  //           ...data[key],
  //         });
  //       }

  //       setEmails(loadedEmails);
  //     } catch (error) {
  //       alert(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchEmails();
  // }, [userName]);

  const emailCheckHandler = async (id) => {
    const selectedEmail = emails.find((email) => email.id === id);
    if (selectedEmail.read) {
      setSelectedEmail(selectedEmail);
      return;
    }

    try {
      const updatedEmail = { ...selectedEmail, read: true };

      // Update the email status in Firebase
      // The method "PATCH" indicates that only the specified fields (in this case, read) will be updated, rather than replacing the entire email object.
      await fetch(
        `https://mail-box-a4c17-default-rtdb.firebaseio.com/${userName}/inbox/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ read: true }),
          headers: {
            "Content-Type": "application/json", //  specifies that the request body is in JSON format.
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
