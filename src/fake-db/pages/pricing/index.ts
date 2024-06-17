// Type Imports
import type { PricingPlanType } from '@/types/pages/pricingTypes'

export const db: PricingPlanType[] = [
  {
    title: 'Basic',
    monthlyPrice: 0,
    currentPlan: true,
    popularPlan: false,
    subtitle: 'A simple start for everyone',
    imgSrc: '/images/illustrations/objects/pricing-basic.png',
    imgHeight: 120,
    yearlyPlan: {
      monthly: 0,
      annually: 0
    },
    planBenefits: [
      'Insights dashboards',
      'User management',
      'Invoice management',
      'Up to 3 projects',
      'Up to 5 categories per project'
    ]
  },
  {
    monthlyPrice: 29,
    title: 'Premium',
    popularPlan: true,
    currentPlan: false,
    subtitle: 'For small to medium businesses',
    imgSrc: '/images/illustrations/objects/pricing-standard.png',
    imgHeight: 120,
    yearlyPlan: {
      monthly: 20,
      annually: 240
    },
    planBenefits: [
      'Everything in basic',
      'Role management',
      'Project management',
      'Up to 20 projects',
      'Unlimited categories'
    ]
  },
  {
    monthlyPrice: 49,
    popularPlan: false,
    currentPlan: false,
    title: 'Business',
    subtitle: 'Solution for big organizations',
    imgSrc: '/images/illustrations/objects/pricing-enterprise.png',
    imgHeight: 120,
    yearlyPlan: {
      monthly: 40,
      annually: 480
    },
    planBenefits: [
      'Everything in business',
      'Custom permissions',
      'Project management',
      '100 users per tenant',
      'Alerts and notifications'
    ]
  }
]
