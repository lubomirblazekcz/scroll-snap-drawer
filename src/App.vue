<script setup>
    import { ref } from 'vue'

    import BottomDrawer from './components/BottomDrawer.vue'
    import Drawer from './components/Drawer.vue'

    const drawer = ref(null)
    const bottomDrawer = ref(null)

    const showDrawer = () => drawer.value.show()
    const showDrawerBottom = () => bottomDrawer.value.show()
</script>

<template>
    <button @click="showDrawer()">Open Drawer</button>
    <button @click="showDrawerBottom()">Open BottomDrawer</button>
    <BottomDrawer ref="bottomDrawer">
        <div class="c-drawer">
            Lorem ipsum
        </div>
    </BottomDrawer>
    <Drawer ref="drawer">
        <div class="c-drawer">
            Lorem ipsum
        </div>
    </Drawer>
</template>

<style scoped>
    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.vue:hover {
      filter: drop-shadow(0 0 2em #42b883aa);
    }

    .c-drawer {
        background-color: white;
        color: black;
        padding: 2rem;
        box-sizing: border-box;
    }
</style>
