import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  Polygon,
} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { Icon } from 'leaflet'
import { useProjectContext } from '../context/ProjectProvider'

const center = [35.83317555260717, 50.95379590988159]
const zoom = 12

function DisplayPosition({ map }) {
  const { customerPosition, setCustomerPosition, mapModal, MapModalOpen } =
    useProjectContext()
  const [position, setPosition] = useState(map.getCenter())
  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', () => {
      onMove()
    })
    return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])
  setCustomerPosition(position)

  return (
    <Marker
      icon={
        new Icon({
          iconUrl: icon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
      position={position}
    ></Marker>
  )
}

function MyMap() {
  const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        whenCreated={setMap}
        style={{ height: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {map ? <DisplayPosition map={map} /> : null}
      </MapContainer>
    ),
    [map]
  )

  return <div>{displayMap}</div>
}

export default MyMap
