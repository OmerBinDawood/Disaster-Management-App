'use client'
import { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

type DisasterType = 'earthquake' | 'flood' | 'wildfire' | 'hurricane'

type BaseDisaster = {
  location: [number, number]
  type: DisasterType
  name: string
  date: string
  severity: string
  casualties?: number
  affected?: string
  response: {
    teams: number
    volunteers: number
    progress: number
  }
}

const BASE_DISASTERS: BaseDisaster[] = [
  {
    // Kahramanmaraş, Turkey
    location: [37.5753, 36.9228],
    type: 'earthquake',
    name: 'Turkey Earthquake',
    date: '2023-02-06',
    severity: 'Mw 7.8',
    casualties: 50000,
    response: {
      teams: 50,
      volunteers: 1200,
      progress: 65,
    },
  },
  {
    // Sindh, Pakistan
    location: [26.0, 68.0],
    type: 'flood',
    name: 'Pakistan Floods',
    date: '2022-08-01',
    severity: 'Extreme monsoon flooding',
    affected: '33 Million',
    response: {
      teams: 40,
      volunteers: 900,
      progress: 82,
    },
  },
]

export default function DisasterMap() {
  useEffect(() => {
    const container = document.getElementById('disasterMap')
    if (!container) return

    const map = L.map('disasterMap', {
      preferCanvas: true,
      zoomSnap: 0.5,
      wheelPxPerZoomLevel: 60,
      worldCopyJump: true,
    }).setView([20, 0], 2)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      detectRetina: true,
      maxZoom: 19,
      minZoom: 2,
    }).addTo(map)

    const allMarkers = L.featureGroup().addTo(map)

    function createMarkerIcon(type: DisasterType) {
      const colors: Record<DisasterType, string> = {
        earthquake: '#ef4444',
        flood: '#3b82f6',
        wildfire: '#f59e0b',
        hurricane: '#8b5cf6',
      }

      return L.divIcon({
        className: `disaster-marker ${type}-marker`,
        html: `
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="${colors[type]}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      })
    }

    const mapContainer = map.getContainer()

    const tooltip = document.createElement('div')
    tooltip.id = 'mapTooltip'
    tooltip.className = 'map-tooltip'
    mapContainer.appendChild(tooltip)

    function positionTooltip(markerPoint: L.Point, tooltipElement: HTMLElement) {
      if (!mapContainer) return

      const mapRect = mapContainer.getBoundingClientRect()
      const margin = 15

      let left = markerPoint.x + margin
      let top = markerPoint.y - tooltipElement.offsetHeight / 2
      let placementClass = 'tooltip-right'

      if (left + tooltipElement.offsetWidth > mapRect.width) {
        left = markerPoint.x - margin - tooltipElement.offsetWidth
        placementClass = 'tooltip-left'
      }

      if (top + tooltipElement.offsetHeight > mapRect.height) {
        top = markerPoint.y - tooltipElement.offsetHeight - margin
        placementClass = 'tooltip-top'
      }

      if (top < 0) {
        top = markerPoint.y + margin
        placementClass = 'tooltip-bottom'
      }

      tooltipElement.style.left = `${left}px`
      tooltipElement.style.top = `${top}px`
      tooltipElement.className = `map-tooltip ${placementClass}`
    }

    function addDisasterMarker(disaster: BaseDisaster, label: string) {
      const marker = L.marker(disaster.location as L.LatLngExpression, {
        icon: createMarkerIcon(disaster.type),
        riseOnHover: true,
        riseOffset: 250,
        title: label,
      }).addTo(allMarkers)

      const tooltipContent = `
        <div class="tooltip-content p-3">
          <h4 class="font-bold text-lg mb-2">${disaster.name}</h4>
          <p><strong>Type:</strong> ${disaster.type.charAt(0).toUpperCase() + disaster.type.slice(1)}</p>
          <p><strong>Date:</strong> ${disaster.date}</p>
          <p><strong>Severity:</strong> ${disaster.severity}</p>
          ${disaster.casualties ? `<p><strong>Casualties:</strong> ${disaster.casualties.toLocaleString()}</p>` : ''}
          ${disaster.affected ? `<p><strong>Affected:</strong> ${disaster.affected}</p>` : ''}
          <p><strong>Response Teams:</strong> ${disaster.response.teams}</p>
          <p><strong>Volunteers:</strong> ${disaster.response.volunteers}</p>
        </div>
      `

      marker.on('mouseover', function (e) {
        tooltip.innerHTML = tooltipContent
        const markerPoint = map.latLngToContainerPoint(e.latlng)
        positionTooltip(markerPoint, tooltip)
        tooltip.style.opacity = '1'
        tooltip.style.zIndex = '1000'
      })

      marker.on('mouseout', function () {
        tooltip.style.opacity = '0'
        tooltip.style.zIndex = '-1'
      })

      marker.on('move', function (e) {
        if (tooltip.style.opacity === '1') {
          const markerPoint = map.latLngToContainerPoint((e as any).latlng)
          positionTooltip(markerPoint, tooltip)
        }
      })
    }

    BASE_DISASTERS.forEach((d) => addDisasterMarker(d, d.name))

    ;(async () => {
      try {
        const res = await fetch('/api/reports')
        if (!res.ok) return
        const reports = await res.json()
        if (Array.isArray(reports)) {
          reports.forEach((report: { latitude?: number; longitude?: number; category?: string; createdAt?: string; severity?: number }) => {
            if (typeof report.latitude !== 'number' || typeof report.longitude !== 'number') return
            const category: DisasterType =
              ['earthquake', 'flood', 'wildfire', 'hurricane'].includes(report.category || '')
                ? (report.category as DisasterType)
                : 'flood'

            const asDisaster: BaseDisaster = {
              location: [report.latitude, report.longitude],
              type: category,
              name:
                (report.category || 'Event').charAt(0).toUpperCase() + (report.category || 'event').slice(1) + ' report',
              date: report.createdAt ? new Date(report.createdAt).toISOString().slice(0, 10) : 'Recent',
              severity: `Severity ${report.severity ?? 3}`,
              response: {
                teams: 0,
                volunteers: 0,
                progress: 0,
              },
            }
            addDisasterMarker(asDisaster, 'Community report')
          })
        }

        const layers = allMarkers.getLayers()
        if (layers.length > 0) {
          try {
            const bounds = allMarkers.getBounds()
            if (bounds.isValid()) {
              map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 })
            }
          } catch {
            map.setView([20, 0], 2)
          }
        }
      } catch {
        map.setView([20, 0], 2)
      }
    })()

    L.control
      .scale({
        metric: true,
        imperial: false,
      })
      .addTo(map)

    const handleResize = () => {
      map.invalidateSize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      map.remove()
    }
  }, [])

  return <div id="disasterMap" className="h-full w-full"></div>
}