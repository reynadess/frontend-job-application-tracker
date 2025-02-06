export function generateRandomThreeDigitNumber(): string {
    const randomNumber =  Math.floor(100 + Math.random() * 900)  +100;
    return randomNumber.toString();
}