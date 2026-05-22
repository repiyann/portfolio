<script lang="ts">
	import * as Collapsible from 'bits-ui'
	import { cn } from '$lib/utils'
	import { IconChevronRight } from '@tabler/icons-svelte'
	import type { HTMLAttributes, Snippet } from 'svelte'

	interface Props extends HTMLAttributes<HTMLButtonElement> {
		class?: string
		children: Snippet
	}

	let { class: className, children, ...restProps }: Props = $props()
</script>

<Collapsible.Trigger
	class={cn(
		'flex w-full items-center justify-between rounded-lg border border-border bg-transparent px-4 py-3 text-left font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-muted',
		className
	)}
	type="button"
	{...restProps}
>
	<div>
		{@render children?.()}
	</div>
	<IconChevronRight class="size-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90" />
</Collapsible.Trigger>
