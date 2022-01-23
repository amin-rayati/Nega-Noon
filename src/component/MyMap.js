import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import {
  Polygon,
  Map,
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { Icon } from 'leaflet'
import { useProjectContext } from '../context/ProjectProvider'
import { useCookies } from 'react-cookie'

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
export function Polygons() {
  const [cookiesCityid, setCookieCityid, removeCookieCityid] = useCookies([
    'cityid',
  ])
  useEffect(() => {
    getRegions()
  }, [cookiesCityid])
  const [regions, setRegions] = useState([])
  const { userData } = useProjectContext()
  const getRegions = () => {
    if (userData) {
      axios
        .post(
          'https://meyt.neganoon.ir/admin/Districts/API/_apiGetRegions?token=test',
          {
            cityId: cookiesCityid['cityid'],
          },
          {
            headers: {
              token: 'test',
            },
          }
        )

        .then((response) => {
          if (response.data.isDone) {
            setRegions(response.data.data)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  return (
    <>
      {regions &&
        regions.map((e) => {
          return (
            <Polygon
              positions={e.polygon.map((p) => p.split(','))}
              color={'green'}
            />
          )
        })}
    </>
  )
}
function MyMap() {
  const [map, setMap] = useState(null)
  const coords = [
    { lat: 24.9946436, lng: 87.20163200000002 },
    { lat: 28.7041, lng: 77.1025 },
    { lat: 23.4567, lng: 75.2345 },
  ]

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
        <Polygons />
      </MapContainer>
    ),
    [map]
  )

  return <div>{displayMap}</div>
}

export default MyMap
