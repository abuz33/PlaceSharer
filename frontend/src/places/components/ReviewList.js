import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../shared/components/UIElements/Modal' 
import Review from './Review';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import './ReviewList.css';

function ReviewList(props) {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const userId = useParams().userId;
	const placeId = props.placeId;
	const [ reviews, setReviews ] = useState();
	const [ warningDeleteReview, setWarningDeleteReview ] = useState(false);

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
	useEffect(() => {
		const fetchReviews = async () => {
		  try {
			const responseData = await sendRequest(
			  `${process.env.REACT_APP_BACKEND_URL}/reviews/${placeId}`
			);

			setReviews(responseData.reviews);
		  } catch (err) {}
		};
		fetchReviews();
	  }, [sendRequest, formState, placeId]);

	  const cancelDeleteHandler=()=>{
		  setWarningDeleteReview(false)
	  }
	const reviewSubmitHandler = async (event) => {
		event.preventDefault();
		const reviewDate = new Date();
		try {
			await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/reviews/newReview`,
			 'POST',
			  JSON.stringify({
				date: reviewDate,
				creator: userId,
				placeId:placeId,
				reviewTxt: formState.inputs.review.value
			  }), {
				Authorization: 'Bearer ' + auth.token, 
				"Content-Type": "application/json" 
			});
		} catch (err) {}
		setFormData({review: { value: '', isValid: false}})
	};

	const showWarning=()=>{
		setWarningDeleteReview(true)
	}
	const deleteReview = (deletedReviewId)=>{
		setReviews((prevReview) =>
		prevReview.filter((review) => review.id !== deletedReviewId));
		setWarningDeleteReview(false)
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{reviews && reviews.map((review) => (
				<Review id={review.id} deleteReview={showWarning} image={review.userImg} reviewBody={review.reviewTxt} userName={review.creator} />
			))}
			{isLoading && <LoadingSpinner asOverlay />}
			<Modal
				show={warningDeleteReview}
				onCancel={cancelDeleteHandler}
				header="Are you sure?"
				footerClass="place-item__modal-actions"
				footer={
					<React.Fragment>
						<Button inverse onClick={cancelDeleteHandler}>
							CANCEL
						</Button>
						<Button danger onClick={deleteReview}>
							DELETE
						</Button>
					</React.Fragment>
				}
			></Modal>
			{auth.isLoggedIn && (
				<form onSubmit={reviewSubmitHandler}>
					<Input
						id="review"
						element="textarea"
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
