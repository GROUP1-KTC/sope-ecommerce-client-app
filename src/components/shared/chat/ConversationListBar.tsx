import {
    Avatar,
    Box,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

import type { Conversation } from '~/types/chat';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';
import { setSelectedConversationId } from '~/features/chat/chatSlice';

interface ConversationListBarProps {
    onClose: () => void;
    search: string;
    setSearch: (search: string) => void;
    filteredConversations: Conversation[];
}

const ConversationListBar = ({
    onClose,
    search,
    setSearch,
    filteredConversations,
}: ConversationListBarProps) => {
    const dispatch = useAppDispatch();
    const selectedId = useAppSelector(
        (state) => state.chat.selectedConversationId,
    );
    const selected =
        filteredConversations.find((c) => c.conversationId === selectedId) ||
        null;

    return (
        <Box
            sx={{
                width: { xs: selected ? '0' : '100%', md: '320px' },
                display: { xs: selected ? 'none' : 'flex', md: 'flex' },
                flexDirection: 'column',
                bgcolor: 'background.paper',
                boxShadow: { md: '2px 0 8px rgba(0,0,0,0.1)' },
                transition: 'width 0.3s ease-in-out',
                zIndex: 1,
            }}
        >
            <Box
                sx={{
                    p: 2,
                    borderBottom: '1px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                    Chat
                </Typography>
                <IconButton onClick={onClose} sx={{ display: { md: 'none' } }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <TextField
                placeholder="Search..."
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    mx: 2,
                    my: 1,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    '& .MuiInputBase-root': { borderRadius: 2 },
                }}
            />
            <List
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    px: 1,
                }}
            >
                {filteredConversations?.map((conv) => (
                    <ListItem
                        key={conv.conversationId}
                        onClick={() =>
                            dispatch(
                                setSelectedConversationId(conv.conversationId),
                            )
                        }
                        sx={{
                            borderRadius: 2,

                            bgcolor:
                                conv.conversationId === selected?.conversationId
                                    ? 'primary.light'
                                    : 'transparent',
                            color:
                                conv.conversationId === selected?.conversationId
                                    ? 'primary.contrastText'
                                    : 'text.primary',
                            '&:hover': {
                                bgcolor:
                                    conv.conversationId ===
                                    selected?.conversationId
                                        ? 'primary.main'
                                        : 'action.hover',
                                cursor: 'pointer',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar
                                src={conv.avatar}
                                sx={{ width: 48, height: 48 }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography
                                    fontWeight={
                                        conv.conversationId ===
                                        selected?.conversationId
                                            ? 'bold'
                                            : 'medium'
                                    }
                                    variant="subtitle1"
                                >
                                    {conv.name}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body2"
                                    noWrap
                                    color={
                                        conv.conversationId ===
                                        selected?.conversationId
                                            ? 'inherit'
                                            : 'text.secondary'
                                    }
                                >
                                    {conv.lastMessage?.content ?? ''}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ConversationListBar;
