export async function verifyImage(
    file: File,
): Promise<{ valid: boolean; reason?: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const verifyImageUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL;
    if (!verifyImageUrl) {
        throw new Error('NEXT_PUBLIC_AI_SERVICE_URL is not defined');
    }
    const res = await fetch(`${verifyImageUrl}/detect/verify`, {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        throw new Error('Lỗi khi gọi API verify');
    }

    return await res.json();
}
