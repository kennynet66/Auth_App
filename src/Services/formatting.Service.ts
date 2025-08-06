export class IFormatter {
    MaskPhoneNumber(PhoneNumber: string): string {
        return PhoneNumber.slice(0, 6) + 'x'.repeat(6);
    };
};