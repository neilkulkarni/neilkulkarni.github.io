import { Media } from "./Media";

export class VideoType implements Media {
  __type!: 'VIDEO';
  link!: string;
}