import React, { useState, useContext } from 'react'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookSquare,
  faTwitterSquare,
  faPinterestSquare,
} from '@fortawesome/free-brands-svg-icons'
import { Helmet } from 'react-helmet'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'
// import ReviewList from './ReviewList'
import './PlaceItem.css'

const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showReviews, setShowReviews] = useState(false)

  const openReviews = () => setShowReviews(true)

  const closeReviews = () => setShowReviews(false)

  const openMapHandler = () => setShowMap(true)

  const closeMapHandler = () => setShowMap(false)

  const showDeleteWarningHandler = () => setShowConfirmModal(true)

  const cancelDeleteHandler = () => setShowConfirmModal(false)
  const closeShowHandler = () => setShowShareModal(false)
  const { description, image } = props
  const url = window.document.location.href

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${props.title}`,
        text: `${props.title} is a great place to visit`,
        url: url,
      })
    } else {
      setShowShareModal(true)
    }
  }

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/share_button.php?url=${url}&via=Sitename&text=${description}`,
      'Twitter Share',
      'width=620, height=620'
    )
    setShowShareModal(false)
    return false
  }

  const shareOnTwitter = () => {
    window.open(
      `http://www.twitter.com/share?u=${url}&via=Sitename&text=${description}`,
      'Facebook Share',
      'width=620, height=620'
    )
    setShowShareModal(false)
    return false
  }

  const shareOnPinterest = () => {
    setShowShareModal(false)
  }

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false)
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      )
      props.onDelete(props.id)
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta property="og:type" content="Social Media APP" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.image} />
      </Helmet>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        className="reviewsModal"
        show={showReviews}
        onCancel={closeReviews}
        header={'Reviews'}
      >
        {/* <div>
					<ReviewList placeUrl={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} placeId={props.id} className='review-list' />
				</div> */}
      </Modal>
      <Modal
        show={showShareModal}
        onCancel={closeShowHandler}
        header={'Share place on social media'}
      >
        <div className="place-item__actions">
          <div className="share-button-container">
              <div className ="share-icon">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                color="#3b5998"
                size="4x"
                onClick={shareOnFacebook}
              />
              </div>
              <div className ="share-icon">
              <FontAwesomeIcon
                icon={faTwitterSquare}
                color="#38A1F3"
                size="4x"
                onClick={shareOnTwitter}
              />
              </div>
              <div className ="share-icon">

              <a
                href={`https://www.pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${description}&via=Sitename&`}
              >
                <FontAwesomeIcon
                className = "share-icon"
                  icon={faPinterestSquare}
                  color="#c8232c"
                  size="4x"
                  onClick={shareOnPinterest}
                />
              </a>
              </div>

          </div>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          
          {isLoading && <LoadingSpinner asOverlay />}

          <div className="place-item__image">
            <img src={`${props.image}`} alt={props.title} />
          </div>
          <div className="place-item__info">
            <div className="title-block">
              <h2>{props.title}</h2>
              <div className="font-awesome__share" onClick={handleShareClick}>
                <FontAwesomeIcon icon={faShareAlt} size="2x" />
              </div>
            </div>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>

            <Button to={`/places/${props.creatorId}/${props.id}/`}>
              DETAILS
            </Button>

            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  )
}

export default PlaceItem
