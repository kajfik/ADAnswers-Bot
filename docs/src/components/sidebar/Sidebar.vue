<script>
import SidebarEntry from "./SidebarEntry.vue"
import SidebarHeader from "./SidebarHeader.vue"
import SidebarEntryGroup from "./SidebarEntryGroup.vue"

export default {
  data() {
    return {
      collapsed: false
    }
  },
  components: {
    SidebarEntry,
    SidebarHeader,
    SidebarEntryGroup
  },
  methods: {
    collapse() {
      this.collapsed = !this.collapsed;
    }
  },
  computed: {
    sidebarClassObject() {
      return {
        "sidenav": true,
        "sidenav__collapsed": this.collapsed
      }
    },
    sidebarButtonClassObject() {
      return {
        "sidenav--collapse-button__open": !this.collapsed,
        "sidenav--collapse-button__closed": this.collapsed
      }
    }
  }
}
</script>

<template>
  <div :class="sidebarClassObject">
    <button 
      @click="collapse()"
      :class="sidebarButtonClassObject"
    >&#9776;
  </button>
    <div v-if="!collapsed">
      <SidebarHeader />
      <SidebarEntryGroup
        name="Pre-Break Commands"
        page=1
      />
      <SidebarEntryGroup
        name="Post-Break Commands"
        page=2
      />
      <SidebarEntryGroup
        name="Early Eternity Commands"
        page=3
      />
      <SidebarEntryGroup
        name="ECs/Dilation Commands"
        page=4
      />
      <SidebarEntryGroup
        name="Misc game Commands"
        page=5
      />
      <SidebarEntryGroup
        name="Misc game Commands"
        page=6
      />
      <SidebarEntryGroup
        name="Misc helper Commands"
        page=7
      />
      <SidebarEntryGroup
        name="Misc game Commands"
        page=8
      />
      <SidebarEntryGroup
        name="Fun/useless Commands"
        page=69
      />
      <SidebarEntryGroup
        name="Other Commands"
        page=100
      />
    </div>
  </div>
</template>

<style scoped>
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 15rem; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
}

.sidenav__collapsed {
  width: 1rem;
}

.sidenav--collapse-button__open {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
}

.sidenav--collapse-button__open:hover {
  background-color: #444;
}

.sidenav--collapse-button__closed {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

::-webkit-scrollbar {
  width: 2px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
}
</style>