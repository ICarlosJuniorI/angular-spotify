import { IArtist } from '../interfaces/IArtist';
import { IMusic } from '../interfaces/IMusic';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IUser } from '../interfaces/IUser';
import { addMilliseconds, format } from 'date-fns';
import { newMusic } from './factories';

export function SpotifyUserToUser(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images?.[0]?.url,
  };
}

export function SpotifyPlaylistToPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images?.[0]?.url,
  };
}

export function SpotifyArtistToArtist(
  spotifyArtist: SpotifyApi.ArtistObjectFull
): IArtist {
  return {
    id: spotifyArtist.id,
    name: spotifyArtist.name,
    imageUrl: spotifyArtist.images
      ?.slice()
      .sort((a: any, b: any) => a?.width - b?.width)[0]?.url,
  };
}

export function SpotifyTrackToMusic(
  spotifyTrack: SpotifyApi.TrackObjectFull,
  isPlaying?: boolean
): IMusic {
  if (!spotifyTrack) {
    return newMusic();
  }

  const msToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  };

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.album.id,
      name: spotifyTrack.album.name,
      imageUrl: spotifyTrack.album.images
        ?.slice()
        .sort((a: any, b: any) => a?.width - b?.width)[0]?.url,
    },
    artists: spotifyTrack.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
    time: msToMinutes(spotifyTrack.duration_ms),
    isPlaying: isPlaying ?? false,
  };
}
