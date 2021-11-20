import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import { useSession } from "next-auth/react";

const Feed = () => {
    
    const { data: session } = useSession();

    return (
        <main 
            className={`grid grid-col-1 md:grid-col-2 md:max-w-3xl 
                xl:grid-cols-3 xl:max-w-6xl mx-auto 
                ${!session && "!grid-cols-1 !max-w-3xl"}`}
        >

            <section className='col-span-2'>
                {/* Stories */}
                <Stories />

                {/* Posts */}
                <Posts />
            </section>

            {
                session && (
                    <section className='hidden xl:inline-grid md:col-span-1'>
                        <div className='top-20 fixed'>

                            {/* Mini profile */}
                            <MiniProfile />

                            {/* suggestions */}
                            <Suggestions />

                        </div>
                    </section>

                )
            }

        </main>
    )
}

export default Feed
