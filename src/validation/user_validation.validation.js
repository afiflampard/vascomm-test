
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ValidationUserCreate = (user) => {
    if(!user.email) {
        throw new Error('Email is required');
    }

    if (!EMAIL_REGEX.test(user.email)) {
        throw new Error("Invalid email format");
    }

    if (!user.first_name) {
        throw new Error("First name is required");
    }

    if (!user.last_name) {
        throw new Error("Last name is required");
    }
    
    return true;
}