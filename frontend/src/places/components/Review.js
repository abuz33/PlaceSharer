import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import close from '../../shared/components/UIElements/icons/close.png';

import './Review.css';

function Review(props) {
	const auth = useContext(AuthContext);

	return (
		<React.Fragment>
			<div className="review">
				<img className="userImage" src={props.image || 'https://bit.ly/3f7YYNi'} alt={'user'} />
				<p className="userName"> {props.creator ? props.userName : null}</p>

				<p className="reviewBody"> {props.reviewBody} </p>
				<time>{props.time}</time>

				{auth.userId === props.creator ? (
					<img
						id="closeButton"
						src={close}
						alt={'X'}
						onClick={() => {
							props.deleteReview(props.id);
						}}
					/>
				) : (
					''
				)}
			</div>
		</React.Fragment>
	);
}

export default Review;
