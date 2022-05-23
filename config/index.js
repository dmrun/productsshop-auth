import dotenv from 'dotenv';
dotenv.config();

const settings = {
    server: {
        PORT: process.env.PORT,
    },
};

export default settings;
