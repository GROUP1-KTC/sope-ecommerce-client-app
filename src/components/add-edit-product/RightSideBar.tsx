import { useState, useMemo, useEffect } from 'react';
import ImageNext from 'next/image';
import type { Category, ProductFormData } from '~/types/products';
import ImageIcon from '@mui/icons-material/Image';
import { getCategoryPathName } from '~/utils/buildCategoryPath';

export interface MediaItem {
      file?: File;
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
      categories: Category[]
}

const RightSideBar = ({ productData, categories }: RightSideBarProps) => {
      const [currentIndex, setCurrentIndex] = useState(0);
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
            <aside className="fixed top-20 right-0 w-1/4 h-[calc(100vh-5rem)] bg-white p-6 overflow-y-auto">
                  <div className="font-bold mb-4 text-lg">Xem trước sản phẩm</div>

                  {/* Hình ảnh / Video */}
                  {mediaList.length > 0 && currentItem ? (
                        <div className="relative w-full h-80 flex items-center justify-center bg-gray-100 rounded overflow-hidden ">
                              {currentItem.type === 'image' ? (
                                    <ImageNext
                                          src={currentItem.src}
                                          alt={`media-${safeIndex}`}
                                          width={300}
                                          height={300}
                                          className="w-auto max-h-full object-contain"
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
                        <div className="bg-gray-100 rounded p-4 h-80 flex flex-col items-center justify-center text-gray-400 text-sm text-center border-[2px] border-rose-200">
                              <ImageIcon style={{ fontSize: 40 }} className="mb-2 text-gray-400" />
                              <span>Chưa có hình ảnh hoặc video nào để xem trước.</span>
                        </div>
                  )}

                  {/* Phân loại có sẵn */}
                  <div className="mt-4 text-sm text-gray-600">
                        {productData.variants.length > 1
                              ? `${productData.variants.length} phân loại có sẵn`
                              : "0 phân loại có sẵn"}
                  </div>

                  {productData.variants.length > 1 && (
                        <div className="mt-4">
                              <div className="font-medium">Phân loại sản phẩm</div>
                              <div className="border rounded">
                                    <table className="w-full text-sm border-t border-gray-200">
                                          <thead className="bg-gray-100">
                                                <tr>
                                                      <th className="p-2 text-left">Ảnh</th>
                                                      <th className="p-2 text-center">Thuộc tính</th>
                                                      <th className="p-2 text-left">Giá</th>
                                                      <th className="p-2 text-left">Kho</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {productData.variants.map((v, index) => (
                                                      <tr key={index} className="border-t">
                                                            <td className="p-2">
                                                                  {typeof v.imageVariant === "string" ? (
                                                                        <img
                                                                              src={v.imageVariant}
                                                                              alt="variant"
                                                                              className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                  ) : v.imageVariant instanceof File ? (
                                                                        <img
                                                                              src={URL.createObjectURL(v.imageVariant)}
                                                                              alt="variant"
                                                                              className="w-12 h-12 object-cover rounded"
                                                                              onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                                                                        />
                                                                  ) : (
                                                                        <ImageIcon className="text-gray-400" />
                                                                  )}

                                                            </td>
                                                            <td className="p-2 text-center">
                                                                  {v.attributes?.map(a => `${a.value}`).join(", ")}
                                                            </td>
                                                            <td className="p-2 text-red-500">{v.price.toLocaleString()} đ</td>
                                                            <td className="p-2">{v.stock}</td>
                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  )}


                  {/* Shop info */}
                  <div className="mt-4 flex items-center justify-between pt-4">
                        <div className="flex items-center gap-2">
                              <ImageNext
                                    src={'/assets/images/avatar.png'}
                                    alt="Shop Avatar"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                              />
                              <span className="text-sm font-medium">{'Tên Shop'}</span>
                        </div>
                        <button className="px-3 py-1 border rounded text-sm">Xem</button>
                  </div>

                  {/* Chi tiết sản phẩm */}
                  <div className="mt-6 bg-white p-4 rounded">
                        <h3 className="font-semibold text-lg mb-3">CHI TIẾT SẢN PHẨM</h3>
                        <table className="w-full text-sm">
                              <tbody className="align-top">
                                    <tr>
                                          <td className="py-2 w-1/4 text-gray-600">Danh Mục</td>
                                          <td className="py-2">
                                                {getCategoryPathName(categories, productData.categoryId) ? (
                                                      <span className="text-blue-600">
                                                            {getCategoryPathName(categories, productData.categoryId)}
                                                      </span>
                                                ) : (
                                                      <span className="text-gray-400">Chưa chọn danh mục</span>
                                                )}
                                          </td>
                                    </tr>
                                    <tr >
                                          <td className="py-2 w-1/4 text-gray-600">Kho </td>
                                          <td className="py-2">
                                                {productData.variants.length > 0
                                                      ? productData.variants.reduce((sum, v) => sum + (v.stock || 0), 0)
                                                      : 0}
                                          </td>
                                    </tr>
                                    {productData.productDetails && productData.productDetails.length > 0 && (
                                          productData.productDetails.map((d, idx) => (
                                                <tr key={d.productDetailId ?? idx} >
                                                      <td className="py-2 w-1/4 text-gray-600">{d.label} </td>
                                                      <td className="py-2">{d.data}</td>
                                                </tr>
                                          ))
                                    )}
                              </tbody>
                        </table>
                  </div>

                  {/* Mô tả */}
                  <div className="mt-4">
                        <div className="font-medium mb-1">Mô tả</div>
                        <div
                              className="text-sm text-gray-600 prose max-w-none"
                              dangerouslySetInnerHTML={{
                                    __html: productData.description || 'Chưa có mô tả sản phẩm.',
                              }}
                        />
                  </div>

                  {/* Ghi chú */}
                  <div className="mt-4 text-xs text-gray-400">
                        Hình ảnh có tính chất tham khảo, không phải hình ảnh cuối cùng Người mua thấy.
                  </div>
            </aside>

      );
};

export default RightSideBar;
