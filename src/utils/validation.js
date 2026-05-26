export function validateStanfordEmail(email) {
  return email.includes("@stanford.edu");
}

export function validateSecretWord(input, expected) {
  return input.trim().toUpperCase() === expected.trim().toUpperCase();
}
