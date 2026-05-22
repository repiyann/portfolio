<script lang="ts">
	import * as Collapsible from 'bits-ui'
	import type { Snippet } from 'svelte'

	interface Props {
		open?: boolean
		onOpenChange?: (open: boolean) => void
		disabled?: boolean
		children: Snippet
	}

	let { open = $bindable(false), onOpenChange, disabled = false, children }: Props = $props()
</script>

<Collapsible.Root bind:open {disabled} onOpenChange>
	{@render children?.()}
</Collapsible.Root>
