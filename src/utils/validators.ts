export const formatCNPJ = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as CNPJ: XX.XXX.XXX/XXXX-XX
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };
  
  export const validateCNPJ = (cnpj: string): boolean => {
    const strCNPJ = cnpj.replace(/\D/g, '');
  
    if (strCNPJ.length !== 14) return false;
  
    // Check for all same digits
    if (/^(\d)\1+$/.test(strCNPJ)) return false;
  
    // Validation algorithm
    let size = strCNPJ.length - 2;
    let numbers = strCNPJ.substring(0, size);
    const digits = strCNPJ.substring(size);
    let sum = 0;
    let pos = size - 7;
  
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
  
    size = size + 1;
    numbers = strCNPJ.substring(0, size);
    sum = 0;
    pos = size - 7;
  
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  };