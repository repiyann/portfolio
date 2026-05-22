<script lang="ts">
	import { IconArrowRight } from '@tabler/icons-svelte'
	import { Button } from '../ui/button'
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
	import { Badge } from '../ui/badge'
	import { resolve } from '$app/paths'

	interface BlogPost {
		title: string
		description: string
		tags: string[]
		datePublished: string
		link: '/'
	}

	const blogs: BlogPost[] = []
</script>

<section class="py-5">
	<div class="space-y-8">
		<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<h2 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Blog</h2>
				<p class="mt-2 text-muted-foreground">
					Thoughts on web development, architecture, and technology.
				</p>
			</div>
			<Button href="/blogs" variant="outline" class="w-fit gap-2 text-foreground">
				View All <IconArrowRight class="size-4" />
			</Button>
		</div>

		<div class="space-y-4">
			{#each blogs as blog (blog.title)}
				<a href={resolve(blog.link)} class="group block">
					<Card
						class="transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg"
					>
						<CardHeader>
							<div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
								<div class="flex-1">
									<CardTitle class="text-lg transition-colors group-hover:text-primary">
										{blog.title}
									</CardTitle>
									<CardDescription class="mt-1 line-clamp-2">
										{blog.description}
									</CardDescription>
								</div>
								<p class="text-xs whitespace-nowrap text-muted-foreground sm:text-right">
									{blog.datePublished}
								</p>
							</div>
						</CardHeader>

						<CardContent>
							<div class="flex flex-wrap gap-2">
								{#each blog.tags as tag (tag)}
									<Badge variant="secondary" class="text-xs">
										{tag}
									</Badge>
								{/each}
							</div>
						</CardContent>
					</Card>
				</a>
			{/each}
		</div>
	</div>
</section>
