import { Calculator } from "./calculator"

test("Converts in to cm", () => {
    const inches = 72
    const expectedCm = 182.88
    expect(Calculator.inToCm(inches)).toEqual(expectedCm)
})

test("Converts lb to kg", () => {
    const lb = 200
    const expectedKg = 90.7185
    expect(Calculator.lbToKg(lb)).toEqual(expectedKg)
})

test("Calculates BSA for 182cm 90kg", () => {
    const height = 182
    const weight = 90
    const expectedBsa = 2.12
    expect(Calculator.calculateDuBoisBSA(height, weight)).toEqual(expectedBsa)
})

test("Calculates BSA for 180.4cm 97.8kg", () => {
    const height = 180.4
    const weight = 97.8
    const expectedBsa = 2.18
    expect(Calculator.calculateDuBoisBSA(height, weight)).toEqual(expectedBsa)
})