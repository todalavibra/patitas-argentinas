
export type PetType = 'dog' | 'cat';

export interface Pet {
  id: number;
  name: string;
  type: PetType;
  breed: string;
  age: string;
  size: string;
  location: string;
  imageUrl: string;
  story?: string;
}
