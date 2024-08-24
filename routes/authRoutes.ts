import express, { Request, Response } from 'express';
import passport from '../config/passport';

const router = express.Router();

router.get('/auth/google', (req, res, next) => {
    console.log('Initiating Google authentication');
    next();
}, passport.authenticate('google', {
    scope: ['profile', 'email'], prompt: 'consent'
}));

router.get('/auth/google/callback', (req, res, next) => {
    console.log('Handling Google callback');
    console.log('Query parameters:', req.query);
    next();
}, passport.authenticate('google', { session: false }), (req: Request, res: Response) => {
    console.log('Google callback successful');
    if (req.user) {
        console.log('Authenticated user:', req.user);
        const { _id, name, username, image, role, token } = req.user as any;
        
        // Option 1: Redirect with token as query parameter
        // res.redirect(`${_id}/${role}/dashboard?token=${token}`);

        // Option 2: Send token in response body (for API usage)
        res.json({ _id, name, username, image, role, token });
    } else {
        console.log('User authentication failed');
        res.redirect('/login');
    }
});

export default router;