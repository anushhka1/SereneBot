import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header.jsx";
import { ChatData } from "../context/chatContext.jsx";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa6";
import { LoadingSmall } from "../components/Loading.jsx";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleTheSidebar = () => setIsOpen(!isOpen);

  const { messages, prompt, setPrompt, newRequestLoading, fetchResponse } =
    ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messageContainerRef = useRef();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="d-flex vh-100 overflow-hidden text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleTheSidebar={toggleTheSidebar} />

      {/* Main Chat Section */}
      <div
        className="flex-grow-1 d-flex flex-column position-relative"
        style={{
          background: "linear-gradient(135deg, #1e1e2f, #2c2c44)",
          overflow: "hidden",
        }}
      >
        {/* Mobile toggle button */}
        {!isOpen && (
          <button
            className="btn btn-info d-md-none position-absolute"
            style={{ top: "20px", left: "20px", zIndex: 1000 }}
            onClick={toggleTheSidebar}
          >
            <GiHamburgerMenu />
          </button>
        )}

        <Header />

        {/* Chat container */}
        <div
          ref={messageContainerRef}
          className="flex-grow-1 p-3 overflow-auto"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {messages?.length ? (
            messages.map((msg, i) => (
              <div key={i} className="mb-4 fade-in">
                {/* User message */}
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle p-2 me-2"
                    style={{
                      background: "linear-gradient(90deg,#9c27b0,#8bc34a)",
                    }}
                  >
                    <CgProfile size={22} />
                  </div>
                  <div
                    className="p-2 rounded shadow-sm"
                    style={{
                      backgroundColor: "#3a3a5c",
                      maxWidth: "80%",
                    }}
                  >
                    {msg.question}
                  </div>
                </div>

                {/* Bot response */}
                <div className="d-flex align-items-center">
                  <div className="bg-dark rounded-circle p-2 me-2">
                    <FaRobot size={22} />
                  </div>
                  <div
                    className="p-2 rounded shadow-sm flex-grow-1"
                    style={{
                      backgroundColor: "#2e2e48",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      lineHeight: "1.5",
                      maxWidth: "85%",
                    }}
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html: msg.answer.replace(/\*\*/g, ""),
                      }}
                      className="mb-0"
                      style={{
                        color: "#f8f8f2",
                        background: "#202030",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-5 opacity-75">
              👋 Start chatting with your AI assistant!
            </p>
          )}

          {newRequestLoading && (
            <div className="text-center mt-3">
              <LoadingSmall />
              <p className="small text-muted mt-2">Bot is typing...</p>
            </div>
          )}
        </div>

        {/* Input box */}
        <div
          className="p-3 border-top d-flex align-items-center"
          style={{
            backgroundColor: "#1f1f2e",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <form
            className="d-flex align-items-center flex-grow-1"
            onSubmit={submitHandler}
          >
            <input
              type="text"
              className="form-control me-2 border-0 text-white"
              style={{
                backgroundColor: "#2b2b3f",
                borderRadius: "25px",
                padding: "12px 18px",
                boxShadow: "inset 0 0 5px rgba(255,255,255,0.1)",
              }}
              placeholder="Type a message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <button
              className="btn border-0 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(90deg,#9c27b0,#8bc34a)",
                transition: "0.3s",
              }}
            >
              <IoMdSend size={22} />
            </button>
          </form>
        </div>

        {/* Animations */}
        <style>{`
          .fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          input:focus {
            box-shadow: 0 0 6px #9c27b0;
          }
          button:hover {
            transform: scale(1.05);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Chat;
