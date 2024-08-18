import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User'; // Adjust path as needed
import Seller from '../models/Seller'; // Adjust path as needed
import Admin from '../models/Admin'; // Adjust path as needed
import Token from '../models/Token';
import { generateToken } from '../utils/tokenUtils'; // Import the token generation function

// Initialize Google Strategy
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:5000/api/auth/google/callback',
        scope: ['profile', 'email']
    },
    async (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
        try {
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
            console.log('Profile:', profile);

            const email = profile.emails[0].value;
            console.log('Email:', email);

            let user = await User.findOne({ email });
            if (user) {
                console.log('User found:', user);
                
                const token = generateToken({ Id: user.id, role: 'user' });
                const newToken = new Token({
                    token,
                    Id: user._id,
                    role: 'user',
                    expiresAt: new Date(Date.now() + 3600000) // Token expires in 1 hour
                });

                await newToken.save();
                return done(null, { ...user.toObject(), role: 'user', token });
            }

            let seller = await Seller.findOne({ email });
            if (seller) {
                console.log('Seller found:', seller);

                const token = generateToken({ Id: seller.id, role: 'seller' });
                const newToken = new Token({
                    token,
                    Id: seller._id,
                    role: 'seller',
                    expiresAt: new Date(Date.now() + 3600000) // Token expires in 1 hour
                });

                await newToken.save();
                return done(null, { ...seller.toObject(), role: 'seller', token });
            }

            let admin = await Admin.findOne({ email });
            if (admin) {
                console.log('Admin found:', admin);

                const token = generateToken({ Id: admin.id, role: 'admin' });
                const newToken = new Token({
                    token,
                    Id: admin._id,
                    role: 'admin',
                    expiresAt: new Date(Date.now() + 3600000) // Token expires in 1 hour
                });

                await newToken.save();
                return done(null, { ...admin.toObject(), role: 'admin', token });
            }

            else {
                // If user doesn't exist, create a new one
                user = new User({
                    role: 'user',
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    image: profile.photos[0].value,
                    password: null,
                    isVerified: true,
                    verificationToken: null
                });

                await user.save();
                console.log('New user created:', user);

                const token = generateToken({ Id: user.id, role: 'user' });
                const newToken = new Token({
                    token,
                    Id: user._id,
                    role: 'user',
                    expiresAt: new Date(Date.now() + 3600000) // Token expires in 1 hour
                });

                await newToken.save();
                return done(null, { ...user.toObject(), role: 'user', token });
            }

            console.log('Email not registered');
            return done(false, { message: 'Email not registered' });
        } catch (err) {
            console.error('Error in Google Strategy:', err);
            return done(err);
        }
    }
));

passport.serializeUser((user: any, done) => {
    console.log('Serializing user:', user);
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        console.log('Deserializing user with id:', id);
        let user = await User.findById(id);
        if (user) {
            console.log('User deserialized:', user);
            return done(null, user);
        }

        let seller = await Seller.findById(id);
        if (seller) {
            console.log('Seller deserialized:', seller);
            return done(null, seller);
        }

        let admin = await Admin.findById(id);
        if (admin) {
            console.log('Admin deserialized:', admin);
            return done(null, admin);
        }

        console.log('User not found during deserialization');
        done(new Error('User not found'), null);
    } catch (err) {
        console.error('Error during deserialization:', err);
        done(err, null);
    }
});

export default passport;