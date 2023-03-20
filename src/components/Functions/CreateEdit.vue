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
        label="Instruction"
        placeholder="Enter a value"
        type="query"
        :model-value="instruction"
        @update:modelValue="setInstruction"
        bindable
        required
    />
    <wwEditorInputRow
        label="Input"
        placeholder="Enter a value"
        type="query"
        :model-value="input"
        @update:modelValue="setInput"
        bindable
    />
    <wwEditorFormRow label="Number of edits">
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
                { label: 'text-davinci-edit-001', value: 'text-davinci-edit-001' },
                { label: 'code-davinci-edit-001', value: 'code-davinci-edit-001' },
            ],
        };
    },
    computed: {
        model() {
            return this.args.model;
        },
        instruction() {
            return this.args.instruction;
        },
        input() {
            return this.args.input;
        },
        n() {
            return this.args.n || 1;
        },
        temperature() {
            return this.args.temperature || 1;
        },
    },
    methods: {
        setModel(model) {
            this.$emit('update:args', { ...this.args, model });
        },
        setInstruction(instruction) {
            this.$emit('update:args', { ...this.args, instruction });
        },
        setInput(input) {
            this.$emit('update:args', { ...this.args, input });
        },
        setN(n) {
            this.$emit('update:args', { ...this.args, n });
        },
        setTemperature(temperature) {
            this.$emit('update:args', { ...this.args, temperature });
        },
    },
};
</script>
