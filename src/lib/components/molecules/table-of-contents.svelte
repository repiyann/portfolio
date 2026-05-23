<script lang="ts">
	import { onMount } from 'svelte'
	import { IconChevronRight } from '@tabler/icons-svelte'

	interface Heading {
		id: string
		text: string
		level: number
	}

	let headings: Heading[] = $state([])
	let activeId: string = $state('')
	let isOpen = $state(false)

	onMount(() => {
		// Extract headings from the article
		const articleContent = document.querySelector('article')
		if (!articleContent) return

		const h2s = Array.from(articleContent.querySelectorAll('h2, h3, h4'))
		headings = h2s
			.filter((heading) => heading.id) // Only include headings with IDs
			.map((heading) => ({
				id: heading.id,
				text: heading.textContent || '',
				level: parseInt(heading.tagName[1])
			}))

		// Set up intersection observer for scroll tracking
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeId = entry.target.id
					}
				})
			},
			{
				rootMargin: '-50% 0px -50% 0px'
			}
		)

		h2s.forEach((heading) => {
			if (heading.id) {
				observer.observe(heading)
			}
		})

		return () => {
			observer.disconnect()
		}
	})

	function handleNavigation(id: string) {
		const element = document.getElementById(id)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
			activeId = id
			if (window.innerWidth < 768) {
				isOpen = false
			}
		}
	}

	function toggleTOC() {
		isOpen = !isOpen
	}
</script>

<!-- Mobile Collapsible TOC -->
<div class="md:hidden">
	<button
		onclick={toggleTOC}
		class="mb-6 flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
	>
		<span>Table of Contents</span>
		<IconChevronRight
			class="size-4 transition-transform duration-200"
			style={`transform: rotate(${isOpen ? 90 : 0}deg)`}		
		/>
	</button>

	{#if isOpen && headings.length > 0}
		<nav class="mb-8 rounded-lg border border-border bg-muted/30 p-4">
			<ul class="space-y-2">
				{#each headings as heading (heading.id)}
					<li style="margin-left: {(heading.level - 2) * 16}px">
						<button
							onclick={() => handleNavigation(heading.id)}
							class="text-left text-sm transition-colors"
							class:font-semibold={activeId === heading.id}
							class:text-primary={activeId === heading.id}
							class:text-muted-foreground={activeId !== heading.id}
						>
							{heading.text}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</div>

<!-- Desktop Sticky TOC -->
<div class="hidden md:block">
	<aside class="sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto">
		<div class="space-y-1 text-sm">
			<h3 class="mb-4 font-semibold text-foreground">On this page</h3>
			<nav>
				<ul class="space-y-1">
					{#each headings as heading (heading.id)}
						<li style="margin-left: {(heading.level - 2) * 12}px">
							<button
								onclick={() => handleNavigation(heading.id)}
								class="block w-full truncate px-2 py-1.5 text-left transition-colors"
								class:font-semibold={activeId === heading.id}
								class:text-primary={activeId === heading.id}
								class:text-muted-foreground={activeId !== heading.id}
								class:hover:text-foreground={activeId !== heading.id}
								title={heading.text}
							>
								{heading.text}
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</aside>
</div>

<style>
	aside::-webkit-scrollbar {
		width: 6px;
	}

	aside::-webkit-scrollbar-track {
		background: transparent;
	}

	aside::-webkit-scrollbar-thumb {
		background: hsl(var(--muted-foreground) / 0.5);
		border-radius: 3px;
	}

	aside::-webkit-scrollbar-thumb:hover {
		background: hsl(var(--foreground));
	}
</style>
