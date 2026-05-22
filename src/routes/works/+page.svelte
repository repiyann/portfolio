<script lang="ts">
	import AppLayout from '$lib/components/layouts/app-layout.svelte'
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card'
	import { Badge } from '$lib/components/ui/badge'
	import { works } from '$lib/data/works'
	import { IconArrowRight } from '@tabler/icons-svelte'

	const sortedWorks = [...works].sort((a, b) => {
		const dateA = new Date(a.datePublished).getTime()
		const dateB = new Date(b.datePublished).getTime()
		return dateB - dateA
	})
</script>

<AppLayout
	title="Works - r3p.dev"
	description="Explore all my projects, technical works, and development experience."
	url="https://r3p.dev/works"
	ogImage="https://r3p.dev/og-image.png"
>
	<div class="space-y-12">
		<!-- Header -->
		<div class="space-y-4">
			<h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Works</h1>
			<p class="max-w-2xl text-muted-foreground">
				A collection of projects I&apos;ve built, showcasing my technical skills and development journey. Each project
				represents a unique learning experience and contribution to the web development ecosystem.
			</p>
		</div>

		<!-- Works Grid -->
		<div class="grid gap-6 md:grid-cols-2">
			{#each sortedWorks as work (work.id)}
				<a href="/works/{work.slug}" class="group">
					<Card
						class="h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
					>
						<!-- Thumbnail -->
						<div class="relative h-40 w-full overflow-hidden bg-muted">
							<img
								src={work.thumbnail}
								alt={work.title}
								width={600}
								height={400}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>

						<!-- Card Content -->
						<CardHeader>
							<CardTitle class="text-lg transition-colors group-hover:text-primary">
								{work.title}
							</CardTitle>
							<CardDescription class="line-clamp-2">
								{work.description}
							</CardDescription>
						</CardHeader>

						<CardContent class="space-y-4">
							<!-- Tags -->
							<div class="flex flex-wrap gap-2">
								{#each work.tags as tag (tag)}
									<Badge variant="secondary" class="text-xs">
										{tag}
									</Badge>
								{/each}
							</div>

							<!-- Date and Arrow -->
							<div class="flex items-center justify-between pt-2">
								<p class="text-xs text-muted-foreground">
									{work.datePublished}
								</p>
								<IconArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
							</div>
						</CardContent>
					</Card>
				</a>
			{/each}
		</div>
	</div>
</AppLayout>
