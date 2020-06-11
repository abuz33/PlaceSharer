import React from 'react';
import './Review.css';
function Review(props) {
	return (
		<React.Fragment>
			<div className="review">
				<img src={props.image || 'https://bit.ly/3f7YYNi'} alt={'Some photo'} />
				<p className="userName"> {`${props.userName}:`}</p>
				<p className="reviewBody"> {props.reviewBody} </p>
			</div>
		</React.Fragment>
	);
}

export default Review;
