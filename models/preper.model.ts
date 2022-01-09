import { Icard } from "./card.model";

export interface Iprepare {
  cards?: Icard[];
  selectCard_1?: Icard;
  selectCard_2?: Icard;
  selectIndex_1?: number;
  selectIndex_2?: number;
  progress?: number;
  fullTrack?: HTMLAudioElement;
  goodTrack?: HTMLAudioElement;
  failTrack?: HTMLAudioElement;
  gameOver?: HTMLAudioElement;
  flipAudio?: HTMLAudioElement;

}