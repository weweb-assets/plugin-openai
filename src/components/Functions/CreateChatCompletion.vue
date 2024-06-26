<template>
    <wwEditorInputRow
        label="Model"
        placeholder="Select a model"
        type="select"
        bindable
        :options="modelOptions"
        :model-value="model"
        @update:modelValue="setModel"
        required
    />
    <span class="model-warning label-sm flex flex-row items-center mb-2" v-if="isUsingUnstableModel">
        <wwEditorIcon name="warning" small class="mr-1" />
        This model may be deprecated and no longer work in the future.
        <a class="ww-editor-link" href="https://platform.openai.com/docs/deprecations" target="_blank">See more</a>
    </span>
    <wwEditorInputRow
        label="System content"
        placeholder="Select a system content"
        type="select"
        :actions="securedPromptActions"
        :options="securedPromptOptions"
        :model-value="securedPrompt"
        @update:modelValue="setSecuredPrompt"
        @action="onAction"
    />
    <template v-if="securedPrompt">
        <wwEditorInputRow
            v-for="(variable, index) in variablesOptions"
            :key="index"
            type="query"
            :model-value="securedPromptVariables[variable.value]"
            :label="variable.value"
            placeholder="Enter a value"
            bindable
            required
            @update:modelValue="setSecuredPromptVariables({ ...securedPromptVariables, [variable.value]: $event })"
        />
    </template>
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
            <div class="flex items-center">
                <wwEditorInputRow
                    type="query"
                    :model-value="item.content"
                    label="Content"
                    placeholder="Enter a value"
                    small
                    bindable
                    @update:modelValue="setItem({ ...item, content: $event })"
                />
                <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.messages" />
            </div>
        </template>
    </wwEditorInputRow>
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
    <wwEditorFormRow label="Maximum tokens">
        <div class="flex items-center">
            <wwEditorInput
                label="Number of edits"
                type="number"
                min="1"
                max="32000"
                :model-value="max_tokens"
                @update:modelValue="setMaxTokens"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isMaxTokensBound"
                class="ml-2"
                min="1"
                max="32000"
                :model-value="max_tokens"
                @update:modelValue="setMaxTokens"
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.max_tokens" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Number of choices">
        <div class="flex items-center">
            <wwEditorInput
                label="Number of choices"
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
                min="0"
                max="2"
                step="0.1"
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
                min="0"
                max="2"
                step="0.1"
                :model-value="top_p"
                @update:modelValue="setTopP"
            />
            <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.top_p" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Presence penalty">
        <div class="flex items-center">
            <wwEditorInput
                label="Presence penalty"
                type="number"
                min="-2"
                max="2"
                step="0.1"
                :model-value="presence_penalty"
                @update:modelValue="setPresencePenalty"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isPresencePenaltyBound"
                class="ml-2"
                min="-2"
                max="2"
                step="0.1"
                :model-value="presence_penalty"
                @update:modelValue="setPresencePenalty"
            />
            <wwEditorQuestionMark
                tooltip-position="top-left"
                class="ml-2"
                :forcedContent="questionMark.presence_penalty"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Frequency penalty">
        <div class="flex items-center">
            <wwEditorInput
                label="Frequency penalty"
                type="number"
                min="-2"
                max="2"
                step="0.1"
                :model-value="frequency_penalty"
                @update:modelValue="setFrequencyPenalty"
                bindable
                small
            />
            <wwEditorInputRange
                v-if="!isFrequencyPenaltyBound"
                class="ml-2"
                min="-2"
                max="2"
                step="0.1"
                :model-value="frequency_penalty"
                @update:modelValue="setFrequencyPenalty"
            />
            <wwEditorQuestionMark
                tooltip-position="top-left"
                class="ml-2"
                :forcedContent="questionMark.frequency_penalty"
            />
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        label="Logit bias"
        type="array"
        :model-value="logit_bias"
        bindable
        @update:modelValue="setLogitBias"
        @add-item="setLogitBias([...logit_bias, {}])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="number"
                :model-value="item.key"
                label="Token ID"
                min="0"
                placeholder="Enter a value"
                small
                bindable
                @update:modelValue="setItem({ ...item, key: $event })"
            />
            <div class="flex items-center">
                <wwEditorInputRow
                    type="number"
                    :model-value="item.value"
                    label="Bias value"
                    min="-100"
                    max="100"
                    placeholder="Enter a value"
                    small
                    bindable
                    @update:modelValue="setItem({ ...item, value: $event })"
                />
                <wwEditorQuestionMark
                    tooltip-position="top-left"
                    class="ml-2"
                    :forcedContent="questionMark.logit_bias"
                />
            </div>
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow
        label="Stop"
        type="array"
        :model-value="stop"
        bindable
        @update:modelValue="setStop"
        @add-item="setStop([...stop, ''])"
    >
        <template #default="{ item, setItem }">
            <div class="flex items-center">
                <wwEditorInputRow
                    class="w-100"
                    placeholder="Enter a value"
                    type="query"
                    :model-value="item"
                    @update:modelValue="setItem"
                    bindable
                    small
                />
                <wwEditorQuestionMark tooltip-position="top-left" class="ml-2" :forcedContent="questionMark.stop" />
            </div>
        </template>
    </wwEditorInputRow>
    <wwEditorInputRow label="Stream" type="boolean" :model-value="stream" @update:modelValue="setStream" />
    <wwEditorInputRow
        v-if="stream"
        label="Stream variable"
        placeholder="Choose an array variable"
        type="select"
        :actions="wwVariableActions"
        :options="wwVariableOptions"
        :model-value="streamVariableId"
        @update:modelValue="setStreamVariableId"
        @action="onAction"
        required
    />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, default: () => {} },
    },
    emits: ['update:args'],
    setup() {
        const { website: websiteVariables } = wwLib.wwVariable.useEditorVariables();

        return {
            websiteVariables,
        };
    },
    data() {
        return {
            securedPromptActions: [{ icon: 'plus', label: 'Add secured prompt', onAction: this.openOpenAIConfig }],
            wwVariableActions: [{ icon: 'plus', label: 'Create variable', onAction: this.createWwVariable }],
            modelOptions: [],
            roleOptions: [
                { label: 'System', value: 'system' },
                { label: 'Assistant', value: 'assistant' },
                { label: 'User', value: 'user' },
            ],
            questionMark: {
                messages: 'The messages to generate chat completions for.',
                temperature: `What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.

We generally recommend altering this or top p but not both.`,
                top_p: `An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.

We generally recommend altering this or temperature but not both.`,
                n: 'How many chat completion choices to generate for each input message.',
                stream: '',
                stop: 'Up to 4 sequences where the API will stop generating further tokens.',
                max_tokens: `The maximum number of tokens to generate in the chat completion.

The total length of input tokens and generated tokens is limited by the model's context length.`,
                presence_penalty: `Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.`,
                frequency_penalty: `umber between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.`,
                logit_bias: `Modify the likelihood of specified tokens appearing in the completion.

Accepts a json object that maps tokens (specified by their token ID in the tokenizer) to an associated bias value from -100 to 100. Mathematically, the bias is added to the logits generated by the model prior to sampling. The exact effect will vary per model, but values between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100 should result in a ban or exclusive selection of the relevant token.`,
                user: 'A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.',
            },
        };
    },
    async mounted() {
        this.modelOptions =
            (await this.plugin.getModels())
                ?.map(model => ({ label: model.id, value: model.id }))
                ?.sort((a, b) => (a.label < b.label ? -1 : 1)) || [];
    },
    computed: {
        isUsingUnstableModel() {
            return false;
            // return !!this.model.match(/(gpt-).*-.*/);
        },
        securedPromptOptions() {
            return (this.plugin.settings.privateData.securedPrompts || []).map(item => ({
                label: item.title,
                value: item.id,
            }));
        },
        variablesOptions() {
            if (!this.securedPrompt) return [];
            const securedPrompt = (this.plugin.settings.privateData.securedPrompts || []).find(
                item => item.id === this.securedPrompt
            );
            if (!securedPrompt) return [];
            return ((securedPrompt.content || '').match(/{{([^{}]+)}}/g) || [])
                .map(item => item.replace(/{{|}}/g, ''))
                .map(item => ({ label: item, value: item }));
        },
        securedPromptVariables() {
            return this.args.securedPromptVariables || {};
        },
        model() {
            return this.args.model;
        },
        securedPrompt() {
            return this.args.securedPrompt;
        },
        messages() {
            return this.args.messages || [];
        },
        n() {
            if (this.args.n === undefined) return 1;
            return this.args.n;
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
        stop() {
            return this.args.stop || [];
        },
        max_tokens() {
            if (this.args.max_tokens === undefined) return 1000;
            return this.args.max_tokens;
        },
        isMaxTokensBound() {
            return typeof this.max_tokens === 'object';
        },
        presence_penalty() {
            if (this.args.presence_penalty === undefined) return 0;
            return this.args.presence_penalty;
        },
        isPresencePenaltyBound() {
            return typeof this.presence_penalty === 'object';
        },
        frequency_penalty() {
            if (this.args.frequency_penalty === undefined) return 0;
            return this.args.frequency_penalty;
        },
        isFrequencyPenaltyBound() {
            return typeof this.frequency_penalty === 'object';
        },
        logit_bias() {
            return this.args.logit_bias || [];
        },
        user() {
            return this.args.user;
        },
        stream() {
            return this.args.stream;
        },
        streamVariableId() {
            return this.args.streamVariableId;
        },
        wwVariableOptions() {
            return Object.values(this.websiteVariables)
                .filter(variable => variable.type === 'array')
                .map(variable => ({
                    label: variable.name,
                    value: variable.id,
                }));
        },
    },
    methods: {
        setModel(model) {
            this.$emit('update:args', { ...this.args, model });
        },
        setSecuredPrompt(securedPrompt) {
            this.$emit('update:args', { ...this.args, securedPrompt });
        },
        setMessages(messages) {
            this.$emit('update:args', { ...this.args, messages });
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
        setSecuredPromptVariables(securedPromptVariables) {
            this.$emit('update:args', { ...this.args, securedPromptVariables });
        },
        setStream(stream) {
            this.$emit('update:args', { ...this.args, stream });
        },
        setStreamVariableId(streamVariableId) {
            this.$emit('update:args', { ...this.args, streamVariableId });
        },
        onAction(action) {
            action.onAction && action.onAction();
        },
        createWwVariable() {
            // eslint-disable-next-line vue/custom-event-name-casing
            wwLib.$emit('wwTopBar:open', 'WEBSITE_DATA');
            // eslint-disable-next-line vue/custom-event-name-casing
            wwLib.$emit('wwTopBar:data:setMenu', 'variables');
            // eslint-disable-next-line vue/custom-event-name-casing
            this.$nextTick(() => wwLib.$emit('wwTopBar:data:variables:setVariable', null));
        },
        openOpenAIConfig() {
            wwLib.$emit('wwTopBar:open', 'WEBSITE_PLUGIN');
            this.$nextTick(() => wwLib.$emit('wwTopBar:plugins:setPlugin', 'd66a250d-8468-469e-ad33-ee028f632398'));
        },
    },
};
</script>

<style scoped>
.model-warning {
    color: var(--ww-color-content-warning);
}
</style>
