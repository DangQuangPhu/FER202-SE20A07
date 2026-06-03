import React from 'react'
import { Carousel } from 'react-bootstrap'
import { BannersData } from '../shared/ListOfBanners'


export default function BannerCarousel() {
  return (
     <Carousel>
      {BannersData.map((banner, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
          />

          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
