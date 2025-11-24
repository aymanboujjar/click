<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity',
        'session_id',
        'is_custom',
        'custom_color',
        'custom_design_path',
        'custom_price',
        'tshirt_image',
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
            'is_custom' => 'boolean',
            'custom_price' => 'decimal:2',
            'design_position_x' => 'decimal:2',
            'design_position_y' => 'decimal:2',
            'design_scale' => 'decimal:2',
            'design_rotation' => 'integer',
        ];
    }

    /**
     * Get the user that owns the cart item.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the product that owns the cart item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the total price for this cart item
     */
    public function getTotalPriceAttribute(): float
    {
        $price = $this->is_custom ? $this->custom_price : $this->product->price;
        return $this->quantity * $price;
    }

    /**
     * Get formatted total price
     */
    public function getFormattedTotalPriceAttribute(): string
    {
        return '$' . number_format($this->total_price, 2);
    }
}
