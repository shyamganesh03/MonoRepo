import React from 'react'
import { MobileContainer } from '@libs/container'
import Map from '@libs/map-view/src'
import { TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { Flex, Text, TextInput } from '@libs/components'
import { useTheme } from 'react-native-paper'
import { spacing } from '@libs/theme'
import { Icon } from '@libs/native-icons'
import { useTranslation } from 'react-i18next'
import { EventCard } from '../../components'

const MobileView = ({
  eventData,
  handleClose,
  handleSearch,
  dropDownDetails,
  mapRef,
  markers,
  searchAddress,
  selectedMarker,
  setSearchAddressAddress,
  setSelectedMarker,
  handleSelectedSearchItem,
  handleCurrentLocation,
}: any) => {
  const { height, width } = useWindowDimensions()
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <MobileContainer hasPadding={false}>
        <Flex
          direction="column"
          style={{
            position: 'absolute',
            top: spacing.spacing10,
            zIndex: 100,
            left: 0,
            right: 0,
            height: 72,
            backgroundColor: colors.onPrimaryContainer,
            borderRadius: spacing.spacing5,
            marginHorizontal: spacing.spacing5,
            padding: spacing.spacing5,
          }}
        >
          <TextInput
            placeholder={t('INPUT_TEXT.ADDRESS_SEARCH_PLACEHOLDER')}
            value={searchAddress}
            onChangeText={(value: any) => {
              setSearchAddressAddress(value)
              handleSearch(value)
            }}
          />
        </Flex>
        {dropDownDetails.showDropDown && (
          <TouchableOpacity
            onPress={() => handleSelectedSearchItem()}
            style={{
              backgroundColor: colors.onPrimaryContainer,
              position: 'absolute',
              top: 140,
              zIndex: 100,
              left: 0,
              right: 0,
              marginHorizontal: spacing.spacing5,
              borderRadius: spacing.spacing5,
            }}
          >
            <Flex direction="column">
              <Flex
                direction="row"
                style={{ padding: spacing.spacing5, gap: spacing.spacing5 }}
              >
                <Icon name="Pin2" />
                <View style={{ maxWidth: '90%' }}>
                  <Text variant="bodyMedium">{dropDownDetails.title}</Text>
                </View>
              </Flex>
            </Flex>
          </TouchableOpacity>
        )}
        <Map
          markers={markers}
          height={height}
          width={width}
          latitudeDelta={0.0289}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          mapRef={mapRef}
        />
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            bottom: 70,
            right: 16,
            gap: 16,
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => handleCurrentLocation()}>
            <Flex
              direction="column"
              style={{
                height: spacing.spacing9,
                width: spacing.spacing9,
                borderRadius: spacing.spacing6,
                backgroundColor: colors.tertiary,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 1,
              }}
            >
              <Icon name="SendIcon" />
            </Flex>
          </TouchableOpacity>
          <Flex
            direction="column"
            style={{
              height: spacing.spacing9,
              width: spacing.spacing9,
              borderRadius: spacing.spacing6,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 1,
            }}
          >
            <Icon name="FilterIcon" />
          </Flex>
          {Object.keys(eventData).length > 0 && (
            <View style={{ width: width - 32 }}>
              <EventCard
                eventDetail={eventData}
                handleEventDetailNavigation={() => {}}
                handleClose={handleClose}
                isMap
              />
            </View>
          )}
        </View>
      </MobileContainer>
    </>
  )
}
export default MobileView
