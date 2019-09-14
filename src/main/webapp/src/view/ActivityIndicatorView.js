import React from "react";

export default function ActivityIndicatorView(props) {
    if (props['small']) {
        return <div className="spinner-grow text-primary spinner-grow-sm" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    } else {
        return <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }
}
