<template>
    <Wrapper>
        <Header>
            <template v-slot:button>
                <slot name="header-button"></slot>
            </template>
            <slot name="header-title"></slot>
        </Header>
        <SubHeader>
            <slot name="subheader"></slot>
        </SubHeader>
        <Content>
            <slot name="content"></slot>
        </Content>
    </Wrapper>
</template>

<script setup lang="ts">    
    import Wrapper from './wrapper.vue'
    import Header from './header.vue'
    import SubHeader from './subheader.vue'
    import Content from './content.vue'
</script>