<script lang="ts">
	import { IconArrowRight } from '@tabler/icons-svelte'
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
	import { Badge } from '../ui/badge'
	import { resolve } from '$app/paths'
	import { Button } from '../ui/button'

	interface Project {
		title: string
		description: string
		thumbnail: string
		tags: string[]
		datePublished: string
		link: '/'
	}

	const projects: Project[] = [
		{
			title: 'Umima.clean Management System',
			description:
				'A fullstack web application developed for an undergraduate thesis project focused on shoe laundry service management. Built using AdonisJS with features for order management, customer data handling, and service tracking.',
			thumbnail: '/projects/umima-clean.png',
			tags: ['AdonisJS', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
			datePublished: '2025',
			link: '/'
		},
		{
			title: 'Personal Portfolio Website',
			description:
				'A minimalist and responsive personal portfolio website built with Svelte to showcase projects, technical experience, and development journey.',
			thumbnail: '/projects/portfolio.png',
			tags: ['Svelte', 'TypeScript', 'Tailwind CSS'],
			datePublished: '2025',
			link: '/'
		},
		{
			title: 'Fedora Development Dotfiles',
			description:
				'A personal dotfiles repository containing terminal, shell, and development environment configurations with an automated install.sh setup script for Fedora-based systems.',
			thumbnail: '/projects/dotfiles.png',
			tags: ['Bash', 'Linux', 'Fedora'],
			datePublished: '2024',
			link: '/'
		}
	]
</script>

<section class="py-5">
	<div class="space-y-8">
		<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<h2 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Projects</h2>
				<p class="mt-2 text-muted-foreground">Featured projects and work I&apos;m proud of.</p>
			</div>
			<Button href="/works" variant="outline" class="w-fit gap-2 text-foreground">
				View All <IconArrowRight class="size-4" />
			</Button>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			{#each projects as project (project.title)}
				<a href={resolve(project.link)} class="group">
					<Card
						class="h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
					>
						<div class="relative h-40 w-full overflow-hidden bg-muted">
							<img
								src={project.thumbnail}
								alt={project.title}
								width={600}
								height={400}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							/>
						</div>

						<CardHeader>
							<CardTitle class="text-lg transition-colors group-hover:text-primary">
								{project.title}
							</CardTitle>
							<CardDescription class="line-clamp-2">
								{project.description}
							</CardDescription>
						</CardHeader>

						<CardContent class="space-y-4">
							<div class="flex flex-wrap gap-2">
								{#each project.tags as tag (tag)}
									<Badge variant="secondary" class="text-xs">
										{tag}
									</Badge>
								{/each}
							</div>

							<p class="text-xs text-muted-foreground">
								{project.datePublished}
							</p>
						</CardContent>
					</Card>
				</a>
			{/each}
		</div>
	</div>
</section>
