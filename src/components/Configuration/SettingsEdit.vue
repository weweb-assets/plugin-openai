<template>
    <wwEditorFormRow required label="API key">
        <template #append-label>
            <a class="ww-editor-link ml-2" href="https://platform.openai.com/account/api-keys" target="_blank">
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
                class="w-100 mr-2"
            />
            <button class="ww-editor-button -icon -secondary -dark" @click.prevent="isKeyVisible = !isKeyVisible">
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
        },
    },
};
</script>
