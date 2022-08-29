<template>

<div>
    <div class="text-center my-10">
        <h1 class="heading-1">MRT</h1>
    </div>
    <div class="flex mx-48 space-x-20">
        <div class="w-2/3">
            <h3 class="heading-3">Current position over earth</h3>
            <div class="w-full h-[460px] border-2">
                <GMap
                    ref="gMap"
                    language="en"
                    :cluster="{options: {styles: clusterStyle}}"
                    :center="{lat: locations[0].lat, lng: locations[0].lng}"
                    :options="{fullscreenControl: false}"
                    :zoom="6"
                    >
                    <GMapMarker
                        v-for="location in locations"
                        :key="location.id"
                        :position="{lat: location.lat, lng: location.lng}"
                        :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
                        @click="currentLocation = location"
                    >
                        <GMapInfoWindow :options="{maxWidth: 200}">
                        <code>
                            lat: {{ location.lat }},
                            lng: {{ location.lng }}
                        </code>
                        </GMapInfoWindow>
                    </GMapMarker>
                    
                    </GMap>
            </div>
        </div>
        <div class="w-1/3">
            <h4 class="heading-4">Lat:</h4>
            <div v-for="position in positions" :key="position.latitude" class="w-full h-10 border-2">
                <p>{{ position.latitude }}</p>
                </div>
            <h4 class="heading-4">Long:</h4>
            <div v-for="position in positions" :key="position.longitude" class="w-full h-10 border-2">
                <p>{{ position.longitude }}</p>
                </div>
        <slot />
    </div>
    
</div>
</div>
  
</template>

<script>
export default {
    created() {
        this.fetchData()
        this.timer = setInterval(this.fetchData, 60000)

    },
    data() {
      return {
        positions: [],
        currentTime: Math.floor((Date.now()/1000)),
        timer: '',
        currentLocation: {},
    locations: [
      {
        lat: 44.933076,
        lng: 15.629058
      },
    ],
    pins: {
      selected: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB5VU7SwNBEJ7LmZBgMC+UdKKx0MZCG2srwcbCB2glpFDQ3to/IegvSAIWPrBJIySlipUKKqYLaHJ3iWIelzu/DTk8j71H7MQPltmZnflmZ3b3juivQ3BzCIfDI4FAYBvTRV3XR7tBglCCOIP9oFwuv/46QSwWWwfZIaaDNi7vGOlqtZqhfhPE4/EViAy5V6ljE8uVSuXYc4JkMjncarUeMR0ib5Db7fZEvV6vWBd8PG+Q73LIFYyj3lAsa1G/37/D4+JWgPbcQkybd9jpdGYVRXlmSiQSSYmieMWmhgMuwI0kSTPkpQJgzKJnDfJuKYryBJH7sVNBSPGI7BKoFl3n+GguMY4JHiz6GtoybiisRczmEtPFAM+Ifl6i5DmTKYqeX+Nssj19lUz9N2J4XNxDTiQSkwi4oz6ADU3hLdxb7dwW9RyL5B0FHrltAgZUsEce4eRrmwB3ugCRJ3fk4VvsOwEDHtcWxKeDy4emaWmHdRKdFpvNphQKhdhFmOet42D3sftTJw7X/wHgw/U8h1ywkJ/gYJeI/wi/g8kdmqqqG5Alk62Er+emG7nXBFSr1aroNSNknwOVzZnNS6xIHtFoNF6CweAbpheyLOfo3+ALfrSuzJ1F8EsAAAAASUVORK5CYII=",
      notSelected: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHElEQVR42uVVyw4BMRQdC98lsbPwG5YSH+BzWFtLZilh0oQgFh6J54IwBmGYtrfaBREdcTvDhpM0adrec3rb+7Csn8fRdrLg7VzBubhDzmHrudRuZ2KRs/miLd6AThfNaOTTGRFIsMm8bkSuXBeGoLVaGi0g39wLI4GTf1EjdE/+E1pAAGgEAenkb/tBo1vQFUDgBbSbny6al77uSQwB/6wJSNHoAo8xj30iaYMW4Lv9wfSTpc0eH6atXtE4TKWNUS4AY2hyddY4k/lwVEZncm9QilQuBGPwnp1B5GIXGi3P0eU0c7EqKrje5hU5d7fr2P2AEJIESkNqB1XJkvhI0/GrTuqZX619tLMF/VHlfnk5/0r7ZMvVWA3rr3AF6LIMZ7PmSlUAAAAASUVORK5CYII=",
    },
    
    clusterStyle: [
      {
        url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
        width: 56,
        height: 56,
        textColor: "#ff0000"
      }
    ]
        
      }
    },
    
    methods: {
    async fetchData() {
      this.positions = await fetch(
        `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${this.currentTime}`
      ).then(res => res.json())
    },
    cancelAutoUpdate() {  
      clearInterval(this.timer);  
    },  
    beforeDestroy() {  
    this.cancelAutoUpdate();  
    },  
    }

}
</script>