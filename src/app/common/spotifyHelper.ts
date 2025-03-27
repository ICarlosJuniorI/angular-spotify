import { IArtist } from '../interfaces/IArtist';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IUser } from '../interfaces/IUser';

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
    imageUrl: spotifyArtist.images?.slice().sort((a: any, b: any) => a?.width - b?.width)[0]?.url,
  }
}
