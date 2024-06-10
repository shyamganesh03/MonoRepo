import { ScreenLayout, useDebounce } from '@libs/utils'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import DesktopView from './DesktopView'
import MobileView from './MobileView'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEventDetails } from '@izzo/api'
import { useIsFocused } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation'
import Geocoder from 'react-native-geocoding'
import { moveToRegion } from '../../utils/map'
import { Keyboard, useWindowDimensions } from 'react-native'
import { googleMapApiKey } from '../../config'

Geocoder.init(googleMapApiKey)

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(0)
  const isFocused = useIsFocused()
  const [searchAddress, setSearchAddressAddress] = useState('')
  const { height, width } = useWindowDimensions()
  const [dropDownDetails, setDropDownDetails] = useState<any>({
    showDropDown: false,
    title: '',
    location: '',
  })
  const mapRef = useRef()

  const [markers, setMarkers] = useState<any>([
    {
      coordinates: { latitude: 37.425276, longitude: -122.080436 },
      title: 'Silvercube Lounge',
      id: 'karaoke--disco-15-06-2024',
      type: 'events',
    },
    {
      coordinates: { latitude: 37.414326, longitude: -122.077707 },
      title: 'Tanznacht40',
      id: 'tanznacht-15-06-2024',
      type: 'events',
    },
    {
      coordinates: { latitude: 37.432225, longitude: -122.087806 },
      title: 'Tanznacht40',
      id: 'tanznacht-21-06-2024',
      type: 'events',
    },
    {
      coordinates: { latitude: 37.41054, longitude: -122.06467 },
      title: 'Silvercube Lounge',
      id: 'karaoke--disco-22-06-2024',
      type: 'events',
    },
    {
      coordinates: { latitude: 37.41352, longitude: -122.072182 },
      title: 'Silvercube Lounge',
      id: 'karaoke--disco-06-07-2024',
      type: 'events',
    },
  ])

  useEffect(() => {
    if (!isFocused) return
    ;(() => {
      Geolocation.getCurrentPosition((info) => {
        const coordinateData: any = []
        coordinateData.push(info.coords.latitude)
        coordinateData.push(info.coords.longitude)
        setMarkers([
          ...markers,
          {
            coordinates: {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            },
            isUserLocation: true,
            type: 'user-location',
          },
        ])
      })
    })()
  }, [isFocused])

  const LayoutView = useCallback(
    ScreenLayout.withLayoutView(DesktopView, MobileView, MobileView),
    [],
  )

  const { data: eventData } = useQuery({
    queryKey: ['getEventDetail', selectedMarker],
    queryFn: async () => {
      if (markers[selectedMarker].id) {
        const response: any = await getEventDetails(markers[selectedMarker].id)
        return response
      } else {
        return {}
      }
    },
    initialData: {},
  })

  const handleClose = () => {
    setSelectedMarker(-1)
  }

  const handleSearchAddress = async () => {
    Geocoder.from(searchAddress)
      .then((json) => {
        const results = json.results[0]
        const location = json.results[0].geometry.location
        setDropDownDetails({
          showDropDown: true,
          title: results.formatted_address,
          location: location,
        })
      })
      .catch((error) => console.warn(error))
  }

  const handleSearch = useDebounce(handleSearchAddress, 1000)

  const handleSelectedSearchItem = () => {
    const coordinates = {
      latitude: dropDownDetails.location.lat,
      longitude: dropDownDetails.location.lng,
    }

    setMarkers([
      ...markers,
      {
        coordinates: coordinates,
        title: dropDownDetails.title,
        type: 'search-result',
      },
    ])
    setDropDownDetails({
      showDropDown: false,
      title: '',
      location: '',
    })
    setSearchAddressAddress('')
    setSelectedMarker(markers.length)
    Keyboard.dismiss()
    moveToRegion({
      mapRef,
      coordinates: coordinates,
      height,
      width,
    })
  }

  const handleCurrentLocation = () => {
    setSelectedMarker(markers.length)
    const coordinates = markers.find(
      (marker: any) => !!marker.isUserLocation,
    ).coordinates

    const filterMarkers = markers.filter(
      (marker: any) => marker.type !== 'search-result',
    )
    setMarkers(filterMarkers)
    moveToRegion({
      mapRef,
      coordinates: coordinates,
      height,
      width,
    })
  }
  const viewProps = {
    dropDownDetails,
    eventData,
    handleClose,
    handleSearch,
    mapRef,
    markers,
    searchAddress,
    selectedMarker,
    setSearchAddressAddress,
    handleSelectedSearchItem,
    setSelectedMarker,
    handleCurrentLocation,
  }

  return (
    <Suspense fallback={<></>}>
      <LayoutView {...viewProps} />
    </Suspense>
  )
}

export default Map
