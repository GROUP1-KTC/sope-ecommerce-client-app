export interface UpdateCartItemRequest {
    id: string;
    newVariantId: string | null;
    quantity: number | null;
}
