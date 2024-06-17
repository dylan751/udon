// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports

// SVG Imports
import Lines from '@assets/svg/front-pages/landing-page/Lines'
import LaptopCharging from '@assets/svg/front-pages/landing-page/LaptopCharging'
import TransitionUp from '@assets/svg/front-pages/landing-page/TransitionUp'
import Edit from '@assets/svg/front-pages/landing-page/Edit'
import Cube from '@assets/svg/front-pages/landing-page/Cube'
import LifeBuoy from '@assets/svg/front-pages/landing-page/Lifebuoy'
import Document from '@assets/svg/front-pages/landing-page/Document'

import { useIntersection } from '@/hooks/useIntersection'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const feature = [
  {
    icon: <LaptopCharging />,
    title: 'Spend Less Time',
    description: 'Automate tedious and repetitive tasks and speed up manual processes'
  },
  {
    icon: <TransitionUp />,
    title: 'More Visibility',
    description: 'Find out more about your Financial usage and discover Uncategorized Invoices'
  },
  {
    icon: <Edit />,
    title: 'Reduce Costs',
    description: 'Optimize your Project spending and uncover falsy datas'
  },
  {
    icon: <Cube />,
    title: 'Manage People',
    description: 'Onboard newcomers and safely assign role for them'
  },
  {
    icon: <LifeBuoy />,
    title: 'Excellent Support',
    description: 'An easy-to-follow doc with lots of references and code examples.'
  },
  {
    icon: <Document />,
    title: 'Well Documented',
    description: 'An easy-to-follow doc with lots of references and code examples.'
  }
]

const UsefulFeature = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { updateIntersections } = useIntersection()

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
    <section id='features' ref={ref} className='bg-backgroundPaper'>
      <div className={classnames('flex flex-col gap-12 plb-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center mbe-6 gap-3'>
            <Lines />
            <Typography color='text.primary' className='font-medium uppercase'>
              Useful Feature
            </Typography>
          </div>
          <div className='flex items-center justify-center flex-wrap gap-2 mbe-2 sm:mbe-1'>
            <Typography variant='h4' className='font-bold'>
              Everything you need
            </Typography>
            <Typography variant='h5'>to manage your next project</Typography>
          </div>
          <Typography className='font-medium text-center'>
            Not just a set of tools, the app includes innovative solutions for highly effective IT teams.
          </Typography>
        </div>
        <div>
          <Grid container columnSpacing={6} rowSpacing={12}>
            {feature.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  <div className={classnames('mbe-2', styles.featureIcon)}>
                    <div className='flex items-center border-2 rounded-full p-5 is-[82px] bs-[82px]'>{item.icon}</div>
                  </div>
                  <Typography variant='h5'>{item.title}</Typography>
                  <Typography className='max-is-[364px] text-center'>{item.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default UsefulFeature
