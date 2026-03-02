# File Locking Issue Fix

## Problem

On Windows, when uploading and analyzing PDF files, you might encounter this error:

```
Error: EBUSY: resource busy or locked, unlink 'uploads/...'
```

This happens because:

1. Windows locks files that are being read
2. PDF viewers or antivirus software may keep files open
3. The file deletion happens too quickly after reading

## Solution Implemented

### 1. Safe File Deletion Function

Added `safeDeleteFile()` function in `index.js` that:

- Retries deletion up to 3 times
- Waits between retries (100ms, 200ms, 300ms)
- Logs warnings instead of crashing
- Handles EBUSY and EPERM errors gracefully

### 2. Replaced All File Deletions

All `fs.unlinkSync()` calls have been replaced with `safeDeleteFile()`:

- Line ~522: After basic analysis
- Line ~634: After AI analysis success
- Line ~667: After AI analysis fallback
- Line ~681: In error handling

### 3. Manual Cleanup Script

Created `cleanup-uploads.js` for manual cleanup of locked files.

## Usage

### Automatic (Recommended)

The server now handles file locking automatically. No action needed!

### Manual Cleanup

If files accumulate in the uploads folder:

```bash
cd server
node cleanup-uploads.js
```

This will:

- List all files in uploads/
- Show file age
- Attempt to delete each file
- Report which files are still locked

### Tips to Avoid Locked Files

1. **Close PDF Viewers**: Don't open uploaded PDFs in external viewers
2. **Antivirus**: Temporarily exclude the uploads folder from real-time scanning
3. **Restart**: If files remain locked, restart the server

## Technical Details

### Why This Happens on Windows

Windows uses mandatory file locking, meaning:

- Files opened for reading are locked
- Multiple processes can't delete files simultaneously
- Antivirus/indexing services may hold locks

### Why the Fix Works

- **Retry Logic**: Gives time for locks to release
- **Graceful Degradation**: Server continues working even if deletion fails
- **Async Cleanup**: Files can be deleted later without blocking requests

## Monitoring

Check server logs for warnings:

```
Warning: Could not delete file uploads/... after 3 attempts. File may be locked.
```

If you see many warnings, run the cleanup script.

## Alternative Solutions

### Option 1: Scheduled Cleanup

Add to `package.json`:

```json
"scripts": {
  "cleanup": "node cleanup-uploads.js"
}
```

Run periodically:

```bash
npm run cleanup
```

### Option 2: Automatic Cleanup on Startup

The server could clean old files on startup (not implemented to avoid delays).

### Option 3: Move Instead of Delete

Instead of deleting, move files to a temp folder and delete later (more complex).

## Testing

1. Upload a resume
2. Check server logs - should see no errors
3. Check uploads folder - should be empty or have minimal files
4. If files remain, run cleanup script

## Status

✅ **Fixed** - Server no longer crashes on file deletion errors
✅ **Tested** - Handles locked files gracefully
✅ **Documented** - This file explains the issue and solution

## Related Files

- `index.js` - Contains `safeDeleteFile()` function
- `cleanup-uploads.js` - Manual cleanup script
- `uploads/` - Temporary file storage (auto-cleaned)
