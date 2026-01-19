// import { IoCloseCircleOutline } from "react-icons/io5";
// import "./Sidebar.css";
// import { ChatData } from "../context/chatContext";
// import { UserData } from "../context/userContext";
// import { MdDelete } from "react-icons/md";
// import { LoadingSpinner } from "./Loading";

// const Sidebar = ({ isOpen, toggleTheSidebar }) => {
//   const { chats, createChat, createLoad, setSelecetedChat, deleteChat } =
//     ChatData();

//   const { logoutHandler } = UserData();

//   // ✅ Chat selection handler
//   const handleChatClick = (chatId) => {
//     setSelecetedChat(chatId);
//     getConversation(chatId); // Fetch and preview chat messages
//   };

//   const deleteChatHandler = (id) => {
//     if (confirm("Are you sure to delete this chat?")) {
//       deleteChat(id);
//     }
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       {/* Cross button visible only on small screens */}
//       <button
//         className="btn btn-light d-md-none mb-3 p-2 fs-3 rounded"
//         onClick={toggleTheSidebar}
//       >
//         <IoCloseCircleOutline />
//       </button>

//       <div className="text-2xl font-semibold mb-6">SereneBot</div>
//       <div className="mb-4">
//         <button
//           onClick={createChat}
//           className="btn mt-2 w-100 py-2 bg-light text-black rounded"
//         >
//           {createLoad ? <LoadingSpinner /> : "New Chat +"}
//         </button>
//       </div>

//       <div>
//         <p className="text-white">Recent</p>

//         <div className="mb-5" style={{ maxHeight: "500px", overflowY: "auto" }}>
//           {chats && chats.length > 0 ? (
//             chats.map((e) => (
//               <div
//                 key={e._id}
//                 className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
//                 onClick={() => handleChatClick(e._id)} // ✅ fixed: proper click handler for preview
//               >
//                 <span
//                   className="text-truncate text-dark"
//                   style={{ maxWidth: "80%" }}
//                 >
//                   {e.latestMessage && e.latestMessage.trim() !== ""
//                     ? e.latestMessage.length > 38
//                       ? e.latestMessage.slice(0, 38) + "..."
//                       : e.latestMessage
//                     : "New Chat"}
//                 </span>

//                 <button
//                   className="btn btn-danger py-2 fs-5 rounded"
//                   onClick={() => deleteChatHandler(e._id)}
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-white">No chats yet</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-auto w-100 px-3 mb-3">
//         <button
//           className="btn btn-danger w-100 py-2 fs-5 rounded"
//           onClick={logoutHandler}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// ----------------------------------------------------------
// import { IoCloseCircleOutline } from "react-icons/io5";
// import "./Sidebar.css";
// import { ChatData } from "../context/chatContext";
// import { UserData } from "../context/userContext";
// import { MdDelete } from "react-icons/md";
// import { LoadingSpinner } from "./Loading";
// import icon from "../assets/icon.png";

// const Sidebar = ({ isOpen, toggleTheSidebar }) => {
//   const { chats, createChat, createLoad, setSelecetedChat, deleteChat } =
//     ChatData();

//   const { logoutHandler } = UserData();

//   const handleChatClick = (chatId) => {
//     setSelecetedChat(chatId);
//   };

//   const deleteChatHandler = (id) => {
//     if (confirm("Are you sure to delete this chat?")) {
//       deleteChat(id);
//     }
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <button
//         className="btn btn-light d-md-none mb-3 p-2 fs-3 rounded"
//         onClick={toggleTheSidebar}
//       >
//         <IoCloseCircleOutline />
//       </button>

//       <div className="text-2xl font-semibold mb-6">
//         <img src={icon} className="sideImg" alt="icon" />
//       </div>
//       <div className="mb-4">
//         <button
//           onClick={createChat}
//           className="btn mt-2 w-100 py-2 bg-light text-black rounded"
//         >
//           {createLoad ? <LoadingSpinner /> : "New Chat +"}
//         </button>
//       </div>

//       <div>
//         <p className="text-white">Recent</p>

//         <div className="mb-5" style={{ maxHeight: "500px", overflowY: "auto" }}>
//           {chats && chats.length > 0 ? (
//             chats.map((e) => (
//               <div
//                 key={e._id}
//                 className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
//                 onClick={() => handleChatClick(e._id)}
//               >
//                 <span
//                   className="text-truncate text-dark"
//                   style={{ maxWidth: "80%" }}
//                 >
//                   {e.latestMessage && e.latestMessage.trim() !== ""
//                     ? e.latestMessage.length > 38
//                       ? e.latestMessage.slice(0, 38) + "..."
//                       : e.latestMessage
//                     : "New Chat"}
//                 </span>

//                 <button
//                   className="btn btn-danger py-2 fs-5 rounded"
//                   onClick={(ev) => {
//                     ev.stopPropagation();
//                     deleteChatHandler(e._id);
//                   }}
//                 >
//                   <MdDelete />
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-white">No chats yet</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-auto w-100 px-3 mb-3">
//         <button
//           className="btn btn-danger w-100 py-2 fs-5 rounded"
//           onClick={logoutHandler}
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { IoCloseCircleOutline } from "react-icons/io5";
import "./Sidebar.css";
import { ChatData } from "../context/chatContext";
import { UserData } from "../context/userContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import icon from "../assets/icon.png";

const Sidebar = ({ isOpen, toggleTheSidebar }) => {
  const { chats, createChat, createLoad, setSelectedChat, deleteChat } =
    ChatData();

  const { logoutHandler } = UserData();

  const handleChatClick = (chatId) => {
    setSelectedChat(chatId);
  };

  const deleteChatHandler = (id) => {
    if (confirm("Are you sure to delete this chat?")) {
      deleteChat(id);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button
        className="btn btn-light d-md-none mb-3 p-2 fs-3 rounded"
        onClick={toggleTheSidebar}
      >
        <IoCloseCircleOutline />
      </button>

      <div className="text-2xl font-semibold mb-6">
        <img src={icon} className="sideImg" alt="icon" />
      </div>
      <div className="mb-4">
        <button
          onClick={createChat}
          className="btn mt-2 w-100 py-2 bg-light text-black rounded"
        >
          {createLoad ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>

      <div>
        <p className="text-white">Recent</p>

        <div className="mb-5" style={{ maxHeight: "500px", overflowY: "auto" }}>
          {chats && chats.length > 0 ? (
            chats.map((e) => (
              <div
                key={e._id}
                className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
                onClick={() => handleChatClick(e._id)}
              >
                <span
                  className="text-truncate text-dark"
                  style={{ maxWidth: "80%" }}
                >
                  {e.latestMessage && e.latestMessage.trim() !== ""
                    ? e.latestMessage.length > 38
                      ? e.latestMessage.slice(0, 38) + "..."
                      : e.latestMessage
                    : "New Chat"}
                </span>

                <button
                  className="btn btn-danger py-2 fs-5 rounded"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    deleteChatHandler(e._id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">No chats yet</p>
          )}
        </div>
      </div>

      <div className="mt-auto w-100 px-3 mb-3">
        <button className="logout-btn w-100 py-2 fs-5" onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
