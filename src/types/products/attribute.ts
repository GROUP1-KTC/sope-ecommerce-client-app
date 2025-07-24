import type { Image } from './image';

export interface Attribute {
    attributeId: number;
    name: string;
    value: string;
    image?: Image;
}
