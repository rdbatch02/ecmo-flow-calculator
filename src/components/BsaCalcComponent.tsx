import React, { FormEvent, RefObject } from "react";
import {Card} from "baseui/card"
import {Button} from "baseui/button"
import {OnChangeParams} from "baseui/select"
import { InputWithUnit } from "./InputWithUnit";
import { Calculator } from "../util/calculator";
import { Footer } from "./Footer";

type BsaCalcState = {
    heightUnit: any,
    heightValue: number,
    weightUnit: any,
    weightValue: number,
    bsaValue: number,
    goalFlowValue: number
}

export class BsaCalcComponent extends React.Component<{}, BsaCalcState> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = this.initialState
        this.handleHeightUnitChange = this.handleHeightUnitChange.bind(this)
        this.handleHeightValueChange = this.handleHeightValueChange.bind(this)
        this.handleWeightUnitChange = this.handleWeightUnitChange.bind(this)
        this.handleWeightValueChange = this.handleWeightValueChange.bind(this)
        this.resetFields = this.resetFields.bind(this)
        
    }
    heightUnits = [
        {label: "cm", id: "cm"},
        {label: "in", id: "in"}
    ]
    weightUnits = [
        {label: "kg", id: "kg"},
        {label: "lb", id: "lb"},
    ]
    initialState: BsaCalcState = {
        heightUnit: this.heightUnits[0],
        heightValue: 0,
        weightUnit: this.weightUnits[0],
        weightValue: 0,
        bsaValue: 0,
        goalFlowValue: 0
    }

    weightInputRef: RefObject<HTMLInputElement> = React.createRef()
    heightInputRef: RefObject<HTMLInputElement> = React.createRef()

    handleHeightUnitChange(e: OnChangeParams) {
        this.setState({...this.state, heightUnit: e.value[0]})
    }

    handleHeightValueChange(e: FormEvent<HTMLInputElement>) {
        this.setState({...this.state, heightValue: parseFloat(e.currentTarget.value)})
    }
    handleWeightUnitChange(e: OnChangeParams) {
        this.setState({...this.state, weightUnit: e.value[0]})
    }

    handleWeightValueChange(e: FormEvent<HTMLInputElement>) {
        this.setState({...this.state, weightValue: parseFloat(e.currentTarget.value)})
    }

    private resetFields() {
        this.weightInputRef.current!.value = ""
        this.heightInputRef.current!.value = ""
        this.setState(this.initialState)
    }

    private performBsaCalculation(): number {
        if (this.state.heightValue === 0 || this.state.weightValue === 0) {
            return 0
        }
        const height = this.state.heightUnit.id === "cm" ? this.state.heightValue : Calculator.inToCm(this.state.heightValue)
        const weight = this.state.weightUnit.id === "kg" ? this.state.weightValue : Calculator.lbToKg(this.state.weightValue)
        return Calculator.calculateDuBoisBSA(height, weight)
    }

    private numberValuesAreEqual(val1: number, val2: number): boolean {
        if (Number.isNaN(val1) && Number.isNaN(val2)) {
            return true
        } 
        return val1 === val2
    }

    componentDidUpdate(_prevProps: any, prevState: BsaCalcState) {
        if (!this.numberValuesAreEqual(this.state.heightValue, prevState.heightValue) ||
            this.state.heightUnit !== prevState.heightUnit || 
            !this.numberValuesAreEqual(this.state.weightValue, prevState.weightValue) ||
            this.state.weightUnit !== prevState.weightUnit) {
                
                const bsaValue = this.performBsaCalculation()
                this.setState({
                    ...this.state, 
                    bsaValue: bsaValue,
                    goalFlowValue: Calculator.calculateEcmoFlow(bsaValue)
                })
            }
    }

    render() {
        return (
            <Card
                overrides={{
                    Root: {
                    style: {
                        left: '50%',
                        maxWidth: '420px',
                        position: 'absolute',
                        top: '20px',
                        transform: 'translate(-50%, 0)',
                        width: '95vw',
                    },
                    },
                }}
                >
                    <h1>Goal ECMO Flow Calculator</h1>
                    <InputWithUnit 
                        label="Height"
                        units={this.heightUnits}
                        selectedUnit={this.state.heightUnit}
                        inputValue={this.state.heightValue}
                        onUnitChange={this.handleHeightUnitChange}
                        onInputChange={this.handleHeightValueChange}
                        inputRef={this.heightInputRef}
                    />

                    <InputWithUnit 
                        label="Weight"
                        units={this.weightUnits}
                        selectedUnit={this.state.weightUnit}
                        inputValue={this.state.weightValue}
                        onUnitChange={this.handleWeightUnitChange}
                        onInputChange={this.handleWeightValueChange}
                        inputRef={this.weightInputRef}
                    />

                    <div>BSA: {this.state.bsaValue} m<sup>2</sup></div>
                    <div style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        textAlign: "center",
                        marginTop: 50, 
                        marginBottom: 50, 
                        paddingTop: 5,                        
                        paddingBottom: 5,
                        backgroundColor: "yellow"
                    }}>
                        Goal ECMO Flow: <br/>{this.state.goalFlowValue} L/min
                    </div>

                    <Button onClick={this.resetFields}>Reset</Button>

                    <Footer />
                
            </Card>
        )
    }
}