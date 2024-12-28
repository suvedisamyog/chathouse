import ChatLayout from "@/Layouts/ChatLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function Home({auth}) {
    return (
        <>
			<h1> home </h1>
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
