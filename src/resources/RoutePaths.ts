const api = {
  auth: '/auth'
}

export const RoutePaths = {
  api: {
    add_or_remove: `/add-or-remove`,
    add_or_update_history_item: `/add-or-update-history-item`,
    bitpay: `/bitpay`,
    category: `/category`,
    claim_account: `${api.auth}/claim-account`,
    download: `/download`,
    episode: `/episode`,
    get_authenticated_user_info: `${api.auth}/get-authenticated-user-info`,
    invoice: `/invoice`,
    login: `${api.auth}/login`,
    logout: `${api.auth}/logout`,
    mediaRef: `/mediaRef`,
    mediaRefs: `/mediaRefs`,
    paypalOrder: `/paypal/order`,
    playlist: `/playlist`,
    playlists: `/playlists`,
    podcast: `/podcast`,
    reset_password: `${api.auth}/reset-password`,
    send_reset_password: `${api.auth}/send-reset-password`,
    send_verification: `${api.auth}/send-verification`,
    sign_up: `${api.auth}/sign-up`,
    toggle_subscribe: `/toggle-subscribe`,
    update_history_item_playback_position: `/update-history-item-playback-position`,
    update_queue: `/update-queue`,
    user: `/user`,
    user_history_item: `/user-history-item`,
    user_now_playing_item: `/user-now-playing-item`,
    user_queue_item: `/user-queue-item`,
    verify_email: `${api.auth}/verify-email`
  },
  web: {
    _login: `/?login=true`,
    about: `/about`,
    admin: `/admin`,
    appleAppStore: `https://apps.apple.com/us/app/podverse/id1390888454?mt=8`,
    chat: `/chat`,
    clip: `/clip`,
    clips: `/clips`,
    contact: '/contact',
    coupon: `/coupon`,
    episode: `/episode`,
    episodes: `/episodes`,
    faq: `/faq`,
    googlePlayStore: `https://play.google.com/store/apps/details?id=com.podverse&hl=en_US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1`,
    googlePlayStoreBadge: `https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png`,
    history: '/history',
    home: `/`,
    license: `https://www.gnu.org/licenses/agpl-3.0.en.html`,
    membership: `/membership`,
    miniplayer: {
      clip: '/miniplayer/clip',
      episode: '/miniplayer/episode'
    },
    my_profile_clips: `/my-profile?type=clips`,
    my_profile: `/my-profile`,
    payment_paypal_confirming: `/payment/paypal-confirming`,
    playlist: `/playlist`,
    playlists: `/playlists`,
    podcast: `/podcast`,
    podcasts: `/podcasts`,
    profile: `/profile`,
    profiles: `/profiles`,
    queue: '/queue',
    reset_password: `/reset-password`,
    search: `/search`,
    settings_membership: `/settings#membership`,
    settings: `/settings`,
    support: `/support`,
    terms: `/terms`,
    unspam: `http://www.unspam.com/noemailcollection/`,
    v4vWallet: `/v4v-wallet`,
    verify_email: `/verify-email`,
    videoplayer: {
      clip: '/videoplayer/clip',
      episode: '/videoplayer/episode'
    },
    xmpp: `/xmpp`
  }
}
