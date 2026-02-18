import React from "react";

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
export const OtherUsersData = (props) => {
    return (
       <ul>
        {props.items.map(item => (
            <li key = {item.userPrincipalName}>
                {item.userPrincipalName}
            </li>
        ))}
       </ul>
    );
};