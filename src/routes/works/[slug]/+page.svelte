<script lang="ts">
	import { page } from '$app/stores'
	import AppLayout from '$lib/components/layouts/app-layout.svelte'
	import { Badge } from '$lib/components/ui/badge'
	import { Button } from '$lib/components/ui/button'
	import { getWork } from '$lib/data/works'
	import { IconArrowLeft, IconBrandGithub, IconWorldWww } from '@tabler/icons-svelte'

	const slug = $page.params.slug
	const work = getWork(slug)

	if (!work) {
		throw new Error('Work not found')
	}
</script>

<AppLayout
	title="{work.title} - r3p.dev"
	description={work.description}
	url="https://r3p.dev/works/{work.slug}"
	ogImage="https://r3p.dev/og-image.png"
>
	<div class="space-y-8">
		<!-- Back Button -->
		<a href="/works" class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
			<IconArrowLeft class="size-4" />
			Back to Works
		</a>

		<!-- Hero Section -->
		<div class="space-y-6">
			<!-- Thumbnail -->
			<div class="relative h-64 w-full overflow-hidden rounded-xl bg-muted sm:h-80">
				<img
					src={work.thumbnail}
					alt={work.title}
					width={1200}
					height={600}
					class="h-full w-full object-cover"
				/>
			</div>

			<!-- Title and Meta -->
			<div class="space-y-4">
				<div class="space-y-2">
					<h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						{work.title}
					</h1>
					<p class="text-lg text-muted-foreground">
						{work.description}
					</p>
				</div>

				<!-- Tags -->
				<div class="flex flex-wrap gap-2 pt-2">
					{#each work.tags as tag (tag)}
						<Badge variant="secondary">
							{tag}
						</Badge>
					{/each}
				</div>

				<!-- Metadata -->
				<div class="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
					<div class="text-sm text-muted-foreground">
						Published in {work.datePublished}
					</div>
					<div class="flex gap-2">
						{#if work.repositoryUrl}
							<Button href={work.repositoryUrl} variant="outline" class="gap-2">
								<IconBrandGithub class="size-4" />
								Repository
							</Button>
						{/if}
						{#if work.liveUrl}
							<Button href={work.liveUrl} class="gap-2">
								<IconWorldWww class="size-4" />
								Live Demo
							</Button>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="space-y-12 border-t border-border pt-8">
			<!-- Overview Section -->
			<div class="space-y-4">
				<h2 class="text-2xl font-bold text-foreground">Overview</h2>
				<p class="leading-relaxed text-muted-foreground">
					{work.overview}
				</p>
			</div>

			<!-- Key Features -->
			{#if work.keyFeatures.length > 0}
				<div class="space-y-4">
					<h2 class="text-2xl font-bold text-foreground">Key Features</h2>
					<ul class="grid gap-3 md:grid-cols-2">
						{#each work.keyFeatures as feature (feature)}
							<li class="flex items-start gap-3">
								<div class="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"></div>
								<span class="text-muted-foreground">
									{feature}
								</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Tech Stack -->
			{#if work.techStack.length > 0}
				<div class="space-y-4">
					<h2 class="text-2xl font-bold text-foreground">Tech Stack</h2>
					<div class="flex flex-wrap gap-2">
						{#each work.techStack as tech (tech)}
							<Badge variant="secondary">
								{tech}
							</Badge>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Lessons Learned -->
			{#if work.lessonsLearned.length > 0}
				<div class="space-y-4">
					<h2 class="text-2xl font-bold text-foreground">Lessons Learned</h2>
					<ul class="space-y-3">
						{#each work.lessonsLearned as lesson (lesson)}
							<li class="flex items-start gap-3">
								<div class="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"></div>
								<span class="text-muted-foreground">
									{lesson}
								</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Detailed Content -->
			<div class="prose prose-invert max-w-none space-y-4 text-muted-foreground">
				<!-- Content is rendered as plain text for now, but could be parsed as markdown -->
				{@html work.content.split('\n').map(line => {
					if (line.startsWith('# ')) {
						return `<h2 class="text-2xl font-bold text-foreground">${line.slice(2)}</h2>`
					} else if (line.startsWith('## ')) {
						return `<h3 class="text-xl font-bold text-foreground">${line.slice(3)}</h3>`
					} else if (line.startsWith('### ')) {
						return `<h4 class="text-lg font-semibold text-foreground">${line.slice(4)}</h4>`
					} else if (line.startsWith('- ')) {
						return `<li class="flex items-start gap-2"><span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary"></span><span>${line.slice(2)}</span></li>`
					} else if (line.startsWith('\`\`\`')) {
						return ''
					} else if (line.trim() === '') {
						return '<div class="h-2"></div>'
					} else {
						return `<p>${line}</p>`
					}
				}).join('')}
			</div>
		</div>

		<!-- Navigation -->
		<div class="border-t border-border pt-8">
			<a href="/works" class="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80">
				← Back to all works
			</a>
		</div>
	</div>
</AppLayout>
