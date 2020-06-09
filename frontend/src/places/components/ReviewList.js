import React , {useState} from 'react';
import Review from './Review'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {VALIDATOR_MINLENGTH} from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook'



const DUMMY_REVIEWS = [
    { date: "27/05/2020 15:14",
     creatorId: 'u1',
     userImg: "https://bit.ly/3f7YYNi", 
     placeId : 'p1',
     body: "I was there and it was a really nice place."
    },
    { date: "27/05/2020 15:14",
     creatorId: 'u1',
     userImg: "https://bit.ly/3f7YYNi", 
     placeId : 'p1',
     body: "I was there and it was a really nice place."
    },
    { date: "27/05/2020 15:14",
     creatorId: 'u1',
     userImg: "https://bit.ly/3f7YYNi", 
     placeId : 'p1',
     body: "I was there and it was a really nice place."
    }   
]
function ReviewList() {
    const [formState, inputHandler, setFormData] = useForm(
        {
          review: {
            value: "",
            isValid: false,
          }
        },
        false
      );
         
    const reviewSubmit =()=>{
        const newReview = {
            date : new Date, 
            creatorId: 'u1', 
            placeId : 'p1', 
            body: formState.inputs.review.value
        }
        console.log("reviewSubmit -> newReview", newReview)
        
        DUMMY_REVIEWS.push(newReview)
    }
    return (
        <React.Fragment> 
            <form className="place-form" onSubmit={reviewSubmit}>
          <Input
            id="review"
            element="textarea"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid review (min. 5 characters)."
            onInput={inputHandler}
            initialValid={true}
          />
          <Button inverse type="submit" disabled={!formState.isValid} >
            Post review
          </Button>
        </form>
            {DUMMY_REVIEWS.map(review => ( <Review image={review.userImg} reviewBody={review.body} userName={review.creatorId}/> 
      ))}
        </React.Fragment> 
    )
}

export default ReviewList;