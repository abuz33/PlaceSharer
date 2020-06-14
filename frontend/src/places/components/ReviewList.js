import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './ReviewList.css';

function ReviewList(props) {
	const auth = useContext(AuthContext);

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const userId = auth.userId;
	const placeId = props.placeId;
	const [ reviews, setReviews ] = useState();
	const [ updateReviews, setUpdateReviews ] = useState(0);

	const [ formState, inputHandler, setFormData ] = useForm(
		{
			review: {
				value: '',
				isValid: false
			}
		},
		false
	);

	// gets all of the reviews of a place
	useEffect(
		() => {
			const fetchReviews = async () => {
				try {
					const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/reviews/${placeId}`);
					setReviews(responseData.reviews);
				} catch (err) {}
			};
			fetchReviews();
		},
		[ sendRequest, placeId, updateReviews ]
	);

	const reviewSubmitHandler = async (event) => {
		event.preventDefault();
		const reviewDate = new Date();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/reviews/newReview`,
				'POST',
				JSON.stringify({
					date: reviewDate,
					userId: userId,
					placeId: placeId,
					reviewTxt: formState.inputs.review.value
				}),
				{
					Authorization: 'Bearer ' + auth.token,
					'Content-Type': 'application/json'
				}
			);
		} catch (err) {}
		setUpdateReviews((prevState)=>{return prevState + 1});
		setFormData({ review: { value: '', isValid: false } });
	};
	console.log(reviews);

	const deleteReview = async (deletedReviewId) => {
		setReviews((prevReview) => prevReview.filter((review) => review.id !== deletedReviewId));
		try {
			await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/reviews/${deletedReviewId}/${userId}`, 'DELETE', null, {
				Authorization: 'Bearer ' + auth.token
			});
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<img className="place-photo" src={props.placeUrl} alt={'the place '} />
			{reviews ? (
				reviews.length === 0 && (
					<p>
						<strong>No reviews yet. Be the first to review! </strong>
					</p>
				)
			) : null}
			{reviews &&
				reviews.map((review) => (
					<Review
						key={review.id}
						id={review.id}
						deleteReview={deleteReview}
						image={review.creator}
						reviewBody={review.reviewTxt}
						userId={review.userId}
						date={review.date}
						creator={review.creator}
					/>
				))}
			{isLoading && <LoadingSpinner asOverlay />}
			{auth.isLoggedIn && (
				<form onSubmit={reviewSubmitHandler}>
					<Input
						id="review"
						element="textarea"
						type="submit"
						validators={[ VALIDATOR_MINLENGTH(5) ]}
						errorText="Please enter a valid review (min. 5 characters)."
						onInput={inputHandler}
						initialValid={true}
						value={formState.review}
					/>
					<Button inverse type="submit" disabled={!formState.isValid}>
						POST REVIEW
					</Button>
				</form>
			)}
		</React.Fragment>
	);
}

export default ReviewList;
