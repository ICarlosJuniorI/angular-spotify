import { IArtist } from '../interfaces/IArtist';

export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
  };
}
