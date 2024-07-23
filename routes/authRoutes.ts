// import express from 'express';
// import passport from 'passport';

// const router = express.Router();

// router.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.phonenumbers.read'] })
// );

// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         if (req.user && !req.user.phone) {
//             // Redirect ke halaman update nomor telepon jika tidak tersedia
//             res.redirect('/update-phone');
//         } else {
//             // Jika login berhasil dan sudah ada nomor telepon atau tidak wajib
//             res.redirect('/');
//         }
//     }
// );

// export default router;