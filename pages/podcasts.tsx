import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import OmniAural, { useOmniAural } from 'omniaural'
import type { Podcast } from 'podverse-shared'
import { useEffect, useRef, useState } from 'react'
import { List, PageHeader, PageScrollableContent, Pagination, PodcastListItem,
  scrollToTopOfPageScrollableContent } from '~/components'
import { Page } from '~/lib/utility/page'
import { PV } from '~/resources'
import { getServerSideAuthenticatedUserInfo } from '~/services/auth'
import { getPodcastsByQuery } from '~/services/podcast'
import { getServerSideUserQueueItems } from '~/services/userQueueItem'

interface ServerProps extends Page {
  serverFilterFrom: string
  serverFilterPage: number
  serverFilterSort: string
  serverPodcastsListData: Podcast[]
  serverPodcastsListDataCount: number
}

const keyPrefix = 'pages_podcasts'

export default function Podcasts(props: ServerProps) {

  /* Initialize */

  const { serverFilterFrom, serverFilterPage, serverFilterSort,
    serverPodcastsListData, serverPodcastsListDataCount } = props

  const router = useRouter()
  const { t } = useTranslation()
  
  const [filterFrom, setFilterFrom] = useState<string>(serverFilterFrom)
  const [filterPage, setFilterPage] = useState<number>(serverFilterPage)
  const [filterSort, setFilterSort] = useState<string>(serverFilterSort)
  const [podcastsListData, setListData] = useState<Podcast[]>(serverPodcastsListData)
  const [podcastsListDataCount, setListDataCount] = useState<number>(serverPodcastsListDataCount)
  const [userInfo] = useOmniAural('session.userInfo')
  const initialRender = useRef(true)

  const pageCount = Math.ceil(podcastsListDataCount / PV.Config.QUERY_RESULTS_LIMIT_DEFAULT)

  const pageTitle = router.pathname == PV.RoutePaths.web.podcasts ? t('Podcasts') : t('Podverse')

  /* useEffects */

  useEffect(() => {
    (async () => {
      if (initialRender.current) {
        initialRender.current = false;
      } else {
        OmniAural.pageIsLoadingShow()
        const { data } = await clientQueryPodcasts()
        const [newListData, newListCount] = data
        setListData(newListData)
        setListDataCount(newListCount)
        scrollToTopOfPageScrollableContent()
        OmniAural.pageIsLoadingHide()
      }
    })()
  }, [filterFrom, filterSort, filterPage])

  /* Client-Side Queries */

  const clientQueryPodcasts = async () => {
    if (filterFrom === PV.Filters.from._all) {
      return clientQueryPodcastsAll()
    } else if (filterFrom === PV.Filters.from._subscribed) {
      return clientQueryPodcastsBySubscribed()
    } else if (filterFrom === PV.Filters.from._category) {
      //
    }
  }

  const clientQueryPodcastsAll = async () => {
    const finalQuery = {
      ...(filterPage ? { page: filterPage } : {}),
      ...(filterSort ? { sort: filterSort } : {})
    }
    return getPodcastsByQuery(finalQuery)
  }

  const clientQueryPodcastsBySubscribed = async () => {
    const subscribedPodcastIds = userInfo?.subscribedPodcastIds || []
    const finalQuery = {
      podcastIds: subscribedPodcastIds,
      ...(filterPage ? { page: filterPage } : {}),
      ...(filterSort ? { sort: filterSort } : {})
    }
    return getPodcastsByQuery(finalQuery)
  }

  // const clientQueryPodcastsByCategory = async () => {

  // }

  /* Render Helpers */

  const generateFromOptions = (t: any) => [
    { label: t('All'), key: PV.Filters.from._all },
    { label: t('Subscribed'), key: PV.Filters.from._subscribed },
    // { label: t('Categories'), key: PV.Filters.from._category }
  ]

  const generateSortOptions = (t: any) => {

    return [
      ...(filterFrom === PV.Filters.from._subscribed
        ? [{ label: t('Alphabetical'), key: PV.Filters.sort._alphabetical }]
        : []),
      ...(filterFrom === PV.Filters.from._subscribed
        ? [{ label: t('Recent'), key: PV.Filters.sort._mostRecent }]
        : []),
      { label: t('Top - Past Day'), key: PV.Filters.sort._topPastDay },
      { label: t('Top - Past Week'), key: PV.Filters.sort._topPastWeek },
      { label: t('Top - Past Month'), key: PV.Filters.sort._topPastMonth },
      { label: t('Top - Past Year'), key: PV.Filters.sort._topPastYear },
      { label: t('Top - All Time'), key: PV.Filters.sort._topAllTime },
      ...(filterFrom === PV.Filters.from._subscribed
        ? [{ label: t('Oldest'), key: PV.Filters.sort._oldest }]
        : []),
    ]
  }
  
  const generatePodcastListElements = (listItems: Podcast[]) => {
    return listItems.map((listItem, index) =>
      <PodcastListItem
        key={`${keyPrefix}-${index}`}
        podcast={listItem} />
    )
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader
        primaryOnChange={(selectedItems: any[]) => {
          const selectedItem = selectedItems[0]
          if (selectedItem.key !== filterFrom) setFilterPage(1)
          setFilterFrom(selectedItem.key)
        }}
        primaryOptions={generateFromOptions(t)}
        primarySelected={filterFrom}
        sortOnChange={(selectedItems: any[]) => {
          const selectedItem = selectedItems[0]
          if (selectedItem.key !== filterSort) setFilterPage(1)
          setFilterSort(selectedItem.key)
        }}
        sortOptions={generateSortOptions(t)}
        sortSelected={filterSort}
        text={t('Podcasts')} />
      <PageScrollableContent>
        <List>
          {generatePodcastListElements(podcastsListData)}
        </List>
        <Pagination
          currentPageIndex={filterPage}
          handlePageNavigate={(newPage) => setFilterPage(newPage)}
          handlePageNext={() => {
            const newPage = filterPage + 1
            if (newPage <= pageCount) setFilterPage(newPage)
          }}
          handlePagePrevious={() => {
            const newPage = filterPage - 1
            if (newPage > 0) setFilterPage(newPage)
          }}
          pageCount={pageCount} />
      </PageScrollableContent>
    </>
  )
}

/* Server-Side Logic */

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, locale } = ctx
  const { cookies } = req

  const userInfo = await getServerSideAuthenticatedUserInfo(cookies)
  const userQueueItems = await getServerSideUserQueueItems(cookies)
  const serverFilterFrom = userInfo ? PV.Filters.from._subscribed : PV.Filters.from._all
  const serverFilterSort = userInfo ? PV.Filters.sort._alphabetical : PV.Filters.sort._topPastDay
  
  const serverFilterPage = 1
  let response = null
  if (userInfo) {
    response = await getPodcastsByQuery({
      podcastIds: userInfo.subscribedPodcastIds,
      sort: serverFilterSort
    })
  } else {
    response = await getPodcastsByQuery({
      sort: serverFilterSort
    })
  }
  
  const [podcastsListData, podcastsListDataCount] = response.data
  
  const serverProps: ServerProps = {
    serverUserInfo: userInfo,
    serverUserQueueItems: userQueueItems,
    ...(await serverSideTranslations(locale, PV.i18n.fileNames.all)),
    serverFilterFrom,
    serverFilterPage,
    serverFilterSort,
    serverPodcastsListData: podcastsListData,
    serverPodcastsListDataCount: podcastsListDataCount,
    serverCookies: cookies
  }

  return { props: serverProps }
}
