import { IArtist } from '../interfaces/IArtist';
import { IMusic } from '../interfaces/IMusic';
import { IPlaylist } from '../interfaces/IPlaylist';

export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
  };
}

export function newMusic(): IMusic {
  return {
    id: '',
    album: {
      id: '',
      name: '',
      imageUrl: '',
    },
    artists: [
      {
        id: '',
        name: '',
      },
    ],
    time: '',
    title: '',
    isPlaying: false,
  };
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: [],
  };
}
