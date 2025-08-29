import { useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import type { RootState } from '~/store/appStore';

const HeaderCartIconWithBadge = ({
    menuOpen,
    setMenuOpen,
}: {
    menuOpen: boolean;
    setMenuOpen: (v: boolean) => void;
}) => {
    const cartCount = useSelector((state: RootState) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
    );

    return (
        <div className="relative flex items-center gap-2">
            <Link
                href="/cart"
                className="flex items-center hover:text-yellow-200 transition relative"
            >
                <ShoppingCartOutlinedIcon
                    style={{ fontSize: 30 }}
                    className="text-white"
                />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 text-red-600 bg-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </Link>

            {/* Only show menu button on mobile */}
            <button
                className="sm:hidden hover:text-yellow-200 transition flex items-center cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open menu"
                style={{ height: 30, width: 30 }}
            >
                <MenuIcon style={{ fontSize: 30 }} className="text-white" />
            </button>
        </div>
    );
};

export default HeaderCartIconWithBadge;
