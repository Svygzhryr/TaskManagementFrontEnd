import { FC } from "react";
import { NotificationProps } from "../utils/types";

const Notification: FC<NotificationProps> = ({ message, type = "default" }) => {
  const notificationTypeMap = {
    default: "bg-main-800 border-2 border-solid border-main-200",
    alert: "bg-main-500 border-2 border-solid border-main-300",
    error: "bg-main-error border-2 border-solid border-main-error",
  };

  return (
    <>
      <div
        className={`absolute bottom-5 right-10 px-20 py-5 ${notificationTypeMap[type]}`}
      >
        <p className="text-xl">{message}</p>
      </div>
    </>
  );
};

export default Notification;
