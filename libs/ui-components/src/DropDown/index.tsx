// Import necessary components and hooks
import React, {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { Checkbox, Menu, TouchableRipple, useTheme } from 'react-native-paper'
import { Icon } from '@libs/native-icons'
import TextInput from '../TextInput'

// ForwardRef to handle ref forwarding
const DropDown = forwardRef((props: any, ref) => {
  const activeTheme = useTheme()
  const { colors } = useTheme()

  const {
    multiSelect = false,
    value,
    setValue,
    activeColor,
    label,
    placeholder,
    inputProps,
    list,
    dropDownContainerMaxHeight,
    dropDownContainerHeight,
    theme,
    dropDownStyle,
    dropDownItemStyle,
    dropDownItemSelectedStyle,
    dropDownItemTextStyle,
    dropDownItemSelectedTextStyle,
    accessibilityLabel,
    field,
    error,
    style,
    disabled,
    iconStyle,
  } = props

  const [showDropDown, setShowDropDown] = useState(false)
  const [displayValue, setDisplayValue] = useState('')
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })

  const onLayout = (event: any) => {
    setInputLayout(event.nativeEvent.layout)
  }

  useEffect(() => {
    if (multiSelect) {
      const labels = list
        .filter((_) => value.indexOf(_.value) !== -1)
        .map((_) => _.label)
        .join(', ')
      setDisplayValue(labels)
    } else {
      let labelLocal
      if (field) {
        labelLocal = list?.find((_) => _?.[field] === value)?.[field]
      } else {
        labelLocal = list?.find((_) => _?.value === value)?.label
      }
      if (labelLocal) {
        setDisplayValue(labelLocal)
      }
    }
  }, [list, value])

  const isActive = useCallback(
    (currentValue: any) => {
      if (multiSelect) {
        return value.indexOf(currentValue) !== -1
      }
      return value === currentValue
    },
    [value],
  )

  const setActive = useCallback(
    (currentValue: any) => {
      if (multiSelect) {
        const valueIndex = value.indexOf(currentValue)
        const values = value.split(',')
        if (valueIndex === -1) {
          setValue([...values, currentValue].join(','))
          setDisplayValue([...values, currentValue].join(','))
        } else {
          setValue(
            [...values].filter((value1) => value1 !== currentValue).join(','),
          )
          setDisplayValue(
            [...values].filter((value1) => value1 !== currentValue).join(','),
          )
        }
      } else {
        setValue(currentValue)
        setDisplayValue(currentValue)
      }
    },
    [value, setValue],
  )

  return (
    <Menu
      visible={showDropDown}
      onDismiss={() => setShowDropDown(false)}
      theme={{
        colors: {
          onSurface: colors.onSurface,
          backgroundColor: colors.secondary,
        },
      }}
      anchor={
        <TouchableRipple
          ref={ref}
          onPress={() => {
            setShowDropDown(true)
            props?.onFocus?.()
          }}
          onLayout={onLayout}
          accessibilityLabel={accessibilityLabel}
          disabled={disabled}
        >
          <View pointerEvents="none">
            <TextInput
              value={displayValue}
              label={label}
              placeholder={placeholder}
              pointerEvents="none"
              theme={theme}
              outlineColor={props.outlineColor}
              placeholderTextColor={colors.onSecondary}
              error={error}
              style={style}
              {...inputProps}
              {...props}
            />
            <Icon
              name={'ArrowLeftIcon'}
              color={error ? 'red' : colors.neutral}
              style={[
                {
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  right: '5%',
                  top: Platform.OS === 'web' ? '35%' : '30%',
                  opacity: disabled ? 0.5 : 1,
                  transform: [
                    showDropDown ? { rotate: '90deg' } : { rotate: '-90deg' },
                  ],
                },
                iconStyle,
              ]}
            />
          </View>
        </TouchableRipple>
      }
      style={{
        maxWidth: inputLayout?.width,
        width: inputLayout?.width,
        marginTop: inputLayout?.height,
        ...dropDownStyle,
      }}
      contentStyle={{
        backgroundColor:
          dropDownStyle?.backgroundColor || colors.elevation.level5,
      }}
    >
      <ScrollView
        bounces={false}
        style={{
          ...(dropDownContainerHeight
            ? { height: dropDownContainerHeight }
            : { maxHeight: dropDownContainerMaxHeight || 200 }),
        }}
      >
        {list?.map((_item) => (
          <Fragment key={_item.value}>
            <TouchableRipple
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setActive(_item?.[field] || _item)
                setShowDropDown(false)
              }}
            >
              <>
                <Menu.Item
                  titleStyle={{
                    color: isActive(_item?.displayName || _item?.value)
                      ? activeColor || (theme || activeTheme).colors.secondary
                      : (theme || activeTheme).colors.text,
                    ...(isActive(_item.value)
                      ? dropDownItemSelectedTextStyle
                      : dropDownItemTextStyle),
                  }}
                  title={
                    _item.custom ||
                    _item.displayName ||
                    _item.label ||
                    _item?.[field]
                  }
                  style={{
                    flex: 1,
                    maxWidth: inputLayout?.width,
                    ...(isActive(_item.value)
                      ? dropDownItemSelectedStyle
                      : dropDownItemStyle),
                  }}
                />
                {multiSelect && (
                  <Checkbox.Android
                    theme={{
                      colors: { accent: activeTheme?.colors.primary },
                    }}
                    status={isActive(_item.value) ? 'checked' : 'unchecked'}
                    onPress={() => setActive(_item)}
                  />
                )}
              </>
            </TouchableRipple>
          </Fragment>
        ))}
      </ScrollView>
    </Menu>
  )
})

export default DropDown
