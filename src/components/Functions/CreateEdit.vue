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
    <wwEditorFormRow label="Input">
        <div class="flex items-center">
            <wwEditorInput
                label="Input"
                placeholder="Enter a value"
                type="query"
                :model-value="input"
                @update:modelValue="setInput"
                bindable
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.input" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Instruction">
        <div class="flex items-center">
            <wwEditorInput
                label="Instruction"
                placeholder="Enter a value"
                type="query"
                :model-value="instruction"
                @update:modelValue="setInstruction"
                bindable
                required
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.instruction" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Number of edits">
        <div class="flex items-center">
            <wwEditorInput
                label="Number of edits"
                type="number"
                min="1"
                max="100"
                :model-value="n"
                @update:modelValue="setN"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isNBound"
                class="ml-2"
                min="1"
                max="100"
                :model-value="n"
                @update:modelValue="setN"
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.n" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Temperature">
        <div class="flex items-center">
            <wwEditorInput
                label="Temperature"
                type="number"
                min="0"
                max="2"
                step="0.1"
                :model-value="temperature"
                @update:modelValue="setTemperature"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isTemperatureBound"
                class="ml-2"
                step="0.1"
                min="0"
                max="2"
                :model-value="temperature"
                @update:modelValue="setTemperature"
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.temperature" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Top p">
        <div class="flex items-center">
            <wwEditorInput
                label="Top p"
                type="number"
                min="0"
                max="2"
                step="0.1"
                :model-value="top_p"
                @update:modelValue="setTopP"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isTopPBound"
                class="ml-2"
                step="0.1"
                min="0"
                max="2"
                :model-value="top_p"
                @update:modelValue="setTopP"
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.top_p" />
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
            modelOptions: [
                { label: 'text-davinci-edit-001', value: 'text-davinci-edit-001' },
                { label: 'code-davinci-edit-001', value: 'code-davinci-edit-001' },
            ],
            questionMark: {
                input: 'The input text to use as a starting point for the edit.',
                instruction: 'The instruction that tells the model how to edit the prompt.',
                n: 'How many edits to generate for the input and instruction.',
                top_p: `An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with topp probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

We generally recommend altering this or temperature but not both.`,
                temperature: `What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

We generally recommend altering this or top p but not both.`,
            },
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
        isNBound() {
            return typeof this.n === 'object';
        },
        temperature() {
            if (this.args.temperature === undefined) return 1;
            return this.args.temperature;
        },
        isTemperatureBound() {
            return typeof this.temperature === 'object';
        },
        top_p() {
            if (this.args.top_p === undefined) return 1;
            return this.args.top_p;
        },
        isTopPBound() {
            return typeof this.top_p === 'object';
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
        setTopP(top_p) {
            this.$emit('update:args', { ...this.args, top_p });
        },
    },
};
</script>
