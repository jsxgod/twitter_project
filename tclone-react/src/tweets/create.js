import React from "react";
import {apiTweetCreate} from "./lookup";

export function TweetCreate(props) {
    const textAreaRef = React.createRef();
    const {didTweet} = props;


    const handleSubmit = (event) => {
        event.preventDefault();
        const tweetContent = textAreaRef.current.value;
        apiTweetCreate(tweetContent, handleBackendUpdate);
        textAreaRef.current.value = '';
    };

    const handleBackendUpdate = (response, status)=>{
        if (status === 201){
            didTweet(response);
        } else {
            console.log(response);
            alert("Error podczas tworzenia tweeta")
        }
    };
    return <div className={props.classname}>
                <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} required={true} className='form-control'/>
                    <button type='submit' className='btn btn-primary my-3'>Tweet</button>
                </form>
    </div>
}