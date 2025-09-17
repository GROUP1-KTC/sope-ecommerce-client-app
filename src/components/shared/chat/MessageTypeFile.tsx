import { Box, Link, Typography } from '@mui/material';
import type { Message } from '~/types/chat';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import CustomLink from '../loading/CustomLink';

const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const videoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

const MessageTypeFile = (message: Message) => {
    if (!message.fileUrl) return null;

    const url = message.fileUrl;
    const name = message.fileName || 'Unknown';
    const type = message.fileType || 'application/octet-stream';

    const getFileIcon = (type: string) => {
        if (type === 'application/pdf')
            return <PictureAsPdfIcon fontSize="small" />;
        if (type.startsWith('text/') || type.includes('document'))
            return <DescriptionIcon fontSize="small" />;
        return <InsertDriveFileIcon fontSize="small" />;
    };

    if (imageTypes.includes(type)) {
        return (
            <Box
                component="img"
                src={url}
                alt={name}
                sx={{
                    maxHeight: '300px',
                    borderRadius: 2,
                    objectFit: 'contain',
                    cursor: 'pointer',
                    alignSelf:
                        message.senderId === 'Me' ? 'flex-end' : 'flex-start',
                }}
                onClick={() => window.open(url, '_blank')}
            />
        );
    }

    if (videoTypes.includes(type)) {
        return (
            <Box
                component="video"
                controls
                src={url}
                sx={{
                    maxHeight: '300px',
                    borderRadius: 2,
                    alignSelf:
                        message.senderId === 'Me' ? 'flex-end' : 'flex-start',
                }}
            />
        );
    }

    return (
        <CustomLink
            sx={{
                display: 'flex',
                textDecoration: 'none',
                gap: 1,
                cursor: 'pointer',
                alignSelf:
                    message.senderId === 'Me' ? 'flex-end' : 'flex-start',
                px: 2.5,
                py: 1.5,
                bgcolor: message.senderId === 'Me' ? 'primary.main' : 'white',
                color: message.senderId === 'Me' ? 'white' : 'text.primary',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
            href={url}
            target="_blank"
        >
            {getFileIcon(type)}
            <Typography variant="body2" noWrap>
                {name}
            </Typography>
        </CustomLink>
    );
};

export default MessageTypeFile;
