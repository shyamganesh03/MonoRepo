import { View, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const Grid = (props) => {
  const { data, numColumns, renderItem, style } = props
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  return (
    <View
      style={[{ width: '100%' }, style]}
      onLayout={(event) =>
        setDimensions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'column',
              margin: 1,
              width: dimensions.width / numColumns,
            }}
          >
            {renderItem(item)}
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
    </View>
  )
}

Grid.prototype = {
  data: PropTypes.array,
  numColumns: PropTypes.string,
  renderItem: PropTypes.element,
}

export default Grid
