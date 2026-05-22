export interface Work {
	id: string
	slug: string
	title: string
	description: string
	thumbnail: string
	tags: string[]
	datePublished: string
	content: string
	overview: string
	keyFeatures: string[]
	techStack: string[]
	lessonsLearned: string[]
	repositoryUrl?: string
	liveUrl?: string
}

export const works: Work[] = [
	{
		id: '1',
		slug: 'umima-clean-management',
		title: 'Umima.clean Management System',
		description: 'A fullstack web application for shoe laundry service management with comprehensive order and customer tracking.',
		thumbnail: '/projects/umima-clean.png',
		tags: ['AdonisJS', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
		datePublished: '2025',
		overview:
			'Umima.clean Management System is a comprehensive fullstack web application designed to streamline shoe laundry service operations. Built as an undergraduate thesis project, it provides a complete solution for managing orders, tracking service status, and handling customer relationships.',
		keyFeatures: [
			'Order management system with status tracking',
			'Customer database with contact information and service history',
			'Service scheduling and assignment',
			'Payment processing and invoicing',
			'Real-time order status updates',
			'Admin dashboard with analytics'
		],
		techStack: ['AdonisJS', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Vue.js'],
		lessonsLearned: [
			'Building scalable backend systems with AdonisJS framework',
			'Designing relational databases for complex business logic',
			'Implementing real-time features for better user experience',
			'Managing full development cycle from requirements to deployment'
		],
		content: `
# Umima.clean Management System

## Project Overview

Umima.clean Management System is a comprehensive fullstack web application designed to streamline operations for shoe laundry services. Developed as an undergraduate thesis project, this application provides end-to-end solutions for order management, customer relationship management, and service tracking.

## Technical Architecture

### Backend
The backend is built with **AdonisJS**, a Rails-like fullstack framework for TypeScript. It provides:
- RESTful API endpoints for all business operations
- Database migrations and seeds for easy setup
- Authentication and authorization system
- Real-time features using WebSockets

### Database
**PostgreSQL** is used as the primary database, featuring:
- Well-normalized schema for orders, customers, and services
- Indexes on frequently queried columns
- Foreign key constraints for data integrity

### Frontend
The frontend is built with **Vue.js** and styled with **Tailwind CSS**, offering:
- Responsive design for mobile and desktop
- Real-time updates using WebSocket connections
- Intuitive admin dashboard for service management

## Key Features

1. **Order Management** - Create, track, and manage laundry orders with detailed status updates
2. **Customer Management** - Maintain comprehensive customer database with service history
3. **Service Scheduling** - Assign orders to staff and manage service schedules
4. **Invoicing** - Generate and manage payment invoices for completed services
5. **Analytics Dashboard** - View business metrics and performance indicators

## Development Process

Throughout the development process, I learned the importance of:
- Understanding user requirements before implementation
- Creating efficient database schemas for business logic
- Building maintainable and scalable code
- Collaborating effectively with stakeholders

## Challenges and Solutions

One of the main challenges was designing a database schema that could handle complex service workflows while maintaining data integrity. This was solved by carefully planning the relationships between orders, customers, and services, and implementing proper constraints.

Another challenge was ensuring real-time updates across the application. This was addressed by implementing WebSocket connections for instant notifications when order statuses change.
		`,
		repositoryUrl: 'https://github.com',
		liveUrl: 'https://umima-clean.example.com'
	},
	{
		id: '2',
		slug: 'portfolio-website',
		title: 'Personal Portfolio Website',
		description: 'A minimalist and responsive personal portfolio website built with Svelte to showcase projects and development journey.',
		thumbnail: '/projects/portfolio.png',
		tags: ['Svelte', 'TypeScript', 'Tailwind CSS', 'SvelteKit'],
		datePublished: '2025',
		overview:
			'This personal portfolio website serves as a digital showcase of my projects, technical experience, and development journey. Built with Svelte and modern web technologies, it emphasizes clean design, fast performance, and excellent user experience across all devices.',
		keyFeatures: [
			'Responsive design for all screen sizes',
			'Dark mode support with theme switching',
			'Smooth animations and transitions',
			'SEO optimized with metadata',
			'Fast loading times with optimized assets',
			'Accessible components following WCAG guidelines'
		],
		techStack: ['Svelte', 'SvelteKit', 'TypeScript', 'Tailwind CSS', 'Tabler Icons', 'bits-ui'],
		lessonsLearned: [
			'Building modern web applications with Svelte framework',
			'Implementing responsive design with Tailwind CSS',
			'Optimizing performance for production deployments',
			'Creating accessible user interfaces'
		],
		content: `
# Personal Portfolio Website

## Overview

This portfolio website is a personal project designed to showcase my work, skills, and experience in web development. It serves as both a digital resume and a demonstration of my technical capabilities.

## Design Philosophy

The design emphasizes simplicity, clarity, and user experience. Key design principles include:
- **Minimalism** - Clean layouts with purposeful use of whitespace
- **Typography** - Careful selection of fonts for readability
- **Color** - Thoughtful color palette with good contrast
- **Performance** - Optimized images and efficient code

## Technology Stack

Built with a modern tech stack that prioritizes performance and developer experience:

\`\`\`typescript
// SvelteKit provides excellent developer experience
import { browser } from '$app/environment'
import { page } from '$app/stores'

// Tailwind CSS for rapid UI development
const buttonClasses = 'px-4 py-2 rounded-lg bg-primary text-white'
\`\`\`

## Key Features

### Responsive Design
The site is fully responsive and works seamlessly across:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop screens (1024px and up)

### Dark Mode
Implements a dark mode system using CSS variables and local storage to persist user preference across sessions.

### Smooth Animations
Uses motion-svelte and CSS transitions for subtle, performant animations that enhance the user experience without being distracting.

## Performance Optimization

The site is optimized for performance through:
- Image optimization and lazy loading
- Code splitting and lazy route loading
- Efficient CSS with Tailwind CSS
- Minimal JavaScript footprint

## Accessibility

Following WCAG 2.1 guidelines:
- Semantic HTML structure
- Proper heading hierarchy
- Color contrast ratios above 4.5:1
- Keyboard navigation support
- Screen reader friendly content
		`,
		repositoryUrl: 'https://github.com/repiyann/portfolio',
		liveUrl: 'https://r3p.dev'
	},
	{
		id: '3',
		slug: 'fedora-dotfiles',
		title: 'Fedora Development Dotfiles',
		description: 'Personal dotfiles repository with terminal, shell, and development environment configurations for Fedora-based systems.',
		thumbnail: '/projects/dotfiles.png',
		tags: ['Bash', 'Linux', 'Fedora', 'Zsh'],
		datePublished: '2024',
		overview:
			'A comprehensive dotfiles repository containing carefully curated configurations for terminal, shell, development tools, and system settings. Includes an automated installation script to quickly bootstrap a complete development environment on Fedora-based systems.',
		keyFeatures: [
			'Automated installation script with error handling',
			'Shell configuration with aliases and functions',
			'Git configuration and hooks',
			'Terminal emulator settings',
			'Development tool configurations (vim, neovim, etc.)',
			'System preferences and environment variables'
		],
		techStack: ['Bash', 'Zsh', 'Git', 'Linux', 'Fedora', 'Vim/Neovim'],
		lessonsLearned: [
			'Shell scripting best practices and error handling',
			'Understanding Linux file systems and permissions',
			'Creating maintainable configuration files',
			'Automating repetitive setup tasks'
		],
		content: `
# Fedora Development Dotfiles

## What are Dotfiles?

Dotfiles are configuration files (typically starting with a dot) that customize the behavior of applications and the Linux environment. This repository contains my personal collection of dotfiles and an automated setup script.

## Repository Structure

\`\`\`
dotfiles/
├── .bashrc           # Bash shell configuration
├── .zshrc            # Zsh shell configuration
├── .gitconfig        # Git global configuration
├── .vimrc            # Vim configuration
├── nvim/             # Neovim configuration directory
├── install.sh        # Automated installation script
└── README.md         # Documentation
\`\`\`

## Installation

The \`install.sh\` script automates the entire setup process:

\`\`\`bash
# Clone the repository
git clone https://github.com/username/dotfiles.git ~/.dotfiles

# Run the installation script
cd ~/.dotfiles
bash install.sh
\`\`\`

## Key Configurations

### Shell Aliases
Custom aliases for frequently used commands:

\`\`\`bash
alias ll='ls -lah'
alias git-log='git log --oneline --graph --all'
alias dev='cd ~/Projects && ls'
\`\`\`

### Terminal Prompt
Custom prompt that displays:
- Current directory
- Git branch (if in a git repository)
- Exit status of the last command
- Time

### Development Tools
Pre-configured settings for:
- Git with GPG signing enabled
- Vim with custom keymaps and plugins
- Neovim with LSP configuration
- Zsh with plugins and themes

## Benefits

Using this dotfiles repository provides:
- **Consistency** - Same configuration across multiple machines
- **Productivity** - Custom aliases and shortcuts speed up development
- **Automation** - Easy setup of new machines with one script
- **Version Control** - Track configuration changes over time

## Lessons Learned

Through creating and maintaining these dotfiles, I've learned:
- How to write robust shell scripts that handle edge cases
- The importance of version control for configuration
- Best practices for organizing development tools
- How to create automated setup scripts

## Future Improvements

Planned enhancements include:
- Support for additional Linux distributions
- Container-based environment provisioning
- Ansible playbooks for configuration management
		`
	}
]

export function getWork(slug: string): Work | undefined {
	return works.find((work) => work.slug === slug)
}
