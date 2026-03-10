#!/usr/bin/env python3
"""
Script para generar imágenes PWA desde logo.png
Mantiene el fondo transparente y genera todos los tamaños necesarios
"""

import os
from PIL import Image, ImageOps

def create_pwa_icons():
    # Rutas
    input_path = "public/logo.png"
    output_dir = "public/pwa-icons"
    
    # Verificar que existe el archivo de entrada
    if not os.path.exists(input_path):
        print(f"❌ Error: No se encuentra {input_path}")
        return
    
    # Crear directorio de salida
    os.makedirs(output_dir, exist_ok=True)
    
    # Abrir imagen original
    try:
        with Image.open(input_path) as img:
            # Asegurar que tenga modo RGBA (con transparencia)
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            print(f"✅ Imagen original cargada: {img.size} modo {img.mode}")
            
            # Tamaños requeridos para PWA
            sizes = [
                # Iconos para Android/iOS
                (36, "android-icon-36x36.png"),
                (48, "android-icon-48x48.png"),
                (72, "android-icon-72x72.png"),
                (96, "android-icon-96x96.png"),
                (144, "android-icon-144x144.png"),
                (192, "android-icon-192x192.png"),
                
                # Iconos para iOS
                (57, "apple-icon-57x57.png"),
                (60, "apple-icon-60x60.png"),
                (72, "apple-icon-72x72.png"),
                (76, "apple-icon-76x76.png"),
                (114, "apple-icon-114x114.png"),
                (120, "apple-icon-120x120.png"),
                (144, "apple-icon-144x144.png"),
                (152, "apple-icon-152x152.png"),
                (180, "apple-icon-180x180.png"),
                
                # Iconos para favicon
                (16, "favicon-16x16.png"),
                (32, "favicon-32x32.png"),
                
                # Iconos para Windows/Microsoft
                (70, "ms-icon-70x70.png"),
                (144, "ms-icon-144x144.png"),
                (150, "ms-icon-150x150.png"),
                (310, "ms-icon-310x310.png"),
                
                # Iconos grandes para PWA
                (192, "icon-192x192.png"),
                (512, "icon-512x512.png"),
                (1024, "icon-1024x1024.png"),
            ]
            
            generated_count = 0
            
            for size, filename in sizes:
                # Redimensionar manteniendo la calidad y transparencia
                resized_img = img.resize((size, size), Image.Resampling.LANCZOS)
                
                # Guardar imagen
                output_path = os.path.join(output_dir, filename)
                resized_img.save(output_path, "PNG", optimize=True)
                
                print(f"✅ Generado: {filename} ({size}x{size})")
                generated_count += 1
            
            # Generar favicon.ico (múltiples tamaños en un archivo)
            favicon_sizes = [16, 32, 48, 64, 128]
            favicon_images = []
            
            for size in favicon_sizes:
                favicon_img = img.resize((size, size), Image.Resampling.LANCZOS)
                favicon_images.append(favicon_img)
            
            favicon_path = os.path.join(output_dir, "favicon.ico")
            favicon_images[0].save(
                favicon_path,
                format="ICO",
                sizes=[(size, size) for size in favicon_sizes],
                append_images=favicon_images[1:]
            )
            
            print(f"✅ Generado: favicon.ico ({favicon_sizes})")
            generated_count += 1
            
            print(f"\n🎉 ¡Completado! Se generaron {generated_count} imágenes en {output_dir}")
            
            # Actualizar vite.config.ts con las nuevas rutas
            update_vite_config()
            
    except Exception as e:
        print(f"❌ Error procesando la imagen: {e}")

def update_vite_config():
    """Actualiza el vite.config.ts para incluir las nuevas rutas de iconos"""
    config_path = "vite.config.ts"
    
    if not os.path.exists(config_path):
        print("⚠️  No se encontró vite.config.ts para actualizar")
        return
    
    print(f"\n📝 Recomendación: Actualiza {config_path} con las siguientes rutas:")
    print("  includeAssets: ['logo.png', 'pwa-icons/*.png', 'pwa-icons/favicon.ico'],")
    print("\n  icons: [")
    print("    { src: 'pwa-icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },")
    print("    { src: 'pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },")
    print("    { src: 'pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }")
    print("  ]")

if __name__ == "__main__":
    create_pwa_icons()
