import classNames from 'classnames'
import OmniAural, { useOmniAural } from 'omniaural'
import { extractSelectedEnclosureSourceAndContentType, NowPlayingItem } from 'podverse-shared'
import { checkIfVideoFileOrVideoLiveType } from 'podverse-shared'
import { useTranslation } from 'react-i18next'
import { ButtonClose, Dropdown, PVImage, PVLink } from '~/components'
import {
  alertForUnsupportedFileTypes,
  generateAlternateEnclosureDropdownOptions,
  generateAlternateEnclosureSourceOptions
} from '~/lib/utility/alternateEnclosures'
import { getClipTitle } from '~/lib/utility/misc'
import { readableClipTime } from '~/lib/utility/time'
import { PV } from '~/resources'
import { playerLoadNowPlayingItem } from '~/services/player/player'
import { OmniAuralState } from '~/state/omniauralState'
import { PlayerProgressButtons } from './controls/PlayerProgressButtons'
import { ProgressBar } from './controls/ProgressBar'
import { PlayerAPIVideo } from './PlayerAPI/PlayerAPIVideo'
import { PlayerItemButtons } from './PlayerItemOptions'

type Props = {
  isEmbed?: boolean
  nowPlayingItem: NowPlayingItem
}

export const PlayerFullView = ({ isEmbed, nowPlayingItem }: Props) => {
  const { t } = useTranslation()
  const [player] = useOmniAural('player') as [OmniAuralState['player']]
  const {
    alternateEnclosureSelectedIndex,
    alternateEnclosureSourceSelectedIndex,
    chapterFlagPositions,
    clipFlagPositions,
    highlightedPositions,
    showFullView
  } = player
  const podcastPageUrl = isEmbed
    ? `${PV.Config.WEB_BASE_URL}/${PV.RoutePaths.web.podcast}/${nowPlayingItem.podcastId}`
    : `${PV.RoutePaths.web.podcast}/${nowPlayingItem.podcastId}`
  const podcastLinkTarget = isEmbed ? '_blank' : ''
  const episodePageUrl = isEmbed
    ? `${PV.Config.WEB_BASE_URL}/${PV.RoutePaths.web.episode}/${nowPlayingItem.episodeId}`
    : `${PV.RoutePaths.web.episode}/${nowPlayingItem.episodeId}`
  const episodeLinkTarget = isEmbed ? '_blank' : ''
  const imageWrapperClass = classNames('image-wrapper', nowPlayingItem.clipId ? 'has-clip-info' : '')

  const result = extractSelectedEnclosureSourceAndContentType(
    nowPlayingItem,
    alternateEnclosureSelectedIndex,
    alternateEnclosureSourceSelectedIndex
  )
  const isVideo = checkIfVideoFileOrVideoLiveType(result.contentType)

  const _onRequestClose = () => {
    OmniAural.playerFullViewHide()
  }

  const _handleChangeAlternateEnclosureSelected = (selectedItems: any[]) => {
    const selectedItem = selectedItems[0]
    if (selectedItem?.key || selectedItem?.key === 0) {
      OmniAural.setAlternateEnclosureSelectedIndex(selectedItem.key)
      const shouldPlay = false
      const isChapter = false
      const alternateEnclosureSourceIndex = 0
      playerLoadNowPlayingItem(
        nowPlayingItem,
        shouldPlay,
        isChapter,
        selectedItem.key,
        alternateEnclosureSourceIndex || 0
      )
    }
  }

  const _handleChangeAlternateEnclosureSourceSelected = (selectedItems: any[]) => {
    const selectedItem = selectedItems[0]
    if (selectedItem?.key || selectedItem?.key === 0) {
      OmniAural.setAlternateEnclosureSourceSelectedIndex(selectedItem.key)
      const shouldPlay = false
      const isChapter = false
      playerLoadNowPlayingItem(
        nowPlayingItem,
        shouldPlay,
        isChapter,
        alternateEnclosureSelectedIndex || 0,
        selectedItem.key
      )
      alertForUnsupportedFileTypes(selectedItem.label, t)
    }
  }

  const clipTitle = getClipTitle(t, nowPlayingItem.clipTitle, nowPlayingItem.episodeTitle)

  const clipTimeInfo = readableClipTime(nowPlayingItem.clipStartTime, nowPlayingItem.clipEndTime)

  const viewClass = classNames('player-full-view', showFullView ? 'is-showing' : '')

  const alternateEnclosureDropdownOptions = generateAlternateEnclosureDropdownOptions(
    nowPlayingItem.episodeAlternateEnclosures
  )
  const selectedAlternateEnclosure = nowPlayingItem.episodeAlternateEnclosures[alternateEnclosureSelectedIndex || 0]
  const selectedAlternateEnclosureSources = selectedAlternateEnclosure?.source || []
  let alternateEnclosureSourceDropdownOptions = []
  if (selectedAlternateEnclosureSources.length > 0) {
    alternateEnclosureSourceDropdownOptions = generateAlternateEnclosureSourceOptions(selectedAlternateEnclosureSources)
  }

  const imageComponent = (
    <PVImage
      alt=''
      height={PV.Images.sizes.fullViewAudio}
      src={nowPlayingItem.episodeImageUrl || nowPlayingItem.podcastImageUrl}
      width={PV.Images.sizes.fullViewAudio}
    />
  )

  return (
    <div className={viewClass} role='dialog'>
      {showFullView && (
        <>
          <h1 className='aria-header aria-only-visible-to-screen-readers' tabIndex={showFullView ? 0 : -1}>
            {t('Full screen player')}
          </h1>
          <ButtonClose onClick={_onRequestClose} />
        </>
      )}
      <div className={imageWrapperClass}>
        {isVideo && <PlayerAPIVideo isFullView={showFullView} />}
        {showFullView &&
          !isVideo &&
          (nowPlayingItem.clipLinkUrl ? (
            <a className='chapter-link' href={nowPlayingItem.clipLinkUrl} target='_blank' rel='noreferrer'>
              {imageComponent}
            </a>
          ) : (
            imageComponent
          ))}
        {showFullView && nowPlayingItem.clipId && (
          <PVLink href={`${PV.Config.WEB_BASE_URL}${PV.RoutePaths.web.clip}/${nowPlayingItem.clipId}`}>
            <div className='clip-info-wrapper'>
              <div aria-live='assertive'>
                <div className='clip-title'>{clipTitle}</div>
              </div>
              <div className='clip-time'>{clipTimeInfo}</div>
            </div>
          </PVLink>
        )}
      </div>
      {showFullView && (
        <>
          <div className='title-wrapper'>
            <div className='title-wrapper-top'>
              <h1 role='none'>
                <PVLink href={episodePageUrl} onClick={_onRequestClose} target={episodeLinkTarget}>
                  {nowPlayingItem.episodeTitle || t('untitledEpisode')}
                </PVLink>
              </h1>
            </div>
            <div className='subtitle'>
              <PVLink href={podcastPageUrl} onClick={_onRequestClose} target={podcastLinkTarget}>
                {nowPlayingItem.podcastTitle || t('untitledPodcast')}
              </PVLink>
            </div>
            {alternateEnclosureDropdownOptions?.length > 1 && (
              <Dropdown
                dropdownPosition='auto'
                dropdownWidthClass='width-medium'
                inlineElementStyle
                onChange={_handleChangeAlternateEnclosureSelected}
                options={alternateEnclosureDropdownOptions}
                selectedKey={alternateEnclosureSelectedIndex || 0}
                textLabel={t('Type')}
              />
            )}
            {alternateEnclosureSourceDropdownOptions?.length > 1 && (
              <Dropdown
                dropdownPosition='auto'
                dropdownWidthClass='width-full'
                inlineElementStyle
                isLabelUrl
                onChange={_handleChangeAlternateEnclosureSourceSelected}
                options={alternateEnclosureSourceDropdownOptions}
                selectedKey={alternateEnclosureSourceSelectedIndex || 0}
                textLabel={t('Source')}
              />
            )}
          </div>
          <div className='player-buttons-wrapper'>
            <ProgressBar
              chapterFlagPositions={chapterFlagPositions}
              clipFlagPositions={clipFlagPositions}
              highlightedPositions={highlightedPositions}
            />
            <div className='player-progress-container'>
              <div className='player-item-info-container' />
              <PlayerProgressButtons isEmbed={isEmbed} />
              <PlayerItemButtons isFullScreen />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
