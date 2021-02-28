import React from "react";

export class Footer extends React.Component<{}, {}> {
    render() {
        return(
            <div style={{fontSize: 10, color: "grey", lineHeight: "normal"}}>
                <p>
                    All information and calculations provided by this tool are for informative purposes only and should not be used as a replacement for clinical judgement or to guide patient care.
                </p>
                <p>Created by Ryan Batchelder</p>
            </div>
        )
    }
}