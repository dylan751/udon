// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Badge from '@mui/material/Badge'
import Rating from '@mui/material/Rating'

// Third-party Imports
import type { TrackDetails } from 'keen-slider/react'
import { useKeenSlider } from 'keen-slider/react'
import classnames from 'classnames'

// Styled Component Imports
import AppKeenSlider from '@/libs/styles/AppKeenSlider'

// SVG Imports
import Lines from '@assets/svg/front-pages/landing-page/Lines'

import LaptopCharging from '@/assets/svg/front-pages/landing-page/LaptopCharging'
import ElementOne from '@/assets/svg/front-pages/landing-page/ElementOne'
import ElementTwo from '@/assets/svg/front-pages/landing-page/ElementTwo'
import Curve from '@/assets/svg/front-pages/landing-page/Curve'
import Cube from '@/assets/svg/front-pages/landing-page/Cube'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const data = [
  {
    desc: 'If you are a startup or a small business, using the Basic package is fine. In case there are too many projects, you can just hide the old projects.',
    svg: <Cube color='#2882C3' />,
    rating: 5,
    name: 'Duong Nguyen',
    position: 'Founder of Cashbook'
  },
  {
    desc: 'As a startup/business owner, you can also take advantage of the resource of 2 users to add 1 accountant, or outsource accounting.',
    svg: <LaptopCharging color='#A8112E' />,
    rating: 5,
    name: 'Duong Nguyen',
    position: 'Founder of Cashbook'
  },
  {
    desc: 'If you are already a business with a stable revenue source and a large number of projects, use the Premium package.',
    svg: <ElementTwo color='#FF5A60' />,
    rating: 4,
    name: 'Duong Nguyen',
    position: 'CTO of Cashbook'
  },
  {
    desc: 'The Premiun package will help you share work among many members of the accounting department, and easily control regulations levels and metrics online',
    svg: <ElementOne color='#F39409' />,
    rating: 5,
    name: 'Duong Nguyen',
    position: 'Founder of Cashbook'
  },
  {
    desc: 'If you are an outsourced accountant, encourage your client businesses to open Free accounts using Premium package.',
    svg: <Curve color='#ea4c89' />,
    rating: 5,
    name: 'Duong Nguyen',
    position: 'Founder of Cashbook'
  },
  {
    desc: "As an outsourced accountant, using the above way you will independently manage each customer's information, without mixing up data.",
    svg: <Cube color='#2882C3' />,
    rating: 5,
    name: 'Duong Nguyen',
    position: 'CTO of Cashbook',
    color: '#2882C3'
  },
  {
    desc: 'For every service package, we always leave the number of users for each organization >=2 to ensure the teamwork advantage of the system.',
    svg: <LaptopCharging color='#A8112E' />,
    rating: 5,
    name: 'Duong Nguyen',
    position: 'Founder of Cashbook'
  }
]

const CustomerReviews = () => {
  // States
  const [loaded, setLoaded] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [details, setDetails] = useState<TrackDetails>()

  // Hooks
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slideChanged: slider => setCurrentSlide(slider.track.details.rel),
      created: () => setLoaded(true),
      detailsChanged: s => setDetails(s.track.details),
      slides: {
        perView: 4,
        origin: 'center'
      },
      breakpoints: {
        '(max-width: 1200px)': {
          slides: {
            perView: 3,
            spacing: 26,
            origin: 'center'
          }
        },
        '(max-width: 900px)': {
          slides: {
            perView: 2,
            spacing: 26,
            origin: 'center'
          }
        },
        '(max-width: 600px)': {
          slides: {
            perView: 1,
            spacing: 26,
            origin: 'center'
          }
        }
      }
    },
    [
      slider => {
        let timeout: ReturnType<typeof setTimeout>
        const mouseOver = false

        function clearNextTimeout() {
          clearTimeout(timeout)
        }

        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }

        slider.on('created', nextTimeout)
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      }
    ]
  )

  const scaleStyle = (idx: number) => {
    if (!details) return {}
    const activeSlideIndex = details.rel

    return {
      transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
      ...(activeSlideIndex === idx ? { transform: 'scale(1)', opacity: 1 } : { transform: 'scale(0.9)', opacity: 0.5 })
    }
  }

  return (
    <section className='flex flex-col gap-16 plb-[100px]'>
      <div className={classnames('flex flex-col items-center justify-center', frontCommonStyles.layoutSpacing)}>
        <div className='flex items-center justify-center mbe-6 gap-3'>
          <Lines />
          <Typography color='text.primary' className='font-medium uppercase'>
            Real Reviews
          </Typography>
        </div>
        <div className='flex items-center gap-2 mbe-1'>
          <Typography variant='h4' className='font-bold'>
            Success stories
          </Typography>
          <Typography variant='h5'>from us</Typography>
        </div>
        <Typography color='text.secondary' className='font-medium text-center'>
          See what we suggest to enhance your own experience.
        </Typography>
      </div>
      <AppKeenSlider>
        <>
          <div ref={sliderRef} className='keen-slider mbe-6'>
            {data.map((item, index) => (
              <div key={index} className='keen-slider__slide flex p-6 sm:p-4'>
                <Card elevation={8} className='flex items-center' style={scaleStyle(index)}>
                  <CardContent className='p-8 items-center mlb-auto'>
                    <div className='flex flex-col gap-4 items-center justify-center text-center'>
                      {item.svg}
                      <Typography color='text.primary'>{item.desc}</Typography>
                      <Rating value={item.rating} readOnly />
                      <div>
                        <Typography color='text.primary' className='font-medium'>
                          {item.name}
                        </Typography>
                        <Typography variant='body2'>{item.position}</Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <div className='swiper-dots'>
              {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
                return (
                  <Badge
                    key={idx}
                    variant='dot'
                    component='div'
                    className={classnames({ active: currentSlide === idx })}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                  />
                )
              })}
            </div>
          )}
        </>
      </AppKeenSlider>
      <div className='flex flex-wrap items-center justify-center gap-x-16 gap-y-6 mli-3'>
        <LaptopCharging color='var(--mui-palette-text-secondary)' />
        <ElementOne color='var(--mui-palette-text-secondary)' />
        <ElementTwo color='var(--mui-palette-text-secondary)' />
        <Cube color='var(--mui-palette-text-secondary)' />
        <Curve color='var(--mui-palette-text-secondary)' />
      </div>
    </section>
  )
}

export default CustomerReviews
