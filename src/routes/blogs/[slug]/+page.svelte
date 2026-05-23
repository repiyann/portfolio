<script lang="ts">
	import { page } from '$app/stores'
	import AppLayout from '$lib/components/layouts/app-layout.svelte'
	import { Badge } from '$lib/components/ui/badge'
	import TableOfContents from '$lib/components/molecules/table-of-contents.svelte'
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
		const lines = content.split('\n')
		const result: string[] = []
		let inCodeBlock = false
		let codeContent: string[] = []
		let codeLanguage = ''

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]
			const trimmed = line.trim()

			// Handle code blocks
			if (trimmed.startsWith('```')) {
				if (!inCodeBlock) {
					inCodeBlock = true
					codeLanguage = trimmed.slice(3).trim()
					codeContent = []
				} else {
					inCodeBlock = false
					const code = codeContent.join('\n').trim()
					const escaped = code
						.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
					result.push(
						`<div class="my-6 rounded-lg border border-border bg-muted/50 overflow-hidden">` +
						`<div class="flex items-center justify-between bg-muted px-4 py-2 text-xs text-muted-foreground">` +
						`<span>${codeLanguage || 'code'}</span>` +
						`</div>` +
						`<pre class="overflow-x-auto p-4"><code class="text-sm font-mono text-muted-foreground">${escaped}</code></pre>` +
						`</div>`
					)
				}
				continue
			}

			if (inCodeBlock) {
				codeContent.push(line)
				continue
			}

			// Headings
			if (trimmed.startsWith('# ')) {
				const id = slugify(trimmed.slice(2))
				result.push(
					`<h2 id="${id}" class="mt-12 mb-4 text-2xl font-bold tracking-tight text-foreground scroll-mt-20">${trimmed.slice(2)}</h2>`
				)
				continue
			} else if (trimmed.startsWith('## ')) {
				const id = slugify(trimmed.slice(3))
				result.push(
					`<h3 id="${id}" class="mt-8 mb-3 text-xl font-semibold text-foreground scroll-mt-20">${trimmed.slice(3)}</h3>`
				)
				continue
			} else if (trimmed.startsWith('### ')) {
				const id = slugify(trimmed.slice(4))
				result.push(
					`<h4 id="${id}" class="mt-6 mb-2 text-lg font-semibold text-foreground scroll-mt-20">${trimmed.slice(4)}</h4>`
				)
				continue
			}

			// Blockquotes
			if (trimmed.startsWith('> ')) {
				result.push(
					`<blockquote class="my-6 border-l-4 border-primary bg-primary/5 py-3 pl-4 italic text-muted-foreground">${trimmed.slice(2)}</blockquote>`
				)
				continue
			}

			// Lists - detect start
			if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
				const listItems: string[] = []
				let isOrdered = /^\d+\.\s/.test(trimmed)
				let j = i

				while (j < lines.length) {
					const currentLine = lines[j].trim()
					if (!currentLine) break
					if (!currentLine.startsWith('- ') && !/^\d+\.\s/.test(currentLine)) break

					listItems.push(currentLine.replace(/^[-*]\s+|\d+\.\s+/, ''))
					j++
				}

				result.push(renderList(listItems, isOrdered ? 'ol' : 'ul'))
				i = j - 1
				continue
			}

			// Empty lines
			if (trimmed === '') {
				continue
			}

			// Paragraphs
			result.push(`<p class="mb-4 leading-relaxed text-muted-foreground">${trimmed}</p>`)
		}

		return result.join('')
	}

	function slugify(text: string): string {
		return text
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
	}

	function renderList(items: string[], type: 'ul' | 'ol' = 'ul'): string {
		const tag = type === 'ol' ? 'ol' : 'ul'
		const itemClass = type === 'ol' ? 'list-decimal' : 'list-disc'
		const listMarkup = items
			.map((item) => `<li class="mb-2 text-muted-foreground">${item}</li>`)
			.join('')
		return `<${tag} class="${itemClass} mb-4 ml-6 space-y-2">${listMarkup}</${tag}>`
	}
</script>

<AppLayout
	title="{post.title} - r3p.dev"
	description={post.description}
	url="https://r3p.dev/blogs/{post.slug}"
	ogImage="https://r3p.dev/og-image.png"
>
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
		<!-- Main Content -->
		<article class="space-y-12 lg:col-span-3">
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

		<!-- Table of Contents Sidebar -->
		<aside class="lg:col-span-1">
			<TableOfContents />
		</aside>
	</div>
</AppLayout>
