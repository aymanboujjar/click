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
            $table->decimal('design_position_x', 5, 2)->nullable();
            $table->decimal('design_position_y', 5, 2)->nullable();
            $table->decimal('design_scale', 5, 2)->nullable();
            $table->integer('design_rotation')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            $table->dropColumn(['design_position_x', 'design_position_y', 'design_scale', 'design_rotation']);
        });
    }
};
