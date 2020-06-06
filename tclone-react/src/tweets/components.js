import React, {useEffect, useState} from 'react'

import {loadTweets} from "../lookup";


export function TweetsComponent(props) {
    const textAreaRef = React.createRef();
    const [newTweets, setNewTweets] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const tweetContent = textAreaRef.current.value;
        let tempNewTweets = [...newTweets];
        tempNewTweets.unshift({
            content: tweetContent,
            likes: 0,
            id: 123321
        });
        setNewTweets(tempNewTweets)

        textAreaRef.current.value = '';
    };
    return <div className={props.className}>
            <div className='col-12 mb-3'>
                <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} required={true} className='form-control'/>
                    <button type='submit' className='btn btn-primary my-3'>Tweet</button>
                </form>
            </div>
            <TweetsList newTweets={newTweets}/>
    </div>
}


export function TweetsList(props){
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  useEffect(()=>{
    const final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
        setTweets(final)
    }
  },[props.newTweets, tweets, tweetsInit]);

  useEffect(() => {
    const myCallBack = (response, status) => {
        if (status === 200){
            setTweetsInit(response)
        }
    };
    loadTweets(myCallBack)
  }, []);
  return tweets.map((item, index) =>{
            return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
          })
}

export function TweetButton(props){
    const {tweet, action} = props;
    const [likes, updateLikes] = useState(tweet.likes ? tweet.likes : 0);
    const [userLike, likeFlag] = useState(tweet.userLike === true);
    const className = props.className ? props.className : 'btn btn-primary btn-sm';
    const actionDisplay = action.display ? action.display : "Action";
    const handleClick = (event) => {
        event.preventDefault();
        if (action.type === 'like') {
            if (userLike === true){
                updateLikes(likes-1);
                likeFlag(false);
            } else {
                updateLikes(likes+1);
                likeFlag(true)
            }
        }
    };
    const display = action.type === 'like' ? `${likes} ${action.display}` : action.display;

    return <button className={className} onClick={handleClick}>{display}</button>
}

export function Tweet(props) {
    const {tweet} = props;
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    return <div className={className}>
        <p>{tweet.id} - {tweet.content}</p>
        <div className='btn btn-group'>
            <TweetButton tweet={tweet} action={{type: "like", display:"Likes"}}/>
            <TweetButton tweet={tweet} action={{type: "unlike", display:"Unlike"}}/>
            <TweetButton tweet={tweet} action={{type: "retweet", display:"Retweet"}}/>
        </div>
    </div>
}