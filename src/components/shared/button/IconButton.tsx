import { Badge, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { colors } from '~/constants/color.constant';

interface Props {
    active: boolean;
    onClick: () => void;
    counter?: number;
    Icon: OverridableComponent<SvgIconTypeMap>;
    title: string;
}

export default function IconButton({
    active,
    onClick,
    counter,
    Icon,
    title,
}: Props) {
    return (
        <Badge
            color="error"
            variant="dot"
            invisible={!counter || counter === 0}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
                '& .MuiBadge-badge': {
                    color: '#d0001a',
                    fontWeight: 'bold',
                },
            }}
            overlap="circular"
        >
            <button
                onClick={onClick}
                title={title}
                className={`p-2 cursor-pointer rounded-full hover:bg-gray-100 ${
                    active ? 'bg-orange-100' : ''
                }`}
            >
                <Icon
                    sx={{
                        color: active
                            ? colors.primary.backgroundHover
                            : colors.primary.background,
                    }}
                />
            </button>
        </Badge>
    );
}
