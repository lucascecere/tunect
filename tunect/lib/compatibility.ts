import { SpotifyArtist, SpotifyTrack } from './spotify'

export interface MusicData {
  topArtists: string[]
  topGenres: string[]
  topTracks: string[]
  releaseYears?: number[]
}

export interface CompatResult {
  score: number
  sharedArtists: string[]
  sharedTracks: string[]
  sharedGenres: string[]
}

export function calculateCompatibility(userA: MusicData, userB: MusicData): CompatResult {
  const artistOverlap = getOverlapScore(userA.topArtists, userB.topArtists)
  const genreOverlap  = getOverlapScore(userA.topGenres,  userB.topGenres)
  const eraOverlap    = getEraOverlap(userA.releaseYears ?? [], userB.releaseYears ?? [])
  const energyOverlap = getEnergyOverlap(userA, userB)

  const score = Math.round(
    artistOverlap * 0.40 +
    genreOverlap  * 0.35 +
    eraOverlap    * 0.15 +
    energyOverlap * 0.10
  )

  return {
    score,
    sharedArtists: getSharedItems(userA.topArtists, userB.topArtists),
    sharedTracks:  getSharedItems(userA.topTracks,  userB.topTracks),
    sharedGenres:  getSharedItems(userA.topGenres,  userB.topGenres),
  }
}

function getOverlapScore(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0
  const setA = new Set(a)
  const shared = b.filter(x => setA.has(x))
  return (shared.length / Math.max(a.length, b.length)) * 100
}

function getSharedItems(a: string[], b: string[]): string[] {
  const setA = new Set(a)
  return b.filter(x => setA.has(x))
}

function getEraOverlap(yearsA: number[], yearsB: number[]): number {
  if (!yearsA.length || !yearsB.length) return 50
  const avgA = yearsA.reduce((s, y) => s + y, 0) / yearsA.length
  const avgB = yearsB.reduce((s, y) => s + y, 0) / yearsB.length
  const diff = Math.abs(avgA - avgB)
  return Math.max(0, 100 - diff * 5)
}

function getEnergyOverlap(a: MusicData, b: MusicData): number {
  // Rough proxy: genre overlap counts here too
  return getOverlapScore(a.topGenres, b.topGenres)
}

export function getMusicPersonality(genres: string[]): string {
  const g = genres.map(s => s.toLowerCase())
  const has = (term: string) => g.some(genre => genre.includes(term))
  const topCount = (terms: string[]) => g.filter(genre => terms.some(t => genre.includes(t))).length

  if (topCount(['indie', 'alternative', 'alt-rock']) >= 3) return 'Indie Nocturnal'
  if (topCount(['hip-hop', 'rap', 'trap']) >= 3) return 'Hip-Hop Purist'
  if (topCount(['pop']) >= 3) return 'Pop Maximalist'
  if (topCount(['electronic', 'dance', 'edm', 'house']) >= 3) return 'Frequency Chaser'
  if (topCount(['r&b', 'soul', 'neo-soul']) >= 3) return 'Soul Keeper'
  if (topCount(['rock', 'classic rock']) >= 3) return 'Classic Devotee'
  if (topCount(['jazz', 'lo-fi', 'ambient', 'chillout']) >= 2) return 'Slow Burn Listener'
  if (topCount(['metal', 'punk', 'hardcore']) >= 2) return 'Loud and Proud'
  if (topCount(['latin', 'reggaeton', 'salsa']) >= 2) return 'Ritmo Core'

  const uniqueAbove10pct = new Set(g).size
  if (uniqueAbove10pct >= 5) return 'Genre Fluid'

  return 'Genre Fluid'
}

export function matchColor(score: number): string {
  if (score >= 80) return '#22C55E'
  if (score >= 60) return '#A855F7'
  if (score >= 40) return '#F59E0B'
  return '#505050'
}

export function artistsToMusicData(artists: SpotifyArtist[], tracks: SpotifyTrack[]): MusicData {
  return {
    topArtists: artists.map(a => a.name),
    topGenres: [...new Set(artists.flatMap(a => a.genres))],
    topTracks: tracks.map(t => t.name),
    releaseYears: tracks.map(t => parseInt(t.album.release_date?.slice(0, 4))).filter(Boolean),
  }
}
