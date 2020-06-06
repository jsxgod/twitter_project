import React, {useEffect, useState} from "react";
import {apiTweetList} from "./lookup";
import {Tweet} from "./tweet"


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
    apiTweetList(props.username, handleTweetListLookup)
    }
  }, [tweetsInit, tweetsDidLoad, setTweetsDidLoad, props.username]);

  const handleDidRetweet = (newTweet) => {
      const updateTweetsInit = [...tweetsInit];
      updateTweetsInit.unshift(newTweet);
      setTweetsInit(updateTweetsInit);

      const updateFinalTweets = [...tweets];
      updateFinalTweets.unshift(tweets);
      setTweets(updateFinalTweets)
  };
  return tweets.map((item, index) =>{
            return <Tweet tweet={item} didRetweet={handleDidRetweet} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
          })
}
