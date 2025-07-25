'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Image from 'next/image';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import type { Product } from '~/app/(customer)/cart/page';
import { colors } from '~/constants/color.constant';

interface ProductSuggestionsProps {
    products: Product[];
}

const ProductSuggestions: React.FC<ProductSuggestionsProps> = ({
    products,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const containerRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    // Handle scroll navigation
    const handleScroll = (direction: 'left' | 'right') => {
        if (!containerRef.current) return;
        const width = containerRef.current.offsetWidth;
        const scrollAmount = width / 2;
        containerRef.current.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth',
        });
    };

    // Track scroll position for navigation arrows
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScrollEvent = () => {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setAtStart(scrollLeft === 0);
            setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        };

        handleScrollEvent();
        container.addEventListener('scroll', handleScrollEvent);
        return () => container.removeEventListener('scroll', handleScrollEvent);
    }, []);

    // Drag-to-scroll functionality
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isDragging = false;
        let startX: number;
        let scrollLeft: number;

        const startDragging = (e: MouseEvent | TouchEvent) => {
            isDragging = true;
            container.style.cursor = 'grabbing';
            startX = 'touches' in e ? e.touches[0].pageX : e.pageX;
            scrollLeft = container.scrollLeft;
        };

        const stopDragging = () => {
            isDragging = false;
            container.style.cursor = 'grab';
        };

        const drag = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
            const walk = (x - startX) * 1.5; // Adjust drag speed
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener('mousedown', startDragging);
        container.addEventListener('touchstart', startDragging);
        container.addEventListener('mousemove', drag);
        container.addEventListener('touchmove', drag);
        container.addEventListener('mouseup', stopDragging);
        container.addEventListener('touchend', stopDragging);
        container.addEventListener('mouseleave', stopDragging);

        return () => {
            container.removeEventListener('mousedown', startDragging);
            container.removeEventListener('touchstart', startDragging);
            container.removeEventListener('mousemove', drag);
            container.removeEventListener('touchmove', drag);
            container.removeEventListener('mouseup', stopDragging);
            container.removeEventListener('touchend', stopDragging);
            container.removeEventListener('mouseleave', stopDragging);
        };
    }, []);

    const formatPrice = (price: number) => `₫${price.toLocaleString('vi-VN')}`;

    return (
        <Box sx={{ maxWidth: 'lg', mx: 'auto', my: 6, position: 'relative' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    pb: 2,
                    borderBottom: 1,
                    borderColor: 'grey.200',
                }}
            >
                <Typography variant="h6" fontWeight="bold">
                    Có thể bạn cũng thích
                </Typography>
                <Button
                    href="#"
                    sx={{
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        color: colors.primary.background,
                    }}
                >
                    Xem tất cả {'>'}
                </Button>
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    '&:hover .arrow': { opacity: 1 },
                }}
            >
                {!atStart && (
                    <IconButton
                        className="arrow"
                        onClick={() => handleScroll('left')}
                        sx={{
                            position: 'absolute',
                            left: -44,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'white',
                            boxShadow: 1,
                            p: 1,
                            zIndex: 10,
                            '&:hover': {
                                bgcolor: 'orange.100',
                                transform: 'translateY(-50%) scale(1.1)',
                            },
                            transition: 'all 0.15s',
                            opacity: { xs: 0.5, sm: 0 },
                        }}
                        aria-label="Scroll left"
                    >
                        <ArrowBackIosNewIcon color="warning" fontSize="small" />
                    </IconButton>
                )}
                <Box
                    ref={containerRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                        p: { xs: 2, sm: 4 },
                        cursor: 'grab',
                        userSelect: 'none',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexShrink: 0,
                            gap: { xs: 2, sm: 3 },
                            minWidth: 'max-content',
                        }}
                    >
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                sx={{
                                    flex: '0 0 auto',
                                    width: { xs: 140, sm: 180 },
                                    minWidth: { xs: 140, sm: 180 },
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        bgcolor: 'orange.50',
                                    },
                                }}
                            >
                                <CardContent sx={{ p: 2, textAlign: 'center' }}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: { xs: 100, sm: 120 },
                                            mb: 1,
                                            bgcolor: 'white',
                                            borderRadius: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={isMobile ? 80 : 100}
                                            height={isMobile ? 80 : 100}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </Box>
                                    <Typography
                                        variant={isMobile ? 'body2' : 'body1'}
                                        fontWeight="medium"
                                        sx={{
                                            mb: 1,
                                            lineHeight: 1.4,
                                            minHeight: '2.5rem',
                                        }}
                                        noWrap={false}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="error.main"
                                        fontWeight="bold"
                                        sx={{ mb: 2 }}
                                    >
                                        {formatPrice(product.price)}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                            borderRadius: 1,
                                            textTransform: 'none',
                                            fontSize: isMobile
                                                ? '0.75rem'
                                                : '0.875rem',

                                            backgroundColor:
                                                colors.primary.background,
                                            ':hover': {
                                                backgroundColor:
                                                    colors.primary
                                                        .backgroundHover,
                                            },
                                        }}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
                {!atEnd && (
                    <IconButton
                        className="arrow"
                        onClick={() => handleScroll('right')}
                        sx={{
                            position: 'absolute',
                            right: -44,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            bgcolor: 'white',
                            boxShadow: 1,
                            p: 1,
                            zIndex: 10,
                            '&:hover': {
                                bgcolor: 'orange.100',
                                transform: 'translateY(-50%) scale(1.1)',
                            },
                            transition: 'all 0.15s',
                            opacity: { xs: 0.5, sm: 0 },
                        }}
                        aria-label="Scroll right"
                    >
                        <ArrowForwardIosIcon color="warning" fontSize="small" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default ProductSuggestions;
