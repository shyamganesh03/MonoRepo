import React from "react";
import { TouchableOpacity } from "react-native";
import {Icon} from "@libs/native-icons";

interface IconButtonProps{
   name:string;
   color:string;
   onPress?:Function;
}


const IconButton=(props:IconButtonProps)=>{

  return <TouchableOpacity>
     <Icon name={props.name} color={props.color} />
  </TouchableOpacity>
}
export default IconButton;