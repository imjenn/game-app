import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const Post = (props) => {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState("");
    const history = useHistory();

    const user = localStorage.getItem("User");
    console.log(user);

    const newPost = {
        title: title,
        body: body,
        user: user,
        game: id
    }

    const createPost = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/post/new', newPost, { withCredentials: true })
            .then(res => history.push(`/forum/${id}`))
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for(const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
                console.log(errorResponse);
            })
            setErrors([]);
    }

    return (
        <div>
            <h1>Create a new post</h1>
            {errors ? errors.map((err, idx) => <p key={idx}>{err}</p> ) : null}
            <form onSubmit={createPost}>
                <p>
                    <input type="text" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                </p>
                <textarea name="body" id="body" cols="30" rows="10" placeholder="Text" onChange={(e) => setBody(e.target.value)}></textarea>
                <input type="submit" value="Create Post" />
            </form>
        </div>
    )
}

export default Post;