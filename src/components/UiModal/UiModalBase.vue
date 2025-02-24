<script setup lang="ts">
    import {onClickOutside} from '@vueuse/core';
    import { ref, toRefs, unref, watch } from 'vue';

    interface Props {
        show: boolean
    }

    interface Emits {
        (_event: 'close'): void
    }

    const emits = defineEmits<Emits>();

    const props = defineProps<Props>();

    const {show} = toRefs(props);

    const modal = ref<HTMLElement>();

    onClickOutside(modal, () => emits('close'));

    watch(show, () => {
        if (unref(show)) {
            document.body.style.overflowY = 'hidden';
            document.body.style.overscrollBehaviorY = 'none';

            document.body.addEventListener('touchmove',function(e){
                e.preventDefault();
            });
        } else {
            document.body.style.overflowY = 'auto';
            document.body.style.overscrollBehaviorY = 'auto';

            document.body.removeEventListener('touchmove',function(e){
                e.preventDefault();
            });
        }
    });
</script>

<template>
    <Transition name="modal">
        <div
            v-if="show"
            class="ui-modal-base-mask">
            <div
                ref="modal"
                class="ui-modal-base-container">
                <header class="ui-modal-base-header">
                    <slot name="header">default header</slot>
                </header>

                <div class="ui-modal-base-body">
                    <slot name="body">default body</slot>
                </div>

                <footer class="ui-modal-base-footer">
                    <slot name="footer">
                        default footer
                        <button
                            class="ui-modal-base-default-button"
                            @click="$emit('close')">OK</button>
                    </slot>
                </footer>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.ui-modal-base-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    transition: opacity 0.3s ease;
    overscroll-behavior: contain;
}

.ui-modal-base-container {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: 'Roboto', sans-serif;
}

.modal-header h3 {
    margin-top: 0;
}

.ui-modal-base-body {
    margin: 20px 0;
}

.ui-modal-base-default-button {
    float: right;
    font-family: 'Roboto', sans-serif;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .ui-modal-base-container,
.modal-leave-to .ui-modal-base-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
