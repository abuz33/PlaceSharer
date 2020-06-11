import React, { useState, useContext } from 'react';
import Review from './Review';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceList.css';
const DUMMY_REVIEWS = [
	{
		date: '27/05/2020 15:14',
		creatorId: 'User1',
		userImg: 'https://bit.ly/3f7YYNi',
		placeId: 'p1',
		body: 'I was there and it was a really nice place.'
	}
];
function ReviewList() {
	const auth = useContext(AuthContext);
	const [ showConfirmModal, setShowConfirmModal ] = useState(false);
	const [ formState, inputHandler, setFormData ] = useForm(
		{
			review: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const reviewSubmit = () => {
		const newReview = {
			date: new Date(),
			creatorId: 'Ahmet',
			placeId: 'p1',
			body: formState.inputs.review.value
		};
		console.log('reviewSubmit -> newReview', newReview);

		DUMMY_REVIEWS.push(newReview);
		setFormData({ review: '' });
	};

	const resetForm = () => {
		setFormData.inputs.review('');
	};

	return (
		<React.Fragment>
			{auth.isLoggedIn && (
				<form className="place-form" onSubmit={reviewSubmit} onReset={resetForm}>
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
						Post review
					</Button>
					<Button to={``}>EDIT</Button>

					<Button danger onClick={showDeleteWarningHandler}>
						DELETE
					</Button>
				</form>
			)}

			{DUMMY_REVIEWS.map((review) => (
				<Review image={review.userImg} reviewBody={review.body} userName={review.creatorId} />
			))}
		</React.Fragment>
	);
}

export default ReviewList;
