<template>
  <div>
    <div class="flex mx-48 space-x-20">
      <div class="w-2/3">
        <h3 class="heading-3">Current position over earth</h3>
        <div class="w-full h-auto border-2">
          <div id="map" class="h-96"></div>
          <!-- <GMap
            :key="markPosition.lng"
            v-if="latitude !== null"
            ref="gMap"
            language="en"
            :center="markPosition"
            :zoom="6"
          >
            <GMapMarker :position="markPosition"> </GMapMarker>
          </GMap> -->
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

export default {
  layout: "FlowLayout",
  created() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 10000);

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

  mounted() {},

  data() {
    return {
      access_token:
        "pk.eyJ1IjoianVsaWFuYWJqb3J0IiwiYSI6ImNsN3FiczZ2eTAzeHozb3AxN2hxbThzcGIifQ.0j_WKOuboqB218Sr0vzKAA",
      map: {},
      positions: [],
      latitude: null,
      longitude: null,
      timer: "",
      //   markPosition: {},

      pins: {
        selected:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=",
        notSelected:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHElEQVR42uVVyw4BMRQdC98lsbPwG5YSH+BzWFtLZilh0oQgFh6J54IwBmGYtrfaBREdcTvDhpM0adrec3rb+7Csn8fRdrLg7VzBubhDzmHrudRuZ2KRs/miLd6AThfNaOTTGRFIsMm8bkSuXBeGoLVaGi0g39wLI4GTf1EjdE/+E1pAAGgEAenkb/tBo1vQFUDgBbSbny6al77uSQwB/6wJSNHoAo8xj30iaYMW4Lv9wfSTpc0eH6atXtE4TKWNUS4AY2hyddY4k/lwVEZncm9QilQuBGPwnp1B5GIXGi3P0eU0c7EqKrje5hU5d7fr2P2AEJIESkNqB1XJkvhI0/GrTuqZX619tLMF/VHlfnk5/0r7ZMvVWA3rr3AF6LIMZ7PmSlUAAAAASUVORK5CYII=",
      },
    };
  },

  methods: {
    async fetchData() {
      const currentTime = Math.floor(Date.now() / 1000);
      const response = await fetch(
        `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${currentTime}`
      );
      const positions = await response.json();
      this.latitude = positions[0].latitude;
      this.longitude = positions[0].longitude;
      this.saveLat(this.latitude);
      this.saveLong(this.longitude);
      this.createMap();
      //   this.markPosition = { lat: this.latitude, lng: this.longitude };
      //   console.log(this.markPosition);
    },

    saveLat(latitude) {
      this.missionLat = latitude;
    },
    saveLong(longitude) {
      this.missionLong = longitude;
    },
    createMap() {
      mapboxgl.accessToken = this.access_token;
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 4,
        center: [this.longitude, this.latitude],
      });
      console.log(this.longitude);
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