import express, { Request, Response } from 'express';
import passport from '../config/passport';

const router = express.Router();

router.get('/auth/google', (req, res, next) => {
    console.log('Initiating Google authentication');
    next();
}, passport.authenticate('google', {
    scope: ['profile', 'email'], prompt: 'consent'
}));

router.get('/auth/google/callback', (req: Request, res: Response, next) => {
    console.log('Handling Google callback');
    console.log('Query parameters:', req.query);
    next();
}, passport.authenticate('google', { session: false }), (req: Request, res: Response) => {
    console.log('Google callback successful');
    if (req.user) {
        const { _id, name, username, role, token } = req.user as any;

        // Log user details to console
        console.log('Authenticated user:', { _id, name, username, role, token });

        // Send the token and user data in the redirect URL as part of the query parameters
        const redirectUrl = `http://localhost:3000/dashboard-${role}?token=${token}&id=${_id}&name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&role=${role}`;
        res.redirect(redirectUrl);
    } else {
        res.json({ success: false, message: 'Authentication failed' });
    }
});

export default router;