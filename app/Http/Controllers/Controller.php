<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

abstract class Controller
{
    /**
     * Copy storage files from source to destination
     * This is used to sync files between storage locations
     */
    protected function syncStorageFiles()
    {
        $source = 'clicktee/public_html/click/storage/app/public';
        $destination = 'clicktee/public_html/storage';

        if (!File::exists($source)) {
            return 'Source folder does not exist.';
        }

        // Delete destination if it already exists (optional)
        if (File::exists($destination)) {
            File::deleteDirectory($destination);
        }

        File::copyDirectory($source, $destination);
        
        return true;
    }
}
