import * as React from 'react'
import { Card as RNPCard } from 'react-native-paper'
import { typography } from '@libs/theme'

interface CardProps {
  onLongPress?: Function
  onPress?: Function
  onPressIn?: Function
  onPressOut?: Function
  delayLongPress?: number
  disabled?: boolean
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  accessible?: boolean
  title?: any
  subtitle?: any
  content?: any
  actionContent?: any
  style?: any
  titleStyle?: any
  titleVariant?: any
  subTitleVariant?: any
  subtitleStyle?: any
  contentStyle?: any
  titleNumberOfLines?: number
  right?: any
}

const Card = (props: CardProps) => {
  return (
    <RNPCard style={props.style}>
      <RNPCard.Title
        title={props.title}
        subtitle={props.subtitle}
        //@ts-ignore
        titleStyle={[props.titleStyle, typography[props.titleVariant]]}
        subtitleStyle={[
          props?.subtitleStyle,
          //@ts-ignore
          typography[props.subTitleVariant],
        ]}
        titleNumberOfLines={props?.titleNumberOfLines}
        right={props?.right}
      />
      <RNPCard.Content
        style={[
          { flexDirection: 'row', justifyContent: 'flex-start' },
          props.contentStyle,
        ]}
      >
        {props.content}
      </RNPCard.Content>
      <RNPCard.Actions>{props.actionContent}</RNPCard.Actions>
    </RNPCard>
  )
}

export default Card
