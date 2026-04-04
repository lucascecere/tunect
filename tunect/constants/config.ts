export const config = {
  spotifyScopes: [
    'user-read-recently-played',
    'user-top-read',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-library-read',
  ],
  nowPlayingPollMs: 30_000,
  topItemsLimit: 50,
  profileDisplayLimit: 5,
}
