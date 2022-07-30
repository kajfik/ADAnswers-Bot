<script>
import SidebarEntry from "./SidebarEntry.vue"
import SidebarHeader from "./SidebarHeader.vue"
import SidebarEntryGroup from "./SidebarEntryGroup.vue"

export default {
  components: {
    SidebarEntry,
    SidebarHeader,
    SidebarEntryGroup
  }
}
</script>

<template>
  <div class="sidenav">
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
}

::-webkit-scrollbar {
  width: 2px;
}
</style>