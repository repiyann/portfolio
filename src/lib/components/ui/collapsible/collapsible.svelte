<script lang="ts">
	import * as Collapsible from 'bits-ui'

	interface Props {
		open?: boolean
		onOpenChange?: (open: boolean) => void
		disabled?: boolean
	}

	let { open = $bindable(false), onOpenChange, disabled = false }: Props = $props()
</script>

<Collapsible.Root bind:open {disabled} onOpenChange>
	<slot />
</Collapsible.Root>
