import React from "react";
import classes from "./EmailList.module.css";

const EmailList = (props) => {
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-us", options);
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
              <div className={classes["email-subject"]}>
                <span className={classes["email-snippet-subject"]}>
                  {email.subject}
                </span>
                <span>{" - " + truncatedPlainText}</span>
              </div>
              <span className={classes["email-timestamp"]}>
                {formatDate(email.sentAt)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default EmailList;
