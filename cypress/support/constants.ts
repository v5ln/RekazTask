export const USERNAME = 'v5ln@icloud.com';
export const PASSWORD = 'Mohammad';
export const BASE_URL = (isPlatform: boolean = true, storeName: string = 'qatest') => {
    return isPlatform ? 'https://platform.rekaz.dev/' : `https://rekaz.dev/${storeName}/`;
    };
