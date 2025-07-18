import { Card } from '../common/Card';

export default function Bank() {
    return (
        <Card className="mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Tài khoản ngân hàng
                </h2>
                <button className="text-sm text-blue-600 hover:underline">
                    Thêm tài khoản
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="border border-dashed border-gray-300 rounded-md h-40 flex flex-col justify-center items-center text-gray-500 hover:border-gray-400 hover:text-gray-600">
                    <span className="text-3xl">＋</span>
                    <span className="mt-2">Thêm Tài khoản Ngân hàng</span>
                </button>
            </div>
        </Card>
    );
}
