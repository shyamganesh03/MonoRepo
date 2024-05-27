import * as React from 'react';
import { Avatar, Button, Card as RNPCard, Text } from 'react-native-paper';

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

interface CardProps {
   onLongPress?: Function;
   onPress?: Function;
   onPressIn?: Function;
   onPressOut?: Function;
   delayLongPress?: number;
   disabled?: boolean;
   elevation?: 0|1|2|3|4|5;
   accessible?: boolean;
   title?:String;
   subtitle?:String;
   content?:any;
   actionContent?:any;
   style:any;

}
const  Card = (props:CardProps) => {
  return(
  <RNPCard style={props.style}>
    <RNPCard.Title title={props.title} subtitle={props.subtitle}  />
    <RNPCard.Content>
      {props.content}
      </RNPCard.Content>
    <RNPCard.Actions>
      {props.actionContent}
    </RNPCard.Actions>
  </RNPCard>
)
}

export default Card;