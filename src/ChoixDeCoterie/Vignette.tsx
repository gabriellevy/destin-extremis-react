import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material';

// Définir les types pour les props
interface VignetteProps {
    name: string;
    description: string;
    image: string;
    score: number;
}

const Vignette: React.FC<VignetteProps> = ({ name, description, image, score }) => {
    return (
        <Card sx={{ display: 'flex', m: 2, maxWidth: 600 }}>
            <Box sx={{ width: 150, height: 150 }}>
                <img
                    src={image}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>
            <Box sx={{ width: 450, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating name="read-only" value={score} readOnly precision={0.5} />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {score}
                    </Typography>
                </Box>
            </CardContent>
            </Box>
    </Card>
);
};

export default Vignette;