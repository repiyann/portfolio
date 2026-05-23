<script lang="ts">
	import * as Collapsible from 'bits-ui'
	import { cn } from '$lib/utils'
	import { IconChevronRight } from '@tabler/icons-svelte'

	let { class: className = '', ref = $bindable(null), ...restProps } = $props()
</script>

<Collapsible.Trigger
	bind:ref
	class={cn(
		'group flex w-full items-center justify-between rounded-lg border border-border bg-transparent px-4 py-3 text-left font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-muted',
		className
	)}
	{...restProps}
>
	<slot />
	<IconChevronRight class="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
</Collapsible.Trigger>
