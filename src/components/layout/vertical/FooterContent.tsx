'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import IconButton from '@mui/material/IconButton'

import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()}, Made with `}</span>
        <span>{`❤️`}</span>
        <span>{` by `}</span>
        <Link href='https://themeselection.com' target='_blank' className='text-primary'>
          ThemeSelection
        </Link>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <IconButton component={Link} size='small' href='https://github.com/dylan751' target='_blank'>
            <i className='ri-github-fill text-white text-lg' />
          </IconButton>
          <IconButton
            component={Link}
            size='small'
            href='https://www.facebook.com/duong.nguyenhai.7140/'
            target='_blank'
          >
            <i className='ri-facebook-fill text-white text-lg' />
          </IconButton>
          <IconButton component={Link} size='small' href='https://www.linkedin.com/in/zuongnh/' target='_blank'>
            <i className='ri-linkedin-fill text-white text-lg' />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default FooterContent
