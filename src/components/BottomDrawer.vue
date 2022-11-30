<script setup>
    import { ref } from 'vue'

    const root = ref(null)

    const show = async() => {
        root.value.style.setProperty('--drawerOpacity', '1')
        root.value.classList.add('is-opacity', 'has-snap', 'snap-y', '--active')
        document.documentElement.classList.add('overflow-hidden')

        root.value.scroll({ top: document.documentElement.clientHeight, behavior: 'smooth' })
    }

    const hide = () => {
        root.value.scroll({ top: 0, behavior: 'smooth' })
    }

    const scroll = ({ target }) => {
        if (target.scrollTop < document.documentElement.clientHeight) {
            const childrenOffset = root.value.children[0].clientHeight + parseFloat(getComputedStyle(root.value.children[0]).marginTop)

            root.value.classList.remove('is-opacity')
            root.value.style.setProperty('--drawerOpacity', `${target.scrollTop / childrenOffset}`)
        }

        if (root.value.classList.contains('has-snap')) {
            if (target.scrollTop > target.children[0].offsetTop) {
                root.value.classList.remove('snap-y')
            } else {
                root.value.classList.add('snap-y')
            }
        }

        if ((target.scrollTop === 0 || (target.scrollTop < scroll.last && target.scrollTop < 1)) && root.value.classList.contains('has-snap')) {
            target.scrollTop = 0
            root.value.classList.remove('has-snap', 'snap-y', '--active')
        }

        scroll.last = target.scrollTop <= 0 ? 0 : target.scrollTop
    }

    scroll.last = 0

    defineExpose({
        show,
        hide
    })
</script>

<template>
    <div class="lib-drawer-bottom" ref="root" @scroll.passive="scroll">
        <slot></slot>
    </div>
</template>

<style>
    .snap-y {
        --scroll-snap-strictness: proximity;
        scroll-snap-type: y var(--scroll-snap-strictness);
    }

    .lib-drawer-bottom {
        position: fixed;
        inset: 0;
        z-index: 50;

        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        user-select: none;
        overscroll-behavior: none;
        scroll-padding-top: 4rem;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }

        &::before {
            content: "";
            display: block;
            min-height: 100vh;
            scroll-snap-align: end;
        }

        &::after {
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
            scroll-snap-align: start;
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
            --scroll-snap-strictness: mandatory;
        }

        &:not(.--active) {
            pointer-events: none;

            &::after {
                opacity: 0;
            }

            & > div {
                transform: translateY(-999rem);
            }
        }
    }
</style>
