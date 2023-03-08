


export const getMethodNotAllowdText = (method: string): string => `The request method ${method} is inappropriate for this URL`;

// If the length of the line is more than 12 characters and Masiav of empty lines returned in a line less than 12 digits ['', '']
export const isFormatedTelNumberCorrect = (telNumString: string): boolean => (/\b\d{12}\b/).test(telNumString);


