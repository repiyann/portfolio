<script lang="ts">
	import * as Collapsible from 'bits-ui'
	import { cn } from '$lib/utils'

	let { class: className = '', ref = $bindable(null), ...restProps } = $props()
</script>

<Collapsible.Content
	bind:ref
	class={cn(
		'overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand',
		className
	)}
	{...restProps}
>
	<div class="space-y-2 border-t border-border px-4 py-3">
		<slot />
	</div>
</Collapsible.Content>
