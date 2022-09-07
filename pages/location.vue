<template>
  <div>
    <div class="flex mx-48 space-x-20">
      <div class="w-2/3">
        <h3 class="heading-3">Current position over earth</h3>
        <div class="w-full h-auto border-2">
          <div id="map" class="h-96"></div>
        </div>
      </div>
      <div class="w-1/3">
        <h4 class="heading-4">Lat:</h4>
        <div class="w-full h-10 border-2">
          <p>{{ latitude }}</p>
        </div>
        <h4 class="heading-4">Long:</h4>
        <div class="w-full h-10 border-2 mb-4">
          <p>{{ longitude }}</p>
        </div>

        <NuxtLink to="/finalise" class="btn-link bg-black">Next step</NuxtLink>
      </div>
    </div>
    <div class="absolute left-10 bottom-20">
      <NuxtLink to="/images" class="btn-link bg-black">Back</NuxtLink>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  layout: "FlowLayout",

  created() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 60000);

    if (
      this.$store.state.missionName == "" ||
      this.$store.state.missionDesc == "" ||
      this.$store.state.missionDate == null ||
      this.$store.state.selectedImages == []
    ) {
      this.$router.push("/details");
    }
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  data() {
    return {
      mapBoxAccessToken:
        "pk.eyJ1IjoianVsaWFuYWJqb3J0IiwiYSI6ImNsN3FiczZ2eTAzeHozb3AxN2hxbThzcGIifQ.0j_WKOuboqB218Sr0vzKAA",
      map: null,
      positions: [],
      latitude: null,
      longitude: null,
      timer: "",
      marker: null,
    };
  },

  methods: {
    async fetchData() {
      await this.fetchPositions();
      this.createMap();
      this.setMapCenter();
      this.setMarker();
      //   const marker = new mapboxgl.Marker();

      //   marker.setLngLat([this.longitude, this.latitude]);
      //   marker.addTo(this.map);
    },

    saveLat(latitude) {
      this.missionLat = latitude;
    },
    saveLong(longitude) {
      this.missionLong = longitude;
    },
    async fetchPositions() {
      const currentTime = Math.floor(Date.now() / 1000);
      const response = await fetch(
        `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${currentTime}`
      );
      const positions = await response.json();
      this.latitude = positions[0].latitude;
      this.longitude = positions[0].longitude;
      this.saveLat(this.latitude);
      this.saveLong(this.longitude);
    },
    createMap() {
      const mapExists = this.map;
      if (mapExists) return;
      mapboxgl.accessToken = this.mapBoxAccessToken;
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 4,
        center: [this.longitude, this.latitude],
      });
      this.createMarker();
    },
    setMapCenter() {
      const center = new mapboxgl.LngLat(this.longitude, this.latitude);
      this.map.setCenter(center);
    },
    createMarker() {
      this.marker = new mapboxgl.Marker()
        .setLngLat([this.longitude, this.latitude])
        .addTo(this.map);
    },
    setMarker() {
      this.marker.setLngLat([this.longitude, this.latitude]);
    },
  },

  computed: {
    missionLat: {
      get() {
        return this.$store.state.missionLat;
      },
      set(value) {
        this.$store.commit("setMissionLat", { missionLat: value });
      },
    },
    missionLong: {
      get() {
        return this.$store.state.missionLong;
      },
      set(value) {
        this.$store.commit("setMissionLong", { missionLong: value });
      },
    },
  },
};
</script>