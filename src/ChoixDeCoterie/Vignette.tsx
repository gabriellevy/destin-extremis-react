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
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={name}
            />
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
    </Card>
);
};

export default Vignette;