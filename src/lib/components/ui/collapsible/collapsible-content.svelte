<script lang="ts">
	import * as Collapsible from 'bits-ui'
	import { cn } from '$lib/utils'
	import type { HTMLAttributes, Snippet } from 'svelte'

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string
		children: Snippet
	}

	let { class: className, children, ...restProps }: Props = $props()
</script>

<Collapsible.Content
	class={cn(
		'overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand',
		className
	)}
	{...restProps}
>
	<div class="space-y-2 border-t border-border px-4 py-3">
		{@render children?.()}
	</div>
</Collapsible.Content>
