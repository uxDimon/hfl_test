<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<h1>test</h1>
	<p>test</p>

	<RouterLink to="/">Home</RouterLink>
	<RouterLink to="/edit">About</RouterLink>

	<RouterView />
</template>

<style scoped lang="postcss"></style>
