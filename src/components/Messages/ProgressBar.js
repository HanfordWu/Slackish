import React from 'react';

const ProgressBar = ({ uploadState, percentUploaded }) => (
    uploadState === "uploading" && (
        <Progress
        className="progress__bar"
        percentUploaded={percentUploaded}
        progress
        indicating
        size="medium"
        inverted
        />
    )
)

export default ProgressBar