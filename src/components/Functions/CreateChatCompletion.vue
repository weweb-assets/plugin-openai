<template>
    <wwEditorInputRow
        label="Model"
        placeholder="Select a model"
        type="select"
        :options="modelOptions"
        :model-value="model"
        @update:modelValue="setModel"
        required
        bindable
    />
    <wwEditorInputRow
        label="Messages"
        type="array"
        :model-value="messages"
        bindable
        @update:modelValue="setMessages"
        @add-item="setMessages([...messages, {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="select"
                :model-value="item.role"
                label="Role"
                placeholder="Select a role"
                :options="roleOptions"
                small
                bindable
                @update:modelValue="setItem({ ...item, role: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.content"
                label="Content"
                placeholder="Enter a value"
                small
                bindable
                @update:modelValue="setItem({ ...item, content: $event })"
            />
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        label="User"
        placeholder="Enter a unique identifier"
        type="query"
        :model-value="user"
        @update:modelValue="setUser"
        bindable
    />
    <wwEditorInputRow label="Stream" type="boolean" :model-value="stream" @update:modelValue="setStream" bindable />
    <wwEditorFormRow label="Maximum tokens">
        <template #append-label>
            <div class="label-sm text-stale-500 ml-auto">{{ max_tokens }}</div>
        </template>
        <wwEditorInputRange min="1" max="32000" :model-value="max_tokens" @update:modelValue="setMaxTokens" />
    </wwEditorFormRow>
    <wwEditorFormRow label="Number of choices">
        <template #append-label>
            <div class="label-sm text-stale-500 ml-auto">{{ n }}</div>
        </template>
        <wwEditorInputRange min="1" max="100" :model-value="n" @update:modelValue="setN" />
    </wwEditorFormRow>
    <wwEditorFormRow label="Temperature">
        <template #append-label>
            <div class="label-sm text-stale-500 ml-auto">{{ temperature }}</div>
        </template>
        <wwEditorInputRange min="0" max="2" :model-value="temperature" @update:modelValue="setTemperature" />
    </wwEditorFormRow>
    <wwEditorFormRow label="Presence penalty">
        <template #append-label>
            <div class="label-sm text-stale-500 ml-auto">{{ presence_penalty }}</div>
        </template>
        <wwEditorInputRange min="-2" max="2" :model-value="presence_penalty" @update:modelValue="setPresencePenalty" />
    </wwEditorFormRow>
    <wwEditorFormRow label="Frequency penalty">
        <template #append-label>
            <div class="label-sm text-stale-500 ml-auto">{{ frequency_penalty }}</div>
        </template>
        <wwEditorInputRange
            min="-2"
            max="2"
            :model-value="frequency_penalty"
            @update:modelValue="setFrequencyPenalty"
        />
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
            modelOptions: [
                { label: 'gpt-4', value: 'gpt-4' },
                { label: 'gpt-4-0314', value: 'gpt-4-0314' },
                { label: 'gpt-4-32k', value: 'gpt-4-32k' },
                { label: 'gpt-4-32k-0314', value: 'gpt-4-32k-0314' },
                { label: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' },
                { label: 'ggpt-3.5-turbo-0301', value: 'ggpt-3.5-turbo-0301' },
            ],
        };
    },
    computed: {
        model() {
            return this.args.model;
        },
        messages() {
            return this.args.messages || [];
        },
        stream() {
            return this.args.stream;
        },
        n() {
            return this.args.n || 1;
        },
        temperature() {
            return this.args.temperature || 1;
        },
        stop() {
            return this.args.stop;
        },
        max_tokens() {
            return this.args.max_tokens || 100;
        },
        presence_penalty() {
            return this.args.presence_penalty || 0;
        },
        frequency_penalty() {
            return this.args.frequency_penalty || 0;
        },
        logit_bias() {
            return this.args.logit_bias;
        },
        user() {
            return this.args.user;
        },
    },
    methods: {
        setModel(model) {
            this.$emit('update:args', { ...this.args, model });
        },
        setMessages(messages) {
            this.$emit('update:args', { ...this.args, messages });
        },
        setStream(stream) {
            this.$emit('update:args', { ...this.args, stream });
        },
        setN(n) {
            this.$emit('update:args', { ...this.args, n });
        },
        setTemperature(temperature) {
            this.$emit('update:args', { ...this.args, temperature });
        },
        setStop(stop) {
            this.$emit('update:args', { ...this.args, stop });
        },
        setMaxTokens(max_tokens) {
            this.$emit('update:args', { ...this.args, max_tokens });
        },
        setPresencePenalty(presence_penalty) {
            this.$emit('update:args', { ...this.args, presence_penalty });
        },
        setFrequencyPenalty(frequency_penalty) {
            this.$emit('update:args', { ...this.args, frequency_penalty });
        },
        setLogitBias(logit_bias) {
            this.$emit('update:args', { ...this.args, logit_bias });
        },
        setUser(user) {
            this.$emit('update:args', { ...this.args, user });
        },
    },
};
</script>
