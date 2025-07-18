import ShopRatingSummary from '~/components/seller/review-management/ShopRatingSummary';
import ShopReviewTable from '~/components/seller/review-management/ShopReviewTable';

export default function RatingDashboard() {
    return (
        <div className="p-6 space-y-8">
            <div>
                <ShopRatingSummary />
            </div>
            <ShopReviewTable />
        </div>
    );
}
