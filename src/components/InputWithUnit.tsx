import React, { RefObject } from "react";
import {FormControl} from "baseui/form-control"
import {Select} from "baseui/select"
import {Input} from "baseui/input"

type InputWithUnitProps = {
    label: string,
    units: any[],
    selectedUnit: any,
    inputValue: string | number,
    onUnitChange: (unit: any) => void,
    onInputChange: (newInput: any) => void
    inputRef: RefObject<HTMLInputElement>
}

export class InputWithUnit extends React.Component<InputWithUnitProps, {}> {
    render() {
        return (
            <FormControl
                label={this.props.label}>
                <Input
                    placeholder={this.props.label}
                    onChange={this.props.onInputChange}
                    inputRef={this.props.inputRef}
                    type="number"
                    pattern="[0-9]*"
                    overrides={{
                        After: () => (
                        <Select
                            clearable={false}
                            searchable={false}
                            escapeClearsValue={false}
                            backspaceRemoves={false}
                            options={this.props.units} 
                            value={this.props.selectedUnit}
                            onChange={this.props.onUnitChange}
                            placeholder = ""
                        />
                        ),
                    }}
                />
            </FormControl>
                    )
        
    }
}