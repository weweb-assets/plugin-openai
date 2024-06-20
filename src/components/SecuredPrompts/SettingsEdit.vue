<template>
    <wwEditorInputRow
        label="Secured prompts"
        type="array"
        :model-value="securedPrompts"
        @update:modelValue="setSecuredPrompts"
        @add-item="setSecuredPrompts([...securedPrompts, getNewItem()])"
    >
        <template #default="{ item, index, setItem }">
            <div class="flex flex-col" :class="{ 'border-top-primary pt-3': !!index }">
                <wwEditorInputRow
                    type="query"
                    :model-value="item.title"
                    label="Title"
                    placeholder="Enter the title of the prompt"
                    small
                    required
                    @update:modelValue="setItem({ ...item, title: $event })"
                />
                <wwEditorFormRow label="Content" required>
                    <template #append-label>
                        <button
                            type="button"
                            class="ww-editor-button -secondary -dark -small -no-padding ml-2"
                            @click="addVariable(item, setItem)"
                        >
                            <div class="flex items-center py-0 px-1">
                                <wwEditorIcon class="ww-editor-button-icon -left" name="plus" small />
                                Add variable
                            </div>
                        </button>
                    </template>
                    <wwEditorInput
                        type="string"
                        :model-value="item.content"
                        placeholder="Enter your secured prompt"
                        required
                        @update:modelValue="setItem({ ...item, content: $event })"
                    />
                </wwEditorFormRow>
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
        securedPrompts() {
            return this.settings.privateData.securedPrompts || [];
        },
    },
    methods: {
        setSecuredPrompts(securedPrompts) {
            this.$emit('update:settings', {
                ...this.settings,
                privateData: { ...this.settings.privateData, securedPrompts },
            });
        },
        getNewItem() {
            return { id: wwLib.wwUtils.getUid() };
        },
        addVariable(item, setItem) {
            const number = Math.max(
                ...((item.content || '').match(/{{var\d+}}/g) || [])
                    .map(item => item.replace(/{{var(\d+)}}/g, '$1'))
                    .map(item => parseInt(item)),
                0
            );
            setItem({ ...item, content: (item.content || '') + `{{var${number + 1}}}` });
        },
    },
};
</script>
