// // config/passport.ts
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import User from '../models/User';

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     callbackURL: '/auth/google/callback',
//     passReqToCallback: true
// },
// async (request, accessToken, refreshToken, profile, done) => {
//     try {
//         const email = profile.emails?.[0].value;
//         const phone = profile._json.phoneNumber || null; // Biarkan nomor telepon null jika tidak tersedia
//         const firstName = profile.name?.givenName || '';
//         const lastName = profile.name?.familyName || '';
//         const username = `${firstName}${lastName}`;

//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//             // Cek apakah email sudah ada di database
//             user = await User.findOne({ email: email });
//             if (user) {
//                 // Update user dengan googleId jika belum ada googleId
//                 if (!user.googleId) {
//                     user.googleId = profile.id;
//                     user.username = username;
//                     await user.save();
//                 }
//             } else {
//                 // Buat pengguna baru jika tidak ada
//                 user = new User({
//                     googleId: profile.id,
//                     email: email,
//                     username: username,
//                     phone: phone,
//                 });
//                 await user.save();
//             }
//         } else {
//             // Update nomor telepon jika belum ada
//             if (!user.phone && phone) {
//                 user.phone = phone;
//                 await user.save();
//             }
//         }

//         return done(null, user);
//     } catch (err) {
//         return done(err);
//     }
// }));

// passport.serializeUser((user: any, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// export default passport;
