import React, {Component} from "react";

export default function ActivityIndicatorView() {
    return <div className="text-center">
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
}
