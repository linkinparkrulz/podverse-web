import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Meta from '~/components/Meta/Meta'
import UserListCtrl from '~/components/UserListCtrl/UserListCtrl'
import config from '~/config'
import PV from '~/lib/constants'
import { pageIsLoading, pagesSetQueryState } from '~/redux/actions'
import { getPublicUsersByQuery } from '~/services'
import { withTranslation } from '../i18n'
const { BASE_URL } = config()

type Props = {
  lastScrollPosition?: number
  listItems?: any
  meta?: any
  pageKey?: string
  pagesSetQueryState?: any
  queryPage: number
  t: any
  user?: any
}

type State = {}

const kPageKey = 'public_profiles'

class Profiles extends Component<Props, State> {

  static async getInitialProps({ query, req, store }) {
    const state = store.getState()
    const { pages, user } = state

    const currentPage = pages[kPageKey] || {}
    const lastScrollPosition = currentPage.lastScrollPosition
    const queryPage = currentPage.queryPage || query.page || 1

    if (Object.keys(currentPage).length === 0) {
      const response = await getPublicUsersByQuery({ 
        userIds: user.subscribedUserIds
      })
      const users = response.data

      store.dispatch(pagesSetQueryState({
        pageKey: kPageKey,
        listItems: users[0],
        listItemsTotal: users[1],
        queryPage
      }))
    }

    store.dispatch(pageIsLoading(false))

    const meta = {
      currentUrl: BASE_URL + PV.paths.web.profiles,
      description: PV.i18n.pages.profiles._Description,
      title: PV.i18n.pages.profiles._Title
    }
    const namespacesRequired = ['common']

    return { lastScrollPosition, meta, namespacesRequired, pageKey: kPageKey, user }
  }

  render() {
    const { meta, pageKey, pagesSetQueryState, queryPage, user } = this.props

    return (
      <Fragment>
        <Meta
          description={meta.description}
          ogDescription={meta.description}
          ogTitle={meta.title}
          ogType='website'
          ogUrl={meta.currentUrl}
          robotsNoIndex={true}
          title={meta.title}
          twitterDescription={meta.description}
          twitterTitle={meta.title} />
        <h3>{PV.i18n.common.Profiles}</h3>
        <UserListCtrl
          handleSetPageQueryState={pagesSetQueryState}
          pageKey={pageKey}
          queryPage={queryPage}
          user={user} />
      </Fragment>
    )
  }

}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  pagesSetQueryState: bindActionCreators(pagesSetQueryState, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation('common')(Profiles))
