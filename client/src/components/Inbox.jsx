import { useState, useEffect } from "react";

const Inbox = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await fetch('http://localhost:4000/inbox',{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
    })
    const data = await res.json()
    console.log(data)
    setMessages(data.data.messages)

  };

  useEffect(() => {
    // Simulating fetching messages from an API
    fetchMessages()

  }, [messages?.length]);


  return (
    <div>
      <h1 className="px-10 mb-4">Inbox</h1>
      {messages?.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul>
          {messages?.map((message) => 
            <div class="flex flex-row">
            <img class="object-cover w-12 h-12 border-2 border-gray-300 rounded-full" alt="Noob master's avatar"
                src={"http://localhost:4000" + message.sender.avatar}/>
            <div class="flex-col mt-1">
                <div class="flex items-center flex-1 px-4 font-bold leading-tight">
                    {message.sender.username}
                    <span class="ml-2 text-xs font-normal text-gray-500">
                        {message.createdAt}
                    </span>
                </div>
                <div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                    {message.content}
                </div>

            </div>
        </div>
          )}
        </ul>
      )}
    </div>
  );
};

{/* <li key={message.id}>
              <strong>{message.sender}: </strong>
              <span>{message.subject}</span>
            </li> */}

export default Inbox;
