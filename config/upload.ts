import multer from 'multer';

const storage = multer.memoryStorage(); // Store image as Buffer in memory
const uploadImage = multer({ storage });

export default uploadImage;