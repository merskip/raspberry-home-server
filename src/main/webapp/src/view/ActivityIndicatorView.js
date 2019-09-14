import React from "react";

export default function ActivityIndicatorView(props) {
    return (<div className="text-center">
        {props['small']
            ? <div className="spinner-grow text-primary spinner-grow-sm" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            : <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        }
    </div>)
}
