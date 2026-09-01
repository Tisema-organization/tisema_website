import type { FeedPost } from './content'
import raw from '../assets/tisema.raw.json'

type TikTokAuthor = {
  nickname?: string
  uniqueId?: string
  avatarThumb?: string
}

type TikTokVideo = {
  cover?: string
  dynamicCover?: string
  originCover?: string
}

type TikTokItem = {
  id?: string
  desc?: string
  createTime?: number
  author?: TikTokAuthor
  video?: TikTokVideo
}

const rawPosts = raw as Record<string, TikTokItem>

function relativeAge(unixSeconds?: number) {
  if (!unixSeconds) return ''
  const ms = Date.now() - unixSeconds * 1000
  const hours = Math.floor(ms / (1000 * 60 * 60))
  if (hours < 1) return 'now'
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`
  const weeks = Math.floor(days / 7)
  if (weeks < 52) return `${weeks}w`
  const years = Math.floor(days / 365)
  return `${years}y`
}

function toFeedPost(item: TikTokItem): FeedPost | null {
  const id = item.id?.trim()
  const uniqueId = item.author?.uniqueId?.trim()
  if (!id || !uniqueId) return null

  const cover =
    item.video?.cover ??
    item.video?.dynamicCover ??
    item.video?.originCover ??
    ''

  if (!cover) return null

  const body = (item.desc ?? '').trim() || 'Shared on TikTok for #Tisema'

  return {
    id,
    src: cover,
    name: (item.author?.nickname ?? uniqueId).trim(),
    handle: `@${uniqueId}`,
    age: relativeAge(item.createTime),
    body,
    url: `https://www.tiktok.com/@${uniqueId}/video/${id}`,
    avatarSrc: item.author?.avatarThumb ?? undefined,
    createdAt: item.createTime,
  }
}

/** Campaign feed posts from scraped TikTok data (`src/assets/tisema.raw.json`). */
export const FEED_POSTS: FeedPost[] = Object.values(rawPosts)
  .map(toFeedPost)
  .filter((post): post is FeedPost => post !== null)
  .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
