import React from "react";
import Avatar from "react-avatar";

const ChatMessage = ({ item }) => {
  return (
    <div className="flex items-center">
      <div>
        <Avatar
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Finternet--web%2Fprejudice%2Fuser-128.html&psig=AOvVaw2SjdA7ZTdmbM582YoVgu2y&ust=1718202352189000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCMitrg04YDFQAAAAAdAAAAABAE"
          size={25}
          round={true}
        />
      </div>
      <div className="flex items-center">
        <h1 className="ml-2 font-bold text-sm">{item.name}</h1>
        <p className="ml-2 py-2 text-sm">{item.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
