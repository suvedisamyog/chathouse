import { usePage } from "@inertiajs/react";
import { useEffect } from "react";

const ChatLayout = ({ children }) => {
	const page = usePage();
	
	const { converesation , selectedConversation } = page.props

	useEffect(() => {
		Echo.join('online')
			.here(users => {
				console.log('here', users);
			})
			.joining(user => {
				console.log('joining', user);
			})
			.leaving(user => {
				console.log('leaving', user);
			})
			.error(error => {
				console.error(error);
			});
	}, []);
	
    return (
        <>
            <h1>list</h1>
			{children}
        </>
    )
};

export default ChatLayout;
