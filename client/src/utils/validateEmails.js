const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails, from) => {
    const invalidEmails= emails
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email)=== false);

    if (invalidEmails[invalidEmails.length-1] === '') {
        invalidEmails.pop();
    }

    
    if (invalidEmails.length && from !== 'from' ) {
        return `These emails are invalid: ${invalidEmails}` ;
    }
    if (invalidEmails.length && from === 'from' ) {
        return `This email is invalid: ${invalidEmails}` ;
    }
    return;
};