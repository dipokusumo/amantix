import crypto from 'crypto';

// Generate Transaction Code
const generateTransactionCode = (eventName: string, sellerName: string): string => {
    const eventInitials = eventName.split(' ').map(word => word[0]).join('').toUpperCase();
    const sellerInitials = sellerName.split(' ').map(word => word[0]).join('').toUpperCase();
    const randomString = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6-character random string

    return `${eventInitials}${sellerInitials}${randomString}`;
}

export { generateTransactionCode };