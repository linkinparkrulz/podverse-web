import Head from 'next/head'
import { PV } from '~/resources'
import { seoMetaDescription, seoMetaTitle } from '~/lib/utility/metaTags'

type Props = {
  description?: string
  iphoneCustomScheme?: string
  isVideo?: boolean
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  ogTitle?: string
  ogType?: string
  ogUrl?: string
  robotsNoIndex?: boolean
  title?: string
  twitterDescription?: string
  twitterImage?: string
  twitterImageAlt?: string
  twitterPlayerUrl?: string
  twitterTitle?: string
}

export const Meta = ({
  description = '',
  iphoneCustomScheme = '',
  isVideo = false,
  ogDescription = '',
  ogImage = '',
  ogImageAlt = '',
  ogTitle = '',
  ogType = '',
  ogUrl = '',
  robotsNoIndex = false,
  title = '',
  twitterDescription = '',
  twitterImage = '',
  twitterImageAlt = '',
  twitterPlayerUrl = '',
  twitterTitle = ''
}: Props) => {
  // Twitter images are cached by URL, and do not update. To make sure the latest image is used,
  // we're setting the cacheBustUrlParam as a url parameter in the meta tag.
  // const cacheBustUrlParam = '?cacheBust=' + new Date().toISOString().slice(0, 10) + '-' + new Date().getHours()
  // NOTE: disabling cacheBust as it appears to have been breaking twitter image previews

  const ogImg = !ogImage ? PV.Config.metaDefaultImageUrl1200x630 : ogImage
  const twitterImg = !twitterImage ? PV.Config.metaDefaultImageUrl1200x630 : twitterImage // + cacheBustUrlParam

  const seoTitle = seoMetaTitle(title)
  const seoOGTitle = seoMetaTitle(ogTitle)
  const seoTwitterTitle = seoMetaTitle(twitterTitle)

  const seoDescription = seoMetaDescription(description)
  const seoOGDescription = seoMetaDescription(ogDescription)
  const seoTwitterDescription = seoMetaDescription(twitterDescription)

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='no-email-collection' content={PV.RoutePaths.web.unspam} />
      {robotsNoIndex && <meta name='robots' content='noindex' />}

      {/* Favicons */}
      <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/images/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/images/favicon-16x16.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/images/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#0f1235' />

      <meta name='description' content={seoDescription} />

      {/* <meta name='apple-itunes-app' content='app-id=1390888454' /> */}

      {/* Open Graph meta tags  */}
      <meta property='og:title' content={seoOGTitle} />
      <meta property='og:type' content={ogType} />
      <meta property='og:image' content={ogImg} />
      <meta property='og:image:alt' content={ogImageAlt || 'Podverse logo'} />
      <meta property='og:image:secure_url' content={ogImg} />
      <meta property='og:description' content={seoOGDescription} />
      <meta property='og:site_name' content='Podverse' />
      <meta property='og:url' content={ogUrl} />
      <meta property='fb:app_id' content='300336890140007' />

      {/* Twitter global meta tags */}
      {twitterPlayerUrl && (
        <>
          <meta name='twitter:card' content='player' />
          <meta name='twitter:player' content={twitterPlayerUrl} />
          <meta name='twitter:player:height' content={isVideo ? '675' : '166'} />
          <meta name='twitter:player:width' content={isVideo ? '1200' : '500'} />
        </>
      )}
      <meta name='twitter:site' content='@podverse' />
      <meta name='twitter:site:id' content='2555941009' />
      <meta name='twitter:creator' content='@podverse' />
      <meta name='twitter:creator:id' content='2555941009' />
      <meta name='twitter:app:name:iphone' content='Podverse' />
      <meta name='twitter:app:id:iphone' content='1390888454' />
      {iphoneCustomScheme && <meta name='twitter:app:url:iphone' content={iphoneCustomScheme} />}
      {/* <meta name='twitter:app:name:ipad' content='Name of your iPad optimized app' /> 
      <meta name='twitter:app:id:ipad' content='Your app ID in the iTunes App Store' /> 
      <meta name='twitter:app:url:ipad' content='Your app’s custom URL scheme' /> 
      <meta name='twitter:app:name:googleplay' content='Name of your Android app' /> 
      <meta name='twitter:app:id:googleplay' content='Your app ID in the Google Play Store' /> 
      <meta name='twitter:app:url:googleplay' content='Your app’s custom URL scheme' />  */}

      {/* Twitter page-specific meta tags */}
      {!twitterPlayerUrl && <meta name='twitter:card' content='summary_large_image' />}
      <meta name='twitter:description' content={seoTwitterDescription} />
      <meta name='twitter:title' content={seoTwitterTitle} />
      <meta name='twitter:image' content={twitterImg} />
      <meta name='twitter:image:alt' content={twitterImageAlt || 'Podverse logo'} />
    </Head>
  )
}
