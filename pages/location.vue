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
        <div class="mt-6">
          <input type="checkbox" id="checkbox" v-model="checked" />
          <label for="checkbox">Choose coordinates</label>
        </div>
        <div v-if="checked">
          <h4 class="text-xs uppercase mb-1 mt-6">Latitude</h4>
          <input
            class="w-full md:w-2/3 h-10 rounded-md pl-2 border-2"
            type="text"
            v-model="customLatitude"
          />

          <h4 class="text-xs uppercase mb-1 mt-6">Longitude</h4>
          <input
            class="w-full md:w-2/3 h-10 rounded-md border-2 pl-2"
            type="text"
            v-model="customLongitude"
          />
        </div>
        <div v-else>
          <h4 class="text-xs uppercase mb-1 mt-6">Latitude</h4>
          <p class="w-full md:w-2/3 h-10 rounded-md pl-2 border-2">
            {{ latitude }}
          </p>

          <h4 class="text-xs uppercase mb-1 mt-6">Longitude</h4>
          <p class="w-full md:w-2/3 h-10 rounded-md pl-2 border-2">
            {{ longitude }}
          </p>
        </div>
        <div class="flex space-x-4 md:space-x-1 mt-4">
          <div class="md:hidden w-1/2">
            <NuxtLink to="/images">
              <button class="btn-primary w-full bg-black">Back</button>
            </NuxtLink>
          </div>
          <button
            class="btn-primary bg-black"
            @click="updateCustomPosition"
            v-if="checked"
          >
            Update
          </button>
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
  layout: "flow",

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
      customLatitude: null,
      customLongitude: null,
      timer: "",
      marker: null,
      checked: false,
    };
  },

  methods: {
    async fetchData() {
      if (this.checked === false) {
        await this.fetchPositions();
        this.createMap();
        this.setMapCenter();
        this.createMarker();
        this.setMarker();
      }
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
      // this.map.on("move", () => {
      //   console.log("A move event occurred.");
      // });
    },
    setMapCenter() {
      const center = new mapboxgl.LngLat(this.longitude, this.latitude);
      this.map.setCenter(center);
    },
    createMarker() {
      this.marker = new mapboxgl.Marker({ color: "rgb(99 102 241)" })
        .setLngLat([this.longitude, this.latitude])
        .addTo(this.map);
    },
    setMarker() {
      this.marker.setLngLat([this.longitude, this.latitude]);
    },

    updateCustomPosition() {
      const center = new mapboxgl.LngLat(
        this.customLongitude,
        this.customLatitude
      );
      this.map.flyTo({ center, zoom: 6 });
      this.marker.setLngLat([this.customLongitude, this.customLatitude]);
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