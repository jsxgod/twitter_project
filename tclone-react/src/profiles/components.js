import React from "react";

export function UserDisplay(props){
    const {user, fullNameFlag} = props;
    const nameDisplay = fullNameFlag === true ? `${user.first_name} ${user.last_name} ` : null;

    return <React.Fragment>
            {nameDisplay}
            <UserLink username={user.username}>@{user.username}</UserLink>
    </React.Fragment>
}

export function UserLink(props){
    const {username} = props;
    const handleUserLink = (event) => {
        window.location.href = `/profile/${username}`
    };
    return <span className='pointer' onClick={handleUserLink}>
            {props.children}
    </span>
}

export function UserPicture (props) {
    const {user} = props;
    return <UserLink username={user.username}>
        <span className='mx-1 px-3 py-2 rounded-circle bg-dark text-white'>
        {user.username[0]}
        </span>
    </UserLink>
}