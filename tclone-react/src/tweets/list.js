import React, {useEffect, useState} from "react";
import {apiTweetList} from "./lookup";
import {Tweet} from "./tweet"


export function TweetsList(props){
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
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
                setTweetsInit(response.results);
                setNextUrl(response.next);
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

  const handleLoadNext = (event) => {
      event.preventDefault();
      if (nextUrl !== null) {
          const handleLoadNextResponse = (response, status) => {
              if (status === 200){
                  setNextUrl(response.next);
                  const newTweets = [...tweets].concat(response.results)
                  setTweetsInit(newTweets);
                  setTweets(newTweets);
              }
          };
          apiTweetList(props.username, handleLoadNextResponse, nextUrl)
      }
  };

  return <React.Fragment>{tweets.map((item, index) =>{
            return <Tweet tweet={item} didRetweet={handleDidRetweet} className='my-5 py-5 border bg-white text-dark' key={`${index}-{item.id}`}/>
          })}
      {nextUrl !== null && <button onClick={handleLoadNext} className='btn btn-outline-primary'>Load Next Page</button>}
      </React.Fragment>
}
