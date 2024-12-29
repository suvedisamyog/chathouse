import { usePage } from "@inertiajs/react";
import { useEffect , useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import TextInput from "@/Components/TextInput";
import ConversationItem from "@/Components/App/ConversationItem";

const ChatLayout = ({ children }) => {
	const page = usePage();

	const { conversations, selectedConversations } = page.props
    console.log('conversations', conversations);

    const [onlineUsers, setOnlineUsers] = useState({});
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);


    const isUserOnline = (userId)=> onlineUsers[userId] ;

    const onSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setLocalConversations(conversations.filter((conversation) => {
            return conversation.name.toLowerCase().includes(search);
        }));
    }

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if(a.blocked_at && b.blocked_at){
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if(a.blocked_at){
                    return -1;
                }

                if( a.last_message_date && b.last_message_date){
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    )
                }else if(a.last_message_date){
                    return -1;
                }else if(b.last_message_date){
                    return 1;
                }else{
                    return 0;
                }
            })
        )
    }, [localConversations]);


    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);
	// set state of online users when component mounts
    useEffect(() => {
		Echo.join('online')
			.here(users => {
				console.log('here', users);
                const onlineUsersObj =Object.fromEntries(users.map(user => [user.id, user]));
                setOnlineUsers((PrevOnlineUsers)=>{
                    return {...PrevOnlineUsers, ...onlineUsersObj};
                });
			})
			.joining(user => {
                setOnlineUsers((PrevOnlineUsers)=>{
                    const updatedUsers = {...PrevOnlineUsers};
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
			})
			.leaving(user => {
                setOnlineUsers((PrevOnlineUsers)=>{
                    const updatedUsers = {...PrevOnlineUsers};
                    delete updatedUsers[user.id];
                    return updatedUsers;
                });
			})
			.error(error => {
				console.error(error);
			});
	}, []);

    return (
        <>
        <div className="flex-1 w-full overflow-hidden"></div>
            <div
             className={`transition-all w-full sm:w-[220px] md:w-[300px] bg-slate-800 flex flex-col overflow-hidden
                    ${
                        selectedConversations ? "-ml-[100%] sm:ml-0" : ""}
                `}
            >
                <div className="flex items-center justify-between p-4 ">
                    MyConversation
                    <div
                        className="tooltip tooltip-left"
                        data-tip="Create New Conversation"
                    >
                        <button className="text-gray-400 hover:text-gary-200">
                            <PencilSquareIcon className="w-4 h-4 inline-block ml-2" />
                        </button>
                    </div>
                </div>
                <div className="p-3">
                    <TextInput
                        type="text"
                        placeholder="filter uaers and grouyps"
                        className="bg-slate-700 w-full p-2 rounded-lg"
                        onKeyUp={onSearch}
                    />
                </div>
                 <div className="flex-1 overflow-auto">
                    {sortedConversations && sortedConversations.map((conversation) => (
                        <ConversationItem
                            key={`${conversation.is_group ? 'group_' : 'user_'}${conversation.id}`}
                            conversation={conversation}
                            online ={!!isUserOnline(conversation.id)}
                            selectedConversations = {selectedConversations}
                        />
                    ))}
                 </div>

            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                {children}
            </div>
        </>
    )
};

export default ChatLayout;
