<template>
    <wwEditorFormRow label="Prompt" required>
        <div class="flex items-center">
            <wwEditorInput
                label="Prompt"
                placeholder="Enter a value"
                type="string"
                required
                :model-value="prompt"
                @update:modelValue="setPrompt"
                bindable
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.prompt" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="User">
        <div class="flex items-center">
            <wwEditorInput
                label="User"
                placeholder="Enter a unique identifier"
                type="query"
                :model-value="user"
                @update:modelValue="setUser"
                bindable
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.user" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Number of images">
        <div class="flex items-center">
            <wwEditorInput type="number" min="1" max="10" :model-value="n" @update:modelValue="setN" bindable small />
            <wwEditorInputRange
                v-if="!isNBound"
                class="ml-2"
                min="1"
                max="10"
                :model-value="n"
                @update:modelValue="setN"
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.n" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Size">
        <div class="flex items-center">
            <wwEditorInput
                label="Size"
                type="select"
                :options="sizeOptions"
                :model-value="size"
                @update:modelValue="setSize"
                bindable
                small
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.size" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Response format">
        <div class="flex items-center">
            <wwEditorInput
                label="Response format"
                type="select"
                :options="formatOptions"
                :model-value="format"
                @update:modelValue="setFormat"
                bindable
                small
            />
            <wwEditorQuestionMark
                tooltip-position="top-left"
                class="ml-2"
                :forcedContent="questionMark.response_format"
            />
        </div>
    </wwEditorFormRow>
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
            questionMark: {
                user: 'A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. ',
                response_format: 'The format in which the generated images are returned.',
                size: 'The size of the generated images.',
                n: 'The number of images to generate.',
                prompt: 'A text description of the desired image(s). The maximum length is 1000 characters.',
            },
        };
    },
    computed: {
        prompt() {
            return this.args.prompt || '';
        },
        n() {
            return this.args.n || 1;
        },
        isNBound() {
            return typeof this.n === 'object';
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
