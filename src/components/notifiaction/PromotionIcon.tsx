import React from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StoreIcon from '@mui/icons-material/Store';

interface PromotionIconProps {
    type: 'discount' | 'cart' | 'gift' | 'shopee';
}

const PromotionIcon: React.FC<PromotionIconProps> = ({ type }) => {
    switch (type) {
        case 'discount':
            return (
                <LocalOfferIcon style={{ fontSize: '30px', color: 'white' }} />
            );
        case 'cart':
            return (
                <ShoppingCartIcon
                    style={{ fontSize: '30px', color: 'white' }}
                />
            );
        case 'gift':
            return (
                <CardGiftcardIcon
                    style={{ fontSize: '30px', color: 'white' }}
                />
            );
        case 'shopee':
            return <StoreIcon style={{ fontSize: '30px', color: 'white' }} />;
        default:
            return (
                <LocalOfferIcon style={{ fontSize: '30px', color: 'white' }} />
            );
    }
};

export default PromotionIcon;
