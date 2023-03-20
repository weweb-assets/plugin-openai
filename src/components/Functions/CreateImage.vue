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
        :model-value="n"
        @update:modelValue="setN"
        bindable
    />
    <wwEditorInputRow
        label="Size"
        placeholder="Default: 1024x1024"
        type="string"
        :model-value="size"
        @update:modelValue="setSize"
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
    },
};
</script>
