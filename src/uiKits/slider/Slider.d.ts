export namespace ISlider {
  export type ISliderImage = {
    id: number;
    sortOrder: number;
    url: string;
    urlTarget: string;
    name: string;
    title: string;
    description: string;
    image: string;
    startDateTime: Date;
    endDateTime: Date;
    isVisible: boolean;
  };

  export interface IChangeImage {
    Images?: any;
    CurrentImageId?: number;
    onChageImage?: (imageIndex: number) => void;
  }
}
