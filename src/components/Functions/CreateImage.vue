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
    <wwEditorFormRow label="Number of images">
        <template #append-label>
            <div class="label-sm text-stale-500 ml-auto">{{ n }}</div>
        </template>
        <wwEditorInputRange min="1" max="10" :model-value="n" @update:modelValue="setN" />
    </wwEditorFormRow>
    <wwEditorInputRow
        label="User"
        placeholder="Enter a unique identifier"
        type="query"
        :model-value="user"
        @update:modelValue="setUser"
        bindable
    />
    <wwEditorInputRow
        label="Size"
        type="select"
        :options="sizeOptions"
        :model-value="size"
        @update:modelValue="setSize"
        bindable
        small
    />
    <wwEditorInputRow
        label="Response format"
        type="select"
        :options="formatOptions"
        :model-value="format"
        @update:modelValue="setFormat"
        bindable
        small
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
                { label: '1024x1024', value: '1024x1024', default: true },
                { label: '512x512', value: '512x512' },
                { label: '256x256', value: '256x256' },
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
            return this.args.n || 1;
        },
        size() {
            return this.args.size;
        },
        format() {
            return this.args.response_format;
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
        setFormat(response_format) {
            this.$emit('update:args', { ...this.args, response_format });
        },
        setUser(user) {
            this.$emit('update:args', { ...this.args, user });
        },
    },
};
</script>
