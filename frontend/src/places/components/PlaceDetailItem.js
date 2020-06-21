import React, { useState, useContext } from 'react'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookSquare,
  faTwitterSquare,
  faPinterestSquare,
} from '@fortawesome/free-brands-svg-icons'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import './PlaceDetailItem.css'

const PlaceDetailItem = (props) => {
  const [showShareModal, setShowShareModal] = useState(false)

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `${props.title}`,
        text: `${props.title} is a great place to visit`,
        url: '',
      })
    } else {
      setShowShareModal(true)
    }
  }
  const closeShowHandler = () => setShowShareModal(false)

  const shareOnFacebook = () => {
    const { description } = props
    const url = window.document.location.href

    window.open(
      `https://www.facebook.com/sharer/share_button.php?url=${url}&via=Sitename&text=${description}`,
      'Twitter Share',
      'width=620, height=620'
    )
    setShowShareModal(false)
    return false
  }

  const shareOnTwitter = () => {
    const { description } = props

    const url = window.document.location.href

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

  return (
    <React.Fragment>
      <ErrorModal error={props.error} onClear={props.clearError} />
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
              <FontAwesomeIcon
                icon={faPinterestSquare}
                color="#c8232c"
                size="4x"
                onClick={shareOnPinterest}
              />
            </div>
          </div>
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {props.isLoading && <LoadingSpinner asOverlay />}
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
          
        </Card>
      </li>
    </React.Fragment>
  )
}

export default PlaceDetailItem
