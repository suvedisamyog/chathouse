import { Link } from "@inertiajs/react";
import GroupAvatar from "./GroupAvatar";
import UserAvatar from "./UserAvatar";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";



const ConversationHeader = ({ selectedConversation }) => {
    return(
    <>
     {selectedConversation && (
        <div className="flex justify-between items-center  border-b border-slate-700">
            <div className="flex items-center gap-3">
                <Link
                    href={route('home')}
                    className="inline-block sm:hidden"
                >
                    <ArrowLeftIcon className="w-6 h-6" />
                </Link>
                {selectedConversation.is_user && (
                    <UserAvatar user={selectedConversation} />
                )}
                {selectedConversation.is_group && <GroupAvatar/>}

                <div>
                    <h3>{selectedConversation.name}</h3>
                    {selectedConversation.is_group && (
                        <p className="text-xs text-gary-500">
                            {selectedConversation.users.length} members
                        </p>
                    )}
                </div>

            </div>
        </div>
     )}
    </>
    );
};
export default ConversationHeader;
