import React from 'react';

const MessageTemp = (props) => {
    let class_name = props.error ? 'alert-danger error' : 'alert-success success';
    return (
        <>
            <div className={`alert ${class_name}`}>
                <strong>{props.message}</strong>
            </div>
        </>
    )
}

export default MessageTemp;
