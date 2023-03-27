<template>
    <wwEditorInputRow
        label="System prompts"
        type="array"
        :model-value="chatCompletionsMessages"
        @update:modelValue="setChatCompletionsMessages"
        @add-item="setChatCompletionsMessages([...chatCompletionsMessages, getNewItem()])"
    >
        <template #default="{ item, index, setItem }">
            <div class="flex flex-col" :class="{ 'border-top-stale-100 pt-3': !!index }">
                <wwEditorInputRow
                    type="query"
                    :model-value="item.title"
                    label="Title"
                    placeholder="Enter the title of the prompt"
                    small
                    required
                    @update:modelValue="setItem({ ...item, title: $event })"
                />
                <wwEditorInputRow
                    type="string"
                    :model-value="item.content"
                    label="Content"
                    placeholder="Enter your system prompt"
                    required
                    @update:modelValue="setItem({ ...item, content: $event })"
                />
            </div>
        </template>
    </wwEditorInputRow>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    computed: {
        chatCompletionsMessages() {
            return this.settings.privateData.chatCompletionsMessages || [];
        },
    },
    methods: {
        setChatCompletionsMessages(chatCompletionsMessages) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, chatCompletionsMessages },
            });
        },
        getNewItem() {
            return { id: wwLib.wwUtils.getUid() };
        },
    },
};
</script>
