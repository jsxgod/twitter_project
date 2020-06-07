import React, {useEffect, useState} from "react";

import {apiProfileDetail, apiProfileFollowToggle} from "./lookup";
import {UserDisplay, UserPicture} from "./components";
import {DisplayCount} from "./utils";

function ProfileBadge(props){
    const {user, didFollowToggle, profileLoading} = props;

    let currentAction = (user && user.is_following) ? "Unfollow" : "Follow";
    currentAction = profileLoading ? "Loading..." : currentAction;

    const handleFollowToggle = (event)=> {
        event.preventDefault();
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentAction)
        }
    };

    return user ? <div>
        <UserPicture user={user} hideLink/>
        <p><UserDisplay user={user} fullNameFlag hideLink/></p>
        <p>Followers: <DisplayCount>{user.followers_count}</DisplayCount></p>
        <p>Following: <DisplayCount>{user.following_count}</DisplayCount></p>
        <p>{user.location}</p>
        <p>{user.bio}</p>
        <button className='btn btn-primary' onClick={handleFollowToggle}>{currentAction}</button>
    </div> : null
}


export function ProfileBadgeComponent (props){
    const {username} = props;
    const [didLookup, setDidLookup] = useState(false);
    const [profile, setProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);


    const handleBackendLookup = (response, status) => {
        if (status === 200){
            setProfile(response)
        }
    };

    useEffect(()=>{
        if (didLookup === false){
            apiProfileDetail(username, handleBackendLookup);
            setDidLookup(true)
        }
        }, [username, didLookup, setDidLookup]
    );

    const handleNewFollow = (action) => {
        apiProfileFollowToggle(username, action, (response, status) => {
          console.log(response, status);
          if (status === 200){
              setProfile(response)
          }
          setProfileLoading(false)
        });
        setProfileLoading(true)
    };


    return didLookup === false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading}/> : null
}