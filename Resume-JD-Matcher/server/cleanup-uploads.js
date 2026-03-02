/**
 * Cleanup Script for Uploads Folder
 * 
 * This script safely removes old uploaded files from the uploads folder.
 * Run this if you have locked files that couldn't be deleted automatically.
 * 
 * Usage: node cleanup-uploads.js
 */

const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

console.log('🧹 Starting uploads folder cleanup...\n');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  console.log('✅ Uploads folder doesn\'t exist. Nothing to clean.');
  process.exit(0);
}

// Get all files in uploads directory
const files = fs.readdirSync(uploadsDir);

if (files.length === 0) {
  console.log('✅ Uploads folder is already clean!');
  process.exit(0);
}

console.log(`Found ${files.length} file(s) in uploads folder.\n`);

let deletedCount = 0;
let lockedCount = 0;
let errorCount = 0;

files.forEach((file, index) => {
  const filePath = path.join(uploadsDir, file);
  
  try {
    const stats = fs.statSync(filePath);
    const ageInMinutes = (Date.now() - stats.mtimeMs) / 1000 / 60;
    
    console.log(`[${index + 1}/${files.length}] ${file}`);
    console.log(`  Age: ${Math.round(ageInMinutes)} minutes`);
    
    // Try to delete the file
    try {
      fs.unlinkSync(filePath);
      deletedCount++;
      console.log(`  ✅ Deleted successfully\n`);
    } catch (deleteError) {
      if (deleteError.code === 'EBUSY' || deleteError.code === 'EPERM') {
        lockedCount++;
        console.log(`  ⚠️  File is locked (might be open in another program)\n`);
      } else {
        errorCount++;
        console.log(`  ❌ Error: ${deleteError.message}\n`);
      }
    }
  } catch (statError) {
    errorCount++;
    console.log(`  ❌ Error reading file: ${statError.message}\n`);
  }
});

// Summary
console.log('═══════════════════════════════════════');
console.log('Cleanup Summary:');
console.log(`  Total files: ${files.length}`);
console.log(`  ✅ Deleted: ${deletedCount}`);
console.log(`  ⚠️  Locked: ${lockedCount}`);
console.log(`  ❌ Errors: ${errorCount}`);
console.log('═══════════════════════════════════════\n');

if (lockedCount > 0) {
  console.log('💡 Tip: Close any PDF viewers or programs that might be using the files,');
  console.log('   then run this script again.\n');
}

if (deletedCount > 0) {
  console.log('✨ Cleanup completed successfully!');
} else if (lockedCount > 0) {
  console.log('⚠️  Some files are still locked. Try again later.');
} else {
  console.log('ℹ️  No files were deleted.');
}
