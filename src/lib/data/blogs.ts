export interface BlogPost {
	id: string
	slug: string
	title: string
	description: string
	content: string
	tags: string[]
	datePublished: string
	readingTime: number
	author?: string
}

export const blogs: BlogPost[] = [
	{
		id: '1',
		slug: 'getting-started-with-svelte',
		title: 'Getting Started with Svelte: A Modern Web Framework',
		description:
			'Learn the basics of Svelte, a revolutionary web framework that compiles away the framework to produce vanilla JavaScript with true reactivity.',
		tags: ['Svelte', 'JavaScript', 'Web Development', 'Tutorial'],
		datePublished: '2025-01-15',
		readingTime: 8,
		author: 'r3p',
		content: `
# Getting Started with Svelte: A Modern Web Framework

Svelte is a radically different approach to building web applications. Unlike traditional frameworks like React or Vue that do much of their work in the browser, Svelte shifts work to the build step—compiling your applications to vanilla JavaScript that directly manipulates the DOM.

## What Makes Svelte Different?

### 1. Compiler-First Approach
Svelte is a compiler, not a runtime. This means:
- Smaller bundle sizes (no framework runtime to ship)
- Better performance (direct DOM manipulation)
- Less overhead in the browser

### 2. True Reactivity
Svelte's reactivity model is closer to native JavaScript than other frameworks:

\`\`\`svelte
<script>
  let count = 0

  function increment() {
    count += 1  // That's it! No setState, no ref.current
  }
</script>

<p>Count: {count}</p>
<button on:click={increment}>
  Increment
</button>
\`\`\`

### 3. Scoped Styles by Default
CSS is scoped to components automatically:

\`\`\`svelte
<style>
  p {
    color: blue;  /* Only applies to <p> in this component */
  }
</style>

<p>This text is blue</p>
\`\`\`

## Core Concepts

### Variables and Reactivity
Variables are reactive by default. When you update a variable, the DOM automatically updates:

\`\`\`svelte
<script>
  let name = 'World'

  function updateName() {
    name = 'Svelte'  // Automatically reactive!
  }
</script>

<h1>Hello {name}</h1>
<button on:click={updateName}>Update Name</button>
\`\`\`

### Reactive Declarations
Use \`$:\` to create reactive declarations that recompute when dependencies change:

\`\`\`svelte
<script>
  let count = 0
  $: doubled = count * 2
  $: if (count > 10) console.log('Count is high!')
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>
\`\`\`

### Props
Pass data to child components using props:

\`\`\`svelte
<!-- Parent.svelte -->
<Child message="Hello from parent" count={42} />

<!-- Child.svelte -->
<script>
  export let message = 'Default message'
  export let count = 0
</script>

<p>{message}</p>
<p>Count: {count}</p>
\`\`\`

## Event Handling

Svelte makes event handling straightforward:

\`\`\`svelte
<script>
  function handleClick(event) {
    console.log('Button clicked!', event)
  }

  function handleInput(event) {
    console.log('Input value:', event.target.value)
  }
</script>

<button on:click={handleClick}>Click me</button>
<input type="text" on:input={handleInput} />
\`\`\`

## Two-Way Data Binding

Use the \`bind:\` directive for two-way binding:

\`\`\`svelte
<script>
  let name = ''
</script>

<!-- Input automatically updates name, and name updates input -->
<input bind:value={name} placeholder="Enter your name" />
<p>Hello {name}!</p>
\`\`\`

## Conditional Rendering

Use \`{#if ...}\` blocks for conditional rendering:

\`\`\`svelte
<script>
  let showMessage = false
</script>

{#if showMessage}
  <p>This message is visible</p>
{:else}
  <p>This message is shown instead</p>
{/if}

<button on:click={() => (showMessage = !showMessage)}>
  Toggle
</button>
\`\`\`

## Loops

Render lists with \`{#each ...}\` blocks:

\`\`\`svelte
<script>
  let items = ['Apple', 'Banana', 'Cherry']
</script>

<ul>
  {#each items as item (item)}
    <li>{item}</li>
  {/each}
</ul>
\`\`\`

## Component Lifecycle

Svelte provides lifecycle hooks for side effects:

\`\`\`svelte
<script>
  import { onMount, onDestroy } from 'svelte'

  onMount(() => {
    console.log('Component mounted')
    return () => console.log('Component will unmount')
  })

  onDestroy(() => {
    console.log('Component destroyed')
  })
</script>
\`\`\`

## Getting Started

### Installation
Create a new Svelte project with SvelteKit:

\`\`\`bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

### Your First Component
Create a file called \`Counter.svelte\`:

\`\`\`svelte
<script>
  let count = 0

  function increment() {
    count += 1
  }
</script>

<div>
  <p>Count: {count}</p>
  <button on:click={increment}>Increment</button>
</div>

<style>
  div {
    text-align: center;
  }
  button {
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    cursor: pointer;
  }
</style>
\`\`\`

## Tips for Success

1. **Embrace the Compiler** - Let Svelte handle the compilation, it's smart
2. **Use Reactive Declarations** - \`$:\` is powerful, use it for derived state
3. **Keep Components Small** - Smaller components are easier to reason about
4. **Learn the Lifecycle** - Understanding onMount and onDestroy prevents bugs
5. **Explore the Ecosystem** - SvelteKit, Svelte UI libraries, and tools

## Conclusion

Svelte offers a refreshing approach to building web applications. Its compiler-first philosophy, true reactivity, and developer experience make it an excellent choice for modern web development. Whether you're building a small project or a large application, Svelte provides the tools and simplicity to build fast, responsive applications.

Start with simple components and gradually explore more advanced features. The Svelte documentation is excellent and the community is welcoming. Happy coding!
		`
	},
	{
		id: '2',
		slug: 'typescript-best-practices',
		title: 'TypeScript Best Practices: Writing Maintainable Code',
		description:
			'Discover essential TypeScript best practices to write more maintainable, type-safe, and scalable applications.',
		tags: ['TypeScript', 'Best Practices', 'Web Development'],
		datePublished: '2025-01-10',
		readingTime: 12,
		author: 'r3p',
		content: `
# TypeScript Best Practices: Writing Maintainable Code

TypeScript is a powerful superset of JavaScript that brings static typing to the language. With great power comes great responsibility—using TypeScript effectively requires following certain best practices. This guide covers essential patterns and practices for writing maintainable TypeScript code.

## Type Strictness

### Enable Strict Mode
Always use the \`strict\` option in \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true
  }
}
\`\`\`

### Use Proper Type Annotations
Always annotate function parameters and return types:

\`\`\`typescript
// Bad
function add(a, b) {
  return a + b
}

// Good
function add(a: number, b: number): number {
  return a + b
}
\`\`\`

## Avoiding \`any\`

The \`any\` type defeats the purpose of TypeScript. Avoid it whenever possible:

\`\`\`typescript
// Bad
function processData(data: any) {
  return data.value
}

// Good
interface DataObject {
  value: string
}

function processData(data: DataObject) {
  return data.value
}
\`\`\`

## Interfaces vs Types

Use interfaces for object shapes and types for unions or complex types:

\`\`\`typescript
// Use interface for objects
interface User {
  id: number
  name: string
  email: string
}

// Use type for unions
type Result<T> = { success: true; data: T } | { success: false; error: string }

// Use type for primitives
type ID = string | number
\`\`\`

## Generics

Generics allow you to write reusable, type-safe code:

\`\`\`typescript
interface Container<T> {
  value: T
  getValue(): T
  setValue(value: T): void
}

function createContainer<T>(initialValue: T): Container<T> {
  return {
    value: initialValue,
    getValue() {
      return this.value
    },
    setValue(value: T) {
      this.value = value
    }
  }
}

const stringContainer = createContainer('hello')
const numberContainer = createContainer(42)
\`\`\`

## Utility Types

TypeScript provides built-in utility types for common patterns:

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

// Partial makes all properties optional
type PartialUser = Partial<User>

// Pick selects specific properties
type UserPreview = Pick<User, 'id' | 'name'>

// Omit removes properties
type UserWithoutId = Omit<User, 'id'>

// Record creates object types
type Config = Record<'dev' | 'prod', string>

// Readonly makes properties immutable
type ReadonlyUser = Readonly<User>
\`\`\`

## Function Best Practices

### Use Function Declarations for Better Type Inference
\`\`\`typescript
// Good - allows better inference
function fetchUser(id: string): Promise<User> {
  return fetch(\`/api/users/\${id}\`).then(r => r.json())
}

// Arrow function - less ideal for complex signatures
const fetchUser = (id: string): Promise<User> => {
  return fetch(\`/api/users/\${id}\`).then(r => r.json())
}
\`\`\`

### Use Union Types for Multiple Return Types
\`\`\`typescript
type Result<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function processData(data: unknown): Result<string> {
  try {
    return { status: 'success', data: String(data) }
  } catch (e) {
    return { status: 'error', error: String(e) }
  }
}
\`\`\`

## Error Handling

### Create Custom Error Types
\`\`\`typescript
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

class NotFoundError extends Error {
  constructor(public resource: string) {
    super(\`\${resource} not found\`)
    this.name = 'NotFoundError'
  }
}

try {
  throw new ValidationError('email', 'Invalid email format')
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(\`Field \${e.field}: \${e.message}\`)
  }
}
\`\`\`

## Module Organization

### Organize Code by Feature
\`\`\`
src/
├── users/
│   ├── types.ts
│   ├── api.ts
│   ├── hooks.ts
│   └── components/
├── posts/
│   ├── types.ts
│   ├── api.ts
│   └── components/
└── common/
    ├── types.ts
    └── utils.ts
\`\`\`

### Use Barrel Exports
\`\`\`typescript
// users/index.ts
export * from './types'
export * from './api'
export * from './hooks'
\`\`\`

## Testing

### Use Type-Safe Tests
\`\`\`typescript
import { test, expect } from 'vitest'

interface User {
  id: number
  name: string
}

test('user creation', () => {
  const user: User = { id: 1, name: 'John' }
  expect(user.name).toBe('John')
})
\`\`\`

## Conclusion

Following these TypeScript best practices will help you write more maintainable, type-safe code. Start with the basics—enabling strict mode and avoiding \`any\`—and gradually incorporate more advanced patterns as you become comfortable with the language.

Remember: TypeScript is a tool to help you catch errors early and document your code's intent. Use it effectively to build better applications.
		`
	},
	{
		id: '3',
		slug: 'tailwind-css-advanced-techniques',
		title: 'Tailwind CSS Advanced Techniques: Beyond Utility Classes',
		description:
			'Master advanced Tailwind CSS techniques to build custom, efficient, and maintainable designs.',
		tags: ['Tailwind CSS', 'CSS', 'Web Design', 'Frontend'],
		datePublished: '2024-12-20',
		readingTime: 10,
		author: 'r3p',
		content: `
# Tailwind CSS Advanced Techniques: Beyond Utility Classes

Tailwind CSS has revolutionized how we approach styling in web development. While most developers are familiar with utility classes, Tailwind offers powerful features for creating more efficient and maintainable designs. This guide explores advanced techniques that will elevate your Tailwind skills.

## Using @apply for Custom Components

Create reusable component styles without writing additional CSS:

\`\`\`css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg;
    @apply hover:bg-blue-600 transition-colors;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
\`\`\`

## Custom Utilities with @layer

Add custom utilities that integrate seamlessly with Tailwind:

\`\`\`css
@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
}
\`\`\`

## Extending Tailwind Configuration

Customize Tailwind to match your design system:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          500: '#0066cc',
          900: '#001a4d',
        }
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    }
  }
}
\`\`\`

## Using CSS Variables with Tailwind

Define theme values as CSS variables for dynamic theming:

\`\`\`css
:root {
  --color-primary: #0066cc;
  --color-secondary: #00cc66;
}

[data-theme='dark'] {
  --color-primary: #3399ff;
  --color-secondary: #33ff99;
}
\`\`\`

## Advanced Responsive Design

### Using Arbitrary Breakpoints
\`\`\`html
<!-- Use arbitrary values for custom breakpoints -->
<div class="[@media(min-width:900px)]:grid-cols-3">
  Three columns at 900px and above
</div>
\`\`\`

### Container Queries
\`\`\`html
<div class="@container">
  <div class="@md:grid-cols-2">
    Two columns when container is medium
  </div>
</div>
\`\`\`

## Performance Optimization

### Content Configuration
Ensure Tailwind scans all your content:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,svelte}',
  ],
  // ...
}
\`\`\`

### Purging Unused Styles
Tailwind automatically removes unused styles in production. Ensure your template paths are correct for best results.

## Advanced State Variants

### Group Hover
Style children based on parent hover state:

\`\`\`html
<div class="group">
  <div class="group-hover:text-blue-500">
    Changes color when parent is hovered
  </div>
</div>
\`\`\`

### Peer Elements
Style based on sibling state:

\`\`\`html
<input type="checkbox" class="peer" />
<label class="peer-checked:text-blue-500">
  Label that changes when checkbox is checked
</label>
\`\`\`

## Creating Theme Systems

### Dark Mode
Enable dark mode in your Tailwind configuration:

\`\`\`javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Define theme colors
      }
    }
  }
}
\`\`\`

Then toggle with a class:

\`\`\`html
<html class="dark">
  <body class="bg-white dark:bg-slate-900">
    Content adapts to dark mode
  </body>
</html>
\`\`\`

## Best Practices Summary

1. **Keep Templates DRY** - Use \`@apply\` for repeated patterns
2. **Organize Globals** - Use \`@layer\` to organize your custom CSS
3. **Extend, Don't Override** - Extend Tailwind config rather than replacing it
4. **Use Design Tokens** - Define colors, spacing, and fonts in config
5. **Mobile First** - Design for mobile, then enhance with responsive utilities
6. **Document Custom Utilities** - Make custom utilities clear to team members

## Conclusion

These advanced Tailwind techniques will help you build more sophisticated, maintainable design systems. Master them and you'll unlock the full potential of Tailwind CSS in your projects.
		`
	}
]

export function getBlog(slug: string): BlogPost | undefined {
	return blogs.find((blog) => blog.slug === slug)
}
