import React, {useState} from "react";
import {TweetButton} from "./buttons";

import {UserDisplay, UserPicture} from "../profiles";


export function ParentTweet(props){
    const {tweet} = props;
    return tweet.parent ? <Tweet isRetweet whoRetweeted={props.whoRetweeted} hideActions className={' '} tweet={tweet.parent}/> : null
}

export function Tweet(props) {
    const {tweet, didRetweet, hideActions, isRetweet, whoRetweeted} = props;
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null);
    let className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    className = isRetweet === true ? `${className} p-3 border rounded` : className;

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
            {isRetweet === true && <div className='mb-3'>
                <span className='small text-muted'>Retweeted by <UserDisplay user={whoRetweeted}/></span>
            </div>}
        <div className='d-flex'>
            <div className=''>
                <UserPicture user={tweet.user}/>
            </div>
            <div className='col-11'>
                <div>
                    <p>
                        <UserDisplay fullNameFlag user={tweet.user}/>
                    </p>
                    <p>{tweet.content}</p>
                    <ParentTweet tweet={tweet} whoRetweeted={tweet.user}/>
                </div>
                <div className='btn btn-group px-0'>
                  {(actionTweet && hideActions !== true) && <React.Fragment>
                    <TweetButton tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "like", display:"Likes"}}/>
                    <TweetButton tweet={actionTweet} didPerformAction={handlePerformAction}  action={{type: "unlike", display:"Unlike"}}/>
                    <TweetButton tweet={actionTweet} didPerformAction={handlePerformAction}  action={{type: "retweet", display:"Retweet"}}/>
                  </React.Fragment>}
                    {isDetail === true ? null : <button className='btn btn-sm btn-outline btn-primary' onClick={handleLink}>View</button>}
                </div>
            </div>
        </div>
    </div>
}