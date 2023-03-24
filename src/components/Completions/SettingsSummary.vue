<template>
    <div class="flex items-center body-2">
        <wwEditorIcon name="key" class="mr-2" />
        <div class="text-ellipsis">{{ apiKey }}</div>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    computed: {
        apiKey() {
            return (this.settings.privateData.apiKey || '').replace(/./g, '*');
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
