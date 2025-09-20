import React from 'react';
import { Typography, Box } from '@mui/material';

interface FormattedMessageProps {
  content: string;
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({ content }) => {
  const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

  return (
    <Box>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const text = part.slice(2, -2);
          return (
            <Typography
              key={idx}
              component="span"
              sx={{ fontWeight: 'bold' }}
            >
              {text}
            </Typography>
          );
        } else if (part.startsWith('[',) && part.includes('](')) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (!match) return null;
          const text = match[1];
          const url = match[2];
          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'blue', textDecoration: 'underline', margin: '0 2px' }}
            >
              {text}
            </a>
          );
        } else {
          // Plain text
          return <span key={idx}>{part}</span>;
        }
      })}
    </Box>
  );
};

export default FormattedMessage;
