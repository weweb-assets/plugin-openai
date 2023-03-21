<template>
    <wwEditorFormRow required label="API key">
        <template #append-label>
            <a class="xano-settings-edit__link" href="https://platform.openai.com/account/api-keys" target="_blank">
                Find it here
            </a>
        </template>
        <div class="flex items-center">
            <wwEditorInputText
                :type="isKeyVisible ? 'text' : 'password'"
                name="api-key"
                placeholder="**************"
                :model-value="settings.privateData.apiKey"
                @update:modelValue="changeApiKey"
                class="w-full mr-3"
            />
            <button class="pointer" @click.prevent="isKeyVisible = !isKeyVisible">
                <wwEditorIcon :name="isKeyVisible ? 'eye-off' : 'eye'"></wwEditorIcon>
            </button>
        </div>
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    data() {
        return {
            isKeyVisible: false,
        };
    },
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
