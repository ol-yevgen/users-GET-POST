export const usefileValidation = (file) => {
    if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
        console.log('is not required type');

        return
    }

    if (file.size > 5 * 1024 * 1024) {
        console.log('iNithinf picked');
        return
    }
}