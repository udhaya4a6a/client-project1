#!/usr/bin/env python3
"""
Script to process portrait photo - remove white background and save as PNG
"""

from PIL import Image
import os

def process_photo():
    """Remove white background from portrait image"""
    
    # Paths
    images_folder = os.path.join(os.path.dirname(__file__), 'images')
    input_path = os.path.join(images_folder, 'profile_original.jpg')
    output_path = os.path.join(images_folder, 'profile.png')
    
    if not os.path.exists(input_path):
        print(f"ERROR: {input_path} not found")
        print(f"\nPlease save your portrait photo as 'profile_original.jpg' in {images_folder}")
        return
    
    # Load image
    img = Image.open(input_path).convert('RGBA')
    
    # Get image data
    data = img.getdata()
    
    # Remove white background (make transparent)
    # Threshold for white color detection
    threshold = 240  # Values > 240 are considered white
    
    new_data = []
    for item in data:
        # If pixel is white (R, G, B all > threshold), make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255, 0))  # Transparent
        else:
            new_data.append(item)
    
    # Update image data
    img.putdata(new_data)
    
    # Save as PNG
    img.save(output_path, 'PNG')
    print(f"✓ Photo processed successfully!")
    print(f"✓ Saved to: {output_path}")
    print(f"\nYour portfolio will now display the photo with transparent background.")

if __name__ == '__main__':
    process_photo()
