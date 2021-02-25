

export interface deletePhotoCase {
  handle(photo: number): Promise<boolean>
}