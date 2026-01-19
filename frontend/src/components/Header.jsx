import { ChatData } from "../context/chatContext";

const Header = () => {
  const { chats } = ChatData();
  return (
    <div>
      <p className="fs-5 mb-3">Hello, How can I help you today?</p>
      {chats && chats.length === 0 && (
        <p className="fs-5 mb-3">Create new account to continue</p>
      )}
    </div>
  );
};

export default Header;
