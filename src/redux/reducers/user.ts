import { actionTypes } from '~/redux/constants'

export default (state = {}, action) => {

  switch (action.type) {
    case actionTypes.USER_SET_INFO:
      return {
        ...state,
        id: action.payload.id,
        playlists: action.payload.playlists,
        subscribedPodcastids: action.payload.subscribedPodcastIds
      }
    default:
      return state
  }

}
