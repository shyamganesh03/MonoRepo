export const moveToRegion = ({
  mapRef,
  coordinates,
  height,
  width,
}: {
  mapRef: any
  coordinates: any
  height: number
  width: number
}) => {
  const longitudeDelta = 0.0289 * (height / width)

  const region = {
    latitude: coordinates?.latitude,
    longitude: coordinates?.longitude,
    latitudeDelta: 0.0289,
    longitudeDelta: longitudeDelta,
  }
  mapRef.current.animateToRegion(region, 1000)
}
