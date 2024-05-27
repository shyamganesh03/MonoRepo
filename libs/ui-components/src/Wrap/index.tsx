import React from 'react';
import { Wrap as WrapComponent} from 'react-native-flex-layout';

interface WrapProps{
    children?:any;
    style:any;
}
const Wrap=(props:WrapProps)=>{
    return <WrapComponent style={props.style}>
       {props.children}
       </WrapComponent>      
    
}
export default Wrap;