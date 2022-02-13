import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';



const Post = (props) => {

    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState("");
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("User"));
    console.log(user);

    function handleChange(content, editor){
        setBody(content);
    }

    const newPost = {
        title: title,
        body: body,
        user: user,
        game: id
    }

    const createPost = (e) => {
        e.preventDefault();
        console.log("hel[",typeof body);
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

        <form onSubmit={createPost}>
            {errors ? errors.map((err, idx) => <p key={idx}>{err}</p> ) : null}
            <p>
                <input type="text" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            </p>
            <Editor  apiKey='zz8m28t3rsp7vogxgs1401rukv3z94g9vgnk2dga1b8x1c39' cloudChannel='dev' init={{selector: 'textarea',
                height: 400,
                width: 600,
                plugins: 'lists code emoticons',
                toolbar: 'undo redo | styleselect | bold italic | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'outdent indent | numlist bullist | emojis',
                emoticons_images_url: 'http://my.server/images/emoticons/',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }' }} onEditorChange={handleChange}/>
            <br />
            <input type="submit" value="Submit" />
        </form>
    )
}

export default Post;