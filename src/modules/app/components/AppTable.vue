<script setup lang="ts">
import { useAppStore } from "@/modules/app/storeApp";

// store
const store = useAppStore();
</script>

<template>
	<h2>table</h2>
	<span>{{ store.count }}</span>
</template>
