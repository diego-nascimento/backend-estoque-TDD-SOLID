
export interface deletePhotoRepository{
  delete(photo: number): Promise<boolean>
}