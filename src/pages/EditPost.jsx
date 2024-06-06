import { Container, PostForm } from "../components";
import { useEffect, useState } from "react";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost([slug]).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate("/")
        }
    }, [posts, navigate])

    return post ? (<div className="py-8">
        <Container>
            <PostForm post={post} />
        </Container>
    </div>) : null
}

export default EditPost;