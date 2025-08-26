# 🔄 Automated Versioning System

This project now includes an automated versioning system that keeps track of releases and automatically updates version numbers across all relevant files.

## 🚀 How It Works

### **Automatic Version Updates**
- **Version numbers** are automatically incremented for each release
- **Timestamps** are automatically generated with each release
- **All files** are updated simultaneously to maintain consistency

### **Files Updated Automatically**
1. **`package.json`** - Main version number
2. **`components/timer/TimerPage.tsx`** - Timer version display
3. **`public/sw.js`** - Service worker version comment
4. **`VERSION.json`** - Version metadata file
5. **`README.md`** - Version section

## 📋 Current Version

**Version:** `1.1.2`  
**Released:** `2025-08-26 10:07:45`

## 🛠️ Available Commands

### **Update Version Only**
```bash
npm run version:update
```
- Increments patch version (e.g., 1.1.1 → 1.1.2)
- Updates all version-related files
- Generates new timestamp
- **Does NOT** build, commit, or push

### **Full Release Process**
```bash
npm run release
```
- ✅ Updates version automatically
- ✅ Builds the project
- ✅ Commits all changes with version
- ✅ Pushes to remote repository
- ✅ Complete automated release

## 📱 Version Display

The timer now shows a version pill under the control buttons:

```
[Start] [Pause] [Reset]
    v1.1.2 • 2025-08-26 10:07:45
```

This helps you identify exactly which version you're testing.

## 🔄 Version Numbering

- **Major.Minor.Patch** format (e.g., 1.1.2)
- **Patch version** increments automatically with each release
- **Major/Minor versions** can be manually updated in package.json if needed

## 📝 Commit Messages

All releases now use consistent commit message format:
```
v1.1.2: 2025-08-26 10:07:45 - Automated release
```

## 🎯 Benefits

1. **Never forget to update versions** - Automatic increment
2. **Always know what you're testing** - Version pill visible
3. **Consistent release process** - One command does everything
4. **Track release history** - Timestamps for every release
5. **Professional versioning** - Standard semantic versioning

## 🚀 Next Release

When you're ready for the next release, simply run:
```bash
npm run release
```

The system will:
1. Update version from 1.1.2 → 1.1.3
2. Update timestamp to current date/time
3. Build the project
4. Commit with proper version message
5. Push to repository

## 📁 Files Created

- **`scripts/update-version.cjs`** - Version update script
- **`scripts/release.cjs`** - Automated release script
- **`VERSION.json`** - Version metadata
- **`VERSIONING_SYSTEM.md`** - This documentation

## 🔧 Technical Details

- Uses CommonJS format (`.cjs`) for compatibility
- Reads current version from `package.json`
- Increments patch version automatically
- Updates all files with regex replacements
- Generates ISO timestamps for accuracy
- Integrates with existing npm scripts
