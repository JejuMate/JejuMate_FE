"use client";

import { useEffect, useRef, useState } from "react";
import type { DaySchedule } from "@/types";

interface MapProps {
  daySchedule: DaySchedule;
  height?: string;
}

declare global {
  interface Window {
    naver: any;
  }
}

const Map = ({ daySchedule, height }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.naver || !window.naver.maps) {
      console.warn("Naver Maps API not loaded.");
      setIsMapReady(false);
      return;
    }
    if (!mapRef.current) return;

    const locations = daySchedule.items
      .filter((item) => item.latitude && item.longitude)
      .map((item) => ({
        lat: item.latitude!,
        lng: item.longitude!,
        name: item.name,
      }));

    if (locations.length === 0) {
      mapRef.current.innerHTML =
        "<div style='display:flex;justify-content:center;align-items:center;height:100%;color:#888;background:#f5f5f5;border-radius:8px;'>이 날짜에는 표시할 장소가 없습니다.</div>";
      return;
    }

    const mapOptions: any = {
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);
    mapInstanceRef.current = map;

    setIsMapReady(true);

    let polylinePath: any[] | null = null;

    if (locations.length > 1) {
      const bounds = new window.naver.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(new window.naver.maps.LatLng(location.lat, location.lng));
      });

      map.fitBounds(bounds, {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      });

      polylinePath = locations.map(
        (location) => new window.naver.maps.LatLng(location.lat, location.lng)
      );

    } else if (locations.length === 1) {
      const center = new window.naver.maps.LatLng(
        locations[0].lat,
        locations[0].lng
      );
      map.setCenter(center);
      map.setZoom(13);
    }

    const markers = locations.map((location, index) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(location.lat, location.lng),
        map: map, 
        title: location.name,
        icon: {
          content: `<div style="background:#3b82f6;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:14px;">${
            index + 1
          }</div>`,
          anchor: new window.naver.maps.Point(19, 19),
        },
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="padding:10px;min-width:150px;text-align:center;"><strong>${location.name}</strong></div>`,
        //disableAutoPan: true
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
        map.setCenter(marker.getPosition());
        map.setZoom(14);
      });

      return marker;
    });

    let polyline: any = null;
    if (polylinePath) { 
      polyline = new window.naver.maps.Polyline({
        map: map,
        path: polylinePath,
        strokeColor: "#3b82f6",
        strokeWeight: 3,
        strokeOpacity: 0.8,
        endIcon: window.naver.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      });
    }

    return () => {
      markers.forEach((marker) => marker.setMap(null));
      if (polyline) polyline.setMap(null);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [daySchedule]);

  const handleResetView = () => {
    if (!mapInstanceRef.current || !daySchedule) return;

    const locations = daySchedule.items
      .filter((item) => item.latitude && item.longitude)
      .map((item) => ({
        lat: item.latitude!,
        lng: item.longitude!,
      }));

    if (locations.length > 1) {
      const bounds = new window.naver.maps.LatLngBounds();
      locations.forEach((location) => {
        bounds.extend(new window.naver.maps.LatLng(location.lat, location.lng));
      });
      mapInstanceRef.current.fitBounds(bounds, {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      });
    } else if (locations.length === 1) {
      const center = new window.naver.maps.LatLng(
        locations[0].lat,
        locations[0].lng
      );
      mapInstanceRef.current.panTo(center);
      mapInstanceRef.current.setZoom(15);
    }
  };

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        window.naver.maps.Event.trigger(mapInstanceRef.current, "resize");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [height]);

  if (typeof window !== "undefined" && (!window.naver || !window.naver.maps)) {
    return (
      <div
        style={{
          width: "100%",
          height: height || "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-gray-500">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: height || "600px",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 0,
        }}
      />
      {isMapReady && (
        <button
          onClick={handleResetView}
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            zIndex: 1000,
            padding: "10px 16px",
            backgroundColor: "white",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s",
            opacity: 0.5,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.boxShadow =
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.5";
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.boxShadow =
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
          }}
          title="전체 뷰로 돌아가기"
        >
          <i className="ri-compass-3-line mr-1"></i>
          초기 뷰로 돌아가기
        </button>
      )}
    </div>
  );
};

export default Map;