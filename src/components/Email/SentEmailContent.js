import React from "react";
import classes from "./EmailContent.module.css";

const SentEmailContent = (props) => {
  const formattedDate = new Date(props.email.sentAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formattedTime = new Date(props.email.sentAt).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
    }
  );

  return (
    <div className={classes["email-content"]}>
      <button
        onClick={props.backClickHandler}
        className={classes["back-button"]}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <div className={classes["email-details"]}>
        <h2 className={classes["subject"]}>{props.email.subject}</h2>
        <div className={classes["date-time"]}>
          {formattedDate} at {formattedTime}
        </div>
      </div>
      <p>To: {props.email.recipient}</p>
      <div
        dangerouslySetInnerHTML={{ __html: props.email.htmlText }}
        className={classes["email-body"]}
      />
    </div>
  );
};

export default SentEmailContent;
