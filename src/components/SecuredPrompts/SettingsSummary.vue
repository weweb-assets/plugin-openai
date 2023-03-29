<template>
    <div class="flex items-center body-2" v-for="(securedPrompt, index) of securedPrompts" :key="index">
        <wwEditorIcon name="minus-sm" class="mr-2" :class="{ 'mt-1': !!index }" />
        <div class="text-ellipsis">{{ securedPrompt.title }}</div>
    </div>
    <div class="flex items-center body-2" v-if="!securedPrompts.length">
        <wwEditorIcon name="minus-sm" class="mr-2" />
        <div class="text-ellipsis">No prompt defined.</div>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    computed: {
        securedPrompts() {
            return this.settings.privateData.securedPrompts || [];
        },
    },
};
</script>

<style lang="scss" scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
