<script>
import Sidebar from "./components/sidebar/Sidebar.vue";
import Welcome from "./components/main/Welcome.vue";
import Command from "./components/main/command/Command.vue";
import Commands from "./javascripts/commands.js";

export default {
  components: {
    Sidebar,
    Welcome,
    Command
  },
  data() {
    return {
      currentCommand: "",
      command: {
        name: "",
        description: "",
        usage: "",
        examples: [],
        aliases: [],
        parameters: []
      },
      showCommandStuff: false,
    }
  },
  methods: {
    getCurrentCommand() {
      return selectedCommand;
    },
    showCommand() {
      if (this.getCurrentCommand()) {
        this.update();
        return true;
      }
      return false;
    }, 
    getCommandInfo() {
      return {
        name: this.currentCommand,
        description: Commands[this.currentCommand].description,
        usage: Commands[this.currentCommand].usage,
        examples: Commands[this.currentCommand].examples,
        aliases: Commands[this.currentCommand].aliases,
        parameters: Commands[this.currentCommand].parameters,
      };
    },
    update() {
      // Super finicky check to make sure that when clicking directly on the sidebar and not on an entry
      // nothing happens. I don't like it either
      if (this.getCurrentCommand() === undefined) return;
      if (this.getCurrentCommand() !== undefined) this.showCommandStuff = true;
      if (this.currentCommand !== this.getCurrentCommand()) {
        this.showCommandStuff = true;
        this.currentCommand = this.getCurrentCommand();
        this.command = this.getCommandInfo();
      }
    }
  },
  mounted() {
    this.update();
  },
}
</script>

<template>
<div class="app">
  <Sidebar @click="this.update()" />
  <Welcome v-if="!showCommandStuff" />
  <Command v-if="showCommandStuff"
    :name="currentCommand"
    :description="command.description"
    :usage="command.usage"
    :examples="command.examples"
    :aliases="command.aliases"
    :parameters="command.parameters"
  />
</div>
</template>

<style>
@import './assets/base.css';

::-webkit-scrollbar {
  width: 1.6rem;
}

::-webkit-scrollbar-thumb {
  background-clip: content-box;
  background-color: grey;
  border: 0.2rem solid transparent;
  border-radius: 0.5rem;
}

::-webkit-scrollbar-corner {
  -webkit-appearance: none;
  appearance: none;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  transition: margin-left .5s;
}

</style>
