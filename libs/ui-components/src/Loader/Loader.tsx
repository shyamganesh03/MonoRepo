import React from 'react'
import { View } from 'react-native';
import { ActivityIndicator as RNPActivityIndicator } from 'react-native-paper'

interface LoaderProps {
  animating:boolean;

  color: string;
  size:'small'|'large'|number;
}

const Loader = (props: LoaderProps) => {

  return (
    <View style={{flex:1,justifyContent:'center', alignItems:'center',}}>
          <RNPActivityIndicator animating={props.animating}color={props.color} size={props.size} />
    </View>
  )
}
export default Loader
