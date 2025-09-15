# @company/ui

A modern, reusable React component library built with TypeScript, Storybook, and CSS Modules.

## 🚀 Features

- **TypeScript** - Full type safety and excellent developer experience
- **Storybook** - Interactive component documentation and testing
- **CSS Modules** - Scoped styling with no conflicts
- **Vitest + React Testing Library** - Comprehensive testing setup
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Pre-commit hooks for code quality
- **tsup** - Fast bundling with ESM and CJS support
- **Responsive Design** - Mobile-first approach with responsive components

## 📦 Components

- **Button** - Primary, secondary variants with small, medium, large sizes
- **Input** - Form inputs with validation states and labels
- **Modal** - Accessible modal dialogs with overlay and escape key support
- **Card** - Flexible card components with multiple variants
- **Navbar** - Responsive navigation with mobile menu support

## 🛠️ Installation

```bash
# Install dependencies
yarn install

# Or with npm
npm install
```

## 🏗️ Development

### Start Storybook

```bash
yarn storybook
```

This will start Storybook on `http://localhost:6006` where you can view and interact with all components.

### Run Tests

```bash
# Run tests once
yarn test

# Run tests in watch mode
yarn test:ui
```

### Lint and Format

```bash
# Lint and fix issues
yarn lint

# Check linting without fixing
yarn lint:check

# Format code
yarn format

# Check formatting without fixing
yarn format:check
```

### Build

```bash
yarn build
```

This will create a `dist` folder with:
- `index.js` - CommonJS build
- `index.mjs` - ES Module build
- `index.d.ts` - TypeScript declarations
- `styles.css` - Compiled CSS

## 📚 Usage

### Basic Import

```tsx
import { Button, Input, Modal, Card, Navbar } from '@company/ui';
import '@company/ui/styles'; // Import styles
```

### Button Example

```tsx
import { Button } from '@company/ui';

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        Click me
      </Button>
      <Button variant="secondary" size="lg" disabled>
        Disabled
      </Button>
    </div>
  );
}
```

### Input Example

```tsx
import { Input } from '@company/ui';

function Form() {
  const [value, setValue] = useState('');

  return (
    <Input
      label="Email Address"
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your email"
      required
    />
  );
}
```

### Modal Example

```tsx
import { Modal, Button } from '@company/ui';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
      >
        <p>Are you sure you want to proceed?</p>
        <Button onClick={() => setIsOpen(false)}>Confirm</Button>
      </Modal>
    </>
  );
}
```

### Card Example

```tsx
import { Card, Button } from '@company/ui';

function ProductCard() {
  return (
    <Card
      title="Product Name"
      subtitle="Premium Quality"
      variant="elevated"
      hoverable
    >
      <p>Product description goes here.</p>
      <Button size="sm">Add to Cart</Button>
    </Card>
  );
}
```

### Navbar Example

```tsx
import { Navbar, NavbarBrand, NavbarItem, Button } from '@company/ui';

function App() {
  return (
    <Navbar
      brand={<NavbarBrand>MyApp</NavbarBrand>}
      variant="default"
      size="md"
    >
      <NavbarItem href="#home">Home</NavbarItem>
      <NavbarItem href="#about">About</NavbarItem>
      <NavbarItem href="#contact">Contact</NavbarItem>
      <Button size="sm">Login</Button>
    </Navbar>
  );
}
```

## 🎨 Styling

All components use CSS Modules for scoped styling. You can customize the appearance by:

1. **CSS Custom Properties** - Override CSS variables for theming
2. **CSS Modules** - Import and extend component styles
3. **className prop** - Add custom classes to components

### Theming Example

```css
/* Override CSS variables */
:root {
  --primary-color: #your-brand-color;
  --border-radius: 8px;
}
```

## 🧪 Testing

The library includes comprehensive tests using Vitest and React Testing Library:

- **Unit Tests** - Individual component testing
- **Integration Tests** - Component interaction testing
- **Accessibility Tests** - ARIA and keyboard navigation testing

## 📦 Publishing

### Build for Production

```bash
yarn build
```

### Publish to npm

```bash
# Login to npm
npm login

# Publish the package
npm publish
```

### Package Structure

```
dist/
├── index.js          # CommonJS build
├── index.mjs         # ES Module build
├── index.d.ts        # TypeScript declarations
└── styles.css        # Compiled CSS
```

## 🔧 Configuration

### TypeScript

The project uses strict TypeScript configuration with:
- Strict type checking
- Path mapping support
- Declaration file generation

### ESLint

Configured with:
- TypeScript support
- React hooks rules
- Accessibility rules
- Prettier integration

### Prettier

Code formatting with:
- Single quotes
- Semicolons
- 2-space indentation
- Trailing commas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Make your changes
4. Run tests: `yarn test`
5. Run linting: `yarn lint`
6. Commit your changes: `git commit -m 'Add new component'`
7. Push to the branch: `git push origin feature/new-component`
8. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For questions and support:
- Create an issue on GitHub
- Check the Storybook documentation
- Review the test files for usage examples

## 🗺️ Roadmap

- [ ] Add more components (Table, Dropdown, Toast, etc.)
- [ ] Dark mode support
- [ ] Animation library integration
- [ ] Accessibility improvements
- [ ] Performance optimizations
- [ ] Bundle size analysis
