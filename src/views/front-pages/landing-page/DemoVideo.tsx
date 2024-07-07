// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// Type Imports
import useMediaQuery from '@mui/material/useMediaQuery'

import type { Mode } from '@core/types'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import ElementOne from '@/assets/svg/front-pages/landing-page/ElementOne'
import Lines from '@assets/svg/front-pages/landing-page/Lines'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'
import ReactPlayer from '@/libs/ReactPlayer'

// ** Component Imports
import CustomIconButton from '@core/components/mui/IconButton'
import { useImageVariant } from '@/@core/hooks/useImageVariant'

const DemoVideo = ({ mode }: { mode: Mode }) => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { updateIntersections } = useIntersection()
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  // Vars
  const dashboardImageLight = '/images/front-pages/landing-page/hero-dashboard-light.png'
  const dashboardImageDark = '/images/front-pages/landing-page/hero-dashboard-dark.png'

  const dashboardImage = useImageVariant(mode, dashboardImageLight, dashboardImageDark)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='team' className='plb-[100px] bg-backgroundPaper' ref={ref}>
      <div className={frontCommonStyles.layoutSpacing}>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex is-full justify-center relative'>
            <ElementOne className='absolute inline-end-0' />
            <div className='flex items-center justify-center mbe-6 gap-3'>
              <Lines />
              <Typography color='text.primary' className='font-medium uppercase'>
                Demo Video
              </Typography>
            </div>
          </div>
          <div className='flex items-center justify-center flex-wrap gap-2 mbe-3 sm:mbe-1'>
            <Typography variant='h4' className='font-bold'>
              Give you
            </Typography>
            <Typography variant='h5'> the first glance</Typography>
          </div>
          <Typography color='text.secondary' className='font-medium text-center'>
            What does this app looks like?
          </Typography>
        </div>
        <Grid
          container
          rowSpacing={16}
          columnSpacing={6}
          className='mbe-8 pbs-[50px] flex justify-center items-center m-auto'
          width={smallScreen ? 460 : 740}
        >
          <ReactPlayer
            playing
            controls
            url='https://www.youtube.com/watch?v=FGgHjYCP5hQ'
            height={smallScreen ? 280 : 440}
            className='bg-black !is-full'
            light={
              <img src={dashboardImage} alt='Thumbnail' className='is-full bs-full object-cover bg-backgroundPaper' />
            }
            playIcon={
              <CustomIconButton variant='contained' color='error' className='absolute rounded-full'>
                <i className='ri-play-line text-2xl' />
              </CustomIconButton>
            }
          />
        </Grid>
      </div>
    </section>
  )
}

export default DemoVideo
