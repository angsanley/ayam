<template>
    <div class="overflow-auto whitespace-no-wrap">
        <perfect-scrollbar :options="{handlers: ['click-rail', 'drag-thumb', 'wheel', 'touch']}" class="px-3 pb-6 pt-2" v-dragscroll="window.width >= 1024">
            <div class="flex">
                <slot class="flex-shrink-0"/>
            </div>
        </perfect-scrollbar>
    </div>
</template>

<script>
    import { dragscroll } from 'vue-dragscroll';
    export default {
        name: "HorizontalScrollingContainer",
        data() {
            return {
                window: {
                    width: 0,
                    height: 0
                }
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            }
        },
        directives: {
            'dragscroll': dragscroll
        },
    }
</script>

<style scoped>

</style>
