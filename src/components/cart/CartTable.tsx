'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    IconButton,
    Box,
    Typography,
    TextField,
    Card,
    CardContent,
    useMediaQuery,
    useTheme,
    Divider,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CartItem, CartGroup } from '~/app/(customer)/cart/page';
import { debounce } from 'lodash';

// Component DesktopTable
const DesktopTableComponent: React.FC<{
    cartGroups: CartGroup[];
    selected: string[];
    handleSelect: (id: string) => void;
    handleSelectGroup: (shopId: string) => void;
    handleDelete: (id: string) => void;
    handleIncrease: (id: string) => Promise<void>;
    handleDecrease: (id: string) => Promise<void>;
    inputQuantities: { [key: string]: number | '' };
    setInputQuantities: React.Dispatch<
        React.SetStateAction<{ [key: string]: number | '' }>
    >;
    handleInputChange: (id: string, value: string) => void;
    getDebouncedUpdate: (id: string) => (quantity: number) => void;
    flushDebouncedUpdate: (id: string) => void;
}> = ({
    cartGroups,
    selected,
    handleSelect,
    handleSelectGroup,
    handleDelete,
    handleIncrease,
    handleDecrease,
    inputQuantities,
    setInputQuantities,
    handleInputChange,
    getDebouncedUpdate,
    flushDebouncedUpdate,
}) => (
    <TableContainer>
        <Table>
            {cartGroups.map((group) => (
                <React.Fragment key={group.shop.id}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell colSpan={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        py: 1,
                                    }}
                                >
                                    <StorefrontIcon sx={{ color: '#d32f2f' }} />
                                    <Typography variant="h6" fontWeight="bold">
                                        {group.shop.name || 'Unknown Shop'}
                                    </Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#1976d2',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            handleSelectGroup(group.shop.id)
                                        }
                                    >
                                        {group.items.every((item) =>
                                            selected.includes(item.id),
                                        )
                                            ? 'Bỏ chọn tất cả'
                                            : 'Chọn tất cả'}
                                    </Typography>
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={
                                        group.items.length > 0 &&
                                        group.items.every((item) =>
                                            selected.includes(item.id),
                                        )
                                    }
                                    onChange={() =>
                                        handleSelectGroup(group.shop.id)
                                    }
                                />
                            </TableCell>
                            <TableCell align="left">Sản Phẩm</TableCell>
                            <TableCell align="center">Đơn Giá</TableCell>
                            <TableCell align="center">Số Lượng</TableCell>
                            <TableCell align="center">Số Tiền</TableCell>
                            <TableCell align="center">Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {group.items.map((item) => {
                            const displayQuantity =
                                inputQuantities[item.id] ?? item.quantity;
                            return (
                                <TableRow key={item.id} hover>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selected.includes(item.id)}
                                            onChange={() =>
                                                handleSelect(item.id)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={2}
                                        >
                                            <Image
                                                src={
                                                    item.image ||
                                                    '/placeholder-image.png'
                                                }
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                style={{
                                                    objectFit: 'cover',
                                                    borderRadius: 4,
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: 200,
                                                    fontWeight: 'medium',
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ fontSize: '1rem' }}
                                    >
                                        {item.price.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            p={0}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={async () => {
                                                    const currentQty =
                                                        (inputQuantities[
                                                            item.id
                                                        ] as number) ??
                                                        item.quantity;
                                                    const newQty = Math.max(
                                                        currentQty - 1,
                                                        1,
                                                    );
                                                    setInputQuantities(
                                                        (prev) => ({
                                                            ...prev,
                                                            [item.id]: newQty,
                                                        }),
                                                    );
                                                    try {
                                                        await handleDecrease(
                                                            item.id,
                                                        );
                                                    } catch {
                                                        setInputQuantities(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.id]:
                                                                    item.quantity,
                                                            }),
                                                        );
                                                    }
                                                }}
                                                disabled={item.quantity === 1}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <TextField
                                                type="number"
                                                value={displayQuantity}
                                                size="small"
                                                sx={{
                                                    flexGrow: 1,
                                                    width: 56,
                                                    '& input': {
                                                        textAlign: 'center',
                                                    },
                                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                                                        {
                                                            WebkitAppearance:
                                                                'none',
                                                            margin: 0,
                                                        },
                                                    '& input[type=number]': {
                                                        MozAppearance:
                                                            'textfield',
                                                    },
                                                }}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        item.id,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={() => {
                                                    const qty =
                                                        inputQuantities[
                                                            item.id
                                                        ];
                                                    if (
                                                        typeof qty ===
                                                            'number' &&
                                                        qty >= 1
                                                    ) {
                                                        flushDebouncedUpdate(
                                                            item.id,
                                                        );
                                                    } else {
                                                        setInputQuantities(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.id]:
                                                                    item.quantity,
                                                            }),
                                                        );
                                                    }
                                                }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={async () => {
                                                    const currentQty =
                                                        (inputQuantities[
                                                            item.id
                                                        ] as number) ??
                                                        item.quantity;
                                                    const newQty =
                                                        currentQty + 1;
                                                    setInputQuantities(
                                                        (prev) => ({
                                                            ...prev,
                                                            [item.id]: newQty,
                                                        }),
                                                    );
                                                    try {
                                                        await handleIncrease(
                                                            item.id,
                                                        );
                                                    } catch {
                                                        setInputQuantities(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.id]:
                                                                    item.quantity,
                                                            }),
                                                        );
                                                    }
                                                }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{
                                            color: 'error.main',
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {(
                                            item.price *
                                            (typeof displayQuantity === 'number'
                                                ? displayQuantity
                                                : item.quantity)
                                        ).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    {cartGroups.length - 1 !== cartGroups.indexOf(group) && (
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Divider sx={{ my: 2 }} />
                            </TableCell>
                        </TableRow>
                    )}
                </React.Fragment>
            ))}
        </Table>
    </TableContainer>
);

