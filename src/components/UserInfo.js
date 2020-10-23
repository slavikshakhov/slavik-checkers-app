import React from 'react';
import './UserInfo.css';

const UserInfo = (props) => {

    const userInfo = ' userInfo pa6';
    
    return (
        <div className={`${userInfo} bg-green`}>
            {props.children}            
        </div>
    )
}

export default UserInfo;