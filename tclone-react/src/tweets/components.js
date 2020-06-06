import React, {useEffect, useState} from 'react'

import {TweetsList} from "./list";
import {TweetCreate} from "./create";
import {Tweet} from "./tweet";

import {apiTweetDetail} from "./lookup";

export function TweetsComponent(props) {
    const [newTweets, setNewTweets] = useState([]);

    const canTweet = props.canTweet !== "false";

    const handleNewTweet = (newTweet)=>{
        let tempNewTweets = [...newTweets];
        tempNewTweets.unshift(newTweet);
        setNewTweets(tempNewTweets);
    };
    return <div className={props.className}>
        {canTweet && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3'/>}
        <TweetsList newTweets={newTweets} {...props}/>
    </div>
}

export function TweetDetailComponent(props){
    const {tweetId} = props;
    const [didLookup, setDidLookup] = useState(false);
    const [tweet, setTweet] = useState(null);


    const handleBackendLookup = (response, status) => {
        if (status === 200){
            setTweet(response)
        } else {
            alert("Nie można znaleźć tweeta.")
        }
    };

    useEffect(()=>{
        if (didLookup === false){
            apiTweetDetail(tweetId, handleBackendLookup);
            setDidLookup(true)
        }
        }, [tweetId, didLookup, setDidLookup]
    );

    return tweet === null ? null : <Tweet tweet={tweet} className={props.className}/>
}