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
        Schema::table('cart_items', function (Blueprint $table) {
            $table->decimal('design_position_x', 5, 2)->nullable()->default(50.00);
            $table->decimal('design_position_y', 5, 2)->nullable()->default(50.00);
            $table->decimal('design_scale', 5, 2)->nullable()->default(50.00);
            $table->integer('design_rotation')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropColumn(['design_position_x', 'design_position_y', 'design_scale', 'design_rotation']);
        });
    }
};
