<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            // Check if columns don't exist before adding them
            if (!Schema::hasColumn('order_items', 'is_custom')) {
                $table->boolean('is_custom')->default(false)->after('product_image');
            }
            if (!Schema::hasColumn('order_items', 'custom_color')) {
                $table->string('custom_color')->nullable()->after('is_custom');
            }
            if (!Schema::hasColumn('order_items', 'custom_design_path')) {
                $table->string('custom_design_path')->nullable()->after('custom_color');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            if (Schema::hasColumn('order_items', 'is_custom')) {
                $table->dropColumn('is_custom');
            }
            if (Schema::hasColumn('order_items', 'custom_color')) {
                $table->dropColumn('custom_color');
            }
            if (Schema::hasColumn('order_items', 'custom_design_path')) {
                $table->dropColumn('custom_design_path');
            }
        });
    }
};
