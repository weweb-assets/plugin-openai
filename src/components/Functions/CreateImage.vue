<template>
    <wwEditorInputRow
        label="Prompt"
        placeholder="Enter a value"
        type="string"
        required
        :model-value="prompt"
        @update:modelValue="setPrompt"
        bindable
    />
    <wwEditorInputRow
        label="Number of images"
        placeholder="Default: 1"
        type="number"
        min="1"
        max="10"
        :model-value="n"
        @update:modelValue="setN"
        bindable
    />
    <wwEditorInputRow
        label="User"
        placeholder=""
        type="query"
        :model-value="user"
        @update:modelValue="setUser"
        bindable
    />
    <wwEditorInputRow
        label="Size"
        placeholder="Select a size"
        type="select"
        :options="sizeOptions"
        :model-value="size"
        @update:modelValue="setSize"
        bindable
    />
    <wwEditorInputRow
        label="Response format"
        placeholder="Select a format"
        type="select"
        :options="formatOptions"
        :model-value="format"
        @update:modelValue="setFormat"
        bindable
    />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, default: () => {} },
    },
    emits: ['update:args'],
    data() {
        return {
            sizeOptions: [
                { label: '256x256', value: '256x256' },
                { label: '512x512', value: '512x512' },
                { label: '1024x1024', value: '1024x1024' },
            ],
            formatOptions: [
                { label: 'URL', value: 'url', default: true },
                { label: 'Base 64', value: 'b64_json' },
            ],
        };
    },
    computed: {
        prompt() {
            return this.args.prompt || '';
        },
        n() {
            return this.args.n;
        },
        size() {
            return this.args.size;
        },
        format() {
            return this.args.format;
        },
        user() {
            return this.args.user;
        },
    },
    methods: {
        setPrompt(prompt) {
            this.$emit('update:args', { ...this.args, prompt });
        },
        setN(n) {
            this.$emit('update:args', { ...this.args, n });
        },
        setSize(size) {
            this.$emit('update:args', { ...this.args, size });
        },
        setFormat(format) {
            this.$emit('update:args', { ...this.args, format });
        },
        setUser(user) {
            this.$emit('update:args', { ...this.args, user });
        },
    },
};
</script>
