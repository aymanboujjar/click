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
            // Front design fields
            $table->string('front_design_path')->nullable();
            $table->decimal('front_design_position_x', 5, 2)->nullable()->default(50.00);
            $table->decimal('front_design_position_y', 5, 2)->nullable()->default(50.00);
            $table->decimal('front_design_scale', 5, 2)->nullable()->default(50.00);
            $table->integer('front_design_rotation')->nullable()->default(0);
            
            // Back design fields
            $table->string('back_design_path')->nullable();
            $table->decimal('back_design_position_x', 5, 2)->nullable()->default(50.00);
            $table->decimal('back_design_position_y', 5, 2)->nullable()->default(50.00);
            $table->decimal('back_design_scale', 5, 2)->nullable()->default(50.00);
            $table->integer('back_design_rotation')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropColumn([
                'front_design_path',
                'front_design_position_x',
                'front_design_position_y',
                'front_design_scale',
                'front_design_rotation',
                'back_design_path',
                'back_design_position_x',
                'back_design_position_y',
                'back_design_scale',
                'back_design_rotation',
            ]);
        });
    }
};
