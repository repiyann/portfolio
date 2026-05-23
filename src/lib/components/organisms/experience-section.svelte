<script lang="ts">
	import { IconChevronRight } from '@tabler/icons-svelte'

	interface Experience {
		role: string
		company: string
		duration: string
		contributions: string[]
	}

	const experiences: Experience[] = [
		{
			role: 'Fullstack Developer Intern',
			company: 'PT. Sumapala Integrasi Solusi',
			duration: 'Apr 2025 - Jul 2025',
			contributions: [
				'Implemented role-based access control (RBAC) for internal web applications',
				'Integrated deck.gl to visualize geospatial data for Kabupaten Bandung',
				'Collaborated with frontend and backend teams to develop and maintain application features'
			]
		},
		{
			role: 'Frontend Developer',
			company: 'Freelance',
			duration: 'Jun 2024 - Jul 2024',
			contributions: [
				'Improved and refactored existing frontend interfaces for better usability and responsiveness',
				'Integrated frontend applications with backend REST APIs',
				'Fixed UI inconsistencies and optimized layouts across multiple devices'
			]
		},
		{
			role: 'Fullstack Developer Intern',
			company: 'Infinite Learning Indonesia',
			duration: 'Feb 2024 - Jul 2024',
			contributions: [
				'Developed a florist e-commerce web application during the MSIB internship program',
				'Built responsive frontend components and backend CRUD features',
				'Collaborated with team members using Git and Agile-based workflows'
			]
		}
	]

	let openIndex: number | null = $state(null)

	function toggleAccordion(index: number) {
		openIndex = openIndex === index ? null : index
	}
</script>

<section class="py-5">
	<div>
		<h2 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Experience</h2>
		<p class="mt-4 text-muted-foreground">
			A timeline of my professional journey in software development.
		</p>
	</div>

	<!-- Desktop timeline view (hidden on mobile) -->
	<div class="mt-12 hidden space-y-0 md:block">
		{#each experiences as experience (experience.company)}
			<div class="relative pb-12 pl-8 last:pb-0">
				<div class="absolute top-2 left-0 h-full w-0.5 bg-gray-400"></div>

				<div class="absolute top-2 left-0 size-2 translate-x-[-40%] rounded-full bg-primary"></div>

				<div class="space-y-3">
					<div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
						<h3 class="font-semibold text-foreground">
							{experience.role} <span class="text-muted-foreground">· {experience.company}</span>
						</h3>
						<span class="text-sm text-muted-foreground">
							{experience.duration}
						</span>
					</div>

					<ul class="mt-3 space-y-2">
						{#each experience.contributions as contribution (contribution)}
							<li class="flex items-start gap-2 text-sm text-muted-foreground">
								<span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground"></span>
								{contribution}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>

	<!-- Mobile accordion view (shown only on mobile) -->
	<div class="mt-12 space-y-3 md:hidden">
		{#each experiences as experience, index (experience.company)}
			<div class="overflow-hidden rounded-lg border border-border">
				<button
					onclick={() => toggleAccordion(index)}
					class="flex w-full items-center justify-between bg-transparent px-4 py-3 text-left font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
					type="button"
				>
					<div class="flex flex-col gap-1">
						<span class="font-semibold text-foreground">{experience.role}</span>
						<span class="text-sm text-muted-foreground">{experience.company}</span>
					</div>
					<IconChevronRight
						class="size-4 shrink-0 transition-transform duration-200"
						style="transform: rotate({openIndex === index ? 90 : 0}deg)"
					/>
				</button>

				{#if openIndex === index}
					<div class="space-y-2 border-t border-border px-4 py-3">
						<p class="text-xs text-muted-foreground">{experience.duration}</p>
						<ul class="space-y-2">
							{#each experience.contributions as contribution (contribution)}
								<li class="flex items-start gap-2 text-sm text-muted-foreground">
									<span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground"></span>
									<span>{contribution}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
