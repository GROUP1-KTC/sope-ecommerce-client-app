import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';

import type {
    DiscountDialogProps,
    DiscountFormData,
    VoucherDiscountType,
} from '~/types/discount/discount';

export default function DiscountDialog({
    open,
    onClose,
    onSave,
    data,
    isViewMode = false,
}: DiscountDialogProps) {
    const [formData, setFormData] = useState<DiscountFormData>({
        code: '',
        description: '',
        value: 0,
        minOrderValue: 0,
        maxUsage: 0,
        startDate: null,
        endDate: null,
        maxDiscountValue: undefined,
        discountType: 'FIXED_AMOUNT',
        scope: 'SHOP',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (data) {
            setFormData({
                code: data.code || '',
                description: data.description || '',
                value: data.value || 0,
                minOrderValue: data.minOrderValue || 0,
                maxUsage: data.maxUsage || 0,
                startDate: data.startDate || null,
                endDate: data.endDate || null,
                maxDiscountValue: data.maxDiscountValue,
                discountType: data.discountType || 'FIXED_AMOUNT',
                scope: 'SHOP',
            });
        } else {
            setFormData({
                code: '',
                description: '',
                value: 0,
                minOrderValue: 0,
                maxUsage: 0,
                startDate: null,
                endDate: null,
                maxDiscountValue: undefined,
                discountType: 'FIXED_AMOUNT',
                scope: 'SHOP',
            });
        }
        setErrors({});
    }, [data, open]);

    const updateField = (field: keyof DiscountFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.code.trim()) {
            newErrors.code = 'Code is required';
        }
        if (formData.value <= 0) {
            newErrors.value = 'Value must be greater than 0';
        }
        if ((formData.maxUsage ?? 0) < 0) {
            newErrors.maxUsage = 'Open Quantity cannot be negative';
        }
        if ((formData.minOrderValue ?? 0) < 0) {
            newErrors.minOrderValue = 'Min order value cannot be negative';
        }
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate).getTime();
            const end = new Date(formData.endDate).getTime();
            if (end < start) {
                newErrors.endDate = 'Expiry date must be after start date';
            }
        }
        if (
            formData.discountType === 'PERCENTAGE' &&
            (formData.maxDiscountValue ?? 0) <= 0
        ) {
            newErrors.maxDiscountValue =
                'Max discount value is required for percentage type';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;
        onSave?.(formData);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {isViewMode
                    ? 'Discount Details'
                    : data?.id
                      ? 'Edit Discount'
                      : 'Create New Discount'}
            </DialogTitle>

            <DialogContent>
                <TextField
                    margin="dense"
                    label="Code"
                    fullWidth
                    value={formData.code}
                    onChange={(e) => updateField('code', e.target.value)}
                    InputProps={{ readOnly: isViewMode }}
                    error={!!errors.code}
                    helperText={errors.code}
                />

                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    InputProps={{ readOnly: isViewMode }}
                />

                <TextField
                    margin="dense"
                    label="Min Order Value"
                    type="number"
                    fullWidth
                    value={formData.minOrderValue}
                    onChange={(e) =>
                        updateField('minOrderValue', Number(e.target.value))
                    }
                    error={!!errors.minOrderValue}
                    helperText={errors.minOrderValue}
                    InputProps={{ readOnly: isViewMode }}
                />

                <TextField
                    margin="dense"
                    label="Value"
                    type="number"
                    fullWidth
                    value={formData.value}
                    onChange={(e) =>
                        updateField('value', Number(e.target.value))
                    }
                    error={!!errors.value}
                    helperText={errors.value}
                    InputProps={{ readOnly: isViewMode }}
                />

                <TextField
                    margin="dense"
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={
                        formData.startDate
                            ? new Date(formData.startDate)
                                  .toISOString()
                                  .split('T')[0]
                            : ''
                    }
                    onChange={(e) => updateField('startDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: isViewMode }}
                />

                <TextField
                    margin="dense"
                    label="Expiry Date"
                    type="date"
                    fullWidth
                    value={
                        formData.endDate
                            ? new Date(formData.endDate)
                                  .toISOString()
                                  .split('T')[0]
                            : ''
                    }
                    onChange={(e) => updateField('endDate', e.target.value)}
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: isViewMode }}
                />

                <TextField
                    margin="dense"
                    label="Open Quantity"
                    type="number"
                    fullWidth
                    value={formData.maxUsage}
                    onChange={(e) =>
                        updateField('maxUsage', Number(e.target.value))
                    }
                    error={!!errors.maxUsage}
                    helperText={errors.maxUsage}
                    InputProps={{ readOnly: isViewMode }}
                />

                <TextField
                    margin="dense"
                    label="Scope"
                    fullWidth
                    value="SHOP"
                    InputProps={{ readOnly: true }}
                    disabled
                />

                <FormControl fullWidth margin="dense">
                    <InputLabel>Discount Type</InputLabel>
                    <Select
                        value={formData.discountType}
                        onChange={(e) =>
                            updateField(
                                'discountType',
                                e.target.value as VoucherDiscountType,
                            )
                        }
                        error={!!errors.discountType}
                        disabled={isViewMode}
                    >
                        <MenuItem value="FIXED_AMOUNT">Fixed Amount</MenuItem>
                        <MenuItem value="PERCENTAGE">Percentage</MenuItem>
                    </Select>
                    {errors.discountType && (
                        <FormHelperText error>
                            {errors.discountType}
                        </FormHelperText>
                    )}
                </FormControl>

                {formData.discountType === 'PERCENTAGE' && (
                    <TextField
                        margin="dense"
                        label="Max Discount"
                        type="number"
                        fullWidth
                        value={formData.maxDiscountValue || ''}
                        onChange={(e) =>
                            updateField(
                                'maxDiscountValue',
                                Number(e.target.value),
                            )
                        }
                        error={!!errors.maxDiscountValue}
                        helperText={errors.maxDiscountValue}
                        InputProps={{ readOnly: isViewMode }}
                    />
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    {isViewMode ? 'Close' : 'Cancel'}
                </Button>
                {!isViewMode && (
                    <Button
                        onClick={handleSave}
                        color="primary"
                        variant="contained"
                    >
                        Save
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
