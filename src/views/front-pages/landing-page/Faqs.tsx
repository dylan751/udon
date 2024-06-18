// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import ElementOne from '@/assets/svg/front-pages/landing-page/ElementOne'
import Lines from '@assets/svg/front-pages/landing-page/Lines'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

type FaqsDataTypes = {
  id: string
  question: string
  active?: boolean
  answer: string
}

const FaqsData: FaqsDataTypes[] = [
  {
    id: 'panel1',
    question: 'Do you charge for each upgrade?',
    answer:
      'No, we do not charge for each upgrade. Our upgrade process is designed to be seamless and cost-effective, providing users with enhanced features and capabilities without additional fees for each upgrade. Instead, users can enjoy a range of subscription plans that include access to all updates and new features as they are released.'
  },
  {
    id: 'panel2',
    question: 'What is basic plan?',
    active: true,
    answer:
      'The basic plan of our financial management website is free and includes access to insights dashboards, user management, and invoice management. It supports up to 2 users per tenant, allows for managing up to 3 projects, and includes up to 5 categories per project.'
  },
  {
    id: 'panel3',
    question: 'What is business plan?',
    answer:
      'The business plan of our financial management website is $49 per month. It includes everything in the business plan plus some advanced features: Custom permissions, project management & support for up to 100 users per tenant, customizable options, and over-expense alerts and notifications.'
  },
  {
    id: 'panel4',
    question: 'How can I start using the service?',
    answer:
      'You can start using the service by signing up at our website. Simply visit https://hdwallet.toolhub.app, create a new account or sign up using Google, start the free trials and choose the plan that best suits your needs.'
  }
]

const Faqs = () => {
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
    <section
      id='faq'
      ref={ref}
      className={classnames('flex flex-col gap-16 plb-[100px]', frontCommonStyles.layoutSpacing)}
    >
      <div className='flex flex-col items-center justify-center'>
        <div className='flex is-full justify-center items-center relative'>
          <ElementOne className='absolute inline-end-0' />
          <div className='flex items-center justify-center mbe-6 gap-3'>
            <Lines />
            <Typography color='text.primary' className='font-medium uppercase'>
              Faq
            </Typography>
          </div>
        </div>
        <div className='flex items-center flex-wrap justify-center gap-x-2 mbe-1'>
          <Typography variant='h5'>Frequently asked</Typography>
          <Typography variant='h4' className='font-bold'>
            questions
          </Typography>
        </div>
        <Typography color='text.secondary' className='font-medium text-center'>
          Browse through these FAQs to find answers to commonly asked questions.
        </Typography>
      </div>
      <div>
        <Grid container>
          <Grid item xs={12} lg={5} className='text-center'>
            <img
              src='/images/front-pages/landing-page/sitting-girl-with-laptop.png'
              alt='girl with laptop'
              className='is-[80%] max-is-[320px]'
            />
          </Grid>
          <Grid item xs={12} lg={7}>
            <div>
              {FaqsData.map((data, index) => {
                return (
                  <Accordion key={index} defaultExpanded={data.active}>
                    <AccordionSummary aria-controls={data.id + '-content'} id={data.id + '-header'}>
                      {data.question}
                    </AccordionSummary>
                    <AccordionDetails>{data.answer}</AccordionDetails>
                  </Accordion>
                )
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  )
}

export default Faqs
