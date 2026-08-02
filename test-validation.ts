export function validateContactInfo(original: string, tailored: string): boolean {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/gi;
  const originalEmails = original.match(emailRegex) || [];
  
  const tailoredLower = tailored.toLowerCase();
  for (const email of originalEmails) {
    if (!tailoredLower.includes(email.toLowerCase())) {
      console.error(`Validation failed: missing ${email}`);
      return false;
    }
  }
  return true;
}

const original = 'Name: Zzyx Q. Testperson\nEmail: zzyxtest@nowhere.test\nPhone: +91 99999 99999';
const tailoredWrong = 'Name: Zzyx Q. Testperson\nEmail: fake@example.com\nPhone: +91 99999 99999';
const tailoredRight = 'Name: Zzyx Q. Testperson\nEmail: zzyxtest@nowhere.test\nPhone: +91 99999 99999';

console.log('Wrong output expected false:', validateContactInfo(original, tailoredWrong));
console.log('Right output expected true:', validateContactInfo(original, tailoredRight));
