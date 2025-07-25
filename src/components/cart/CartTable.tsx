import React from 'react';
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
} from '@mui/material';

import Grid from '@mui/material/Grid';

import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CartItem } from '~/app/(customer)/cart/page';

interface CartTableProps {
    cartItems: CartItem[];
    selected: number[];
    handleSelect: (id: number) => void;
    handleSelectAll: () => void;
    handleDelete: (id: number) => void;
    handleIncrease: (id: number) => void;
    handleDecrease: (id: number) => void;
    handleQuantityChange: (id: number, quantity: number) => void;
}

const CartTable: React.FC<CartTableProps> = ({
    cartItems,
    selected,
    handleSelect,
    handleSelectAll,
    handleDelete,
    handleIncrease,
    handleDecrease,
    handleQuantityChange,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Desktop Table Layout
    const DesktopTable = () => (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={
                                    selected.length === cartItems.length &&
                                    cartItems.length > 0
                                }
                                onChange={handleSelectAll}
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
                    {cartItems.map((item) => (
                        <TableRow key={item.id} hover>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selected.includes(item.id)}
                                    onChange={() => handleSelect(item.id)}
                                />
                            </TableCell>
                            <TableCell align="left">
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Image
                                        src={item.image}
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
                            <TableCell align="center" sx={{ fontSize: '1rem' }}>
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
                                        onClick={() => handleDecrease(item.id)}
                                        disabled={item.quantity === 1}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <TextField
                                        type="number"
                                        value={item.quantity}
                                        inputProps={{ min: 1 }}
                                        size="small"
                                        sx={{
                                            flexGrow: 1,
                                            width: 56,
                                            '& input': { textAlign: 'center' },
                                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                                                {
                                                    WebkitAppearance: 'none',
                                                    margin: 0,
                                                },
                                            '& input[type=number]': {
                                                MozAppearance: 'textfield',
                                            },
                                        }}
                                        onChange={(e) => {
                                            const newQuantity = Number(
                                                e.target.value,
                                            );
                                            if (newQuantity >= 1) {
                                                handleQuantityChange(
                                                    item.id,
                                                    newQuantity,
                                                );
                                            }
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleIncrease(item.id)}
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
                                {(item.price * item.quantity).toLocaleString(
                                    'vi-VN',
                                    {
                                        style: 'currency',
                                        currency: 'VND',
                                    },
                                )}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    // Mobile/Tablet Card Layout
    const MobileCardLayout = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {cartItems.map((item) => (
                <Card key={item.id} sx={{ boxShadow: 2, borderRadius: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid>
                                <Checkbox
                                    checked={selected.includes(item.id)}
                                    onChange={() => handleSelect(item.id)}
                                />
                            </Grid>
                            <Grid>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={isMobile ? 60 : 80}
                                    height={isMobile ? 60 : 80}
                                    style={{
                                        objectFit: 'cover',
                                        borderRadius: 4,
                                    }}
                                />
                            </Grid>
                            <Grid>
                                <Typography
                                    variant={isMobile ? 'body2' : 'body1'}
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
                                    {item.price.toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </Typography>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDecrease(item.id)}
                                        disabled={item.quantity === 1}
                                    >
                                        <RemoveIcon
                                            fontSize={
                                                isMobile ? 'small' : 'medium'
                                            }
                                        />
                                    </IconButton>
                                    <TextField
                                        type="number"
                                        value={item.quantity}
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
                                                    WebkitAppearance: 'none',
                                                    margin: 0,
                                                },
                                            '& input[type=number]': {
                                                MozAppearance: 'textfield',
                                            },
                                        }}
                                        onChange={(e) => {
                                            const newQuantity = Number(
                                                e.target.value,
                                            );
                                            if (newQuantity >= 1) {
                                                handleQuantityChange(
                                                    item.id,
                                                    newQuantity,
                                                );
                                            }
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleIncrease(item.id)}
                                    >
                                        <AddIcon
                                            fontSize={
                                                isMobile ? 'small' : 'medium'
                                            }
                                        />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(item.id)}
                                        sx={{ ml: 'auto' }}
                                    >
                                        <DeleteIcon
                                            fontSize={
                                                isMobile ? 'small' : 'medium'
                                            }
                                        />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );

    return (
        <Box sx={{ overflowX: 'auto' }}>
            {isMobile || isTablet ? <MobileCardLayout /> : <DesktopTable />}
        </Box>
    );
};

export default CartTable;
