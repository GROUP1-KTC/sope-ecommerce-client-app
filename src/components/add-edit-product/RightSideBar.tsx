import { useState, useMemo, useEffect } from 'react';
import ImageNext from 'next/image';
import type { ProductFormData } from '~/types/products';

export interface MediaItem {
      file: File;
      preview: string;
}

export type ProductFormDataWithMedia = Omit<
      ProductFormData,
      'defaultImage' | 'defaultVideoIntro' | 'imagesList'
> & {
      defaultImage: MediaItem | null;
      defaultVideoIntro: MediaItem | null;
      imagesList: MediaItem[];
};

interface RightSideBarProps {
      productData: ProductFormDataWithMedia;
}

const RightSideBar = ({ productData }: RightSideBarProps) => {
      const [currentIndex, setCurrentIndex] = useState(0);

      // Typed, dễ mở rộng
      const mediaList = useMemo(() => {
            const list: { type: 'image' | 'video'; src: string }[] = [];
            if (productData.defaultImage)
                  list.push({ type: 'image', src: productData.defaultImage.preview });
            if (productData.defaultVideoIntro)
                  list.push({ type: 'video', src: productData.defaultVideoIntro.preview });
            list.push(
                  ...productData.imagesList.map((img) => ({
                        type: 'image' as const,
                        src: img.preview,
                  }))
            );
            return list;
      }, [
            productData.defaultImage,
            productData.defaultVideoIntro,
            productData.imagesList,
      ]);

      const maxIndex = mediaList.length - 1;
      const safeIndex = maxIndex >= 0 ? Math.min(currentIndex, maxIndex) : 0;
      const currentItem = mediaList.length > 0 ? mediaList[safeIndex] : null;

      useEffect(() => {
            if (mediaList.length === 0 && currentIndex !== 0) {
                  setCurrentIndex(0);
            } else if (mediaList.length > 0 && currentIndex !== safeIndex) {
                  setCurrentIndex(safeIndex);
            }
      }, [mediaList.length, safeIndex, currentIndex]);

      const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
      const goNext = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

      return (
            <aside className="fixed top-20 right-0 w-1/4 border-t h-screen bg-white p-6 border-l overflow-y-auto z-20">
                  <div className="font-bold mb-4 text-lg">Xem trước sản phẩm</div>

                  {mediaList.length > 0 && currentItem ? (
                        <div className="relative w-full h-80 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
                              {currentItem.type === 'image' ? (
                                    <ImageNext
                                          src={currentItem.src}
                                          alt={`media-${safeIndex}`}
                                          width={300}
                                          height={300}
                                          className="w-auto max-h-full object-contain"
                                    // Nếu cần: unoptimized (khi dùng blob:)
                                    // unoptimized
                                    />
                              ) : (
                                    <video
                                          src={currentItem.src}
                                          controls
                                          className="w-auto max-h-full object-contain"
                                    />
                              )}

                              {safeIndex > 0 && (
                                    <button
                                          onClick={goPrev}
                                          className="absolute left-2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-1"
                                    >
                                          ◀
                                    </button>
                              )}

                              {safeIndex < maxIndex && (
                                    <button
                                          onClick={goNext}
                                          className="absolute right-2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-1"
                                    >
                                          ▶
                                    </button>
                              )}

                              <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white bg-opacity-80 px-2 py-1 rounded">
                                    {safeIndex + 1}/{mediaList.length}
                              </div>
                        </div>
                  ) : (
                        <div className="bg-gray-100 rounded p-4 h-80 flex items-center justify-center text-gray-400 text-sm text-center">
                              Chưa có hình ảnh hoặc video nào để xem trước.
                        </div>
                  )}
            </aside>
      );
};

export default RightSideBar;
