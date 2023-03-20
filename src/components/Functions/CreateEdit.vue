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
        <wwEditorInputRange min="1" max="100" :model-value="n" @update:modelValue="setN" />
    </wwEditorFormRow>
    <wwEditorFormRow label="Temperature">
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
            return this.args.n;
        },
        temperature() {
            return this.args.temperature;
        },
        modelOptions() {
            return this.plugin.models.map(model => ({ label: model.id, value: model.id }));
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
