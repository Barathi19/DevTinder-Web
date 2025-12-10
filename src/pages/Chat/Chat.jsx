import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import apiInstance from "../../api/instance";
import { API_CONSTANT } from "../../constant";

export const Chat = () => {
  const { id: targetUserId } = useParams();
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [userDetail, setUserDetail] = useState({});

  const targetUser = useMemo(
    () => userDetail[targetUserId],
    [userDetail, targetUserId]
  );

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("send-message", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user._id,
      targetUserId,
      text,
    });
    setText("");
  };

  useEffect(() => {
    if (!targetUserId) return;

    const fetchChatMessages = async () => {
      const response = await apiInstance.get(
        `${API_CONSTANT.chat}/${targetUserId}`
      );

      const { participants, messages } = response.data.data;

      const pptsDetail = participants.reduce((obj, ppts) => {
        const { _id, firstName, lastName, photoUrl } = ppts;
        obj[_id] = { firstName, lastName, photoUrl };
        return obj;
      }, {});

      setUserDetail(pptsDetail);

      if (messages.length) {
        const transformedMsg = messages.map(({ senderId, text }) => {
          const { firstName } = senderId;
          return { firstName, senderId, text };
        });
        setMessages(transformedMsg);
      }
    };

    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!user || !targetUserId) return;

    const io = createSocketConnection();

    io.emit("join-chat", {
      firstName: user.firstName,
      userId: user._id,
      targetUserId,
    });

    io.on("receive-message", ({ firstName, text }) => {
      setMessages((pre) => [...pre, { firstName, text }]);
    });

    return () => {
      io.disconnect();
    };
  }, [user, targetUserId]);

  return (
    <div className="w-1/2 flex flex-col mx-auto bg-base-200 border border-gray-500 h-[80vh]">
      <h2 className="p-3 border-b border-gray-500 text-lg flex items-center gap-3">
        {targetUser ? (
          <>
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={targetUser.photoUrl}
            />{" "}
            {targetUser.firstName}
          </>
        ) : (
          <>Loading...</>
        )}
      </h2>
      <div className="flex-1 p-2">
        {messages.length ? (
          messages.map(({ firstName, text }, idx) => (
            <div
              key={idx}
              className={`chat ${
                user.firstName === firstName ? "chat-end" : "chat-start"
              }`}
            >
              {messages[idx - 1]?.firstName !== firstName && (
                <div className="chat-header mb-1">{firstName}</div>
              )}
              <div className="chat-bubble">{text}</div>
            </div>
          ))
        ) : (
          <div className="h-full flex justify-center items-center">
            <h3>No messages</h3>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-gray-600 p-2">
        <input
          className="flex-1 border border-gray-500 text-white rounded h-10 p-2"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};
