import React, {useEffect, useState} from 'react'

import {apiTweetList, apiTweetCreate, apiTweetAction} from "./lookup";


export function TweetsComponent(props) {
    const textAreaRef = React.createRef();
    const [newTweets, setNewTweets] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const tweetContent = textAreaRef.current.value;
        apiTweetCreate(tweetContent, handleBackendUpdate);
        textAreaRef.current.value = '';
    };

    const handleBackendUpdate = (response, status)=>{
        let tempNewTweets = [...newTweets];
        if (status === 201){
            tempNewTweets.unshift(response);
            setNewTweets(tempNewTweets);
        } else {
            console.log(response);
            alert("Error podczas tworzenia tweeta")
        }
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
  const [tweetsDidLoad, setTweetsDidLoad] = useState(false);

  useEffect(()=>{
    const final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
        setTweets(final)
    }
  },[props.newTweets, tweets, tweetsInit]);

  useEffect(() => {
    if (tweetsDidLoad === false) {
        const handleTweetListLookup = (response, status) => {
            if (status === 200) {
                setTweetsInit(response);
                setTweetsDidLoad(true);
            }
        };
    apiTweetList(handleTweetListLookup)
    }
  }, [tweetsInit, tweetsDidLoad, setTweetsDidLoad]);
  return tweets.map((item, index) =>{
            return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
          })
}

export function TweetButton(props){
    const {tweet, action} = props;
    const [likes, updateLikes] = useState(tweet.likes ? tweet.likes : 0);
    // const [userLike, likeFlag] = useState(tweet.userLike === true);
    const className = props.className ? props.className : 'btn btn-primary btn-sm';
    const actionDisplay = action.display ? action.display : "Action";

    const handleActionBackendEvent = (response, status)=> {
        console.log(response, status)
        if (status === 200){
            updateLikes(response.likes);
            // likeFlag(true)
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        apiTweetAction(tweet.id, action.type, handleActionBackendEvent)

    };
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : action.display;

    return <button className={className} onClick={handleClick}>{display}</button>
}

export function ParentTweet(props){
    const {tweet} = props;
    return tweet.parent ? <div className='row'>
        <div className='col-11 mx-auto p-3 border rounded'>
            <p className='mb-0 text-muted small'>Retweet</p>
            <Tweet className={' '} tweet={tweet.parent}/>
        </div>
    </div> : null
}

export function Tweet(props) {
    const {tweet} = props;
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    return <div className={className}>
        <div>
            <p>{tweet.id} - {tweet.content}</p>
            <ParentTweet tweet={tweet}/>
        </div>
        <div className='btn btn-group'>
            <TweetButton tweet={tweet} action={{type: "like", display:"Likes"}}/>
            <TweetButton tweet={tweet} action={{type: "unlike", display:"Unlike"}}/>
            <TweetButton tweet={tweet} action={{type: "retweet", display:"Retweet"}}/>
        </div>
    </div>
}