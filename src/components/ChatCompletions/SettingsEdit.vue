<template>
    <wwEditorInputRow
        label="System prompts"
        type="array"
        :model-value="chatCompletionsPrompts"
        @update:modelValue="setChatCompletionsPrompts"
        @add-item="setChatCompletionsPrompts([...chatCompletionsPrompts, getNewItem()])"
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
        chatCompletionsPrompts() {
            return this.settings.privateData.chatCompletionsPrompts || [];
        },
    },
    methods: {
        setChatCompletionsPrompts(chatCompletionsPrompts) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, chatCompletionsPrompts },
            });
        },
        getNewItem() {
            return { id: wwLib.wwUtils.getUid() };
        },
    },
};
</script>
