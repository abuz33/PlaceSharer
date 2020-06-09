import React from 'react';

function Review(props) {
    return (
        <React.Fragment> 
        <div>
            <img src={props.image} style={{width :"100px"}}alt={'Some photo'}/>
        </div>
        <div>
            <h4>{props.userName}</h4>
        </div>
        <div>
            <p>{props.reviewBody}</p>
        </div>
        </React.Fragment>
    )
}

export default Review;