// Component MobileCardLayout (tương tự, áp dụng các thay đổi giống DesktopTableComponent)
const MobileCardLayoutComponent: React.FC<{
    cartGroups: CartGroup[];
    selected: string[];
    handleSelect: (id: string) => void;
    handleSelectGroup: (shopId: string) => void;
    handleDelete: (id: string) => void;
    handleIncrease: (id: string) => Promise<void>;
    handleDecrease: (id: string) => Promise<void>;
    inputQuantities: { [key: string]: number | '' };
    setInputQuantities: React.Dispatch<
        React.SetStateAction<{ [key: string]: number | '' }>
    >;
    handleInputChange: (id: string, value: string) => void;
    getDebouncedUpdate: (id: string) => (quantity: number) => void;
    flushDebouncedUpdate: (id: string) => void;
    isMobile: boolean;
}> = ({
    cartGroups,
    selected,
    handleSelect,
    handleSelectGroup,
    handleDelete,
    handleIncrease,
    handleDecrease,
    inputQuantities,
    setInputQuantities,
    handleInputChange,
    getDebouncedUpdate,
    flushDebouncedUpdate,
    isMobile,
}) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {cartGroups.map((group) => (
            <Box key={group.shop.id}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: '#f5f5f5',
                        p: 2,
                        borderRadius: 1,
                        mb: 2,
                    }}
                >
                    <StorefrontIcon sx={{ color: '#d32f2f' }} />
                    <Typography variant="h6" fontWeight="bold">
                        {group.shop.name || 'Unknown Shop'}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography
                        variant="body2"
                        sx={{ color: '#1976d2', cursor: 'pointer' }}
                        onClick={() => handleSelectGroup(group.shop.id)}
                    >
                        {group.items.every((item) => selected.includes(item.id))
                            ? 'Bỏ chọn tất cả'
                            : 'Chọn tất cả'}
                    </Typography>
                </Box>
                {group.items.map((item) => {
                    const displayQuantity =
                        inputQuantities[item.id] ?? item.quantity;
                    return (
                        <Card
                            key={item.id}
                            sx={{ boxShadow: 2, borderRadius: 2, mb: 2 }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Checkbox
                                        checked={selected.includes(item.id)}
                                        onChange={() => handleSelect(item.id)}
                                    />
                                    <Image
                                        src={
                                            item.image ||
                                            '/placeholder-image.png'
                                        }
                                        alt={item.name}
                                        width={isMobile ? 60 : 80}
                                        height={isMobile ? 60 : 80}
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: 4,
                                        }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant={
                                                isMobile ? 'body2' : 'body1'
                                            }
                                            fontWeight="medium"
                                            sx={{ lineHeight: 1.4, mb: 1 }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            color="error.main"
                                            variant="body2"
                                            sx={{ my: 1 }}
                                        >
                                            Đơn giá:{' '}
                                            {item.price.toLocaleString(
                                                'vi-VN',
                                                {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                },
                                            )}
                                        </Typography>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={async () => {
                                                    const currentQty =
                                                        (inputQuantities[
                                                            item.id
                                                        ] as number) ??
                                                        item.quantity;
                                                    const newQty = Math.max(
                                                        currentQty - 1,
                                                        1,
                                                    );
                                                    setInputQuantities(
                                                        (prev) => ({
                                                            ...prev,
                                                            [item.id]: newQty,
                                                        }),
                                                    );
                                                    try {
                                                        await handleDecrease(
                                                            item.id,
                                                        );
                                                    } catch {
                                                        setInputQuantities(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.id]:
                                                                    item.quantity,
                                                            }),
                                                        );
                                                    }
                                                }}
                                                disabled={item.quantity === 1}
                                            >
                                                <RemoveIcon
                                                    fontSize={
                                                        isMobile
                                                            ? 'small'
                                                            : 'medium'
                                                    }
                                                />
                                            </IconButton>
                                            <TextField
                                                type="number"
                                                value={displayQuantity}
                                                inputProps={{ min: 1 }}
                                                size="small"
                                                sx={{
                                                    width: isMobile ? 48 : 56,
                                                    '& input': {
                                                        textAlign: 'center',
                                                        fontSize: isMobile
                                                            ? '0.875rem'
                                                            : '1rem',
                                                    },
                                                    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                                                        {
                                                            WebkitAppearance:
                                                                'none',
                                                            margin: 0,
                                                        },
                                                    '& input[type=number]': {
                                                        MozAppearance:
                                                            'textfield',
                                                    },
                                                }}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        item.id,
                                                        e.target.value,
                                                    )
                                                }
                                                onBlur={() => {
                                                    const qty =
                                                        inputQuantities[
                                                            item.id
                                                        ];
                                                    if (
                                                        typeof qty ===
                                                            'number' &&
                                                        qty >= 1
                                                    ) {
                                                        flushDebouncedUpdate(
                                                            item.id,
                                                        );
                                                    } else {
                                                        setInputQuantities(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.id]:
                                                                    item.quantity,
                                                            }),
                                                        );
                                                    }
                                                }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={async () => {
                                                    const currentQty =
                                                        (inputQuantities[
                                                            item.id
                                                        ] as number) ??
                                                        item.quantity;
                                                    const newQty =
                                                        currentQty + 1;
                                                    setInputQuantities(
                                                        (prev) => ({
                                                            ...prev,
                                                            [item.id]: newQty,
                                                        }),
                                                    );
                                                    try {
                                                        await handleIncrease(
                                                            item.id,
                                                        );
                                                    } catch {
                                                        setInputQuantities(
                                                            (prev) => ({
                                                                ...prev,
                                                                [item.id]:
                                                                    item.quantity,
                                                            }),
                                                        );
                                                    }
                                                }}
                                            >
                                                <AddIcon
                                                    fontSize={
                                                        isMobile
                                                            ? 'small'
                                                            : 'medium'
                                                    }
                                                />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                sx={{ ml: 'auto' }}
                                            >
                                                <DeleteIcon
                                                    fontSize={
                                                        isMobile
                                                            ? 'small'
                                                            : 'medium'
                                                    }
                                                />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>
        ))}
    </Box>
);

