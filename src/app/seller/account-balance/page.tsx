import MoneySummaryCard from '~/components/seller/account-balance/MoneySummaryCard';
import TransactionFilters from '~/components/seller/account-balance/TransactionFilters';
import TransactionSearchBar from '~/components/seller/account-balance/TransactionSearchBar';
import { Card } from '~/components/seller/common/Card';

export default function TurnoverPage() {
    return (
        <div className="space-y-8 p-6">
            <h1 className="text-lg font-semibold text-gray-800">Tổng Quan</h1>
            <MoneySummaryCard />

            <h2 className="text-lg font-semibold text-gray-800">
                Các giao dịch gần đây
            </h2>
            <Card>
                <TransactionFilters />
                <TransactionSearchBar />
                <div className="mt-4 text-gray-500 text-sm">
                    0 giao dịch (Tổng số tiền: 0)
                </div>
            </Card>
        </div>
    );
}
