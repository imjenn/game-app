import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import styles from "./Post.module.css";



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
        <div className={styles.textBox}>
            <form onSubmit={createPost}>
                {errors ? errors.map((err, idx) => <p key={idx}>{err}</p> ) : null}
                <p>
                    <input type="text" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                </p>
                <Editor apiKey='zz8m28t3rsp7vogxgs1401rukv3z94g9vgnk2dga1b8x1c39' cloudChannel='dev' init={{
                    plugins: 'lists code emoticons importcss',
                    height: 400,
                    width: 800,
                    toolbar: "formatselect | fontselect | bold italic strikethrough forecolor backcolor formatpainter | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link insertfile image | removeformat | code | addcomment | checklist | casechange",
                }}
                         onEditorChange={handleChange}/>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Post;