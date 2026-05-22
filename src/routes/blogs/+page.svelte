<script lang="ts">
	import AppLayout from '$lib/components/layouts/app-layout.svelte'
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card'
	import { Badge } from '$lib/components/ui/badge'
	import { blogs } from '$lib/data/blogs'
	import { IconArrowRight, IconClock } from '@tabler/icons-svelte'

	const sortedBlogs = [...blogs].sort((a, b) => {
		const dateA = new Date(a.datePublished).getTime()
		const dateB = new Date(b.datePublished).getTime()
		return dateB - dateA
	})

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
</script>

<AppLayout
	title="Blog - r3p.dev"
	description="Read articles about web development, frontend, and technology."
	url="https://r3p.dev/blogs"
	ogImage="https://r3p.dev/og-image.png"
>
	<div class="space-y-12">
		<!-- Header -->
		<div class="space-y-4">
			<h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Blog</h1>
			<p class="max-w-2xl text-muted-foreground">
				Thoughts on web development, architecture, and technology. I share insights from my experience building modern web
				applications.
			</p>
		</div>

		<!-- Articles List -->
		<div class="space-y-4">
			{#each sortedBlogs as post (post.id)}
				<a href="/blogs/{post.slug}" class="group block">
					<Card
						class="transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 hover:shadow-lg"
					>
						<CardHeader>
							<div class="space-y-3">
								<!-- Title -->
								<CardTitle class="text-xl transition-colors group-hover:text-primary sm:text-2xl">
									{post.title}
								</CardTitle>

								<!-- Meta -->
								<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
									<div class="flex items-center gap-3 text-sm text-muted-foreground">
										<time datetime={post.datePublished}>
											{formatDate(post.datePublished)}
										</time>
										<span>·</span>
										<div class="flex items-center gap-1">
											<IconClock class="size-4" />
											{post.readingTime} min read
										</div>
									</div>
									<IconArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
								</div>

								<!-- Description -->
								<CardDescription class="line-clamp-2">
									{post.description}
								</CardDescription>
							</div>
						</CardHeader>

						<!-- Tags -->
						<CardContent>
							<div class="flex flex-wrap gap-2">
								{#each post.tags as tag (tag)}
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

		<!-- Empty State -->
		{#if sortedBlogs.length === 0}
			<div class="rounded-lg border border-border bg-muted p-12 text-center">
				<p class="text-muted-foreground">No blog posts yet. Check back soon!</p>
			</div>
		{/if}
	</div>
</AppLayout>

