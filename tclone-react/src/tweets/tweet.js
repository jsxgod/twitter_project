import React, {useState} from "react";
import {TweetButton} from "./buttons";

export function ParentTweet(props){
    const {tweet} = props;
    return tweet.parent ? <div className='row'>
        <div className='col-11 mx-auto p-3 border rounded'>
            <p className='mb-0 text-muted small'>Retweet</p>
            <Tweet hideActions className={' '} tweet={tweet.parent}/>
        </div>
    </div> : null
}

export function Tweet(props) {
    const {tweet, didRetweet, hideActions} = props;
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null);
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';


    const path = window.location.pathname;
    const match = path.match(/(?<id>\d+)/);
    const urlTweetId = match ? match.groups.id : -1;
    const isDetail = `${tweet.id}` === `${urlTweetId}`;

    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200) {
            setActionTweet(newActionTweet)
        } else if (status === 201){
            if (didRetweet) {
                didRetweet(newActionTweet)
            }
        }
    };

    const handleLink = (event) => {
        event.preventDefault();
        window.location.href = `/${tweet.id}`;
    };

    return <div className={className}>
        <div>
            <p>{tweet.id} - {tweet.content}</p>
            <ParentTweet tweet={tweet}/>
        </div>
        <div className='btn btn-group'>
          {(actionTweet && hideActions !== true) && <React.Fragment>
            <TweetButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "like", display:"Likes"}}/>
            <TweetButton tweet={actionTweet} didPerformAction={handlePerformAction}  action={{type: "unlike", display:"Unlike"}}/>
            <TweetButton tweet={actionTweet} didPerformAction={handlePerformAction}  action={{type: "retweet", display:"Retweet"}}/>
          </React.Fragment>}
            {isDetail === true ? null : <button className='btn btn-sm btn-outline btn-primary' onClick={handleLink}>View</button>}
        </div>
    </div>
}