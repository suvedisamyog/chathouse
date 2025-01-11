import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import ConversationHeader from "@/Components/App/ConversationHeader";
import MessageItem from "@/Components/App/MessageItem";

function Home({selectedConversation ,messages}) {
    console.log(messages);
    const [localMessages, setLocalMessages] = useState(messages.data);
    const messageCtrRef = useRef(null);

    useEffect(() => {
        setLocalMessages(messages);
    }, [messages]);

    return (
        <>
            { !messages && (
                <div className="flex flex-col items-center justify-center gap-8 text-center h-full opacity-35">
                    <div className="text-2xl md:text-4xl p-16 text-slate-200">Please select conversation to see messages</div>
                    <ChatBubbleLeftRightIcon className="w-32 h-32 inline-block" />
                </div>
            )}

            { messages && (
                 <>
                 <ConversationHeader
                    selectedConversation={selectedConversation}
                 />
                 <div
                    className="flex-1 overflow-y-auto p-5"
                    ref = {messageCtrRef}
                >
                    {localMessages.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-lg text-slate-200">
                                No messages Found
                            </div>
                        </div>
                    )}

                    {localMessages.length > 0 && (
                        <div className="flex flex-1 flex-col">
                            {localMessages.map((message ) => (
                                <MessageItem
                                 key={message.id}
                                 message={message}
                                />
                            ))}
                        </div>
                    )}

                 </div>
                 {/* <MessageInput conversation={selectedConversation} /> */}
                 </>
            )}
        </>
    )
}


Home.layout = (page) => {
    return (
        <AuthenticatedLayout user={page.props.auth.user} >
            <ChatLayout children={page} />
        </AuthenticatedLayout>
    )
}

export default Home;
