import { Slide } from '@material-ui/core';
import React from 'react'

export const Transition = React.forwardRef(function Transition(
    props: { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});