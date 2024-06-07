import { Container, Postcard } from "../components";
import service from "../appwrite/config";
import { useState, useEffect } from "react";


function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        service.getPost([]).then((posts)=>{
            if (posts) {
                setPosts(posts)
            }
        })
    }, [posts])
    

    return ( 
        <div className="py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div className="p-2 w-1/4" key={post.$id}>
                            <Postcard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
     );
}

export default AllPosts;