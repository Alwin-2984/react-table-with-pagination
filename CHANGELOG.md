# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2026-01-12

### Fixed
- **CRITICAL:** Removed `@tailwind base` from CSS - was breaking user's app styles
- CSS no longer includes global reset styles
- Package CSS is now fully scoped to component classes only

### Changed
- CSS size reduced from 14.7KB to 6.2KB
- Package size reduced from 15.9KB to 14.1KB
- All CSS classes now use `tstc-` prefix for better isolation

### Added
- Non-invasive CSS notice in documentation
- Clear warnings about CSS scope in README

## [1.0.5] - 2026-01-12

### Added
- Pre-compiled CSS approach (industry standard)
- Semantic CSS classes with `tstc-` prefix
- Automatic CSS build process
- React.memo() optimization for components
- useMemo() optimization for pagination calculations

### Changed
- **BREAKING:** Replaced Tailwind safelist with pre-compiled CSS
- Components now use semantic classes instead of inline Tailwind
- Simplified setup - just import CSS file
- No Tailwind configuration required in user's project

### Removed
- Tailwind safelist file (no longer needed)
- Complex Tailwind setup instructions
- TAILWIND-SETUP.md guide

## [1.0.4] - 2026-01-12

### Added
- Tailwind safelist for class detection
- TAILWIND-SETUP.md comprehensive guide

### Fixed
- Tailwind classes not working in production builds
- React JSX runtime bundling issue

## [1.0.1] - 2026-01-12

### Added
- React 19 support
- Repository and homepage URLs

### Changed
- Updated devDependencies to React 19

## [1.0.0] - 2026-01-08

### Added
- Initial release
- TableComponent with TanStack Table integration
- Pagination component with page size selector
- Full TypeScript support
- Dark mode support
- Tailwind CSS styling
- Responsive design





