// React Imports
import { Fragment, useEffect, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'

// MUI Imports
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'

// Third-party Imports
import classnames from 'classnames'
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  useHover,
  offset,
  flip,
  size,
  autoUpdate,
  FloatingPortal,
  safePolygon,
  useTransitionStyles
} from '@floating-ui/react'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Link from '@components/Link'
import CustomAvatar from '@core/components/mui/Avatar'

type Props = {
  mode: Mode
  isBelowLgScreen: boolean
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
}

type MenuWrapperProps = {
  children: ReactNode
  refs: any
  isBelowLgScreen: boolean
  isOpen: boolean
  getFloatingProps: any
  top: number
  floatingStyles: CSSProperties
  isMounted: boolean
  styles: CSSProperties
}

// Constants
const pageData = [
  {
    title: 'Pricing',
    href: '/pricing'
  },
  {
    title: 'Payment',
    href: '/payment'
  },
  {
    title: 'Checkout',
    href: '/checkout'
  },
  {
    title: 'Help Center',
    href: '/help-center'
  }
]

const MenuWrapper = (props: MenuWrapperProps) => {
  // Props
  const { children, refs, isBelowLgScreen, isOpen, getFloatingProps, top, floatingStyles, isMounted, styles } = props

  if (!isBelowLgScreen) {
    return (
      <FloatingPortal>
        {isMounted && (
          <div ref={refs.setFloating} className='z-[1201] lg:z-[11]' {...getFloatingProps()} style={floatingStyles}>
            <div
              className='flex gap-8 p-8'
              style={{
                ...styles,
                overflowY: 'auto',
                background: 'var(--mui-palette-background-paper)',
                minWidth: 100,
                borderRadius: 'var(--mui-shape-borderRadius)',
                outline: 0,
                boxShadow: 'var(--mui-shadows-3)',
                maxBlockSize: `calc((var(--vh, 1vh) * 100) - ${top}px)`
              }}
            >
              {children}
            </div>
          </div>
        )}
      </FloatingPortal>
    )
  }

  return (
    <Collapse in={isOpen}>
      <div className='flex flex-col gap-6 mbs-3'>{children}</div>
    </Collapse>
  )
}

const DropdownMenu = (props: Props) => {
  // Props
  const { isBelowLgScreen, isDrawerOpen, setIsDrawerOpen } = props

  // states
  const [isOpen, setIsOpen] = useState(false)

  // hooks
  const pathname = usePathname()

  const { y, refs, floatingStyles, context } = useFloating<HTMLElement>({
    placement: 'bottom',
    open: isOpen,
    ...(!isBelowLgScreen && { onOpenChange: setIsOpen }),
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(14),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            minWidth: `${rects.reference.width}px`
          })
        },
        padding: 10
      })
    ]
  })

  // Floating UI Transition Styles
  const { isMounted, styles } = useTransitionStyles(context, {
    // Configure both open and close durations:
    duration: 300,

    initial: {
      opacity: 0,
      transform: 'translateY(10px)'
    },
    open: {
      opacity: 1,
      transform: 'translateY(0px)'
    },
    close: {
      opacity: 0,
      transform: 'translateY(10px)'
    }
  })

  const hover = useHover(context, {
    handleClose: safePolygon({
      blockPointerEvents: true
    }),
    restMs: 25,
    delay: { open: 75 }
  })

  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, role, hover])

  const Tag = isBelowLgScreen ? 'div' : Fragment

  const handleLinkClick = () => {
    if (isBelowLgScreen) {
      isDrawerOpen && setIsDrawerOpen(false)
    } else {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (!isDrawerOpen && isOpen) {
      setIsOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen])

  return (
    <Tag {...(isBelowLgScreen && { className: 'flex flex-col' })}>
      <Typography
        color='text.primary'
        component={Link}
        className={classnames('flex items-center gap-2 font-medium plb-3 pli-1.5 hover:text-primary', {
          'text-primary':
            pathname === '/payment' ||
            pathname === '/pricing' ||
            pathname === '/checkout' ||
            pathname === '/help-center' ||
            pathname === '/help-center/article/how-to-add-product-in-cart'
        })}
        {...(isBelowLgScreen
          ? {
              onClick: (e: MouseEvent) => {
                e.preventDefault()
                setIsOpen(!isOpen)
              }
            }
          : {
              ref: refs.setReference,
              ...getReferenceProps()
            })}
      >
        <span>Pages</span>
        <i
          className={classnames(
            {
              'ri-arrow-down-s-line': !isBelowLgScreen || (isBelowLgScreen && !isOpen),
              'ri-arrow-up-s-line': isBelowLgScreen && isOpen
            },
            'text-xl'
          )}
        />
      </Typography>
      <MenuWrapper
        refs={refs}
        isBelowLgScreen={isBelowLgScreen}
        isOpen={isOpen}
        getFloatingProps={getFloatingProps}
        top={y ? y - window.scrollY : 0}
        floatingStyles={floatingStyles}
        isMounted={isMounted}
        styles={styles}
      >
        <div className='flex flex-col gap-4'>
          <div className='flex gap-3 items-center'>
            <CustomAvatar variant='rounded' color='primary' skin='light'>
              <i className='ri-grid-line' />
            </CustomAvatar>
            <Typography variant='h6'>Page</Typography>
          </div>
          {pageData.map((page, index) => (
            <Link
              key={index}
              href={page.href}
              className={classnames('flex items-center gap-3 focus:outline-none hover:text-primary', {
                'text-primary': pathname.includes(page.href)
              })}
              onClick={handleLinkClick}
            >
              <i className='ri-circle-line text-[10px]' />
              <span>{page.title}</span>
            </Link>
          ))}
        </div>
      </MenuWrapper>
    </Tag>
  )
}

export default DropdownMenu
