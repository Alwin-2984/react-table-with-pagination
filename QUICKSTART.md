# Quick Start Guide

Get your npm package up and running in 5 minutes!

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Package

```bash
npm run build
```

This creates the `dist` folder with your compiled library.

### 3. Update Package Name

Edit `package.json` and change the package name:

```json
{
  "name": "@your-scope/tanstack-table-components"  // ← Change this!
}
```

**Choose one of:**
- Scoped: `@your-username/tanstack-table-components`
- Unscoped: `tanstack-table-components-yourname`

## 📦 Test Locally

Test your package in another project before publishing:

```bash
# In this directory
npm pack

# In your test project
npm install /path/to/tanstack-table-library/your-package-1.0.0.tgz
```

## 🌐 Publish to npm

### First Time

```bash
# Login to npm
npm login

# Publish (for scoped packages)
npm publish --access public

# Publish (for unscoped packages)
npm publish
```

### Updates

```bash
# Update version
npm version patch  # or minor, or major

# Build and publish
npm run build
npm publish --access public
```

## 📝 What's Included

```
tanstack-table-library/
├── src/
│   ├── components/
│   │   ├── TableComponent.tsx    # Main table component
│   │   └── Pagination.tsx        # Pagination component
│   └── index.ts                  # Package entry point
├── dist/                         # Built files (created after npm run build)
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript config
├── vite.config.ts               # Build config
├── README.md                     # Full documentation
├── PUBLISHING.md                 # Detailed publishing guide
└── STYLING.md                    # Styling setup guide
```

## 🎯 Usage Example

After publishing, users can install and use your package:

```bash
npm install @your-scope/tanstack-table-components
```

```tsx
import { TableComponent, Pagination } from '@your-scope/tanstack-table-components';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

function MyTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <TableComponent table={table} />
      <Pagination
        pagination={true}
        totalPages={10}
        currentPage={1}
        handlePageChange={(page) => console.log(page)}
        pageSize={10}
        onPageSizeChange={(size) => console.log(size)}
      />
    </>
  );
}
```

## 🔧 Development

### Watch Mode

```bash
npm run dev
```

Rebuilds automatically when you make changes.

### File Structure

- **Source files**: Edit files in `src/`
- **Build output**: Generated in `dist/` (don't edit these)
- **Package info**: Update `package.json`

## ✅ Checklist Before Publishing

- [ ] Updated package name in `package.json`
- [ ] Added your name/email in `author` field
- [ ] Ran `npm install`
- [ ] Ran `npm run build` successfully
- [ ] Tested the package locally
- [ ] Logged in to npm (`npm login`)
- [ ] Ready to publish!

## 📚 Next Steps

1. **Customize**: Modify components in `src/components/`
2. **Build**: Run `npm run build`
3. **Test**: Use `npm pack` to test locally
4. **Publish**: Run `npm publish --access public`
5. **Share**: Share your package with the world! 🎉

## 🆘 Need Help?

- **Full docs**: See `README.md`
- **Publishing guide**: See `PUBLISHING.md`
- **Styling setup**: See `STYLING.md`
- **npm docs**: https://docs.npmjs.com/

## 🎨 Customization Tips

### Change Colors

Users need Tailwind CSS. They can customize colors in their `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      blue: { /* custom colors */ }
    }
  }
}
```

### Add More Components

1. Create new component in `src/components/`
2. Export it in `src/index.ts`
3. Rebuild with `npm run build`
4. Update version and republish

## 🐛 Common Issues

**"Cannot find module"**: Run `npm install`

**"Permission denied"**: Use `--access public` for scoped packages

**"Package name taken"**: Choose a different name

**Build errors**: Delete `node_modules` and `dist`, then reinstall

## 🎉 You're Ready!

Your npm package is ready to publish. Good luck! 🚀





