<template>
    <wwEditorInputRow
        label="API key"
        required
        type="query"
        placeholder="**********"
        :model-value="settings.privateData.apiKey"
        @update:modelValue="changeApiKey"
    />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    methods: {
        changeApiKey(apiKey) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, apiKey },
            });
            this.$nextTick(this.loadInstance);
        },
        loadInstance() {
            this.plugin.load(this.settings.privateData.apiKey);
        },
    },
};
</script>
