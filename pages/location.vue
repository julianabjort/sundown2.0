<template>
  <div>
    <div class="md:flex mx-6 md:mx-20 lg:mx-48 md:space-x-10 lg:space-x-20">
      <div class="md:w-1/2">
        <h3 class="text-xs uppercase mb-2">Current position</h3>
        <div class="w-full h-auto border-2 rounded-md">
          <div id="map" class="h-96"></div>
        </div>
      </div>
      <div class="md:w-1/2">
        <h4 class="text-xs uppercase mb-1 mt-6">Latitude</h4>
        <div class="w-full md:w-2/3 h-10 rounded-md border-2">
          <p>{{ latitude }}</p>
        </div>
        <h4 class="text-xs uppercase mb-1 mt-6">Longitude</h4>
        <div class="w-full md:w-2/3 h-10 border-2 rounded-md mb-4">
          <p>{{ longitude }}</p>
        </div>
        <div class="flex space-x-4 md:space-x-0">
          <div class="md:hidden w-1/2">
            <NuxtLink to="/images">
              <button class="btn-primary w-full bg-black">Back</button>
            </NuxtLink>
          </div>
          <NuxtLink to="/finalise" class="w-1/2">
            <button class="btn-primary w-full md:w-auto bg-black">
              Next step
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="hidden md:inline absolute left-10 bottom-10">
      <NuxtLink to="/images" class="btn-link bg-black">Back</NuxtLink>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  layout: "FlowLayout",

  middleware({ store, redirect }) {
    if (
      store.state.missionName === "" ||
      store.state.missionDesc == "" ||
      store.state.missionDate == null ||
      store.state.selectedImages == []
    ) {
      return redirect("/details");
    }
  },

  created() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 60000);
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