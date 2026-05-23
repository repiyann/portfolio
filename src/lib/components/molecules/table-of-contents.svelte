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

		// Set initial active ID to first heading
		if (headings.length > 0) {
			activeId = headings[0].id
		}

		// Set up intersection observer for scroll tracking
		// Track which headings are visible in viewport
		const visibleHeadings = new Set()
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleHeadings.add(entry.target.id)
					} else {
						visibleHeadings.delete(entry.target.id)
					}
				})

				// Set active to the first visible heading (top-most)
				if (visibleHeadings.size > 0) {
					const visibleArray = Array.from(visibleHeadings)
					const firstVisible = h2s.find((h) => visibleArray.includes(h.id))
					if (firstVisible) {
						activeId = firstVisible.id
					}
				}
			},
			{
				// Trigger when heading enters top 30% of viewport
				rootMargin: '0px 0px -70% 0px',
				threshold: 0
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

<!-- Mobile Sticky TOC -->
<div class="sticky top-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-b border-border">
	<button
		onclick={toggleTOC}
		class="w-full flex items-center justify-between px-4 py-3 font-semibold text-foreground hover:bg-muted/50 transition-colors"
	>
		<span>On this page</span>
		<IconChevronRight
			class="size-4 transition-transform duration-300"
			style={`transform: rotate(${isOpen ? 90 : 0}deg)`}
		/>
	</button>

	{#if isOpen && headings.length > 0}
		<nav class="border-t border-border bg-muted/30 max-h-[60vh] overflow-y-auto">
			<ul class="space-y-0">
				{#each headings as heading (heading.id)}
					<li>
						<button
							onclick={() => handleNavigation(heading.id)}
							class="w-full text-left text-sm transition-colors duration-200 py-2 px-4 hover:bg-muted/50 border-l-2"
							class:border-primary={activeId === heading.id}
							class:border-transparent={activeId !== heading.id}
							class:font-semibold={activeId === heading.id}
							class:text-primary={activeId === heading.id}
							class:text-muted-foreground={activeId !== heading.id}
							style={`padding-left: calc(1rem + ${(heading.level - 2) * 12}px)`}
							title={heading.text}
						>
							{heading.text}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</div>

<!-- Desktop Sticky TOC Sidebar -->
<aside class="hidden md:block sticky top-4">
	<div class="space-y-3 text-sm pr-4">
		<h3 class="font-semibold text-foreground text-xs uppercase tracking-wider">On this page</h3>
		<nav class="flex flex-col max-h-[calc(100vh-80px)] overflow-y-auto">
			<ul class="space-y-1">
				{#each headings as heading (heading.id)}
					<li>
					<button
						onclick={() => handleNavigation(heading.id)}
						class={`w-full text-left text-xs transition-all duration-200 py-1.5 px-2.5 rounded-sm border-l-2 ${
							activeId === heading.id
								? 'border-primary font-semibold text-primary bg-primary/5'
								: 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
						}`}
						style={`padding-left: calc(0.625rem + ${(heading.level - 2) * 10}px)`}
						title={heading.text}
					>
							<div class="truncate">{heading.text}</div>
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</aside>
