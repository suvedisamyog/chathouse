import UserAvatar from './UserAvatar';
import GroupAvatar from './GroupAvatar';
import UserOptionsDropdown from './UserOptionsDropdown';
import { Link, usePage } from '@inertiajs/react';


const ConversationItem = ({
    conversation,
    selectedConversation = null,
    online = null

}) => {

const page = usePage();
const currentUser = page.props.auth.user;
let classes = 'border-transparent';

    if( selectedConversation) {
        if( !selectedConversation.is_group && !conversation.is_group && selectedConversation.id === conversation.id){
            classes = 'border-blue-500 bg-black/20';
        }

        if( selectedConversation.is_group && conversation.is_group && selectedConversation.id === conversation.id){
            classes = 'border-blue-500 bg-black/20';
        }
    }

    return (
        <Link
            href={conversation.is_group ? route('chat.group', conversation) : route('chat.user', conversation)}
            preserveState
            className = {" conversation-item flex items-center gp-2 text-gary-300 transition-all cursor-pointer border-l-4 hover:bg-black/30" + classes +
                conversation.is_user && currentUser.is_admin ? "pr-2" : "pr-4"
            }
        >
            <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                    {conversation.is_group ? (
                        <GroupAvatar />
                    ) : (
                        <UserAvatar
                            user={conversation}
                            online={online}
                        />
                    )}
                </div>
                <div className={`flex-1 text-xs max-w-full overflow-hidden px-2 ${conversation.is_user && conversation.blocked ? 'opacity-50' : ''}`}>
                    <div className="flex justify-between items-center">
                        <h3 className='text-sm font-semibold overflow-hidden text-nowrap text-ellipsis'>
                            {conversation.name}
                        </h3>
                        {conversation.last_message_date && (
                            <span className="text-nowrap">
                                {conversation.last_message_date}
                            </span>
                        )}
                    </div>
                    {conversation.last_message && (
                        <p className="text-nowrap text-ellipsis overflow-hidden text-xs">
                            {conversation.last_message}
                        </p>
                    )}
                </div>
                {conversation.is_user && currentUser.is_admin && (
                    <div className="flex-shrink-0">
                        <UserOptionsDropdown conversation={conversation} />
                    </div>
                )}
            </div>
        </Link>
    );
}
export default ConversationItem;