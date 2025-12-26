<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\CartItem;
use App\Models\Product;

class DesignController extends Controller
{
    /**
     * Show the t-shirt design page.
     */
    public function tshirt()
    {
        return Inertia::render('Design/TShirt');
    }

    /**
     * Add custom t-shirt to cart
     */
    public function addToCart(Request $request)
    {
        $request->validate([
            'color' => 'required|in:white,black',
            'front_design' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'back_design' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            'quantity' => 'integer|min:1|max:10',
            'front_position_x' => 'nullable|numeric|min:0|max:100',
            'front_position_y' => 'nullable|numeric|min:0|max:100',
            'front_scale' => 'nullable|numeric|min:0|max:100',
            'front_rotation' => 'nullable|integer|min:-180|max:180',
            'back_position_x' => 'nullable|numeric|min:0|max:100',
            'back_position_y' => 'nullable|numeric|min:0|max:100',
            'back_scale' => 'nullable|numeric|min:0|max:100',
            'back_rotation' => 'nullable|integer|min:-180|max:180',
        ]);

        // At least one design must be provided
        if (!$request->hasFile('front_design') && !$request->hasFile('back_design')) {
            return redirect()->back()
                ->with('error', 'Please upload at least one design (front or back).');
        }

        $quantity = $request->input('quantity', 1);
        $color = $request->input('color');
        $customPrice = 299.00; // Fixed price for custom t-shirts

        // Store front design
        $frontDesignPath = null;
        if ($request->hasFile('front_design')) {
            $frontDesignPath = $request->file('front_design')->store('custom-designs', 'public');
        }

        // Store back design
        $backDesignPath = null;
        if ($request->hasFile('back_design')) {
            $backDesignPath = $request->file('back_design')->store('custom-designs', 'public');
        }

        // Sync storage files after image upload(s)
        if ($frontDesignPath || $backDesignPath) {
            $this->syncStorageFiles();
        }

        // Find or create a base t-shirt product (we'll use this as reference)
        $baseProduct = Product::where('name', 'Custom T-Shirt')->first();
        if (!$baseProduct) {
            // Create a base custom t-shirt product if none exists
            $baseProduct = Product::create([
                'name' => 'Custom T-Shirt',
                'description' => 'Custom designed t-shirt - unlimited stock',
                'price' => $customPrice,
                'stock' => 999999, // Very high stock for custom items (essentially unlimited)
                'category_id' => 1, // Assuming category 1 exists
                'slug' => 'custom-t-shirt',
                'image' => 'white.jpg' // Default image
            ]);
        }

        // Set the t-shirt base image based on color
        $tshirtImage = $color === 'black' ? 'black.jpg' : 'white.jpg';

        $cartData = [
            'user_id' => Auth::id(),
            'product_id' => $baseProduct->id,
            'quantity' => $quantity,
            'is_custom' => true,
            'custom_color' => $color,
            'custom_price' => $customPrice,
            'tshirt_image' => $tshirtImage,
        ];

        // Add front design data if provided
        if ($frontDesignPath) {
            $cartData['front_design_path'] = $frontDesignPath;
            $cartData['front_design_position_x'] = $request->input('front_position_x', 50);
            $cartData['front_design_position_y'] = $request->input('front_position_y', 50);
            $cartData['front_design_scale'] = $request->input('front_scale', 50);
            $cartData['front_design_rotation'] = $request->input('front_rotation', 0);
        }

        // Add back design data if provided
        if ($backDesignPath) {
            $cartData['back_design_path'] = $backDesignPath;
            $cartData['back_design_position_x'] = $request->input('back_position_x', 50);
            $cartData['back_design_position_y'] = $request->input('back_position_y', 50);
            $cartData['back_design_scale'] = $request->input('back_scale', 50);
            $cartData['back_design_rotation'] = $request->input('back_rotation', 0);
        }

        if (Auth::check()) {
            // For authenticated users, store in database
            CartItem::create($cartData);
        } else {
            // For guests, store in session
            $cart = session()->get('cart', []);
            $customId = 'custom_' . time() . '_' . rand(1000, 9999);
            unset($cartData['user_id']); // Remove user_id for session storage
            $cart[$customId] = $cartData;
            session()->put('cart', $cart);
        }

        return redirect()->back()
            ->with('success', 'Custom t-shirt added to cart successfully!');
    }
}
