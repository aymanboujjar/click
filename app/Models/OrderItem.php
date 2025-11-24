<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
        'product_name',
        'product_image',
        'is_custom',
        'custom_color',
        'custom_design_path',
        'design_position_x',
        'design_position_y',
        'design_scale',
        'design_rotation',
        'design_placement',
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
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'quantity' => 'integer',
            'price' => 'decimal:2',
            'is_custom' => 'boolean',
            'design_position_x' => 'decimal:2',
            'design_position_y' => 'decimal:2',
            'design_scale' => 'decimal:2',
            'design_rotation' => 'integer',
        ];
    }

    /**
     * Get the order that owns the order item.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product that owns the order item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the total price for this order item
     */
    public function getTotalPriceAttribute(): float
    {
        return $this->quantity * $this->price;
    }

    /**
     * Get formatted total price
     */
    public function getFormattedTotalPriceAttribute(): string
    {
        return '$' . number_format($this->total_price, 2);
    }

    /**
     * Get formatted price
     */
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }
}
