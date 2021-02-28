export class Calculator {
    private static round(value: number, decimals: number): number {
        const factor = 10 ** decimals;
        return Math.round(value * factor) / factor;
    }
    static inToCm(value: number): number {
        return Calculator.round(2.54 * value, 4)
    }

    static lbToKg(value: number): number {
        return Calculator.round(value / 2.2046226218, 4)
    }

    static calculateDuBoisBSA(height: number, weight: number): number {
        return Calculator.round(0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425), 2)
    }

    static calculateEcmoFlow(bsa: number, factor: number = 2.4): number {
        return Calculator.round(bsa * factor, 3)
    }
}