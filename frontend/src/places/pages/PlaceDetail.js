import React, { useState, useHistory, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHttpClient } from '../../shared/hooks/http-hook';

import PlaceDetailItem from '../components/PlaceDetailItem';
import ReviewList from '../components/ReviewList';
import './PlaceDetail.css'

const PlaceDetail = () => {
   
    const { userId, placeId}  = useParams();
    const [loadedPlace, setLoadedPlace] = useState(null);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchPlace = async () => {
          try {
            const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
            );
            setLoadedPlace(responseData.place);

          } catch (err) {}
        }
        fetchPlace()
      }, [sendRequest, userId])
    
 
    return (
      <React.Fragment>

        <div className= "placeDetail-container">
      {
        loadedPlace &&  <PlaceDetailItem
        key={loadedPlace.id}
        id={loadedPlace.id}
        image={loadedPlace.image}
        title={loadedPlace.title}
        description={loadedPlace.description}
        address={loadedPlace.address}
        creatorId={loadedPlace.creator}
        coordinates={loadedPlace.location}

      />
      }
      {
        loadedPlace &&<div>
					<ReviewList  placeUrl={`${process.env.REACT_APP_ASSET_URL}/${loadedPlace.image}`} placeId={placeId} className='review-list' />
				</div>}
      </div>
      
       </React.Fragment>
           
      );



}







export default PlaceDetail;