// Component chính CartTable
interface CartTableProps {
    cartGroups: CartGroup[];
    selected: string[];
    handleSelect: (id: string) => void;
    handleSelectGroup: (shopId: string) => void;
    handleDelete: (id: string) => void;
    handleIncrease: (id: string) => Promise<void>;
    handleDecrease: (id: string) => Promise<void>;
    handleQuantityChange: (id: string, quantity: number) => Promise<void>; // Sửa thành async để xử lý lỗi
}

const CartTable: React.FC<CartTableProps> = ({
    cartGroups,
    selected,
    handleSelect,
    handleSelectGroup,
    handleDelete,
    handleIncrease,
    handleDecrease,
    handleQuantityChange,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const [isClient, setIsClient] = useState(false);
    const [inputQuantities, setInputQuantities] = useState<{
        [key: string]: number | '';
    }>({});
    const isInternalUpdate = useRef(false);
    const debouncedUpdates = useRef<{
        [key: string]: ReturnType<typeof debounce>;
    }>({});

    useEffect(() => {
        return () => {
            Object.values(debouncedUpdates.current).forEach((debounceFn) =>
                debounceFn.cancel(),
            );
        };
    }, []);

    useEffect(() => {
        setIsClient(true);
        const initialQuantities: { [key: string]: number } = {};
        cartGroups.forEach((group) => {
            group.items.forEach((item) => {
                initialQuantities[item.id] = item.quantity;
            });
        });
        setInputQuantities(initialQuantities);
    }, []);

    useEffect(() => {
        if (!isInternalUpdate.current) {
            setInputQuantities((prev) => {
                const updated: { [key: string]: number | '' } = { ...prev };
                cartGroups.forEach((group) => {
                    group.items.forEach((item) => {
                        if (!(item.id in updated)) {
                            updated[item.id] = item.quantity;
                        } else if (
                            typeof updated[item.id] === 'number' &&
                            updated[item.id] !== item.quantity
                        ) {
                            updated[item.id] = item.quantity;
                        }
                    });
                });
                return updated;
            });
        }
        isInternalUpdate.current = false;
    }, [cartGroups]);

    const getDebouncedUpdate = (id: string) => {
        if (!debouncedUpdates.current[id]) {
            debouncedUpdates.current[id] = debounce(
                async (quantity: number) => {
                    try {
                        await handleQuantityChange(id, quantity);
                    } catch {
                        setInputQuantities((prev) => ({
                            ...prev,
                            [id]:
                                cartGroups
                                    .flatMap((group) => group.items)
                                    .find((item) => item.id === id)?.quantity ??
                                1,
                        }));
                    }
                },
                1000,
            );
        }
        return debouncedUpdates.current[id];
    };

    const flushDebouncedUpdate = (id: string) => {
        if (debouncedUpdates.current[id]) {
            debouncedUpdates.current[id].flush();
        }
    };

    const handleInputChange = (id: string, value: string) => {
        if (value === '') {
            setInputQuantities((prev) => ({ ...prev, [id]: '' }));
        } else {
            const newQuantity = Number(value);
            if (!isNaN(newQuantity) && newQuantity >= 1) {
                setInputQuantities((prev) => ({ ...prev, [id]: newQuantity }));
                const debouncedFn = getDebouncedUpdate(id);
                debouncedFn(newQuantity);
            }
        }
    };

    const handleLocalIncrease = async (id: string) => {
        isInternalUpdate.current = true;
        const currentQty =
            (inputQuantities[id] as number) ??
            cartGroups
                .flatMap((group) => group.items)
                .find((item) => item.id === id)?.quantity ??
            1;
        const newQty = currentQty + 1;
        setInputQuantities((prev) => ({ ...prev, [id]: newQty }));
        try {
            await handleIncrease(id);
            const debouncedFn = getDebouncedUpdate(id);
            debouncedFn(newQty);
            debouncedFn.flush();
        } catch {
            setInputQuantities((prev) => ({
                ...prev,
                [id]:
                    cartGroups
                        .flatMap((group) => group.items)
                        .find((item) => item.id === id)?.quantity ?? 1,
            }));
        }
    };

    const handleLocalDecrease = async (id: string) => {
        isInternalUpdate.current = true;
        const currentQty =
            (inputQuantities[id] as number) ??
            cartGroups
                .flatMap((group) => group.items)
                .find((item) => item.id === id)?.quantity ??
            1;
        const newQty = Math.max(currentQty - 1, 1);
        setInputQuantities((prev) => ({ ...prev, [id]: newQty }));
        try {
            await handleDecrease(id);
            const debouncedFn = getDebouncedUpdate(id);
            debouncedFn(newQty);
            debouncedFn.flush();
        } catch {
            setInputQuantities((prev) => ({
                ...prev,
                [id]:
                    cartGroups
                        .flatMap((group) => group.items)
                        .find((item) => item.id === id)?.quantity ?? 1,
            }));
        }
    };

    return (
        <Box sx={{ overflowX: 'auto' }}>
            {isClient && (isMobile || isTablet) ? (
                <MobileCardLayoutComponent
                    cartGroups={cartGroups}
                    selected={selected}
                    handleSelect={handleSelect}
                    handleSelectGroup={handleSelectGroup}
                    handleDelete={handleDelete}
                    handleIncrease={handleLocalIncrease}
                    handleDecrease={handleLocalDecrease}
                    inputQuantities={inputQuantities}
                    setInputQuantities={setInputQuantities}
                    handleInputChange={handleInputChange}
                    getDebouncedUpdate={getDebouncedUpdate}
                    flushDebouncedUpdate={flushDebouncedUpdate}
                    isMobile={isMobile}
                />
            ) : (
                <DesktopTableComponent
                    cartGroups={cartGroups}
                    selected={selected}
                    handleSelect={handleSelect}
                    handleSelectGroup={handleSelectGroup}
                    handleDelete={handleDelete}
                    handleIncrease={handleLocalIncrease}
                    handleDecrease={handleLocalDecrease}
                    inputQuantities={inputQuantities}
                    setInputQuantities={setInputQuantities}
                    handleInputChange={handleInputChange}
                    getDebouncedUpdate={getDebouncedUpdate}
                    flushDebouncedUpdate={flushDebouncedUpdate}
                />
            )}
        </Box>
    );
};

export default CartTable;
