<script lang="ts">
	import { page } from '$app/stores'
	import AppLayout from '$lib/components/layouts/app-layout.svelte'
	import { Badge } from '$lib/components/ui/badge'
	import { getBlog } from '$lib/data/blogs'
	import { IconArrowLeft, IconClock, IconCalendar } from '@tabler/icons-svelte'

	const slug = $page.params.slug
	const post = getBlog(slug)

	if (!post) {
		throw new Error('Blog post not found')
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	function renderContent(content: string): string {
		let html = content

		// Split by lines and process
		const lines = html.split('\n').map((line) => {
			const trimmed = line.trim()

			// Headings
			if (trimmed.startsWith('# ')) {
				return `<h2 class="mt-8 mb-4 text-2xl font-bold tracking-tight text-foreground">${trimmed.slice(2)}</h2>`
			} else if (trimmed.startsWith('## ')) {
				return `<h3 class="mt-6 mb-3 text-xl font-semibold text-foreground">${trimmed.slice(3)}</h3>`
			} else if (trimmed.startsWith('### ')) {
				return `<h4 class="mt-4 mb-2 text-lg font-semibold text-foreground">${trimmed.slice(4)}</h4>`
			}

			// Code blocks
			if (trimmed.startsWith('```')) {
				return '<div class="relative my-4 rounded-lg border border-border bg-muted p-4 overflow-x-auto"><code class="text-sm font-mono text-muted-foreground">'
			}

			// Lists
			if (trimmed.startsWith('- ')) {
				return `<li class="flex items-start gap-2 ml-4 text-muted-foreground"><span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary flex-shrink-0"></span><span>${trimmed.slice(2)}</span></li>`
			}

			// Blockquotes
			if (trimmed.startsWith('> ')) {
				return `<blockquote class="my-4 border-l-4 border-primary pl-4 italic text-muted-foreground">${trimmed.slice(2)}</blockquote>`
			}

			// Empty lines
			if (trimmed === '') {
				return '<div class="h-2"></div>'
			}

			// Paragraphs
			return `<p class="mb-3 leading-relaxed text-muted-foreground">${trimmed}</p>`
		})

		return lines.join('')
	}
</script>

<AppLayout
	title="{post.title} - r3p.dev"
	description={post.description}
	url="https://r3p.dev/blogs/{post.slug}"
	ogImage="https://r3p.dev/og-image.png"
>
	<article class="space-y-12">
		<!-- Back Button -->
		<a
			href="/blogs"
			class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
		>
			<IconArrowLeft class="size-4" />
			Back to Blog
		</a>

		<!-- Header -->
		<header class="space-y-6 border-b border-border pb-8">
			<!-- Title -->
			<div class="space-y-4">
				<h1 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
					{post.title}
				</h1>
				<p class="max-w-2xl text-lg text-muted-foreground">
					{post.description}
				</p>
			</div>

			<!-- Meta Info -->
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
				<div class="flex items-center gap-2 text-sm text-muted-foreground">
					<IconCalendar class="size-4" />
					<time datetime={post.datePublished}>
						{formatDate(post.datePublished)}
					</time>
				</div>

				<div class="flex items-center gap-2 text-sm text-muted-foreground">
					<IconClock class="size-4" />
					<span>{post.readingTime} minute read</span>
				</div>

				{#if post.author}
					<div class="text-sm text-muted-foreground">By {post.author}</div>
				{/if}
			</div>

			<!-- Tags -->
			<div class="flex flex-wrap gap-2 pt-2">
				{#each post.tags as tag (tag)}
					<Badge variant="secondary">{tag}</Badge>
				{/each}
			</div>
		</header>

		<!-- Content -->
		<div class="prose prose-invert max-w-none space-y-4">
			<div class="leading-relaxed">
				{@html renderContent(post.content)}
			</div>
		</div>

		<!-- Footer -->
		<footer class="border-t border-border pt-8">
			<a
				href="/blogs"
				class="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
			>
				← Back to all articles
			</a>
		</footer>
	</article>
</AppLayout>
