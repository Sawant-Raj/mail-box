import React from "react";
import classes from "./EmailList.module.css";

const EmailList = (props) => {
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-us", options);
  };

  const confirmDeleteHandler = (emailId, event) => {
    event.stopPropagation(); // It is used to ensure that clicking the delete icon (a child element) does not trigger the onClick event of the parent element (the email item), which would open the email.
    if (window.confirm("Are you sure you want to delete this email?")) {
      props.emailDeleteHandler(emailId);
    }
  };

  return (
    <ul className={classes["email-list"]}>
      {props.emails.map((email) => {
        const combinedLength =
          email?.subject?.length + email?.plainText?.length + 3; // +3 for the hyphen and two spaces
        const truncatedPlainText =
          combinedLength > 70
            ? `${email.plainText.slice(0, 70 - email.subject.length - 3)}...`
            : email.plainText;

        return (
          <li
            key={email.id}
            className={`${classes["email-item"]} ${
              email.read ? classes["read"] : classes["unread"]
            }`}
            onClick={() => props.emailCheckHandler(email.id)}
          >
            <div className={classes["email-header"]}>
              <span
                className={`${classes.dot} ${
                  email.read ? "" : classes.unreadDot
                }`}
              ></span>
              <span className={classes["email-sender"]}>
                {email.sender.split("@")[0]}
              </span>
              <div className={classes["email-snippet"]}>
                <span className={classes["email-snippet-subject"]}>
                  {email.subject}
                </span>
                <span>{" - " + truncatedPlainText}</span>
              </div>
              <span className={classes["email-timestamp"]}>
                {formatDate(email.sentAt)}
              </span>
              <button
                className={classes["delete-button"]}
                onClick={(e) => confirmDeleteHandler(email.id, e)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default EmailList;
