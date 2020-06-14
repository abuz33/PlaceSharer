import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Moment from 'react-moment';
import close from '../../shared/components/UIElements/icons/close.png';

import './Review.css';

function Review(props) {
	const auth = useContext(AuthContext);
	const date = props.date;
	const imgUrl = props.creator ? props.creator.image: null; 
	return (
		<React.Fragment>
			<div className="container">
				<div className="review">
					<img
						className="userImage"
						src={`${process.env.REACT_APP_ASSET_URL}/${imgUrl}`|| 'https://bit.ly/3f7YYNi'}
						alt={'user'}
					/>
					<p className="userName"> {props.creator ? props.creator.name : null}</p>
					<p className="reviewBody"> {props.reviewBody} </p>
					{auth.userId === props.userId ? (
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
				<Moment className="date" format="YYYY/MM/DD HH:mm">
					{date}
				</Moment>
			</div>
		</React.Fragment>
	);
}
export default Review;
