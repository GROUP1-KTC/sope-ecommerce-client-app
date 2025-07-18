import { Card } from '~/components/seller/common/Card';
import PayoutDetails from '~/components/seller/turnover/PayoutDetails';
import PayoutSummary from '~/components/seller/turnover/PayoutSummary';

export default function PayoutsPage() {
    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <Card>
                <PayoutSummary />
            </Card>
            <Card>
                <PayoutDetails />
            </Card>
        </div>
    );
}
