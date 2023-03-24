<template>
    <div class="flex items-center body-2" v-for="(chatCompletionsPrompt, index) of chatCompletionsPrompts" :key="index">
        <wwEditorIcon name="minus-sm" class="mr-2" :class="{ 'mt-1': !!index }" />
        <div class="text-ellipsis">{{ chatCompletionsPrompt.title }}</div>
    </div>
    <div class="flex items-center body-2" v-if="!chatCompletionsPrompts.length">
        <wwEditorIcon name="minus-sm" class="mr-2" />
        <div class="text-ellipsis">No prompt defined.</div>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    computed: {
        chatCompletionsPrompts() {
            return this.settings.privateData.chatCompletionsPrompts || [];
        },
    },
};
</script>

<style lang="scss" scoped>
.text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
