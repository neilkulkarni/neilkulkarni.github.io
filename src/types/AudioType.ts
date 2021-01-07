import { Media } from "./Media";

export class AudioType implements Media {
  __type!: 'AUDIO';
  albumArt!: string;
  amazonMusic?: string;
  appleMusic?: string;
  spotify?: string;
  youtube?: string;
  youtubeMusic?: string;
}