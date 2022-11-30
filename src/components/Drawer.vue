<script setup>
    import { ref } from 'vue'

    const root = ref(null)

    const show = async() => {
        root.value.scrollLeft = 0
        root.value.style.setProperty('--drawerOpacity', '1')
        root.value.classList.add('is-opacity', '--active')
        document.documentElement.classList.add('overflow-hidden')
    }

    const hide = () => {
        root.value.classList.remove('is-opacity', '--active')
        root.value.style.setProperty('--drawerOpacity', '0')
        document.documentElement.classList.add('overflow-hidden')
    }

    const scroll = ({ target }) => {
        if (target.scrollLeft > 1) {
            root.value.classList.remove('is-opacity')
            root.value.style.setProperty('--drawerOpacity', `${Math.abs((target.scrollLeft / root.value.children[0].clientWidth) - 1)}`)
        }

        if (target.scrollLeft === root.value.children[0].clientWidth) {
            root.value.classList.remove('is-opacity', '--active')
        }
    }

    defineExpose({
        show,
        hide
    })
</script>

<template>
    <div class="lib-drawer is-transition" ref="root" @scroll.passive="scroll">
        <slot></slot>
    </div>
</template>

<style>
    .lib-drawer {
        position: fixed;
        inset: 0;
        z-index: 50;

        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        user-select: none;
        overscroll-behavior: none;
        scroll-padding-left: 4rem;
        scrollbar-width: none;
        display: flex;
        flex-direction: row;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }

        &::after {
            content: "";
            display: block;
            min-width: 100vw;
            scroll-snap-align: end;
        }

        &::before {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: -1;
            background-color: rgba(0 0 0 / 60%);
            content: "";
            opacity: var(--drawerOpacity, 0);
        }

        & > div {
            min-width: 20rem;
            scroll-snap-align: end;
        }

        &.is-opacity {
            &::after {
                transition: opacity 0.3s ease;
            }
        }

        &.is-transition {
            & > div {
                transition: transform 0.3s ease;
            }
        }

        &.--active {
            scroll-snap-type: x mandatory;
        }

        &:not(.--active) {
            pointer-events: none;

            &::after {
                opacity: 0;
            }

            & > div {
                transform: translateX(-20rem);
            }
        }
    }
</style>
