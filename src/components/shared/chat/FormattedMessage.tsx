import React from "react";
import {
    Typography,
    Box,
    Link,
    List,
    ListItem,
    Card,
    CardContent,
} from "@mui/material";

interface Product {
    name: string;
    link: string;
    image?: string;
    minPrice?: number;
}

interface ChatResponse {
    content: string;
    products?: Product[];
}

interface FormattedMessageProps {
    content: string; 
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({ content }) => {
    const parsed = tryParseJson(content);
    console.log("parsed:", parsed);

    if (parsed) {
        return (
            <Box>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {parsed.content}
                </Typography>

                {parsed.products && parsed.products.length > 0 && (
                    <List sx={{ pl: 0 }}>
                        {parsed.products.map((p, idx) => (
                            <ListItem key={idx} sx={{ display: "block", mb: 1, p: 0 }}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: 1,
                                        "&:hover": { boxShadow: 3 },
                                    }}
                                >
                                    <CardContent>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <Box sx={{ flex: 1, pr: 2 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                    {p.name}
                                                </Typography>

                                                {p.minPrice !== undefined && (
                                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                                        💰 Giá tốt nhất: {p.minPrice.toLocaleString()} VND
                                                    </Typography>
                                                )}

                                                <Typography variant="body2" color="primary">
                                                    🔗{" "}
                                                    <Link
                                                        href={p.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        color="primary"
                                                        underline="hover"
                                                    >
                                                        Bấm vào đây để xem chi tiết
                                                    </Link>
                                                </Typography>
                                            </Box>

                                            {p.image && (
                                                <Box
                                                    component="img"
                                                    src={p.image}
                                                    alt={p.name}
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: 2,
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        );
    }

    const lines = content.split("\n").filter((line) => line.trim() !== "");
    return (
        <Box>
            {lines.map((line, idx) => (
                <Typography key={idx} variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
                    {formatInline(line, idx)}
                </Typography>
            ))}
        </Box>
    );
};

function tryParseJson(raw: string): ChatResponse | null {
    try {
        const cleaned = cleanJsonString(raw);
        return JSON.parse(cleaned) as ChatResponse;
    } catch {
        return null;
    }
}

function formatInline(text: string, parentIdx: number) {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

    return parts.map((part, idx) => {
        // Bold
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <span key={`${parentIdx}-${idx}`} style={{ fontWeight: "bold" }}>
                    {part.slice(2, -2)}
                </span>
            );
        }

        if (part.startsWith("[") && part.includes("](")) {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (!match) return part;
            const [, text, url] = match;
            return (
                <Link
                    key={`${parentIdx}-${idx}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    underline="hover"
                    sx={{ mx: 0.5 }}
                >
                    {text}
                </Link>
            );
        }

        return <span key={`${parentIdx}-${idx}`}>{part}</span>;
    });
}

function cleanJsonString(str: string) {
    return str
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .replace(/\r?\n/g, " ")
        .trim();
}

export default FormattedMessage;
