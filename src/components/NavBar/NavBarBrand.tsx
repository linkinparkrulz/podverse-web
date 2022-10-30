import { useTranslation } from 'react-i18next'
import { PVLink } from '~/components'
import { eventNavBarLinkClicked } from '~/lib/utility/events'

type Props = {
  height: number
  href: string
  target?: '_blank'
  width: number
}

export const NavBarBrand = ({ height, href, target, width }: Props) => {
  const { t } = useTranslation()

  return (
    <PVLink
      ariaLabel={t('Home page')}
      className='navbar__brand'
      href={href}
      onClick={() => eventNavBarLinkClicked('podcasts')}
      target={target}
    >
      <BrandSVG alt='' aria-hidden height={height} width={width} />
    </PVLink>
  )
}

function BrandSVG(props) {
  return (
    <svg viewBox='11.56 138.776 465.5 80' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        className='st1'
        d='M75.3 50.2c-1-3.7-6.1-5.7-8.3-2.2l9 32c3.8 0 7.2-1.4 5.9-6.3l-6.6-23.5zM102.3 50.2l-6.6 23.6c-1.4 5.1 1.8 6.1 5.4 6.1l9.2-32.4c-2.4-2.8-7-.8-8 2.7zM25.9 5.7c13.7 0 19.3 10.2 19.3 20.3 0 10.3-5.6 20.2-19.3 20.2h-17v24.3H0V5.7h25.9zm-17 8.1V38h16.5c7.9 0 11.1-6 11.1-12.1 0-5.9-3.1-12.1-10.6-12.1h-17zM135.7 70.5V5.7h25.1c18.5 0 29.2 14.1 29.2 32.6 0 18.4-10.7 32.3-29.2 32.3h-25.1zm25.1-8.2c13.5 0 20.4-10.5 20.4-24.1 0-13.7-7-24.4-20.4-24.4h-16.4v48.5h16.4zM203.3 5.7 221 48.2l17.6-42.6H253l-25.9 64.9h-12.2L189 5.7h14.3zM258.7 5.7h41.1v12.1h-27.3v14.8h23.9v12h-23.9v13.8h28.2v12.1h-41.9V5.7zM359.5 70.5H343l-14.5-22.4h-3.1v22.4h-13.8V5.7h26.6c14.7 0 21.6 10.6 21.6 21.3 0 9.2-5.1 18.3-16.2 20.6l15.9 22.9zm-34.1-52.7v18.3H337c5.4 0 8.2-4.9 8.2-9.1 0-4-2.6-9.1-7.8-9.1h-12zM380.4 51.5c.2 4.1 3.5 7.8 9.7 7.8 5.6 0 9.4-2.6 9.5-6.9.1-2.9-1.2-5.5-7.8-7.3l-7.8-2.2c-14.3-4.4-16.8-12.8-16.8-18.6 0-11.6 9.9-19.4 22.3-19.4 12.5 0 21.9 7.4 21.9 19.9h-13.7c0-4.3-2.9-7.3-8.4-7.3-4.8 0-8.4 2.6-8.4 6.5 0 1.7.7 4.8 7 6.6l7.7 2.4c15.7 4.5 18 13.4 17.8 19.6-.2 12.9-11.9 19-23.4 19-14.1 0-23.5-8.4-23.5-20.1h13.9zM423.5 5.7h41.1v12.1h-27.3v14.8h23.9v12h-23.9v13.8h28.2v12.1h-41.9V5.7z'
        style={{
          fill: 'var(--pv-embed-text-color-primary, #ffffff)'
        }}
        transform='translate(11.56 138.776)'
      />
      <path
        className='st1'
        d='M129.4 39.9c0-22-17.9-39.9-39.9-39.9S49.6 17.9 49.6 39.9c0 9.8 3.6 18.8 9.4 25.7 1.1 5.8 4.9 11.3 10.5 13.3 1.1.4 2.5.8 4.1 1L65 49.6c-1.9 1.2-3.5 3-4.6 5.1-2.3-4.4-3.6-9.4-3.6-14.7C57 22 71.6 7.4 89.5 7.4c18 0 32.6 14.6 32.6 32.6 0 5.9-1.6 11.4-4.4 16.2-1.1-2.9-3.1-5.3-5.7-6.8l-8.6 30.5c.6-.1 1.2-.1 1.7-.2 6.3-.7 11.1-6 12.9-11.8 7.1-7.3 11.4-17.1 11.4-28z'
        style={{
          fill: 'var(--pv-embed-text-color-primary, #ffffff)'
        }}
        transform='translate(11.56 138.776)'
      />
    </svg>
  )
}
